// Placeholder figures matching the Figma design until the admin analytics
// endpoints are available. Swap these for API data via react-query.
import type { Stat } from "./stat-card";
import type { Trend } from "./trend-indicator";

export const overviewStats: Stat[] = [
  {
    label: "Open moderation items",
    value: "567,890",
    trend: { value: "12%", direction: "down" },
    caption: "since yesterday",
    href: "/reports",
  },
  {
    label: "Suspended accounts",
    value: "567,890",
    trend: { value: "12%", direction: "up" },
    caption: "last 24 hours",
    href: "/user-management",
  },
  {
    label: "New reports",
    value: "567,890",
    trend: { value: "12%", direction: "down" },
    caption: "last 24 hours",
    href: "/reports",
  },
];

export const keyMetrics: Stat[] = [
  {
    label: "Message acceptance rate",
    value: "68%",
    trend: { value: "12%", direction: "down" },
    caption: "since yesterday",
  },
  {
    label: "Pipeline drop off rate",
    value: "8%",
    trend: { value: "12%", direction: "down" },
    caption: "since yesterday",
  },
  {
    label: "Scheduling rate",
    value: "38%",
    trend: { value: "12%", direction: "down" },
    caption: "since yesterday",
  },
];

export type PipelineStage = {
  key: string;
  label: string;
  total: string;
  trend: Trend;
  series: { day: string; value: number }[];
};

const week = (values: number[]) =>
  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
    (day, i) => ({ day, value: values[i] }),
  );

export const pipelineStages: PipelineStage[] = [
  {
    key: "contacted",
    label: "Contacted",
    total: "3,102",
    trend: { value: "12%", direction: "up" },
    series: week([8000, 22000, 12000, 14000, 35000, 15000, 30000]),
  },
  {
    key: "interested",
    label: "Interested",
    total: "3.5k",
    trend: { value: "12%", direction: "up" },
    series: week([6000, 15000, 18000, 11000, 26000, 20000, 24000]),
  },
  {
    key: "interviewing",
    label: "Interviewing",
    total: "2.5k",
    trend: { value: "12%", direction: "up" },
    series: week([4000, 9000, 14000, 12000, 18000, 10000, 16000]),
  },
  {
    key: "offered",
    label: "Offered",
    total: "0.5k",
    trend: { value: "12%", direction: "up" },
    series: week([1000, 3000, 2500, 4000, 6000, 3500, 5000]),
  },
  {
    key: "hired",
    label: "Hired",
    total: "0.5k",
    trend: { value: "12%", direction: "down" },
    series: week([800, 2000, 1500, 3000, 4500, 2000, 3500]),
  },
];

export type BreakdownItem = {
  label: string;
  percent: string;
  users: string;
  trend: Trend;
  /** Share of the donut, scheduling only. */
  value?: number;
  color?: string;
};

export const userRetention: BreakdownItem[] = [
  {
    label: "Loyal Users",
    percent: "54%",
    users: "5,761,687",
    trend: { value: "1.2%", direction: "up" },
  },
  {
    label: "Resurrected Users",
    percent: "23%",
    users: "698,723",
    trend: { value: "2.1%", direction: "down" },
  },
  {
    label: "Dead Users",
    percent: "11%",
    users: "16,716",
    trend: { value: "2.9%", direction: "up" },
  },
];

export const scheduling = {
  total: "565,754",
  items: [
    {
      label: "Scheduled interviews",
      percent: "54%",
      users: "5,761,687",
      trend: { value: "1.2%", direction: "up" },
      value: 40,
      color: "#7557D3",
    },
    {
      label: "Calendar connect rate",
      percent: "19%",
      users: "68,412",
      trend: { value: "1.2%", direction: "down" },
      value: 25,
      color: "#27AE60",
    },
    {
      label: "Reschedule rate",
      percent: "23%",
      users: "698,723",
      trend: { value: "1.2%", direction: "up" },
      value: 35,
      color: "#D86800",
    },
  ] satisfies BreakdownItem[],
};
