import { Skill, SkillRatingMap, LearningModule, DashboardState, SkillConfidence, Level } from "../types/core";

export function buildDashboardState(
  skillsForCourse: Skill[],
  skillRatings: SkillRatingMap,
  learningModules: LearningModule[],
  studyHoursPerWeek: number | null
): DashboardState {
  
  let totalRating = 0;
  let hasLowRating = false;
  let lowRatingSubject = "";

  const skillConfidence: SkillConfidence[] = skillsForCourse.map(skill => {
    const rawRating = skillRatings[skill.id];
    const rating = (rawRating && rawRating > 0) ? rawRating : 1;
    totalRating += rating;
    
    if (rating <= 2) {
      hasLowRating = true;
      if (!lowRatingSubject) lowRatingSubject = skill.title;
    }
    
    let level: Level = "Beginner";
    if (rating >= 3 && rating <= 4) level = "Intermediate";
    if (rating === 5) level = "Expert";
    
    return {
      skillId: skill.id,
      title: skill.title,
      rating,
      level,
      ratingPercent: Math.round((rating / 5) * 100)
    };
  });

  const completedModules = learningModules.filter(m => m.status === "Completed").length;
  const totalModules = learningModules.length;
  const moduleCompletionPercent = totalModules === 0 ? 0 : Math.round((completedModules / totalModules) * 100);

  const averageSkillRating = skillsForCourse.length ? totalRating / skillsForCourse.length : 1;
  const skillScore = (averageSkillRating / 5) * 100;
  
  const readiness = Math.round((skillScore * 0.6) + (moduleCompletionPercent * 0.4));
  const passProbability = Math.min(99, Math.round((readiness * 0.8) + 15));
  
  const insights: string[] = [];
  if (studyHoursPerWeek !== null && studyHoursPerWeek < 7) {
    insights.push("Consider increasing your study time above 7 hours per week.");
  }
  if (hasLowRating) {
    insights.push(`Focus on ${lowRatingSubject} where your rating is low.`);
  }
  if (readiness >= 70) {
    insights.push("You are close to exam-ready. Start mock tests and timed practice.");
  } else if (readiness < 40) {
    insights.push("Build stronger fundamentals before scheduling your exam.");
  }
  
  return {
    skillConfidence,
    moduleCompletionPercent,
    readiness,
    passProbability,
    insights
  };
}
