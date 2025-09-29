export const ROLE_REQUIREMENTS = {
  "AI/ML Engineer": [
    "Python", "PyTorch", "TensorFlow", "Machine Learning", "Deep Learning",
    "MLOps", "Scikit-Learn", "NLP", "Computer Vision", "Reinforcement Learning",
    "Hugging Face", "Data Engineering", "Feature Engineering", "AutoML"
  ],
  "Frontend Engineer": [
    "React", "Vue", "Angular", "HTML5", "CSS3", "JavaScript", "TypeScript",
    "Next.js", "Svelte", "Bootstrap", "Tailwind CSS", "GraphQL", "Redux",
    "WebAssembly", "Three.js", "Performance Optimization"
  ],
  "Backend Engineer": [
    "Python", "Java", "Node.js", "REST APIs", "Cloud services", "Kafka",
    "Docker", "GraphQL", "Microservices", "gRPC", "Spring Boot", "FastAPI",
    "SQL & NoSQL Databases", "Redis", "RabbitMQ", "CI/CD"
  ],
  "Data Engineer": [
    "Python", "SQL", "Apache Spark", "Hadoop", "Kafka", "ETL Pipelines",
    "Airflow", "BigQuery", "Redshift", "Data Warehousing", "Snowflake",
    "Azure Data Factory", "GCP", "AWS Glue", "DBT"
  ],
  "DevOps Engineer": [
    "Kubernetes", "Docker", "Terraform", "CI/CD", "AWS", "Azure", "GCP",
    "Jenkins", "Ansible", "Prometheus", "Grafana", "Helm", "Linux Administration",
    "Networking", "Site Reliability Engineering (SRE)"
  ],
  "Full Stack Developer": [
    "JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB",
    "SQL", "HTML5", "CSS3", "RESTful APIs", "Git", "CI/CD", "Cloud",
    "Responsive Design", "Authentication & Authorization"
  ],
  "Data Scientist": [
    "Python", "R", "SQL", "Machine Learning", "Statistics", "Data Visualization",
    "Pandas", "NumPy", "Scikit-learn", "Jupyter", "Hypothesis Testing",
    "Experimental Design", "Feature Engineering", "Model Evaluation"
  ]
} as const;

export const SCORING_CRITERIA = {
  EXCELLENT: { min: 85, label: "Excellent", color: "success" },
  GOOD: { min: 70, label: "Good", color: "primary" },
  FAIR: { min: 55, label: "Fair", color: "warning" },
  POOR: { min: 0, label: "Needs Improvement", color: "destructive" }
} as const;

export const DEFAULT_CUTOFF_SCORE = 75;

export const EMAIL_TEMPLATES = {
  SELECTED: {
    subject: "🎉 Congratulations! You've been shortlisted",
    template: (candidateName: string, role: string, score: number) => `
Dear ${candidateName},

🎉 Congratulations! We are pleased to inform you that your resume has been successfully shortlisted for the ${role} position.

Your application scored ${score}% in our AI-powered resume analysis, which exceeds our selection criteria. Our team was impressed by your qualifications and experience.

Next Steps:
• Our hiring team will contact you within 2-3 business days
• Please prepare for technical and behavioral interview rounds
• We'll send you detailed information about the role and interview process

We look forward to discussing this exciting opportunity with you!

Best regards,
The Hiring Team`
  },
  REJECTED: {
    subject: "Thank you for your application",
    template: (candidateName: string, role: string, score: number) => `
Dear ${candidateName},

Thank you for your interest in the ${role} position and for taking the time to submit your application.

After careful review of your qualifications, we have decided to move forward with other candidates whose experience more closely aligns with our current requirements.

Your application scored ${score}% in our assessment. While this doesn't meet our current threshold, we encourage you to:
• Continue developing skills in areas that would strengthen your candidacy
• Apply for future openings that may be a better fit
• Keep your resume updated with new experiences and skills

We appreciate your interest in our company and wish you the best of luck in your career journey.

Best regards,
The Hiring Team`
  }
} as const;