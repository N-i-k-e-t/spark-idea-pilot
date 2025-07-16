import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  CalendarIcon, 
  Plus, 
  Edit, 
  Trash2, 
  Target, 
  TrendingUp, 
  Users, 
  Mail,
  Filter
} from "lucide-react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addDays } from "date-fns"
import { toast } from "@/hooks/use-toast"

interface Campaign {
  id: string
  title: string
  description: string
  type: "email" | "social" | "content" | "event" | "pr"
  status: "planned" | "active" | "completed" | "paused"
  startDate: Date
  endDate: Date
  budget: number
  expectedReach: number
  actualReach?: number
  kpis: string[]
}

const campaignTypes = {
  email: { label: "Email Marketing", icon: <Mail className="h-4 w-4" />, color: "bg-blue-500" },
  social: { label: "Social Media", icon: <Users className="h-4 w-4" />, color: "bg-purple-500" },
  content: { label: "Content Marketing", icon: <Edit className="h-4 w-4" />, color: "bg-green-500" },
  event: { label: "Events", icon: <CalendarIcon className="h-4 w-4" />, color: "bg-orange-500" },
  pr: { label: "PR & Media", icon: <TrendingUp className="h-4 w-4" />, color: "bg-red-500" }
}

const initialCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Product Launch Email Series",
    description: "Multi-part email campaign introducing our new features",
    type: "email",
    status: "active",
    startDate: new Date(2024, 0, 15),
    endDate: new Date(2024, 0, 22),
    budget: 5000,
    expectedReach: 10000,
    actualReach: 8500,
    kpis: ["Open Rate: 28%", "Click Rate: 12%", "Conversion: 3.2%"]
  },
  {
    id: "2",
    title: "Social Media Awareness Campaign",
    description: "Building brand awareness across social platforms",
    type: "social",
    status: "planned",
    startDate: new Date(2024, 0, 20),
    endDate: new Date(2024, 1, 5),
    budget: 8000,
    expectedReach: 50000,
    kpis: []
  },
  {
    id: "3",
    title: "Industry Conference Participation",
    description: "Booth presence and speaking opportunity at TechCon 2024",
    type: "event",
    status: "planned",
    startDate: new Date(2024, 1, 10),
    endDate: new Date(2024, 1, 12),
    budget: 15000,
    expectedReach: 2500,
    kpis: []
  }
]

export function CalendarPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState<"month" | "week">("month")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null)

  const [newCampaign, setNewCampaign] = useState({
    title: "",
    description: "",
    type: "email" as Campaign["type"],
    status: "planned" as Campaign["status"],
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    budget: 0,
    expectedReach: 0
  })

  const filteredCampaigns = campaigns.filter(campaign => {
    const typeMatch = filterType === "all" || campaign.type === filterType
    const statusMatch = filterStatus === "all" || campaign.status === filterStatus
    return typeMatch && statusMatch
  })

  const getCampaignsForDate = (date: Date) => {
    return filteredCampaigns.filter(campaign => 
      date >= campaign.startDate && date <= campaign.endDate
    )
  }

  const handleAddCampaign = () => {
    const campaign: Campaign = {
      id: Date.now().toString(),
      ...newCampaign,
      kpis: []
    }
    
    setCampaigns(prev => [...prev, campaign])
    setIsAddDialogOpen(false)
    setNewCampaign({
      title: "",
      description: "",
      type: "email",
      status: "planned",
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      budget: 0,
      expectedReach: 0
    })
    
    toast({
      title: "Campaign Added",
      description: `"${campaign.title}" has been added to your calendar.`,
    })
  }

  const handleDeleteCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== campaignId))
    toast({
      title: "Campaign Deleted",
      description: "The campaign has been removed from your calendar.",
    })
  }

  const handleStatusChange = (campaignId: string, newStatus: Campaign["status"]) => {
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, status: newStatus }
          : campaign
      )
    )
    toast({
      title: "Status Updated",
      description: `Campaign status changed to ${newStatus}.`,
    })
  }

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "planned":
        return "bg-gray-100 text-gray-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const monthDays = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate)
  })

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Campaign Calendar
            </h1>
            <p className="text-muted-foreground mt-2">
              Plan, schedule, and track your marketing campaigns
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-gradient">
                <Plus className="h-4 w-4 mr-2" />
                Add Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Campaign title"
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, title: e.target.value }))}
                />
                <Textarea
                  placeholder="Campaign description"
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, description: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Select value={newCampaign.type} onValueChange={(value: Campaign["type"]) => 
                    setNewCampaign(prev => ({ ...prev, type: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(campaignTypes).map(([key, type]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            {type.icon}
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={newCampaign.status} onValueChange={(value: Campaign["status"]) => 
                    setNewCampaign(prev => ({ ...prev, status: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Budget ($)"
                    value={newCampaign.budget || ""}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, budget: parseInt(e.target.value) || 0 }))}
                  />
                  <Input
                    type="number"
                    placeholder="Expected reach"
                    value={newCampaign.expectedReach || ""}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, expectedReach: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <Button 
                  onClick={handleAddCampaign}
                  disabled={!newCampaign.title}
                  className="w-full btn-gradient"
                >
                  Create Campaign
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.entries(campaignTypes).map(([key, type]) => (
                  <SelectItem key={key} value={key}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>
                {format(selectedDate, "MMMM yyyy")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {monthDays.map((day, index) => {
                  const campaignsForDay = getCampaignsForDate(day)
                  const isSelected = isSameDay(day, selectedDate)
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-[80px] p-2 border rounded-lg cursor-pointer transition-colors ${
                        isSelected ? "bg-primary/10 border-primary" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className="text-sm font-medium mb-1">
                        {format(day, "d")}
                      </div>
                      <div className="space-y-1">
                        {campaignsForDay.slice(0, 3).map(campaign => (
                          <div key={campaign.id} className="text-xs p-1 rounded text-white truncate"
                               style={{ backgroundColor: campaignTypes[campaign.type].color }}>
                            {campaign.title}
                          </div>
                        ))}
                        {campaignsForDay.length > 3 && (
                          <div className="text-xs text-muted-foreground">
                            +{campaignsForDay.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign List */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Campaigns for {format(selectedDate, "MMM d")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getCampaignsForDate(selectedDate).map(campaign => (
                  <div key={campaign.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {campaignTypes[campaign.type].icon}
                        <h4 className="font-medium text-sm">{campaign.title}</h4>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingCampaign(campaign)}
                          className="h-6 w-6 p-0"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCampaign(campaign.id)}
                          className="h-6 w-6 p-0 text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {campaign.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        ${campaign.budget.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
                {getCampaignsForDate(selectedDate).length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No campaigns scheduled for this date
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Campaigns</span>
                  <Badge variant="secondary">{filteredCampaigns.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Now</span>
                  <Badge className="bg-green-100 text-green-800">
                    {filteredCampaigns.filter(c => c.status === "active").length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Budget</span>
                  <span className="text-sm font-medium">
                    ${filteredCampaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}