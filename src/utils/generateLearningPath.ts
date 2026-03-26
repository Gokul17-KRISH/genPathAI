import { Profile, SkillRating, LearningModule, ActivityType, Difficulty } from "../types";

interface ModuleTemplate {
  id: string;
  title: string;
  description: string;
  baseDuration: number;
  difficulty: Difficulty;
  activityType: ActivityType;
  relatedSkills: string[];
  skillThreshold: number; // If skill rating >= this, can be shortened/skipped
}

const moduleTemplatesByGoal: Record<string, ModuleTemplate[]> = {
  "Microsoft Azure Fundamentals": [
    {
      id: "az-1",
      title: "Cloud Computing Fundamentals",
      description: "Learn core cloud concepts, deployment models, and cloud service types",
      baseDuration: 1,
      difficulty: "Beginner",
      activityType: "Watch",
      relatedSkills: ["Cloud Basics"],
      skillThreshold: 4,
    },
    {
      id: "az-2",
      title: "Azure Core Services Deep Dive",
      description: "Explore Azure compute, storage, networking, and database offerings",
      baseDuration: 2,
      difficulty: "Intermediate",
      activityType: "Practice",
      relatedSkills: ["Azure Core Services", "Cloud Basics"],
      skillThreshold: 4,
    },
    {
      id: "az-3",
      title: "Identity & Access Management",
      description: "Master Azure AD, RBAC, and security principals",
      baseDuration: 1,
      difficulty: "Intermediate",
      activityType: "Read",
      relatedSkills: ["Identity & Security"],
      skillThreshold: 4,
    },
    {
      id: "az-4",
      title: "Azure Networking Essentials",
      description: "Configure virtual networks, load balancers, and VPN gateways",
      baseDuration: 2,
      difficulty: "Intermediate",
      activityType: "Practice",
      relatedSkills: ["Networking"],
      skillThreshold: 4,
    },
    {
      id: "az-5",
      title: "Cost Management & Optimization",
      description: "Learn Azure pricing, cost analysis, and budget management",
      baseDuration: 1,
      difficulty: "Beginner",
      activityType: "Read",
      relatedSkills: ["Cost Management"],
      skillThreshold: 4,
    },
    {
      id: "az-6",
      title: "Azure Security Implementation",
      description: "Implement security controls, encryption, and compliance",
      baseDuration: 2,
      difficulty: "Advanced",
      activityType: "Project",
      relatedSkills: ["Identity & Security", "Networking"],
      skillThreshold: 5,
    },
    {
      id: "az-7",
      title: "Certification Exam Preparation",
      description: "Practice tests, review weak areas, and exam strategies",
      baseDuration: 1,
      difficulty: "Advanced",
      activityType: "Practice",
      relatedSkills: ["Cloud Basics", "Azure Core Services", "Identity & Security", "Networking", "Cost Management"],
      skillThreshold: 5,
    },
  ],
  "Data Science (TensorFlow Developer)": [
    {
      id: "ds-1",
      title: "Python for Data Science",
      description: "Python fundamentals, data structures, and best practices",
      baseDuration: 1,
      difficulty: "Beginner",
      activityType: "Practice",
      relatedSkills: ["Python Programming"],
      skillThreshold: 4,
    },
    {
      id: "ds-2",
      title: "Data Manipulation with NumPy & Pandas",
      description: "Master data wrangling, cleaning, and transformation",
      baseDuration: 2,
      difficulty: "Intermediate",
      activityType: "Practice",
      relatedSkills: ["NumPy & Pandas", "Python Programming"],
      skillThreshold: 4,
    },
    {
      id: "ds-3",
      title: "Machine Learning Foundations",
      description: "Supervised and unsupervised learning algorithms",
      baseDuration: 2,
      difficulty: "Intermediate",
      activityType: "Watch",
      relatedSkills: ["ML Fundamentals"],
      skillThreshold: 4,
    },
    {
      id: "ds-4",
      title: "Deep Learning & Neural Networks",
      description: "Build neural networks from scratch, understand architectures",
      baseDuration: 2,
      difficulty: "Advanced",
      activityType: "Practice",
      relatedSkills: ["Neural Networks", "ML Fundamentals"],
      skillThreshold: 4,
    },
    {
      id: "ds-5",
      title: "TensorFlow & Keras Mastery",
      description: "Build, train, and deploy models with TensorFlow",
      baseDuration: 3,
      difficulty: "Advanced",
      activityType: "Project",
      relatedSkills: ["TensorFlow", "Neural Networks"],
      skillThreshold: 5,
    },
    {
      id: "ds-6",
      title: "Capstone: End-to-End ML Project",
      description: "Complete data science project from data to deployment",
      baseDuration: 2,
      difficulty: "Advanced",
      activityType: "Project",
      relatedSkills: ["Python Programming", "NumPy & Pandas", "ML Fundamentals", "Neural Networks", "TensorFlow"],
      skillThreshold: 5,
    },
  ],
  "Full-Stack Web Developer": [
    {
      id: "fs-1",
      title: "Modern HTML & CSS",
      description: "Semantic HTML5, Flexbox, Grid, and responsive design",
      baseDuration: 1,
      difficulty: "Beginner",
      activityType: "Practice",
      relatedSkills: ["HTML & CSS"],
      skillThreshold: 4,
    },
    {
      id: "fs-2",
      title: "JavaScript Fundamentals to Advanced",
      description: "ES6+, async/await, closures, and DOM manipulation",
      baseDuration: 2,
      difficulty: "Intermediate",
      activityType: "Practice",
      relatedSkills: ["JavaScript"],
      skillThreshold: 4,
    },
    {
      id: "fs-3",
      title: "React Development",
      description: "Components, hooks, state management, and React ecosystem",
      baseDuration: 3,
      difficulty: "Intermediate",
      activityType: "Project",
      relatedSkills: ["React", "JavaScript"],
      skillThreshold: 4,
    },
    {
      id: "fs-4",
      title: "Node.js & Express Backend",
      description: "Build RESTful APIs, middleware, and server-side logic",
      baseDuration: 2,
      difficulty: "Intermediate",
      activityType: "Practice",
      relatedSkills: ["Node.js", "JavaScript"],
      skillThreshold: 4,
    },
    {
      id: "fs-5",
      title: "Database Design & Integration",
      description: "SQL, MongoDB, ORMs, and data modeling patterns",
      baseDuration: 2,
      difficulty: "Intermediate",
      activityType: "Practice",
      relatedSkills: ["Databases"],
      skillThreshold: 4,
    },
    {
      id: "fs-6",
      title: "Full-Stack Capstone Project",
      description: "Build and deploy a complete web application",
      baseDuration: 3,
      difficulty: "Advanced",
      activityType: "Project",
      relatedSkills: ["HTML & CSS", "JavaScript", "React", "Node.js", "Databases"],
      skillThreshold: 5,
    },
  ],
};

