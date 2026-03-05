export interface Lesson {
  id: string;
  module: Module;
  title: string;
  order: number;
  explanation: string;
  syntax: string;
  examples: LessonExample[];
  tryIt: string;
}

export interface LessonExample {
  description: string;
  query: string;
}

export type Module =
  | "basics"
  | "filtering"
  | "sorting-limiting"
  | "aggregation"
  | "joins"
  | "advanced";

export const moduleLabels: Record<Module, string> = {
  basics: "The Basics",
  filtering: "Filtering Data",
  "sorting-limiting": "Sorting & Limiting",
  aggregation: "Aggregation",
  joins: "Joins",
  advanced: "Advanced",
};

export const moduleOrder: Module[] = [
  "basics",
  "filtering",
  "sorting-limiting",
  "aggregation",
  "joins",
  "advanced",
];
