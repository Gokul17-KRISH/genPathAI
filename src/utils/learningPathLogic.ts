import { Skill, SkillRatingMap, LearningModule } from "../types/core";

export function generateLearningPath(
  selectedDomainId: string,
  selectedCourseId: string,
  skillsForCourse: Skill[],
  skillRatings: SkillRatingMap
): LearningModule[] {
  
  const modules: LearningModule[] = skillsForCourse.map(skill => {
    const rawRating = skillRatings[skill.id];
    const rating = (rawRating && rawRating > 0) ? rawRating : 1;
    
    let difficulty: "Beginner" | "Intermediate" | "Advanced" = "Beginner";
    let durationWeeks = 3;
    let activityType: "Watch" | "Read" | "Practice" | "Project" = "Watch";
    let reason = "Your rating is low (1-2), so start here to build fundementals.";
    
    if (rating >= 3 && rating <= 4) {
      difficulty = "Intermediate";
      durationWeeks = 2;
      activityType = "Practice";
      reason = "You are mid-level and should practice practical implementations.";
    } else if (rating === 5) {
      difficulty = "Advanced";
      durationWeeks = 1;
      activityType = "Project";
      reason = "You are strong here, dive straight into an advanced project.";
    }
    
    return {
      id: `mod_${skill.id}`,
      domainId: selectedDomainId,
      courseId: selectedCourseId,
      skillId: skill.id,
      title: `${difficulty} ${skill.title}`,
      description: `Targeted learning for ${skill.title}.`,
      durationWeeks,
      difficulty,
      activityType,
      status: "Not Started",
      reason
    };
  });
  
  // Sort order: Beginner -> Intermediate -> Advanced
  const orderWeight = { "Beginner": 1, "Intermediate": 2, "Advanced": 3 };
  return modules.sort((a, b) => orderWeight[a.difficulty] - orderWeight[b.difficulty]);
}
