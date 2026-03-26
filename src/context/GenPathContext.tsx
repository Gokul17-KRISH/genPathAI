import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import {
  Profile,
  GenPathState,
  SkillRatingMap,
  LearningModule,
  ModuleStatus,
  DashboardState,
  AssessmentState
} from "../types";
import { getSkillsForGoal } from "../utils/skillTemplates";
import { buildAssessmentState } from "../utils/assessmentLogic";
import { buildDashboardState } from "../utils/dashboardLogic";
import { generateLearningPath as pureGenerateLogic } from "../utils/learningPathLogic";

interface GenPathContextType extends GenPathState {
  setStep: (step: number) => void;
  updateProfile: (profile: Partial<Profile>) => void;
  setProfile: (profile: Profile) => void;
  updateSkillRating: (skillId: string, rating: number) => void;
  setSkillRatings: (ratings: SkillRatingMap) => void;
  generatePath: () => void;
  updateModuleStatus: (moduleId: string, status: ModuleStatus) => void;
  refreshDashboard: () => void;
  loadDemoData: () => void;
  resetAll: () => void;
  isGenerating: boolean;
  setIsGenerating: (val: boolean) => void;
}

const defaultProfile: Profile = {
  name: "",
  goal: "",
  interest: "",
  role: "",
  hoursPerWeek: "10-20",
};

const defaultDashboard: DashboardState = {
  skillConfidence: [],
  moduleCompletionPercent: 0,
  readiness: 0,
  passProbability: 0,
  insights: [],
};

const defaultAssessment: AssessmentState = {
  skillsForAssessment: [],
  confidenceSummary: {
    averageRating: 1,
    confidencePercent: 20,
    status: "INITIALIZING"
  }
};

const GenPathContext = createContext<GenPathContextType | undefined>(undefined);

import { useAuth } from "./AuthContext";