const additionalTemplates: Record<string, ModuleTemplate[]> = {
  "AWS Solutions Architect": [
    { id: "aws-1", title: "AWS Foundations", description: "Core AWS services and global infrastructure", baseDuration: 1, difficulty: "Beginner", activityType: "Watch", relatedSkills: ["AWS Core Services"], skillThreshold: 4 },
    { id: "aws-2", title: "Compute & Storage Services", description: "EC2, S3, EBS, and related services in depth", baseDuration: 2, difficulty: "Intermediate", activityType: "Practice", relatedSkills: ["AWS Core Services"], skillThreshold: 4 },
    { id: "aws-3", title: "Architecting for Reliability", description: "High availability, fault tolerance, and disaster recovery", baseDuration: 2, difficulty: "Intermediate", activityType: "Read", relatedSkills: ["Architecture Design"], skillThreshold: 4 },
    { id: "aws-4", title: "Security & Compliance", description: "IAM, encryption, and AWS security services", baseDuration: 2, difficulty: "Intermediate", activityType: "Practice", relatedSkills: ["Security & Compliance"], skillThreshold: 4 },
    { id: "aws-5", title: "Advanced Networking", description: "VPC design, hybrid connectivity, and CDN", baseDuration: 2, difficulty: "Advanced", activityType: "Practice", relatedSkills: ["Networking"], skillThreshold: 4 },
    { id: "aws-6", title: "Serverless Architecture", description: "Lambda, API Gateway, and event-driven design", baseDuration: 2, difficulty: "Advanced", activityType: "Project", relatedSkills: ["Serverless", "Architecture Design"], skillThreshold: 4 },
    { id: "aws-7", title: "Exam Preparation & Mock Tests", description: "Practice exams and targeted review", baseDuration: 1, difficulty: "Advanced", activityType: "Practice", relatedSkills: ["AWS Core Services", "Architecture Design", "Security & Compliance", "Networking", "Serverless"], skillThreshold: 5 },
  ],
  "Google Cloud Professional": [
    { id: "gcp-1", title: "GCP Fundamentals", description: "Google Cloud services and console navigation", baseDuration: 1, difficulty: "Beginner", activityType: "Watch", relatedSkills: ["GCP Core Services"], skillThreshold: 4 },
    { id: "gcp-2", title: "Compute & Storage", description: "Compute Engine, Cloud Storage, and Cloud SQL", baseDuration: 2, difficulty: "Intermediate", activityType: "Practice", relatedSkills: ["GCP Core Services"], skillThreshold: 4 },
    { id: "gcp-3", title: "Cloud Architecture Design", description: "Designing scalable and secure GCP solutions", baseDuration: 2, difficulty: "Intermediate", activityType: "Read", relatedSkills: ["Cloud Architecture"], skillThreshold: 4 },
    { id: "gcp-4", title: "Security & IAM", description: "Identity management and security best practices", baseDuration: 1, difficulty: "Intermediate", activityType: "Practice", relatedSkills: ["Security & IAM"], skillThreshold: 4 },
    { id: "gcp-5", title: "Data & Analytics", description: "BigQuery, Dataflow, and data pipelines", baseDuration: 2, difficulty: "Advanced", activityType: "Project", relatedSkills: ["Data & Analytics"], skillThreshold: 4 },
    { id: "gcp-6", title: "Kubernetes on GKE", description: "Container orchestration with Google Kubernetes Engine", baseDuration: 2, difficulty: "Advanced", activityType: "Practice", relatedSkills: ["Kubernetes & GKE"], skillThreshold: 4 },
    { id: "gcp-7", title: "Certification Preparation", description: "Mock exams and review sessions", baseDuration: 1, difficulty: "Advanced", activityType: "Practice", relatedSkills: ["GCP Core Services", "Cloud Architecture", "Security & IAM", "Data & Analytics", "Kubernetes & GKE"], skillThreshold: 5 },
  ],
  "Kubernetes CKA": [
    { id: "k8s-1", title: "Container Fundamentals", description: "Docker basics and containerization concepts", baseDuration: 1, difficulty: "Beginner", activityType: "Practice", relatedSkills: ["Container Basics"], skillThreshold: 4 },
    { id: "k8s-2", title: "Kubernetes Architecture", description: "Cluster components and control plane deep dive", baseDuration: 2, difficulty: "Intermediate", activityType: "Watch", relatedSkills: ["Kubernetes Architecture"], skillThreshold: 4 },
    { id: "k8s-3", title: "Workload Management", description: "Pods, deployments, services, and scaling strategies", baseDuration: 2, difficulty: "Intermediate", activityType: "Practice", relatedSkills: ["Workload Management"], skillThreshold: 4 },
    { id: "k8s-4", title: "Kubernetes Networking", description: "Services, ingress, and network policies", baseDuration: 2, difficulty: "Advanced", activityType: "Practice", relatedSkills: ["Networking"], skillThreshold: 4 },
    { id: "k8s-5", title: "Storage & Security", description: "Persistent volumes, RBAC, and secrets", baseDuration: 2, difficulty: "Advanced", activityType: "Practice", relatedSkills: ["Storage & Security"], skillThreshold: 4 },
    { id: "k8s-6", title: "CKA Exam Lab Practice", description: "Hands-on practice for certification exam", baseDuration: 2, difficulty: "Advanced", activityType: "Practice", relatedSkills: ["Container Basics", "Kubernetes Architecture", "Workload Management", "Networking", "Storage & Security"], skillThreshold: 5 },
  ],
  "Cybersecurity (Security+)": [
    { id: "sec-1", title: "Network Security Fundamentals", description: "Firewalls, IDS/IPS, and network defense strategies", baseDuration: 2, difficulty: "Beginner", activityType: "Watch", relatedSkills: ["Network Security"], skillThreshold: 4 },
    { id: "sec-2", title: "Threats & Vulnerabilities", description: "Attack vectors, malware analysis, and threat assessment", baseDuration: 2, difficulty: "Intermediate", activityType: "Read", relatedSkills: ["Threats & Vulnerabilities"], skillThreshold: 4 },
    { id: "sec-3", title: "Cryptography Essentials", description: "Encryption algorithms, PKI, and secure communications", baseDuration: 2, difficulty: "Intermediate", activityType: "Practice", relatedSkills: ["Cryptography"], skillThreshold: 4 },
    { id: "sec-4", title: "Identity & Access Management", description: "Authentication protocols and access control models", baseDuration: 1, difficulty: "Intermediate", activityType: "Read", relatedSkills: ["Identity Management"], skillThreshold: 4 },
    { id: "sec-5", title: "Risk Management & Compliance", description: "Security policies, frameworks, and incident response", baseDuration: 2, difficulty: "Advanced", activityType: "Practice", relatedSkills: ["Risk Management"], skillThreshold: 4 },
    { id: "sec-6", title: "Security+ Exam Preparation", description: "Practice tests and comprehensive review", baseDuration: 1, difficulty: "Advanced", activityType: "Practice", relatedSkills: ["Network Security", "Threats & Vulnerabilities", "Cryptography", "Identity Management", "Risk Management"], skillThreshold: 5 },
  ],
};

