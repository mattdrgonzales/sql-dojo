import { healthcareSchema, healthcareTableInfo } from "./healthcare/schema";
import { generateHealthcareSeed } from "./healthcare/seed";
import { insuranceSchema, insuranceTableInfo } from "./insurance/schema";
import { generateInsuranceSeed } from "./insurance/seed";
import { retailSchema, retailTableInfo } from "./retail/schema";
import { generateRetailSeed } from "./retail/seed";
import { educationSchema, educationTableInfo } from "./education/schema";
import { generateEducationSeed } from "./education/seed";
import { tiaSchema, tiaTableInfo } from "./tia/schema";
import { generateTiaSeed } from "./tia/seed";
import type { Industry } from "../challenges/types";

export interface TableInfo {
  name: string;
  description: string;
  columns: string[];
}

export interface IndustryData {
  schema: string;
  seed: () => string;
  tables: TableInfo[];
}

export const industryData: Record<Industry, IndustryData> = {
  healthcare: {
    schema: healthcareSchema,
    seed: generateHealthcareSeed,
    tables: healthcareTableInfo,
  },
  insurance: {
    schema: insuranceSchema,
    seed: generateInsuranceSeed,
    tables: insuranceTableInfo,
  },
  retail: {
    schema: retailSchema,
    seed: generateRetailSeed,
    tables: retailTableInfo,
  },
  education: {
    schema: educationSchema,
    seed: generateEducationSeed,
    tables: educationTableInfo,
  },
  tia: {
    schema: tiaSchema,
    seed: generateTiaSeed,
    tables: tiaTableInfo,
  },
};