export function GenPathProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfileState] = useState<Profile>(defaultProfile);
  const [skillRatings, setSkillRatingsState] = useState<SkillRatingMap>({});
  const [learningPath, setLearningPath] = useState<LearningModule[]>([]);
  const [dashboard, setDashboard] = useState<DashboardState>(defaultDashboard);
  const [assessmentState, setAssessmentState] = useState<AssessmentState>(defaultAssessment);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sync profile name with authenticated user
  useEffect(() => {
    if (user && user.name) {
      setProfileState((prev) => ({ ...prev, name: user.name }));
    }
  }, [user]);

  // Recalculate Assessment State whenever profile goal or skill ratings change
  useEffect(() => {
    if (profile.goal) {
      const abstractDomain = profile.goal.split(" ")[0].toLowerCase();
      const skills = getSkillsForGoal(profile.goal);
      const newAssesmentState = buildAssessmentState(
        abstractDomain,
        profile.goal,
        skills.map(s => ({ id: s.skill, courseId: profile.goal, title: s.skill, description: s.description, learnUrl: s.learnUrl || "#" })),
        skillRatings
      );
      setAssessmentState(newAssesmentState);
    }
  }, [profile.goal, skillRatings]);

  const setStep = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  const updateProfile = useCallback((updates: Partial<Profile>) => {
    setProfileState((prev) => {
      const newProfile = { ...prev, ...updates };
      if (updates.goal && updates.goal !== prev.goal) {
        setSkillRatingsState({}); // reset ratings on goal switch
      }
      return newProfile;
    });
  }, []);

  const setProfile = useCallback((newProfile: Profile) => {
    setProfileState(newProfile);
    if (newProfile.goal) {
      setSkillRatingsState({});
    }
  }, []);

  const updateSkillRating = useCallback((skillId: string, rating: number) => {
    setSkillRatingsState((prev) => ({
      ...prev,
      [skillId]: rating
    }));
  }, []);

  const setSkillRatings = useCallback((ratings: SkillRatingMap) => {
    setSkillRatingsState(ratings);
  }, []);

  const generatePath = useCallback(async () => {
    setIsGenerating(true);
    
    // Simulate generation delay for UX
    setTimeout(() => {
      const skills = getSkillsForGoal(profile.goal).map(s => ({ 
        id: s.skill, courseId: profile.goal, title: s.skill, description: s.description, learnUrl: s.learnUrl || "#" 
      }));
      
      const abstractDomain = profile.goal.split(" ")[0].toLowerCase();
      const path = pureGenerateLogic(
        abstractDomain,
        profile.goal,
        skills,
        skillRatings
      );
      
      setLearningPath(path);
      
      // Compute dashboard
      const dash = buildDashboardState(skills, skillRatings, path, 10);
      setDashboard(dash);
      
      setIsGenerating(false);
    }, 1200);

  }, [profile, skillRatings]);

  const updateModuleStatus = useCallback((moduleId: string, status: ModuleStatus) => {
    setLearningPath((prev) => {
      const updated = prev.map((m) =>
        m.id === moduleId ? { ...m, status } : m
      );
      
      const skills = getSkillsForGoal(profile.goal).map(s => ({ 
        id: s.skill, courseId: profile.goal, title: s.skill, description: s.description, learnUrl: s.learnUrl || "#" 
      }));
      const dashboardState = buildDashboardState(skills, skillRatings, updated, 10);
      setDashboard(dashboardState);
      
      return updated;
    });
  }, [profile, skillRatings]);

  const refreshDashboard = useCallback(() => {
    const skills = getSkillsForGoal(profile.goal).map(s => ({ 
      id: s.skill, courseId: profile.goal, title: s.skill, description: s.description, learnUrl: s.learnUrl || "#" 
    }));
    const dashboardState = buildDashboardState(skills, skillRatings, learningPath, 10);
    setDashboard(dashboardState);
  }, [profile, skillRatings, learningPath]);

  const loadDemoData = useCallback(() => {
    const demoProfile: Profile = {
      name: "Alex Chen",
      goal: "Microsoft Azure Fundamentals",
      interest: "Cloud & DevOps",
      role: "Junior Developer",
      hoursPerWeek: "10-20",
    };
    const demoRatings: SkillRatingMap = {
      "Cloud Basics": 3,
      "Azure Core Services": 2,
      "Identity & Security": 2,
      "Networking": 4,
      "Cost Management": 1
    };
    setProfileState(demoProfile);
    setSkillRatingsState(demoRatings);
    
    // generate path inline
    const skills = getSkillsForGoal(demoProfile.goal).map(s => ({ 
      id: s.skill, courseId: demoProfile.goal, title: s.skill, description: s.description, learnUrl: s.learnUrl || "#" 
    }));
    const path = pureGenerateLogic("azure", demoProfile.goal, skills, demoRatings);
    setLearningPath(path.map((m, i) => ({ ...m, status: i === 0 ? "Completed" as ModuleStatus : "Not Started" as ModuleStatus })));
    
    const dash = buildDashboardState(skills, demoRatings, path, 10);
    setDashboard(dash);
  }, []);

  const resetAll = useCallback(() => {
    setCurrentStep(0);
    setProfileState(defaultProfile);
    setSkillRatingsState({});
    setLearningPath([]);
    setDashboard(defaultDashboard);
  }, []);

  const value = {
    currentStep,
    profile,
    skillRatings,
    learningPath,
    dashboard,
    assessmentState,
    isGenerating,
    setStep,
    updateProfile,
    setProfile,
    updateSkillRating,
    setSkillRatings,
    generatePath,
    updateModuleStatus,
    refreshDashboard,
    loadDemoData,
    resetAll,
    setIsGenerating,
  };

  return (
    <GenPathContext.Provider value={value}>
      {children}
    </GenPathContext.Provider>
  );
}

export function useGenPath() {
  const context = useContext(GenPathContext);
  if (context === undefined) {
    throw new Error("useGenPath must be used within a GenPathProvider");
  }
  return context;
}
