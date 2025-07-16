
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, Send, Bot, User, Sparkles } from "lucide-react"
import { useSpeechSynthesis } from "react-speech-kit"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

interface SuggestionCard {
  id: string
  text: string
  category: string
}

const initialSuggestions: SuggestionCard[] = [
  { id: "1", text: "Help me brainstorm ideas for a sustainable tech startup", category: "Innovation" },
  { id: "2", text: "What are the biggest problems in remote work today?", category: "Market Research" },
  { id: "3", text: "How can I validate my business idea quickly?", category: "Validation" },
  { id: "4", text: "What trends should I consider for my startup?", category: "Trends" },
]

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI Co-Pilot. I'm here to help you capture and develop your startup ideas. What's on your mind today?",
      sender: "ai",
      timestamp: new Date()
    }
  ])
  const [currentMessage, setCurrentMessage] = useState("")
  const [suggestions, setSuggestions] = useState<SuggestionCard[]>(initialSuggestions)
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { speak, cancel, speaking } = useSpeechSynthesis()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setCurrentMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        sender: "ai",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
      
      // Update suggestions based on the conversation
      updateSuggestions(content)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "That's a fascinating idea! Let me help you explore this further. What specific problem are you trying to solve?",
      "I love your thinking! This could be a great opportunity. Have you considered who your target audience might be?",
      "Excellent direction! Let's break this down into actionable steps. What resources do you currently have?",
      "This has potential! Let's validate this idea. What evidence do you have that people need this solution?",
      "Great insight! This aligns with current market trends. How would you differentiate from existing solutions?"
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const updateSuggestions = (userInput: string) => {
    const newSuggestions = [
      { id: Date.now().toString(), text: "Tell me more about this idea", category: "Follow-up" },
      { id: (Date.now() + 1).toString(), text: "What are the potential challenges?", category: "Analysis" },
      { id: (Date.now() + 2).toString(), text: "How would you monetize this?", category: "Business Model" },
      { id: (Date.now() + 3).toString(), text: "Who are your competitors?", category: "Market Research" },
    ]
    setSuggestions(newSuggestions)
  }

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setCurrentMessage(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } else {
      alert('Speech recognition not supported in this browser')
    }
  }

  const handleSuggestionClick = (suggestion: SuggestionCard) => {
    handleSendMessage(suggestion.text)
  }

  return (
    <div className="flex flex-col h-full w-full max-w-full overflow-hidden">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-1 sm:px-2 py-2 sm:py-4 space-y-3 sm:space-y-4 min-h-0 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4 w-full">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex w-full ${message.sender === "user" ? "justify-end" : "justify-start"} chat-message`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] p-3 sm:p-4 rounded-2xl break-words ${
                  message.sender === "user"
                    ? "bg-gradient-primary text-white"
                    : "bg-card border shadow-sm glass-yellow"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {message.sender === "ai" ? (
                    <Bot className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <User className="h-4 w-4 flex-shrink-0" />
                  )}
                  <span className="text-sm font-medium">
                    {message.sender === "ai" ? "AI Co-Pilot" : "You"}
                  </span>
                </div>
                <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{message.content}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start w-full">
              <div className="bg-card border shadow-sm glass-yellow p-3 sm:p-4 rounded-2xl max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%]">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="h-4 w-4" />
                  <span className="text-sm font-medium">AI Co-Pilot</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full ai-pulse"></div>
                  <div className="w-2 h-2 bg-primary rounded-full ai-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full ai-pulse" style={{ animationDelay: '1s' }}></div>
                  <span className="text-sm text-muted-foreground ml-2">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Cards */}
      <div className="px-1 sm:px-2 py-2 border-t glass-yellow backdrop-blur-sm flex-shrink-0">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {suggestions.map((suggestion) => (
              <Card
                key={suggestion.id}
                className="flex-shrink-0 cursor-pointer hover:shadow-md transition-all glow min-w-[180px] sm:min-w-[200px] max-w-[250px]"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-3 w-3 text-primary flex-shrink-0" />
                    <Badge variant="secondary" className="text-xs">
                      {suggestion.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground line-clamp-2">
                    {suggestion.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="px-1 sm:px-2 py-3 sm:py-4 border-t glass-yellow backdrop-blur-sm flex-shrink-0">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex gap-2">
            <div className="flex-1 min-w-0">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Share your startup idea or ask a question..."
                className="w-full"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage(currentMessage)
                  }
                }}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleVoiceInput}
              className={`flex-shrink-0 ${isListening ? "bg-red-500 text-white" : ""}`}
              disabled={isListening}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => handleSendMessage(currentMessage)}
              disabled={!currentMessage.trim() || isTyping}
              className="btn-gradient flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
