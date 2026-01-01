"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import QuizInterface from "@/components/quiz-interface"
import AssessmentResults from "@/components/assessment-results"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Award, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock assessment data
const assessmentData = {
  frontend: {
    title: "Frontend Development Assessment",
    description: "Test your HTML, CSS, JavaScript, and React skills",
    duration: 30,
    questions: 25,
    passScore: 70,
    difficulty: "Intermediate"
  },
  backend: {
    title: "Backend Development Assessment", 
    description: "Evaluate your Node.js, Python, and API design knowledge",
    duration: 35,
    questions: 30,
    passScore: 70,
    difficulty: "Advanced"
  },
  devops: {
    title: "DevOps & Cloud Assessment",
    description: "Test your Docker, Kubernetes, and AWS expertise",
    duration: 40,
    questions: 28,
    passScore: 70,
    difficulty: "Advanced"
  },
  "data-science": {
    title: "Data Science Assessment",
    description: "Assess your Python, SQL, and Machine Learning skills",
    duration: 45,
    questions: 32,
    passScore: 70,
    difficulty: "Advanced"
  },
  fullstack: {
    title: "Full Stack Development Assessment",
    description: "Complete evaluation of full-stack development skills",
    duration: 50,
    questions: 35,
    passScore: 70,
    difficulty: "Expert"
  }
}

export default function AssessmentPage() {
  const params = useParams()
  const router = useRouter()
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [results, setResults] = useState(null)
  
  const assessmentId = params.id as string
  const assessment = assessmentData[assessmentId as keyof typeof assessmentData]

  if (!assessment) {
    return (
      <main className="bg-background min-h-screen">
        <Header />
        <div className="py-20 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Assessment Not Found</h1>
          <Link href="/assessments">
            <Button>Back to Assessments</Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const handleQuizComplete = (quizResults: any) => {
    setResults(quizResults)
    setQuizCompleted(true)
  }

  if (quizCompleted && results) {
    return (
      <main className="bg-background min-h-screen">
        <Header />
        <AssessmentResults 
          results={results} 
          assessment={assessment}
          assessmentId={assessmentId}
        />
        <Footer />
      </main>
    )
  }

  if (quizStarted) {
    return (
      <main className="bg-background min-h-screen">
        <Header />
        <QuizInterface 
          assessmentId={assessmentId}
          assessment={assessment}
          onComplete={handleQuizComplete}
        />
        <Footer />
      </main>
    )
  }

  return (
    <main className="bg-background min-h-screen">
      <Header />
      
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/assessments" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Assessments
          </Link>

          {/* Assessment Overview */}
          <Card className="glassmorphic mb-8">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-primary/10 text-primary">
                  {assessment.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-3xl mb-2">{assessment.title}</CardTitle>
              <CardDescription className="text-lg">{assessment.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Assessment Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold">{assessment.duration} minutes</div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold">{assessment.questions} questions</div>
                    <div className="text-sm text-muted-foreground">Total Questions</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <Award className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold">{assessment.passScore}% to pass</div>
                    <div className="text-sm text-muted-foreground">Pass Score</div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Instructions</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• You have {assessment.duration} minutes to complete the assessment</li>
                  <li>• Each question has multiple choice answers</li>
                  <li>• You need {assessment.passScore}% or higher to pass and receive a certificate</li>
                  <li>• You can take the assessment multiple times</li>
                  <li>• Make sure you have a stable internet connection</li>
                </ul>
              </div>

              {/* Start Button */}
              <Button 
                onClick={() => setQuizStarted(true)}
                className="w-full glassmorphic-button-primary text-lg py-6"
              >
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}