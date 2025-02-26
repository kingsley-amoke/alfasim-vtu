"use client";

//calculate unit price for data
export function getUnitPrice(plan: Plan[], unitId: number): number {
  "use client";
  return parseInt(plan.find((item) => item.id == unitId)!.plan_amount) + 10;
}