Object.assign(moduleTemplatesByGoal, additionalTemplates);

function getSkillRating(ratings: SkillRating[], skillName: string): number {
  const found = ratings.find((r) => r.skill === skillName);
  return found?.rating ?? 3;
}

function generateWhyThis(template: ModuleTemplate, ratings: SkillRating[]): string {
  const relatedRatings = template.relatedSkills.map((skill) => ({
    skill,
    rating: getSkillRating(ratings, skill),
  }));
  const lowSkills = relatedRatings.filter((r) => r.rating <= 2);
  const highSkills = relatedRatings.filter((r) => r.rating >= 4);
  if (lowSkills.length > 0) {
    const skillNames = lowSkills.map((s) => s.skill).join(", ");
    return `Included because your confidence in ${skillNames} needs strengthening. This module will build a solid foundation.`;
  }
  if (highSkills.length === relatedRatings.length && relatedRatings.length > 0) {
    return `You're already proficient in related skills. This module focuses on advanced concepts and practical application.`;
  }
  return `This module covers essential concepts for your certification path and reinforces key skills.`;
}

export function generateLearningPath(profile: Profile, ratings: SkillRating[]): LearningModule[] {
  const templates = moduleTemplatesByGoal[profile.goal] || moduleTemplatesByGoal["Full-Stack Web Developer"];
  const hoursMultiplier = {
    "5-10": 1.5,
    "10-20": 1.0,
    "20-30": 0.8,
    "30+": 0.6,
  };
  const multiplier = hoursMultiplier[profile.hoursPerWeek];
  const modules: LearningModule[] = [];
  for (const template of templates) {
    const avgRating =
      template.relatedSkills.reduce((sum, skill) => sum + getSkillRating(ratings, skill), 0) /
      Math.max(template.relatedSkills.length, 1);
    if (template.difficulty === "Beginner" && avgRating >= 5) {
      continue;
    }
    let adjustedDuration = template.baseDuration * multiplier;
    if (avgRating >= 4) {
      adjustedDuration *= 0.7;
    } else if (avgRating <= 2) {
      adjustedDuration *= 1.3;
    }
    if (avgRating <= 1.5 && template.difficulty !== "Beginner") {
      const practiceModule: LearningModule = {
        id: `${template.id}-practice`,
        title: `${template.relatedSkills[0]} Fundamentals Review`,
        description: `Extra practice session to strengthen your foundation in ${template.relatedSkills.join(", ")}`,
        durationWeeks: Math.ceil(multiplier),
        difficulty: "Beginner",
        activityType: "Practice",
        relatedSkills: template.relatedSkills,
        whyThis: `Added because your self-assessment indicates significant gaps in ${template.relatedSkills.join(", ")}. Building a stronger foundation will help you succeed in more advanced topics.`,
        status: "Not Started",
      };
      modules.push(practiceModule);
    }
    const module: LearningModule = {
      id: template.id,
      title: template.title,
      description: template.description,
      durationWeeks: Math.max(1, Math.round(adjustedDuration)),
      difficulty: template.difficulty,
      activityType: template.activityType,
      relatedSkills: template.relatedSkills,
      whyThis: generateWhyThis(template, ratings),
      status: "Not Started",
    };
    modules.push(module);
  }
  return modules;
}
