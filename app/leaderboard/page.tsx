"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp, Calendar } from "lucide-react"

// Mock leaderboard data
const topPerformers = [
  {
    rank: 1,
    name: "Sarah Chen",
    avatar: "/placeholder-user.jpg",
    score: 98,
    assessments: 12,
    certificates: 8,
    specialty: "Full Stack"
  },
  {
    rank: 2, 
    name: "Alex Rodriguez",
    avatar: "/placeholder-user.jpg",
    score: 96,
    assessments: 10,
    certificates: 7,
    specialty: "DevOps"
  },
  {
    rank: 3,
    name: "Emily Johnson",
    avatar: "/placeholder-user.jpg", 
    score: 94,
    assessments: 15,
    certificates: 9,
    specialty: "Data Science"
  }
]

const monthlyLeaders = [
  { name: "Michael Park", score: 97, assessment: "Backend Development" },
  { name: "Lisa Wang", score: 95, assessment: "Frontend Development" },
  { name: "David Kim", score: 93, assessment: "DevOps & Cloud" },
  { name: "Anna Smith", score: 91, assessment: "Data Science" },
  { name: "John Doe", score: 89, assessment: "Full Stack" }
]

const achievements = [
  { icon: Trophy, title: "Perfect Score", description: "Achieved 100% on any assessment", count: 234 },
  { icon: Medal, title: "Speed Demon", description: "Completed assessment in under 15 minutes", count: 156 },
  { icon: Award, title: "Multi-Skilled", description: "Passed 5+ different assessments", count: 89 },
  { icon: TrendingUp, title: "Consistent Performer", description: "Maintained 90%+ average across all assessments", count: 67 }
]

export default function LeaderboardPage() {
  return (
    <main className="bg-background min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 glassmorphic">
            <Trophy className="w-4 h-4 mr-2" />
            Global Rankings
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Leaderboard
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            See how you rank against top performers worldwide
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Top Performers */}
          <div className="lg:col-span-2">
            <Card className="glassmorphic mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {topPerformers.map((performer) => (
                  <div key={performer.rank} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                      {performer.rank}
                    </div>
                    
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={performer.avatar} />
                      <AvatarFallback>{performer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="font-semibold">{performer.name}</div>
                      <div className="text-sm text-muted-foreground">{performer.specialty} Specialist</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{performer.score}%</div>
                      <div className="text-xs text-muted-foreground">
                        {performer.certificates}/{performer.assessments} certified
                      </div>
                    </div>
                    
                    {performer.rank <= 3 && (
                      <div className="ml-2">
                        {performer.rank === 1 && <Trophy className="w-6 h-6 text-yellow-500" />}
                        {performer.rank === 2 && <Medal className="w-6 h-6 text-gray-400" />}
                        {performer.rank === 3 && <Award className="w-6 h-6 text-amber-600" />}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Monthly Leaders */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  This Month's Leaders
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {monthlyLeaders.map((leader, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <div>
                        <div className="font-medium">{leader.name}</div>
                        <div className="text-sm text-muted-foreground">{leader.assessment}</div>
                      </div>
                    </div>
                    <Badge variant="secondary">{leader.score}%</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Achievements & Stats */}
          <div className="space-y-6">
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <IconComponent className="w-5 h-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{achievement.title}</div>
                        <div className="text-xs text-muted-foreground mb-1">{achievement.description}</div>
                        <Badge variant="outline" className="text-xs">{achievement.count} earned</Badge>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Global Stats */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Global Stats</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <div className="text-2xl font-bold text-primary">50,247</div>
                  <div className="text-sm text-muted-foreground">Total Assessments Taken</div>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <div className="text-2xl font-bold text-primary">32,156</div>
                  <div className="text-sm text-muted-foreground">Certificates Issued</div>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <div className="text-2xl font-bold text-primary">78%</div>
                  <div className="text-sm text-muted-foreground">Average Pass Rate</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}