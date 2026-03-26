import { CertificationGoal } from "../types";

const API_BASE_URL = "http://localhost:8000/api";

export interface GeneratePathRequest {
  goal: CertificationGoal | "";
  domains: {
    name: string;
    level: string;
    score: number;
    notes: string;
  }[];
}

export const apiService = {
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return await res.json();
    } catch (e) {
      console.warn("Backend not active", e);
      return null;
    }
  },

  generateLearningPath: async (request: GeneratePathRequest) => {
    try {
      const response = await fetch(`${API_BASE_URL}/learning-path/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request)
      });
      if (!response.ok) {
        throw new Error("Failed to generate path");
      }
      return await response.json();
    } catch (error) {
      console.error("API Error generating path:", error);
      throw error;
    }
  }
};
