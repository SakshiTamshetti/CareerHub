"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Award, Code, Database, Cloud, Brain, Wrench } from "lucide-react"
import Link from "next/link"

const assessments = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "HTML, CSS, JavaScript, React fundamentals",
    icon: Code,
    duration: "30 min",
    questions: 25,
    difficulty: "Intermediate",
    participants: "12.5K",
    passRate: "78%",
    skills: ["HTML/CSS", "JavaScript", "React", "Responsive Design"]
  },
  {
    id: "backend",
    title: "Backend Development", 
    description: "Node.js, Python, API design, databases",
    icon: Database,
    duration: "35 min",
    questions: 30,
    difficulty: "Advanced",
    participants: "8.2K",
    passRate: "65%",
    skills: ["Node.js", "Python", "REST APIs", "Database Design"]
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    description: "Docker, Kubernetes, AWS, CI/CD pipelines",
    icon: Cloud,
    duration: "40 min", 
    questions: 28,
    difficulty: "Advanced",
    participants: "5.8K",
    passRate: "58%",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"]
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Python, SQL, Machine Learning, Statistics",
    icon: Brain,
    duration: "45 min",
    questions: 32,
    difficulty: "Advanced", 
    participants: "9.1K",
    passRate: "62%",
    skills: ["Python", "SQL", "ML Algorithms", "Statistics"]
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    description: "Complete web development stack assessment",
    icon: Wrench,
    duration: "50 min",
    questions: 35,
    difficulty: "Expert",
    participants: "4.2K", 
    passRate: "45%",
    skills: ["Frontend", "Backend", "Database", "Deployment"]
  }
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "Advanced": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    case "Expert": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export default function AssessmentGrid() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Assessment</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select from our comprehensive skill assessments designed by industry experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment) => {
            const IconComponent = assessment.icon
            return (
              <Card key={assessment.id} className="glassmorphic hover:scale-105 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className="w-8 h-8 text-primary" />
                    <Badge className={getDifficultyColor(assessment.difficulty)}>
                      {assessment.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{assessment.title}</CardTitle>
                  <CardDescription>{assessment.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {assessment.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {assessment.participants}
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {assessment.passRate}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1">
                    {assessment.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Questions count */}
                  <p className="text-sm text-muted-foreground">
                    {assessment.questions} questions • Pass score: 70%
                  </p>

                  {/* CTA Button */}
                  <Link href={`/assessments/${assessment.id}`}>
                    <Button className="w-full glassmorphic-button-primary group-hover:scale-105 transition-transform">
                      Start Assessment
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}