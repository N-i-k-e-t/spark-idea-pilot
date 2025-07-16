import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { 
  MessageCircle, 
  FileText, 
  Grid3x3, 
  Lightbulb, 
  Calendar,
  BarChart3,
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp
} from "lucide-react"

const quickActions = [
  { title: "Start Idea Capture", icon: MessageCircle, path: "/chat", color: "bg-blue-500", description: "Begin with AI-guided ideation" },
  { title: "Define Problems", icon: FileText, path: "/problems", color: "bg-green-500", description: "Identify key problem statements" },
  { title: "Ideation Canvas", icon: Grid3x3, path: "/canvas", color: "bg-purple-500", description: "Organize and cluster ideas" },
  { title: "Business Model", icon: Lightbulb, path: "/business-model", color: "bg-orange-500", description: "Map your business model" }
]

const recentActivity = [
  { title: "Problem Statement Updated", time: "2 hours ago", type: "edit" },
  { title: "New Ideas Added to Canvas", time: "5 hours ago", type: "create" },
  { title: "Business Model Exported", time: "1 day ago", type: "export" },
  { title: "Campaign Calendar Updated", time: "2 days ago", type: "update" }
]

export function HomePage() {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Welcome to AI Co-Pilot
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your intelligent companion for startup ideation, validation, and growth. 
            Let AI guide you from initial concept to market success.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action) => (
            <Link key={action.path} to={action.path}>
              <Card className="hover:shadow-lg transition-all duration-300 glow h-full">
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    Get Started <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Idea Development</h3>
                  <p className="text-sm text-muted-foreground">Problem statements and ideation</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-sm font-medium">75%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Business Model</h3>
                  <p className="text-sm text-muted-foreground">Canvas completion and validation</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm font-medium">60%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Go-to-Market</h3>
                  <p className="text-sm text-muted-foreground">Campaign planning and execution</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <span className="text-sm font-medium">40%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}