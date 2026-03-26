export * from "./core";

export type HoursPerWeek = "5-10" | "10-20" | "20-30" | "30+";
export type CertificationGoal =
  | "AWS Solutions Architect"
  | "Google Cloud Professional"
  | "Microsoft Azure Fundamentals"
  | "Kubernetes CKA"
  | "Data Science (TensorFlow Developer)"
  | "Full-Stack Web Developer"
  | "Cybersecurity (Security+)";

export type InterestArea =
  | "Cloud & DevOps"
  | "ML & AI"
  | "Web Development"
  | "Data Engineering"
  | "Cybersecurity"
  | "Mobile Development";

export interface Profile {
  name: string;
  goal: CertificationGoal | "";
  interest: InterestArea | "";
  role: string;
  hoursPerWeek: HoursPerWeek;
}

import { Profile as ProfileType, SkillRatingMap, LearningModule, DashboardState, AssessmentState } from "./core";
export type GenPathState = {
  currentStep: number;
  profile: ProfileType;
  skillRatings: SkillRatingMap;
  learningPath: LearningModule[];
  dashboard: DashboardState;
  assessmentState: AssessmentState;
};
