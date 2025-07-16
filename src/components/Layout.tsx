
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Header } from "@/components/Header"
import { WisdomSpark } from "@/components/WisdomSpark"
import { PhaseProgress } from "@/components/PhaseProgress"
import { useState } from "react"
import { useLocation } from "react-router-dom"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [wisdomSidebarOpen, setWisdomSidebarOpen] = useState(false)
  const location = useLocation()
  
  // Determine current phase based on route
  const getCurrentPhase = () => {
    const path = location.pathname
    if (path === '/ideation' || path === '/problems') return 1
    if (path === '/opportunity') return 2
    if (path === '/solution-mapping' || path === '/canvas') return 3
    if (path === '/business-model') return 4
    if (path === '/prototype') return 5
    if (path === '/architecture') return 6
    if (path === '/go-to-market' || path === '/calendar') return 7
    if (path === '/deployment' || path === '/dashboard') return 8
    if (path === '/scaling') return 9
    return 0 // Home
  }

  const currentPhase = getCurrentPhase()

  return (
    <SidebarProvider>
      <div className="main-container w-full flex">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-w-0 max-w-full">
          <Header 
            onWisdomToggle={() => setWisdomSidebarOpen(!wisdomSidebarOpen)}
            wisdomSidebarOpen={wisdomSidebarOpen}
          />
          
          {currentPhase > 0 && <PhaseProgress currentPhase={currentPhase} />}
          
          <main className="flex-1 relative overflow-hidden">
            <div className="content-area">
              <div className="container mx-auto px-4 py-6 max-w-full">
                {children}
              </div>
            </div>
            
            <WisdomSpark 
              isOpen={wisdomSidebarOpen}
              onClose={() => setWisdomSidebarOpen(false)}
              currentPhase={currentPhase}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
