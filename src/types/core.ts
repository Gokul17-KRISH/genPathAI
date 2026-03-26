export type Level = "Beginner" | "Intermediate" | "Expert";

export type Domain = {
  id: string;
  name: string;
};

export type Course = {
  id: string;
  domainId: string;
  name: string;
};

export type Skill = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  learnUrl: string;
};

export type SkillRatingMap = Record<string, number>; // Maps skillId -> rating (1-5)

export type AssessedSkill = Skill & {
  rating: number;
  level: Level;
};

export type AssessmentState = {
  skillsForAssessment: AssessedSkill[];
  confidenceSummary: {
    averageRating: number;
    confidencePercent: number;
    status: "INITIALIZING" | "STABILIZING" | "OPTIMIZED";
  };
};

export type ModuleStatus = "Not Started" | "In Progress" | "Completed";

export type LearningModule = {
  id: string;
  domainId: string;
  courseId: string;
  skillId: string;
  title: string;
  description: string;
  durationWeeks: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  activityType: "Watch" | "Read" | "Practice" | "Project";
  status: ModuleStatus;
  reason: string;
};

export type SkillConfidence = {
  skillId: string;
  title: string;
  rating: number;
  level: Level;
  ratingPercent: number;
};

export type DashboardState = {
  skillConfidence: SkillConfidence[];
  moduleCompletionPercent: number;
  readiness: number;
  passProbability: number;
  insights: string[];
};
