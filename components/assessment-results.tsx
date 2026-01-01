"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Download, Share2, RotateCcw, CheckCircle, XCircle, Clock } from "lucide-react"
import Link from "next/link"

interface AssessmentResultsProps {
  results: {
    score: number
    correctAnswers: number
    totalQuestions: number
    passed: boolean
    timeSpent: number
    answers: Record<number, string>
    questions: any[]
  }
  assessment: any
  assessmentId: string
}

export default function AssessmentResults({ results, assessment, assessmentId }: AssessmentResultsProps) {
  const [showDetailedResults, setShowDetailedResults] = useState(false)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const generateCertificate = () => {
    // This would integrate with a PDF generation library like jsPDF
    alert("Certificate generation feature coming soon!")
  }

  const shareResults = () => {
    const text = `I just completed the ${assessment.title} and scored ${results.score}%! ${results.passed ? '🏆 Certified!' : ''}`
    if (navigator.share) {
      navigator.share({
        title: 'CareerHub Assessment Results',
        text,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(text)
      alert("Results copied to clipboard!")
    }
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Results Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            {results.passed ? (
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                <Trophy className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
            ) : (
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900 mb-4">
                <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
            )}
          </div>
          
          <h1 className="text-4xl font-bold mb-2">
            {results.passed ? "Congratulations!" : "Keep Learning!"}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-4">
            {results.passed 
              ? "You've successfully passed the assessment!" 
              : "You didn't pass this time, but don't give up!"}
          </p>

          <Badge className={`text-lg px-4 py-2 ${results.passed ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
            {results.score}% Score
          </Badge>
        </div>

        {/* Score Overview */}
        <Card className="glassmorphic mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Assessment Results
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Score Progress */}
            <div>
              <div className="flex justify-between mb-2">
                <span>Your Score</span>
                <span className="font-bold">{results.score}%</span>
              </div>
              <Progress value={results.score} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>Pass Score: {assessment.passScore}%</span>
                <span>{results.correctAnswers}/{results.totalQuestions} correct</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-primary">{results.correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-primary">{formatTime(results.timeSpent)}</div>
                <div className="text-sm text-muted-foreground">Time Spent</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-primary">{results.passed ? "PASS" : "FAIL"}</div>
                <div className="text-sm text-muted-foreground">Result</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              {results.passed && (
                <Button onClick={generateCertificate} className="glassmorphic-button-primary">
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
              )}
              
              <Button onClick={shareResults} variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>
              
              <Link href={`/assessments/${assessmentId}`}>
                <Button variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Assessment
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Card className="glassmorphic mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Detailed Results
              <Button 
                variant="ghost" 
                onClick={() => setShowDetailedResults(!showDetailedResults)}
              >
                {showDetailedResults ? "Hide" : "Show"} Details
              </Button>
            </CardTitle>
          </CardHeader>
          
          {showDetailedResults && (
            <CardContent className="space-y-4">
              {results.questions.map((question, index) => {
                const userAnswer = results.answers[index]
                const isCorrect = userAnswer === question.correct
                
                return (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex items-start gap-3 mb-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">Question {index + 1}</h4>
                        <p className="text-muted-foreground mb-3">{question.question}</p>
                        
                        <div className="space-y-2">
                          {question.options.map((option: string, optIndex: number) => {
                            const optionKey = String.fromCharCode(65 + optIndex)
                            const isUserAnswer = userAnswer === optionKey
                            const isCorrectAnswer = question.correct === optionKey
                            
                            return (
                              <div 
                                key={optIndex}
                                className={`p-2 rounded text-sm ${
                                  isCorrectAnswer 
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                                    : isUserAnswer 
                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                    : "bg-muted/50"
                                }`}
                              >
                                <span className="font-semibold">{optionKey}.</span> {option}
                                {isCorrectAnswer && <span className="ml-2 text-xs">(Correct)</span>}
                                {isUserAnswer && !isCorrectAnswer && <span className="ml-2 text-xs">(Your answer)</span>}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          )}
        </Card>

        {/* Next Steps */}
        <Card className="glassmorphic">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {results.passed ? (
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  Great job! You've demonstrated strong skills in {assessment.title.toLowerCase()}. Here's what you can do next:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Add this certificate to your LinkedIn profile</li>
                  <li>• Include it in your resume and job applications</li>
                  <li>• Take more assessments to expand your skill portfolio</li>
                  <li>• Share your achievement with your network</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  Don't worry! Learning is a journey. Here are some suggestions to improve:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Review the questions you got wrong</li>
                  <li>• Study the topics you struggled with</li>
                  <li>• Practice with online resources and tutorials</li>
                  <li>• Retake the assessment when you feel ready</li>
                </ul>
              </div>
            )}
            
            <div className="flex gap-4 pt-4">
              <Link href="/assessments">
                <Button variant="outline">Browse More Assessments</Button>
              </Link>
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}