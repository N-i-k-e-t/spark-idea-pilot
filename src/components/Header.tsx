
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Lightbulb, User, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  onWisdomToggle: () => void
  wisdomSidebarOpen: boolean
}

export function Header({ onWisdomToggle, wisdomSidebarOpen }: HeaderProps) {
  return (
    <header className="h-16 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-2 min-w-0">
        <SidebarTrigger className="md:hidden" />
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
            <Lightbulb className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-lg sm:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent truncate">
            AI Co-Pilot
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="outline"
          size="sm"
          onClick={onWisdomToggle}
          className={`${wisdomSidebarOpen ? "bg-primary text-primary-foreground" : ""} hidden sm:flex`}
        >
          <Lightbulb className="h-4 w-4" />
          <span className="hidden md:inline">Wisdom</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onWisdomToggle}
          className={`${wisdomSidebarOpen ? "bg-primary text-primary-foreground" : ""} sm:hidden`}
        >
          <Lightbulb className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full shrink-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
