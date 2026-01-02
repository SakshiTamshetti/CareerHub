// Question bank for different assessments
export interface Question {
  question: string;
  options: string[];
  correct: string;
}

export interface QuestionBank {
  [key: string]: Question[];
}

export const questionBank: QuestionBank = {
  frontend: [
    {
      question: "Which CSS property is used to create a flexbox container?",
      options: [
        "display: flex",
        "flex-direction: row", 
        "justify-content: center",
        "align-items: center"
      ],
      correct: "A"
    },
    {
      question: "What is the correct way to create a React functional component?",
      options: [
        "function MyComponent() { return <div>Hello</div>; }",
        "const MyComponent = () => { return <div>Hello</div>; }",
        "Both A and B are correct",
        "class MyComponent extends Component { render() { return <div>Hello</div>; } }"
      ],
      correct: "C"
    },
    {
      question: "Which HTML5 semantic element should be used for the main content area?",
      options: [
        "<section>",
        "<article>",
        "<main>",
        "<div>"
      ],
      correct: "C"
    },
    {
      question: "What does the 'useState' hook return in React?",
      options: [
        "A single value",
        "An array with two elements: state value and setter function",
        "An object with state properties",
        "A function to update state"
      ],
      correct: "B"
    },
    {
      question: "Which CSS unit is relative to the viewport width?",
      options: [
        "px",
        "em",
        "rem", 
        "vw"
      ],
      correct: "D"
    }
  ],
  
  backend: [
    {
      question: "What is the purpose of middleware in Express.js?",
      options: [
        "To handle database connections",
        "To execute code between request and response",
        "To render HTML templates",
        "To manage user sessions only"
      ],
      correct: "B"
    },
    {
      question: "Which HTTP status code indicates a successful POST request that created a resource?",
      options: [
        "200 OK",
        "201 Created",
        "204 No Content",
        "202 Accepted"
      ],
      correct: "B"
    },
    {
      question: "What is the difference between SQL and NoSQL databases?",
      options: [
        "SQL databases are faster",
        "NoSQL databases use structured query language",
        "SQL databases use structured schemas, NoSQL databases are schema-flexible",
        "There is no difference"
      ],
      correct: "C"
    },
    {
      question: "Which Python framework is commonly used for building REST APIs?",
      options: [
        "Django",
        "Flask",
        "FastAPI",
        "All of the above"
      ],
      correct: "D"
    },
    {
      question: "What is the purpose of JWT (JSON Web Tokens)?",
      options: [
        "To store user passwords",
        "To securely transmit information between parties",
        "To encrypt database connections",
        "To compress JSON data"
      ],
      correct: "B"
    }
  ],

  devops: [
    {
      question: "What is the main purpose of Docker containers?",
      options: [
        "To replace virtual machines entirely",
        "To package applications with their dependencies for consistent deployment",
        "To manage database connections",
        "To monitor application performance"
      ],
      correct: "B"
    },
    {
      question: "In Kubernetes, what is a Pod?",
      options: [
        "A cluster of nodes",
        "The smallest deployable unit that can contain one or more containers",
        "A type of storage volume",
        "A network configuration"
      ],
      correct: "B"
    },
    {
      question: "What does CI/CD stand for?",
      options: [
        "Continuous Integration/Continuous Deployment",
        "Container Integration/Container Deployment", 
        "Code Integration/Code Deployment",
        "Cloud Integration/Cloud Deployment"
      ],
      correct: "A"
    },
    {
      question: "Which AWS service is used for serverless computing?",
      options: [
        "EC2",
        "S3",
        "Lambda",
        "RDS"
      ],
      correct: "C"
    },
    {
      question: "What is Infrastructure as Code (IaC)?",
      options: [
        "Writing application code for infrastructure",
        "Managing infrastructure through machine-readable definition files",
        "Coding directly on servers",
        "Using only cloud services"
      ],
      correct: "B"
    }
  ],

  "data-science": [
    {
      question: "Which Python library is primarily used for data manipulation and analysis?",
      options: [
        "NumPy",
        "Pandas", 
        "Matplotlib",
        "Scikit-learn"
      ],
      correct: "B"
    },
    {
      question: "What is the difference between supervised and unsupervised learning?",
      options: [
        "Supervised learning uses labeled data, unsupervised learning uses unlabeled data",
        "Supervised learning is faster",
        "Unsupervised learning is more accurate",
        "There is no difference"
      ],
      correct: "A"
    },
    {
      question: "Which SQL command is used to retrieve data from a database?",
      options: [
        "INSERT",
        "UPDATE",
        "SELECT",
        "DELETE"
      ],
      correct: "C"
    },
    {
      question: "What is overfitting in machine learning?",
      options: [
        "When a model performs well on training data but poorly on new data",
        "When a model is too simple",
        "When there's too much training data",
        "When the model trains too quickly"
      ],
      correct: "A"
    },
    {
      question: "Which measure of central tendency is most affected by outliers?",
      options: [
        "Mean",
        "Median",
        "Mode", 
        "All are equally affected"
      ],
      correct: "A"
    }
  ],

  fullstack: [
    {
      question: "What is the main advantage of using a REST API architecture?",
      options: [
        "It's faster than other architectures",
        "It provides stateless communication and is platform-independent",
        "It only works with JavaScript",
        "It requires less server resources"
      ],
      correct: "B"
    },
    {
      question: "Which database type would be best for storing user relationships in a social media app?",
      options: [
        "Document database (MongoDB)",
        "Graph database (Neo4j)",
        "Key-value store (Redis)",
        "Relational database (PostgreSQL)"
      ],
      correct: "B"
    },
    {
      question: "What is the purpose of a load balancer in web architecture?",
      options: [
        "To store user sessions",
        "To distribute incoming requests across multiple servers",
        "To compress web assets",
        "To handle database connections"
      ],
      correct: "B"
    },
    {
      question: "Which caching strategy involves storing frequently accessed data in memory?",
      options: [
        "Database caching",
        "Browser caching",
        "In-memory caching",
        "CDN caching"
      ],
      correct: "C"
    },
    {
      question: "What is the main benefit of using microservices architecture?",
      options: [
        "Easier to develop initially",
        "Better scalability and independent deployment of services",
        "Requires fewer developers",
        "Uses less server resources"
      ],
      correct: "B"
    }
  ]
}