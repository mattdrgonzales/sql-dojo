"use client";

import { executeQuery, isQueryError } from "./sql";
import type { QueryResult, QueryError } from "./sql";
import type { Challenge } from "@/challenges/types";

export interface ValidationResult {
  status: "correct" | "wrong" | "error";
  userResult: QueryResult | QueryError;
  expectedResult: QueryResult | null;
}

export async function validateQuery(
  userSql: string,
  challenge: Challenge
): Promise<ValidationResult> {
  const userResult = await executeQuery(userSql);

  if (isQueryError(userResult)) {
    return { status: "error", userResult, expectedResult: null };
  }

  const expectedResult = await executeQuery(challenge.expectedQuery);

  if (isQueryError(expectedResult)) {
    // Expected query failed — shouldn't happen, treat as correct if user got results
    return { status: "correct", userResult, expectedResult: null };
  }

  // Compare column count
  if (userResult.columns.length !== expectedResult.columns.length) {
    return { status: "wrong", userResult, expectedResult };
  }

  // Compare row count
  if (userResult.values.length !== expectedResult.values.length) {
    return { status: "wrong", userResult, expectedResult };
  }

  // Compare values (order matters for ORDER BY queries, otherwise sort both)
  const hasOrderBy = challenge.expectedQuery.toLowerCase().includes("order by");

  const normalize = (rows: (string | number | null)[][]) =>
    rows.map((r) => r.map((v) => (v === null ? "NULL" : String(v))).join("|"));

  const userRows = normalize(userResult.values);
  const expectedRows = normalize(expectedResult.values);

  if (hasOrderBy) {
    const match = userRows.every((row, i) => row === expectedRows[i]);
    return {
      status: match ? "correct" : "wrong",
      userResult,
      expectedResult,
    };
  }

  const userSorted = [...userRows].sort();
  const expectedSorted = [...expectedRows].sort();
  const match = userSorted.every((row, i) => row === expectedSorted[i]);

  return {
    status: match ? "correct" : "wrong",
    userResult,
    expectedResult,
  };
}
