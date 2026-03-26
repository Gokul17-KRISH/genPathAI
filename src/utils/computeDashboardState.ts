import { Profile, SkillRating, LearningModule, DashboardState, SkillConfidence } from "../types";

export function computeDashboardState(
  profile: Profile,
  ratings: SkillRating[],
  modules: LearningModule[]
): DashboardState {
  const completedModules = modules.filter((m) => m.status === "completed");
  const inProgressModules = modules.filter((m) => m.status === "in_progress");
  const modulesDone = completedModules.length;
  const totalModules = modules.length;
  const totalDurationWeeks = modules.reduce((sum, m) => sum + m.durationWeeks, 0);
  const completionProgress = totalModules > 0 ? (modulesDone / totalModules) * 100 : 0;
  const inProgressBonus = inProgressModules.length * 2;
  const avgSkillRating = ratings.length > 0 
    ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
    : 3;
  const skillBonus = ((avgSkillRating - 3) / 2) * 15;
  const difficultyBonus = completedModules.reduce((sum, m) => {
    switch (m.difficulty) {
      case "Advanced": return sum + 3;
      case "Intermediate": return sum + 2;
      case "Beginner": return sum + 1;
      default: return sum;
    }
  }, 0);
  let readinessPercent = Math.min(100, Math.max(0, 
    completionProgress + skillBonus + inProgressBonus + (difficultyBonus / 2)
  ));
  readinessPercent = Math.round(readinessPercent);
  const passProbability = Math.min(99, Math.max(5, 
    readinessPercent * 0.85 + (avgSkillRating - 3) * 5 + (modulesDone > 0 ? 10 : 0)
  ));
  const skillConfidence: SkillConfidence[] = ratings.map((rating) => {
    const baseConfidence = rating.rating * 20;
    const relatedCompleted = completedModules.filter((m) =>
      m.relatedSkills.includes(rating.skill)
    ).length;
    const moduleBonus = relatedCompleted * 10;
    const relatedInProgress = inProgressModules.filter((m) =>
      m.relatedSkills.includes(rating.skill)
    ).length;
    const progressBonus = relatedInProgress * 5;
    const confidence = Math.min(100, baseConfidence + moduleBonus + progressBonus);
    return {
      skill: rating.skill,
      confidence: Math.round(confidence),
    };
  });
  const weeklyProgress: number[] = [];
  let modulesInWeek = 0;
  let weekCount = 0;
  for (let i = 0; i < modules.length; i++) {
    if (modules[i].status === "completed") {
      modulesInWeek++;
      if ((i + 1) % 2 === 0 || i === modules.length - 1) {
        weeklyProgress.push(modulesInWeek);
        modulesInWeek = 0;
        weekCount++;
        if (weekCount >= 6) break;
      }
    }
  }
  while (weeklyProgress.length < 6) {
    weeklyProgress.push(0);
  }
  const insights: string[] = [];
  const lowSkills = ratings.filter((r) => r.rating <= 2);
  if (lowSkills.length > 0) {
    const skillNames = lowSkills.slice(0, 2).map((s) => s.skill).join(" and ");
    const relevantModules = modules
      .filter((m) => 
        m.status !== "completed" && 
        m.relatedSkills.some((s) => lowSkills.map((ls) => ls.skill).includes(s))
      )
      .slice(0, 2)
      .map((m) => m.title);
    
    if (relevantModules.length > 0) {
      insights.push(
        `Focus on strengthening ${skillNames}. Prioritize "${relevantModules.join('" and "')}" modules.`
      );
    }
  }
  if (readinessPercent >= 70) {
    insights.push(
      "Excellent progress! You're nearing certification readiness. Consider taking a practice exam to identify any remaining gaps."
    );
  } else if (readinessPercent >= 40) {
    const remainingModules = totalModules - modulesDone;
    insights.push(
      `Good momentum! Complete ${remainingModules} more module${remainingModules > 1 ? "s" : ""} to significantly boost your readiness score.`
    );
  } else {
    insights.push(
      "You're just getting started. Focus on completing foundational modules first to build a strong base."
    );
  }
  const hoursInsights: Record<string, string> = {
    "5-10": "With your current time commitment, consistency is key. Aim for daily 1-hour study sessions.",
    "10-20": "Your study schedule is solid. Consider adding practice exercises to reinforce learning.",
    "20-30": "Strong time investment! Make sure to include breaks to avoid burnout.",
    "30+": "Intensive study schedule detected. Balance theory with hands-on practice for best results.",
  };
  insights.push(hoursInsights[profile.hoursPerWeek]);
  const highSkills = ratings.filter((r) => r.rating >= 4);
  if (highSkills.length >= 3) {
    insights.push(
      "Your strong foundation in multiple areas gives you an advantage. Focus on advanced modules to maximize your preparation."
    );
  }
  return {
    readinessPercent,
    passProbability: Math.round(passProbability),
    totalDurationWeeks,
    modulesDone,
    totalModules,
    skillConfidence,
    weeklyProgress,
    insights: insights.slice(0, 4),
  };
}
