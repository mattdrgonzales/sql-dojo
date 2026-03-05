"use client";

import initSqlJs, { type Database } from "sql.js";

let dbInstance: Database | null = null;
let initPromise: Promise<Database> | null = null;

export interface QueryResult {
  columns: string[];
  values: (string | number | null)[][];
}

export interface QueryError {
  message: string;
}

export async function getDb(): Promise<Database> {
  if (dbInstance) return dbInstance;
  if (initPromise) return initPromise;

  initPromise = initSqlJs({
    locateFile: (file) => `https://sql.js.org/dist/${file}`,
  }).then((SQL) => {
    dbInstance = new SQL.Database();
    return dbInstance;
  });

  return initPromise;
}

export async function initIndustryDb(
  setupSql: string
): Promise<Database> {
  const db = await getDb();
  // Drop all existing tables
  const tables = db.exec(
    "SELECT name FROM sqlite_master WHERE type='table'"
  );
  if (tables.length > 0) {
    for (const row of tables[0].values) {
      db.run(`DROP TABLE IF EXISTS "${row[0]}"`);
    }
  }
  db.run(setupSql);
  return db;
}

export async function executeQuery(
  sql: string
): Promise<QueryResult | QueryError> {
  try {
    const db = await getDb();
    const results = db.exec(sql);
    if (results.length === 0) {
      return { columns: [], values: [] };
    }
    return {
      columns: results[0].columns,
      values: results[0].values as (string | number | null)[][],
    };
  } catch (e) {
    return { message: (e as Error).message };
  }
}

export function isQueryError(
  result: QueryResult | QueryError
): result is QueryError {
  return "message" in result;
}
