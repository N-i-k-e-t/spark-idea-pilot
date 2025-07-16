
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Lightbulb, RefreshCw, ArrowRight, Edit3 } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface ProblemStatement {
  id: string
  title: string
  description: string
  domain: string
  impact: "High" | "Medium" | "Low"
  feasibility: "High" | "Medium" | "Low"
}

const domains = [
  "Technology", "Healthcare", "Finance", "Education", "E-commerce", 
  "SaaS", "Mobile Apps", "AI/ML", "Sustainability", "Social Impact"
]

const mockProblemStatements: ProblemStatement[] = [
  {
    id: "1",
    title: "Remote Team Collaboration Inefficiency",
    description: "Teams struggle with maintaining productivity and clear communication when working remotely, leading to project delays and reduced quality.",
    domain: "Technology",
    impact: "High",
    feasibility: "High"
  },
  {
    id: "2", 
    title: "Small Business Digital Transformation Gap",
    description: "Small businesses lack the resources and expertise to effectively digitize their operations and compete with larger corporations.",
    domain: "SaaS",
    impact: "High",
    feasibility: "Medium"
  },
  {
    id: "3",
    title: "Personal Finance Management Complexity",
    description: "Individuals find it difficult to track spending, set budgets, and make informed financial decisions across multiple accounts and platforms.",
    domain: "Finance", 
    impact: "Medium",
    feasibility: "High"
  }
]

export function IdeationPage() {
  const [idea, setIdea] = useState("")
  const [selectedDomain, setSelectedDomain] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>(mockProblemStatements)
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null)
  const [editingProblem, setEditingProblem] = useState<string | null>(null)
  const [showProblems, setShowProblems] = useState(false)
  const navigate = useNavigate()

  const handleGenerateProblems = () => {
    if (!idea.trim()) return
    setShowProblems(true)
    // In real app, this would call AI to generate problems based on the idea
  }

  const handleRegenerateProblems = () => {
    // In real app, this would generate new problem statements
    setProblemStatements([...mockProblemStatements].reverse())
  }

  const handleSelectProblem = (problemId: string) => {
    setSelectedProblem(problemId)
  }

  const handleEditProblem = (problemId: string, newDescription: string) => {
    setProblemStatements(prev => 
      prev.map(p => p.id === problemId ? { ...p, description: newDescription } : p)
    )
    setEditingProblem(null)
  }

  const handleProceedToNextPhase = () => {
    if (selectedProblem) {
      // Store selected problem in state/context
      navigate('/opportunity')
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // In real app, implement voice recording functionality
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-red-100 text-red-800 border-red-200"
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default: return "bg-green-100 text-green-800 border-green-200"
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Phase 1: Ideation & Problem Definition
        </h1>
        <p className="text-muted-foreground">
          Start by capturing your raw idea or describing the problem you want to solve
        </p>
      </div>

      {!showProblems ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Capture Your Idea
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Domain (Optional)</label>
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a domain or industry" />
                </SelectTrigger>
                <SelectContent>
                  {domains.map(domain => (
                    <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Your Idea or Problem</label>
              <div className="relative">
                <Textarea
                  placeholder="Describe your idea, the problem you've noticed, or keywords related to what you want to solve..."
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  className="min-h-32 pr-12"
                />
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  size="sm"
                  className="absolute bottom-2 right-2"
                  onClick={toggleRecording}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
              {isRecording && (
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  Recording... Speak your idea
                </p>
              )}
            </div>

            <Button 
              onClick={handleGenerateProblems}
              disabled={!idea.trim()}
              className="w-full btn-gradient"
            >
              Generate Problem Statements
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">AI-Generated Problem Statements</h2>
            <Button 
              variant="outline" 
              onClick={handleRegenerateProblems}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Regenerate
            </Button>
          </div>

          <div className="grid gap-4">
            {problemStatements.map((problem) => (
              <Card 
                key={problem.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedProblem === problem.id 
                    ? 'ring-2 ring-primary shadow-lg' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => handleSelectProblem(problem.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{problem.title}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditingProblem(problem.id)
                      }}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{problem.domain}</Badge>
                    <Badge className={getImpactColor(problem.impact)}>
                      Impact: {problem.impact}
                    </Badge>
                    <Badge className={getImpactColor(problem.feasibility)}>
                      Feasibility: {problem.feasibility}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {editingProblem === problem.id ? (
                    <div className="space-y-2">
                      <Textarea
                        defaultValue={problem.description}
                        onBlur={(e) => handleEditProblem(problem.id, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.ctrlKey) {
                            handleEditProblem(problem.id, e.currentTarget.value)
                          }
                        }}
                        className="min-h-20"
                        autoFocus
                      />
                      <p className="text-xs text-muted-foreground">
                        Press Ctrl+Enter or click outside to save
                      </p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">{problem.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedProblem && (
            <div className="flex justify-end pt-4">
              <Button 
                onClick={handleProceedToNextPhase}
                className="btn-gradient"
              >
                Proceed to Opportunity Analysis
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
