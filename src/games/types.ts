export type GameModule =
  | "basics"
  | "filtering"
  | "sorting-limiting"
  | "aggregation"
  | "joins"
  | "advanced";

export type QuestionType = "multiple-choice" | "query-order" | "spot-the-bug" | "fill-blank";

export interface MultipleChoiceQuestion {
  type: "multiple-choice";
  id: string;
  module: GameModule;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QueryOrderQuestion {
  type: "query-order";
  id: string;
  module: GameModule;
  question: string;
  clauses: string[];
  correctOrder: number[];
  explanation: string;
}

export interface SpotTheBugQuestion {
  type: "spot-the-bug";
  id: string;
  module: GameModule;
  question: string;
  buggyQuery: string;
  options: string[];
  correctIndex: number;
  fixedQuery: string;
  explanation: string;
}

export interface FillBlankQuestion {
  type: "fill-blank";
  id: string;
  module: GameModule;
  question: string;
  template: string;
  answer: string;
  acceptableAnswers: string[];
  explanation: string;
}

export type Question =
  | MultipleChoiceQuestion
  | QueryOrderQuestion
  | SpotTheBugQuestion
  | FillBlankQuestion;

export const gameModuleLabels: Record<GameModule, string> = {
  basics: "The Basics",
  filtering: "Filtering",
  "sorting-limiting": "Sorting & Limiting",
  aggregation: "Aggregation",
  joins: "Joins",
  advanced: "Advanced",
};

export const gameModuleOrder: GameModule[] = [
  "basics",
  "filtering",
  "sorting-limiting",
  "aggregation",
  "joins",
  "advanced",
];
