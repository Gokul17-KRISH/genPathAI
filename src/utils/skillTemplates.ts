import { CertificationGoal } from "../types";

export interface SkillTemplate {
  skill: string;
  description: string;
  learnUrl: string;
}

const skillsByGoal: Record<string, SkillTemplate[]> = {
  "Microsoft Azure Fundamentals": [
    { skill: "Cloud Basics", description: "Understanding cloud computing concepts, benefits, and service models", learnUrl: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-cloud-computing/" },
    { skill: "Azure Core Services", description: "Knowledge of compute, storage, networking, and database services", learnUrl: "https://learn.microsoft.com/en-us/azure/?product=featured" },
    { skill: "Identity & Security", description: "Azure AD, authentication, authorization, and security best practices", learnUrl: "https://learn.microsoft.com/en-us/azure/security/fundamentals/identity-management-overview" },
    { skill: "Networking", description: "Virtual networks, load balancers, VPN, and network security", learnUrl: "https://learn.microsoft.com/en-us/azure/networking/fundamentals/networking-overview" },
    { skill: "Cost Management", description: "Pricing models, cost optimization, and Azure billing", learnUrl: "https://learn.microsoft.com/en-us/azure/cost-management-billing/cost-management/overview" },
  ],
  "AWS Solutions Architect": [
    { skill: "AWS Core Services", description: "EC2, S3, RDS, and foundational AWS services", learnUrl: "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/introduction.html" },
    { skill: "Architecture Design", description: "Designing scalable, resilient, and cost-effective architectures", learnUrl: "https://aws.amazon.com/architecture/" },
    { skill: "Security & Compliance", description: "IAM, encryption, and AWS security best practices", learnUrl: "https://aws.amazon.com/compliance/" },
    { skill: "Networking", description: "VPC, Route 53, CloudFront, and network design", learnUrl: "https://aws.amazon.com/vpc/" },
    { skill: "Serverless", description: "Lambda, API Gateway, and event-driven architecture", learnUrl: "https://aws.amazon.com/serverless/" },
  ],
  "Google Cloud Professional": [
    { skill: "GCP Core Services", description: "Compute Engine, Cloud Storage, and BigQuery fundamentals", learnUrl: "https://cloud.google.com/docs/overview" },
    { skill: "Cloud Architecture", description: "Designing solutions on Google Cloud Platform", learnUrl: "https://cloud.google.com/architecture" },
    { skill: "Security & IAM", description: "Identity management and security controls in GCP", learnUrl: "https://cloud.google.com/iam/docs" },
    { skill: "Data & Analytics", description: "BigQuery, Dataflow, and data processing pipelines", learnUrl: "https://cloud.google.com/solutions/big-data" },
    { skill: "Kubernetes & GKE", description: "Container orchestration with Google Kubernetes Engine", learnUrl: "https://cloud.google.com/kubernetes-engine/docs" },
  ],
  "Kubernetes CKA": [
    { skill: "Container Basics", description: "Docker fundamentals and containerization concepts", learnUrl: "https://www.docker.com/resources/what-container" },
    { skill: "Kubernetes Architecture", description: "Cluster components, nodes, and control plane", learnUrl: "https://kubernetes.io/docs/concepts/architecture/" },
    { skill: "Workload Management", description: "Pods, deployments, services, and scaling", learnUrl: "https://kubernetes.io/docs/concepts/workloads/" },
    { skill: "Networking", description: "Service discovery, ingress, and network policies", learnUrl: "https://kubernetes.io/docs/concepts/cluster-administration/networking/" },
    { skill: "Storage & Security", description: "Persistent volumes, RBAC, and secrets management", learnUrl: "https://kubernetes.io/docs/concepts/storage/" },
  ],
  "Data Science (TensorFlow Developer)": [
    { skill: "Python Programming", description: "Python fundamentals and data manipulation", learnUrl: "https://www.python.org/about/gettingstarted/" },
    { skill: "NumPy & Pandas", description: "Data processing and numerical computing", learnUrl: "https://numpy.org/doc/stable/user/absolute_beginners.html" },
    { skill: "ML Fundamentals", description: "Supervised/unsupervised learning and model evaluation", learnUrl: "https://developers.google.com/machine-learning/crash-course" },
    { skill: "Neural Networks", description: "Deep learning concepts and architectures", learnUrl: "https://www.tensorflow.org/tutorials/keras/classification" },
    { skill: "TensorFlow", description: "Building and training models with TensorFlow/Keras", learnUrl: "https://www.tensorflow.org/learn" },
  ],
  "Full-Stack Web Developer": [
    { skill: "HTML & CSS", description: "Semantic markup and modern CSS techniques", learnUrl: "https://developer.mozilla.org/en-US/docs/Learn/HTML" },
    { skill: "JavaScript", description: "ES6+, async programming, and DOM manipulation", learnUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { skill: "React", description: "Component architecture, hooks, and state management", learnUrl: "https://react.dev/learn" },
    { skill: "Node.js", description: "Server-side JavaScript and Express framework", learnUrl: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs" },
    { skill: "Databases", description: "SQL, NoSQL, and data modeling", learnUrl: "https://www.mongodb.com/databases/what-is-a-database" },
  ],
  "Cybersecurity (Security+)": [
    { skill: "Network Security", description: "Firewalls, IDS/IPS, and network defense", learnUrl: "https://www.cisco.com/c/en/us/products/security/what-is-network-security.html" },
    { skill: "Threats & Vulnerabilities", description: "Attack vectors, malware, and threat assessment", learnUrl: "https://www.crowdstrike.com/cybersecurity-101/threats-vulnerabilities-and-risks/" },
    { skill: "Cryptography", description: "Encryption, PKI, and secure communications", learnUrl: "https://www.ibm.com/topics/cryptography" },
    { skill: "Identity Management", description: "Authentication, authorization, and access control", learnUrl: "https://www.okta.com/identity-101/what-is-identity-management/" },
    { skill: "Risk Management", description: "Security policies, compliance, and incident response", learnUrl: "https://www.nist.gov/cyberframework" },
  ],
};

export function getSkillsForGoal(goal: CertificationGoal | ""): SkillTemplate[] {
  return skillsByGoal[goal] || skillsByGoal["Full-Stack Web Developer"];
}

export function getSkillTemplates() {
  return skillsByGoal;
}
