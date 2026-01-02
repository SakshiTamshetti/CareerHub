"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, ChevronLeft, ChevronRight, Flag } from "lucide-react"
import { questionBank, Question } from "@/lib/question-bank"

interface Assessment {
  duration: number;
  passScore: number;
}

interface QuizInterfaceProps {
  assessmentId: string
  assessment: Assessment
  onComplete: (results: any) => void
}

export default function QuizInterface({ assessmentId, assessment, onComplete }: QuizInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(assessment.duration * 60) // Convert to seconds
  const [questions] = useState<Question[]>(() => questionBank[assessmentId] || [])

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    // Calculate score
    let correctAnswers = 0
    questions.forEach((question: Question, index: number) => {
      if (answers[index] === question.correct) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / questions.length) * 100)
    const passed = score >= assessment.passScore

    const results = {
      score,
      correctAnswers,
      totalQuestions: questions.length,
      passed,
      timeSpent: (assessment.duration * 60) - timeLeft,
      answers,
      questions
    }

    onComplete(results)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const answeredQuestions = Object.keys(answers).length

  if (questions.length === 0) {
    return (
      <div className="py-20 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Questions not available</h2>
        <p className="text-muted-foreground">This assessment is currently being prepared.</p>
      </div>
    )
  }

  const currentQ: Question = questions[currentQuestion]

  return (
    <section className="py-8 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header with timer and progress */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-lg px-4 py-2">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
            <div className="text-sm text-muted-foreground">
              {answeredQuestions} answered
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-lg font-mono">
            <Clock className="w-5 h-5" />
            <span className={timeLeft < 300 ? "text-red-500" : ""}>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Progress bar */}
        <Progress value={progress} className="mb-8" />

        {/* Question Card */}
        <Card className="glassmorphic mb-6">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {currentQ.options.map((option: string, index: number) => {
              const optionKey = String.fromCharCode(65 + index) // A, B, C, D
              const isSelected = answers[currentQuestion] === optionKey
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(optionKey)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    isSelected 
                      ? "border-primary bg-primary/10" 
                      : "border-muted hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-semibold text-primary">{optionKey}.</span>
                    <span>{option}</span>
                  </div>
                </button>
              )
            })}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            {currentQuestion === questions.length - 1 ? (
              <Button 
                onClick={handleSubmit}
                className="glassmorphic-button-primary flex items-center gap-2"
              >
                <Flag className="w-4 h-4" />
                Submit Assessment
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <div className="mt-8 p-4 rounded-lg bg-muted/50">
          <h3 className="text-sm font-semibold mb-3">Question Navigator</h3>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((_, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded text-sm font-semibold transition-colors ${
                  index === currentQuestion
                    ? "bg-primary text-primary-foreground"
                    : answers[index]
                    ? "bg-green-500 text-white"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}