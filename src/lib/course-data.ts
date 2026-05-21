export type Course = {
  id: string;
  title: string;
  provider: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  hours: number;
  rating: number;
  learners: string;
  price: number;
  image: string;
  description: string;
  skills: string[];
  prerequisites?: string[];
  nextCourseIds?: string[];
};

const img = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=800&q=70`;

export const INTERESTS = [
  "Data Science",
  "Machine Learning",
  "Web Development",
  "Mobile Development",
  "Cloud Computing",
  "Cybersecurity",
  "AI & Deep Learning",
  "Business & Management",
  "Design & UX",
  "Marketing",
  "Finance",
  "Personal Development",
] as const;

export const COURSES: Course[] = [
  { id: "py-101", title: "Python for Everybody", provider: "University of Michigan", category: "Data Science", level: "Beginner", hours: 32, rating: 4.8, learners: "3.2M", price: 49, image: img("photo-1526379095098-d400fd0bf935"), description: "Start your programming journey with Python — variables, loops, functions and data structures, taught from absolute zero.", skills: ["Python", "Programming Basics"], nextCourseIds: ["ds-201", "ml-301"] },
  { id: "ds-201", title: "Data Science Foundations", provider: "IBM", category: "Data Science", level: "Intermediate", hours: 48, rating: 4.7, learners: "1.1M", price: 69, image: img("photo-1551288049-bebda4e38f71"), description: "Pandas, NumPy, data cleaning, and exploratory analysis. Build your first end-to-end notebook.", skills: ["Pandas", "NumPy", "EDA"], prerequisites: ["py-101"], nextCourseIds: ["ml-301", "ds-401"] },
  { id: "ml-301", title: "Machine Learning Specialization", provider: "Stanford / DeepLearning.AI", category: "Machine Learning", level: "Intermediate", hours: 60, rating: 4.9, learners: "5.6M", price: 79, image: img("photo-1555949963-aa79dcee981c"), description: "Andrew Ng's classic: linear & logistic regression, neural nets, recommender systems.", skills: ["scikit-learn", "Regression", "Neural Nets"], prerequisites: ["py-101"], nextCourseIds: ["dl-401"] },
  { id: "dl-401", title: "Deep Learning Specialization", provider: "DeepLearning.AI", category: "AI & Deep Learning", level: "Advanced", hours: 90, rating: 4.9, learners: "900k", price: 99, image: img("photo-1620712943543-bcc4688e7485"), description: "CNNs, RNNs, Transformers, and how to ship real models.", skills: ["TensorFlow", "PyTorch", "CNN", "Transformers"], prerequisites: ["ml-301"] },
  { id: "ds-401", title: "Applied Data Science Capstone", provider: "IBM", category: "Data Science", level: "Advanced", hours: 40, rating: 4.6, learners: "320k", price: 89, image: img("photo-1460925895917-afdab827c52f"), description: "Real-world capstone: scrape, clean, model and present.", skills: ["Capstone", "Storytelling", "ML Ops"], prerequisites: ["ds-201"] },

  { id: "web-101", title: "HTML, CSS & Modern Web", provider: "Meta", category: "Web Development", level: "Beginner", hours: 28, rating: 4.7, learners: "800k", price: 49, image: img("photo-1517180102446-f3ece451e9d8"), description: "Build responsive websites with semantic HTML5, Flexbox and Grid.", skills: ["HTML", "CSS", "Responsive"], nextCourseIds: ["web-201"] },
  { id: "web-201", title: "React — The Complete Guide", provider: "Meta", category: "Web Development", level: "Intermediate", hours: 52, rating: 4.8, learners: "2.1M", price: 69, image: img("photo-1633356122544-f134324a6cee"), description: "Hooks, state, routing, testing — everything for a modern React app.", skills: ["React", "Hooks", "Routing"], prerequisites: ["web-101"], nextCourseIds: ["web-301"] },
  { id: "web-301", title: "Full-Stack with Node & Postgres", provider: "Johns Hopkins", category: "Web Development", level: "Advanced", hours: 64, rating: 4.7, learners: "410k", price: 89, image: img("photo-1542831371-29b0f74f9713"), description: "REST, GraphQL, auth, deploys and observability.", skills: ["Node.js", "Express", "Postgres"], prerequisites: ["web-201"] },

  { id: "mob-101", title: "iOS App Development with Swift", provider: "University of Toronto", category: "Mobile Development", level: "Beginner", hours: 36, rating: 4.6, learners: "240k", price: 59, image: img("photo-1592434134753-a70baf7979d5"), description: "Build your first SwiftUI app and ship it to TestFlight.", skills: ["Swift", "SwiftUI"] },
  { id: "mob-201", title: "Android Development with Kotlin", provider: "Google", category: "Mobile Development", level: "Intermediate", hours: 44, rating: 4.7, learners: "510k", price: 69, image: img("photo-1607252650355-f7fd0460ccdb"), description: "Jetpack Compose, Room, MVVM — modern Android.", skills: ["Kotlin", "Jetpack Compose"] },
  { id: "mob-301", title: "React Native: Cross-Platform Apps", provider: "Meta", category: "Mobile Development", level: "Advanced", hours: 40, rating: 4.6, learners: "330k", price: 79, image: img("photo-1512941937669-90a1b58e7e9c"), description: "One codebase, two platforms — animations, native modules and EAS.", skills: ["React Native", "Expo"] },

  { id: "cld-101", title: "AWS Cloud Practitioner", provider: "Amazon Web Services", category: "Cloud Computing", level: "Beginner", hours: 24, rating: 4.7, learners: "1.4M", price: 49, image: img("photo-1451187580459-43490279c0fa"), description: "Foundations of cloud and AWS services. Prep for CCP exam.", skills: ["AWS", "Cloud Basics"] },
  { id: "cld-201", title: "Architecting on AWS", provider: "AWS", category: "Cloud Computing", level: "Intermediate", hours: 50, rating: 4.8, learners: "620k", price: 89, image: img("photo-1558494949-ef010cbdcc31"), description: "Design fault-tolerant, secure cloud architectures.", skills: ["VPC", "EC2", "S3", "Architecture"] },
  { id: "cld-301", title: "DevOps on Google Cloud", provider: "Google Cloud", category: "Cloud Computing", level: "Advanced", hours: 55, rating: 4.7, learners: "280k", price: 99, image: img("photo-1518770660439-4636190af475"), description: "CI/CD, IaC, observability and SRE on GCP.", skills: ["GCP", "Terraform", "CI/CD"] },

  { id: "sec-101", title: "Cybersecurity Fundamentals", provider: "Google", category: "Cybersecurity", level: "Beginner", hours: 30, rating: 4.7, learners: "900k", price: 49, image: img("photo-1550751827-4bd374c3f58b"), description: "Threats, controls and security mindset for everyone.", skills: ["Security Basics", "Risk"] },
  { id: "sec-201", title: "Ethical Hacking & Pentesting", provider: "EC-Council", category: "Cybersecurity", level: "Intermediate", hours: 60, rating: 4.6, learners: "210k", price: 99, image: img("photo-1563013544-824ae1b704d3"), description: "Recon, exploitation, post-exploitation — legally.", skills: ["Kali", "Burp", "Metasploit"] },
  { id: "sec-301", title: "Cloud Security Architecture", provider: "ISC2", category: "Cybersecurity", level: "Advanced", hours: 45, rating: 4.7, learners: "140k", price: 109, image: img("photo-1614064641938-3bbee52942c7"), description: "Zero-trust, IAM, encryption and compliance for cloud-native systems.", skills: ["IAM", "Encryption", "Compliance"] },

  { id: "ai-201", title: "Generative AI with LLMs", provider: "DeepLearning.AI", category: "AI & Deep Learning", level: "Intermediate", hours: 30, rating: 4.9, learners: "1.8M", price: 79, image: img("photo-1677442136019-21780ecad995"), description: "How transformers and LLMs work — fine-tuning, RAG and evaluation.", skills: ["LLMs", "RAG", "Prompting"] },
  { id: "ai-301", title: "MLOps Specialization", provider: "DeepLearning.AI", category: "AI & Deep Learning", level: "Advanced", hours: 70, rating: 4.7, learners: "260k", price: 99, image: img("photo-1535378917042-10a22c95931a"), description: "Ship ML to prod: pipelines, monitoring, drift, rollback.", skills: ["MLOps", "CI/CD", "Monitoring"] },

  { id: "biz-101", title: "Business Strategy Foundations", provider: "Wharton", category: "Business & Management", level: "Beginner", hours: 25, rating: 4.7, learners: "500k", price: 59, image: img("photo-1454165804606-c3d57bc86b40"), description: "Competitive advantage, value chains and strategic frameworks.", skills: ["Strategy", "Analysis"] },
  { id: "biz-201", title: "Project Management Professional", provider: "Google", category: "Business & Management", level: "Intermediate", hours: 60, rating: 4.8, learners: "1.2M", price: 79, image: img("photo-1552664730-d307ca884978"), description: "Agile, Scrum, and stakeholder management.", skills: ["Agile", "Scrum", "PMP"] },
  { id: "biz-301", title: "Executive Leadership", provider: "Yale", category: "Business & Management", level: "Advanced", hours: 35, rating: 4.7, learners: "180k", price: 109, image: img("photo-1521737711867-e3b97375f902"), description: "Lead teams through ambiguity and change.", skills: ["Leadership", "Coaching"] },

  { id: "ux-101", title: "UX Design Fundamentals", provider: "Google", category: "Design & UX", level: "Beginner", hours: 40, rating: 4.8, learners: "1.5M", price: 49, image: img("photo-1561070791-2526d30994b8"), description: "Research, wireframes, prototypes and usability testing.", skills: ["Figma", "Wireframing", "Research"] },
  { id: "ux-201", title: "Interaction Design", provider: "California Institute of the Arts", category: "Design & UX", level: "Intermediate", hours: 32, rating: 4.7, learners: "380k", price: 69, image: img("photo-1545235617-9465d2a55698"), description: "Motion, micro-interactions and design systems.", skills: ["Motion", "Design Systems"] },
  { id: "ux-301", title: "Advanced Product Design", provider: "IDEO U", category: "Design & UX", level: "Advanced", hours: 28, rating: 4.6, learners: "120k", price: 89, image: img("photo-1581291518633-83b4ebd1d83e"), description: "From insight to shipped product — the full design loop.", skills: ["Product Thinking", "Prototyping"] },

  { id: "mkt-101", title: "Digital Marketing Foundations", provider: "Illinois", category: "Marketing", level: "Beginner", hours: 28, rating: 4.6, learners: "700k", price: 49, image: img("photo-1432888622747-4eb9a8efeb07"), description: "Channels, funnels and the modern marketing stack.", skills: ["SEO", "Ads", "Analytics"] },
  { id: "mkt-201", title: "SEO & Content Strategy", provider: "UC Davis", category: "Marketing", level: "Intermediate", hours: 30, rating: 4.7, learners: "320k", price: 69, image: img("photo-1460925895917-afdab827c52f"), description: "Rank, write and grow organic traffic.", skills: ["SEO", "Content"] },
  { id: "mkt-301", title: "Growth Marketing Analytics", provider: "Northwestern", category: "Marketing", level: "Advanced", hours: 36, rating: 4.7, learners: "180k", price: 89, image: img("photo-1611224923853-80b023f02d71"), description: "Cohorts, attribution and experimentation at scale.", skills: ["Analytics", "Experimentation"] },

  { id: "fin-101", title: "Financial Markets", provider: "Yale", category: "Finance", level: "Beginner", hours: 33, rating: 4.8, learners: "1.8M", price: 49, image: img("photo-1554224155-6726b3ff858f"), description: "How markets work — by Nobel laureate Robert Shiller.", skills: ["Markets", "Risk"] },
  { id: "fin-201", title: "Corporate Finance Essentials", provider: "IESE", category: "Finance", level: "Intermediate", hours: 30, rating: 4.7, learners: "420k", price: 69, image: img("photo-1579621970795-87facc2f976d"), description: "Valuation, capital structure and decisions that matter.", skills: ["DCF", "Valuation"] },
  { id: "fin-301", title: "Investment Management", provider: "Geneva", category: "Finance", level: "Advanced", hours: 50, rating: 4.7, learners: "210k", price: 99, image: img("photo-1611974789855-9c2a0a7236a3"), description: "Portfolio theory and real-world investing.", skills: ["Portfolio", "Asset Allocation"] },

  { id: "pd-101", title: "Learning How to Learn", provider: "UC San Diego", category: "Personal Development", level: "Beginner", hours: 15, rating: 4.9, learners: "4.0M", price: 0, image: img("photo-1481627834876-b7833e8f5570"), description: "Practical techniques to learn anything faster.", skills: ["Study", "Productivity"] },
  { id: "pd-201", title: "The Science of Well-Being", provider: "Yale", category: "Personal Development", level: "Beginner", hours: 20, rating: 4.9, learners: "4.8M", price: 0, image: img("photo-1499209974431-9dddcece7f88"), description: "Laurie Santos' most-loved Yale course — happiness, evidence-based.", skills: ["Habits", "Wellbeing"] },
  { id: "pd-301", title: "Mindshift", provider: "McMaster", category: "Personal Development", level: "Intermediate", hours: 18, rating: 4.8, learners: "1.1M", price: 39, image: img("photo-1506905925346-21bda4d32df4"), description: "Break through obstacles and change your career.", skills: ["Career", "Growth"] },
];

export const UNIVERSITIES = [
  { name: "Stanford University", country: "USA", degrees: ["MS Computer Science", "MS Data Science"], image: img("photo-1562774053-701939374585") },
  { name: "Yale University", country: "USA", degrees: ["MBA", "MS Management"], image: img("photo-1607237138185-eedd9c632b0b") },
  { name: "Imperial College London", country: "UK", degrees: ["MSc Machine Learning", "MSc Cloud Computing"], image: img("photo-1543165796-5426273eaab3") },
  { name: "University of Michigan", country: "USA", degrees: ["MS Applied Data Science"], image: img("photo-1498243691581-b145c3f54a5a") },
  { name: "University of Illinois", country: "USA", degrees: ["MBA", "MCS"], image: img("photo-1574958269340-fa927503f3dd") },
  { name: "University of London", country: "UK", degrees: ["BSc Computer Science"], image: img("photo-1568667256549-094345857637") },
];

export const TRENDING = [
  "Generative AI", "LLM Engineering", "Prompt Engineering", "MLOps",
  "Cloud Security", "Data Engineering", "Product Design", "Growth Analytics",
];

export const PLANS = [
  { id: "free", name: "Explorer", price: 0, period: "forever", features: ["Browse all courses", "1 free course/month", "Community access"], highlight: false },
  { id: "plus", name: "Learner Plus", price: 39, period: "month", features: ["Unlimited courses", "Verified certificates", "Hands-on projects", "Priority support"], highlight: true },
  { id: "pro", name: "Career Pro", price: 89, period: "month", features: ["Everything in Plus", "1:1 mentorship", "Degree pathways", "Career coaching"], highlight: false },
];

export const FAQS = [
  { q: "How are course recommendations generated?", a: "We match your interests, current skills and certificates against course prerequisites and progression paths to suggest the next best step." },
  { q: "Are the certificates recognized?", a: "All certificates are issued by partner universities and employers and are shareable on LinkedIn." },
  { q: "Can I change my interests later?", a: "Yes — open the Interests page anytime to update them and your home feed updates instantly." },
  { q: "Do I need to pay to start?", a: "No. The Explorer plan is free forever, with one paid course per month included for free." },
  { q: "How does the recommendation engine work?", a: "We build a directed graph of skills → courses → next courses. Your profile becomes a node and we BFS the highest-rated unmet skills." },
];

export function recommend(interests: string[], completedIds: string[] = []) {
  const completed = new Set(completedIds);
  const interested = COURSES.filter((c) => interests.includes(c.category) && !completed.has(c.id));
  const advanced = interested.filter((c) => c.level !== "Beginner");
  const rest = COURSES.filter((c) => !interests.includes(c.category));
  return {
    primary: interested.sort((a, b) => b.rating - a.rating).slice(0, 8),
    advanced: advanced.slice(0, 4),
    other: rest.slice(0, 8),
  };
}
