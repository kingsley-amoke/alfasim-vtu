"use client";

import { Plan } from "./types";

//calculate unit price for data
export function getUnitPrice(plan: Plan[], unitId: number): number {
  "use client";

  const myPlan: Plan = plan.find((item) => item.id == unitId)!;

  return parseInt(myPlan.plan_amount) + 20;
}
