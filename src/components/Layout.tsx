
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Header } from "@/components/Header"
import { WisdomSpark } from "@/components/WisdomSpark"
import { useState } from "react"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [wisdomSidebarOpen, setWisdomSidebarOpen] = useState(false)

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-gradient-to-br from-background via-yellow-50/20 to-secondary/30 overflow-hidden">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-w-0 max-w-full">
          <Header 
            onWisdomToggle={() => setWisdomSidebarOpen(!wisdomSidebarOpen)}
            wisdomSidebarOpen={wisdomSidebarOpen}
          />
          
          <main className="flex-1 overflow-hidden relative">
            <div className="h-full w-full overflow-auto">
              <div className="container mx-auto px-4 py-4 max-w-full">
                {children}
              </div>
            </div>
            
            <WisdomSpark 
              isOpen={wisdomSidebarOpen}
              onClose={() => setWisdomSidebarOpen(false)}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
