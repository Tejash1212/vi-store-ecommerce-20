import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const CHATBOT_RULES = [
  {
    patterns: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
    responses: [
      "Hello! Welcome to VI Store! How can I help you today?",
      "Hi there! I'm here to help you with any questions about our products and services.",
      "Hey! Welcome to VI Store. What can I assist you with?"
    ]
  },
  {
    patterns: ["shipping", "delivery", "ship", "when will"],
    responses: [
      "We offer free shipping on orders over $50! Standard delivery takes 3-5 business days.",
      "Shipping is free for orders above $50. You can expect your order in 3-5 business days.",
      "We provide fast shipping! Orders over $50 get free delivery in 3-5 business days."
    ]
  },
  {
    patterns: ["return", "refund", "exchange", "warranty"],
    responses: [
      "We have a 30-day return policy. You can return any item in its original condition.",
      "Returns are easy! We offer 30 days to return your purchase with a full refund.",
      "You can return items within 30 days for a full refund. Just make sure they're in original condition."
    ]
  },
  {
    patterns: ["price", "cost", "expensive", "cheap", "discount", "sale"],
    responses: [
      "We offer competitive prices and regular sales! Check our trending section for the best deals.",
      "Our prices are great! We often have discounts on trending and new products.",
      "You'll find excellent value here. Keep an eye on our featured products for special offers!"
    ]
  },
  {
    patterns: ["product", "item", "what do you sell", "category", "categories"],
    responses: [
      "We sell electronics, fashion items, gaming gear, kitchen appliances, furniture, and more!",
      "Our store has electronics, wearables, photography gear, furniture, gaming accessories, and kitchen items.",
      "We offer a wide range: Electronics, Fashion, Gaming, Kitchen, Furniture, and many other categories!"
    ]
  },
  {
    patterns: ["payment", "pay", "credit card", "secure"],
    responses: [
      "We accept all major credit cards and ensure 100% secure checkout for your safety.",
      "Payment is secure! We accept credit cards and use encrypted checkout for your protection.",
      "Your payment is safe with us. We support major credit cards with secure encryption."
    ]
  },
  {
    patterns: ["support", "help", "contact", "customer service"],
    responses: [
      "We offer 24/7 customer support! I'm here to help, or you can contact our support team anytime.",
      "Need help? I'm here 24/7! Our customer service team is also always available to assist you.",
      "We're always here to help! Available 24/7 for any questions or concerns you might have."
    ]
  },
  {
    patterns: ["thank", "thanks", "appreciate"],
    responses: [
      "You're welcome! Happy to help. Is there anything else I can assist you with?",
      "My pleasure! Let me know if you need anything else.",
      "You're very welcome! Feel free to ask if you have more questions."
    ]
  },
  {
    patterns: ["bye", "goodbye", "see you", "later"],
    responses: [
      "Goodbye! Thanks for visiting VI Store. Come back anytime!",
      "See you later! Happy shopping at VI Store!",
      "Bye! Have a great day and happy shopping!"
    ]
  }
];

const DEFAULT_RESPONSES = [
  "I'm here to help! You can ask me about shipping, returns, products, or anything else about VI Store.",
  "I didn't quite understand that. Try asking about our products, shipping, returns, or customer support!",
  "I'd love to help! Ask me about our store policies, product categories, or anything else you'd like to know.",
  "I'm your VI Store assistant! I can help with questions about products, shipping, returns, and more."
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your VI Store assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    for (const rule of CHATBOT_RULES) {
      for (const pattern of rule.patterns) {
        if (lowercaseMessage.includes(pattern)) {
          const randomIndex = Math.floor(Math.random() * rule.responses.length);
          return rule.responses[randomIndex];
        }
      }
    }

    const randomIndex = Math.floor(Math.random() * DEFAULT_RESPONSES.length);
    return DEFAULT_RESPONSES[randomIndex];
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findResponse(userMessage.text),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 seconds delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              VI Store Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-3 gap-3">
            {/* Messages */}
            <ScrollArea className="flex-1" ref={scrollAreaRef}>
              <div className="space-y-3 pr-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${
                      message.isBot ? "justify-start" : "justify-end"
                    }`}
                  >
                    {message.isBot && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Bot className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                        message.isBot
                          ? "bg-muted text-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {message.text}
                    </div>
                    {!message.isBot && (
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <User className="h-3 w-3 text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <div className="bg-muted text-foreground rounded-lg px-3 py-2 text-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
