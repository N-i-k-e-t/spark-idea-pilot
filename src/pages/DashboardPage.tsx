import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Target, 
  Eye,
  MousePointer,
  Mail,
  Calendar,
  Filter
} from "lucide-react"

// Sample data for charts
const revenueData = [
  { month: "Jan", revenue: 12000, target: 15000 },
  { month: "Feb", revenue: 15000, target: 18000 },
  { month: "Mar", revenue: 18500, target: 20000 },
  { month: "Apr", revenue: 22000, target: 22000 },
  { month: "May", revenue: 25500, target: 25000 },
  { month: "Jun", revenue: 28000, target: 28000 }
]

const userAcquisitionData = [
  { month: "Jan", organic: 245, paid: 123, referral: 67 },
  { month: "Feb", organic: 312, paid: 156, referral: 89 },
  { month: "Mar", organic: 398, paid: 201, referral: 134 },
  { month: "Apr", organic: 445, paid: 234, referral: 167 },
  { month: "May", organic: 523, paid: 289, referral: 198 },
  { month: "Jun", organic: 601, paid: 334, referral: 234 }
]

const campaignPerformanceData = [
  { name: "Email Marketing", value: 35, color: "#3b82f6" },
  { name: "Social Media", value: 28, color: "#8b5cf6" },
  { name: "Content Marketing", value: 22, color: "#10b981" },
  { name: "Paid Ads", value: 15, color: "#f59e0b" }
]

const conversionFunnelData = [
  { stage: "Visitors", value: 10000, percentage: 100 },
  { stage: "Leads", value: 2500, percentage: 25 },
  { stage: "Qualified", value: 750, percentage: 7.5 },
  { stage: "Customers", value: 150, percentage: 1.5 }
]

interface KPI {
  id: string
  title: string
  value: string
  change: number
  changeLabel: string
  icon: React.ReactNode
  color: string
}

const kpis: KPI[] = [
  {
    id: "revenue",
    title: "Monthly Revenue",
    value: "$28,000",
    change: 12.5,
    changeLabel: "vs last month",
    icon: <DollarSign className="h-5 w-5" />,
    color: "text-green-600"
  },
  {
    id: "users",
    title: "Active Users",
    value: "1,235",
    change: 8.2,
    changeLabel: "vs last month",
    icon: <Users className="h-5 w-5" />,
    color: "text-blue-600"
  },
  {
    id: "conversion",
    title: "Conversion Rate",
    value: "3.8%",
    change: -2.1,
    changeLabel: "vs last month",
    icon: <Target className="h-5 w-5" />,
    color: "text-purple-600"
  },
  {
    id: "cac",
    title: "Customer Acquisition Cost",
    value: "$125",
    change: -5.3,
    changeLabel: "vs last month",
    icon: <MousePointer className="h-5 w-5" />,
    color: "text-orange-600"
  }
]

export function DashboardPage() {
  const [dateRange, setDateRange] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("all")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              KPI Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Track your key performance indicators and business metrics
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Metrics</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="conversion">Conversion</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => (
          <Card key={kpi.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-opacity-10 ${kpi.color}`}>
                  {kpi.icon}
                </div>
                <Badge variant={kpi.change >= 0 ? "default" : "destructive"} className="text-xs">
                  {kpi.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(kpi.change)}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold">{kpi.value}</h3>
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <p className="text-xs text-muted-foreground">{kpi.changeLabel}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Revenue vs Target
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Actual Revenue" />
                <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Acquisition */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Acquisition Channels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userAcquisitionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="organic" stackId="1" stroke="#10b981" fill="#10b981" name="Organic" />
                <Area type="monotone" dataKey="paid" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Paid" />
                <Area type="monotone" dataKey="referral" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" name="Referral" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Campaign Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Campaign Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={campaignPerformanceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {campaignPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MousePointer className="h-5 w-5" />
              Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionFunnelData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="stage" type="category" width={80} />
                <Tooltip formatter={(value, name) => [
                  `${(value as number).toLocaleString()} (${conversionFunnelData.find(d => d.value === value)?.percentage}%)`,
                  name
                ]} />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Campaign Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Email Campaign Completed</p>
                  <p className="text-xs text-muted-foreground">Product Launch Series - 28% open rate</p>
                </div>
                <span className="text-xs text-muted-foreground">2h ago</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Target className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Conversion Goal Achieved</p>
                  <p className="text-xs text-muted-foreground">Monthly target reached 5 days early</p>
                </div>
                <span className="text-xs text-muted-foreground">1d ago</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">User Milestone Reached</p>
                  <p className="text-xs text-muted-foreground">1,000+ active users this month</p>
                </div>
                <span className="text-xs text-muted-foreground">3d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border-l-4 border-blue-500 bg-blue-50/50 rounded-r-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">Q2 Revenue Target</p>
                  <p className="text-xs text-muted-foreground">$75,000 - 92% completed</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>

              <div className="flex items-center gap-3 p-3 border-l-4 border-green-500 bg-green-50/50 rounded-r-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">User Growth Goal</p>
                  <p className="text-xs text-muted-foreground">1,500 users - 82% completed</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <Users className="h-4 w-4 text-green-600" />
              </div>

              <div className="flex items-center gap-3 p-3 border-l-4 border-orange-500 bg-orange-50/50 rounded-r-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">Product Launch</p>
                  <p className="text-xs text-muted-foreground">New feature rollout - 65% completed</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <Target className="h-4 w-4 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}