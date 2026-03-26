import { Skill, SkillRatingMap, AssessmentState, Level } from "../types/core";

export function buildAssessmentState(
  selectedDomainId: string,
  selectedCourseId: string,
  allSkills: Skill[],
  skillRatings: SkillRatingMap
): AssessmentState {
  
  const courseSkills = allSkills.filter(s => s.courseId === selectedCourseId);
  
  const skillsForAssessment = courseSkills.map(skill => {
    const rawRating = skillRatings[skill.id];
    const rating = (rawRating && rawRating > 0) ? rawRating : 1;
    
    let level: Level = "Beginner";
    if (rating >= 3 && rating <= 4) level = "Intermediate";
    if (rating === 5) level = "Expert";
    
    return { ...skill, rating, level };
  });

  const totalRating = skillsForAssessment.reduce((acc, curr) => acc + curr.rating, 0);
  const averageRating = skillsForAssessment.length ? totalRating / skillsForAssessment.length : 0;
  const confidencePercent = Math.round((averageRating / 5) * 100);
  
  let status: "INITIALIZING" | "STABILIZING" | "OPTIMIZED" = "INITIALIZING";
  if (confidencePercent > 30 && confidencePercent <= 70) status = "STABILIZING";
  if (confidencePercent > 70) status = "OPTIMIZED";

  return {
    skillsForAssessment,
    confidenceSummary: {
      averageRating: Number(averageRating.toFixed(2)),
      confidencePercent,
      status
    }
  };
}
