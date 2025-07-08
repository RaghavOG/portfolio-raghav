"use client"
import { useState, useEffect, useRef } from 'react';

const commands = {
  jokes: () => [
    "😄 Programming Jokes:",
    "• Why do programmers prefer dark mode? Light attracts bugs!",
    "• How many programmers does it take to fix a lightbulb? None, it's a hardware issue",
    "• Why do Java developers wear glasses? Because they can't C#",
    "• There are 10 types of people: those who understand binary and those who don't",
    "• 99 little bugs in the code, 99 bugs in the code...",
    "• It works on my machine! - Every developer ever"
  ],
  help: () => [
    "Available Commands:",
    "  whoami      - About Me",
    "  skills      - My Technical Skills", 
    "  projects    - Recent Projects",
    "  contact     - Get in Touch",
    "  clear       - Clear Terminal",
    "  easter      - Find the Easter Egg 🥚",
    "  matrix      - Access the Matrix",
    "  konami      - About the Konami Code",
    "  funfacts    - Random Developer Fun Facts",
    "  jokes       - Programming Jokes",
    "  quotes      - Inspirational Coding Quotes",
    "  cat <file>  - View File Contents",
    "  ask <query> - Ask AI Assistant Anything",
    "  code <desc> - Generate Code Snippets",
    "  review      - Get Code Review (paste code after)",
    "  history     - Show Command History"
  ],
  whoami: () => [
    "Raghav - Full Stack Developer",
    "Location: India",
    "Passion: Building scalable applications with modern tech",
    "Specialties: React, Node.js, AI/ML, Vector DBs",
    "Fun Fact: I debug with console.log more than I'd like to admit 😅"
  ],
  skills: () => [
    "Frontend: React, Next.js, TypeScript, Tailwind CSS",
    "Backend: Node.js, Express.js, Python, Firebase",
    "Database: MongoDB, PostgreSQL, Pinecone, Vector DBs",
    "AI/ML: LangChain, LangGraph, RAG, Agentic AI, MCP Servers",
    "DevOps: Docker, Git, GitHub, Nginx"
  ],
  projects: () => [
    "🚀 AI-Powered Portfolio - This website you're on!",
    "🤖 RAG Chat Application - LangChain + Vector DB",
    "📊 Full-Stack Dashboard - React + Node.js + MongoDB",
    "🔧 MCP Server Integration - AI Agent Communication",
    "💼 More projects at github.com/RaghavOG"
  ],
  contact: () => [
    "📧 Email: info@raghavsingla.tech",
    "💼 LinkedIn: linkedin.com/in/singlaraghav",
    "🐙 GitHub: github.com/RaghavOG",
    "🌐 Portfolio: This website!",
    "📱 Always open to interesting opportunities!"
  ],
  easter: () => [
    "🎉 You found the Easter Egg! 🥚",
    "Here's a secret: I once spent 3 hours debugging only to find",
    "I had a typo in a variable name. Classic developer moment! 😂",
    "Achievement Unlocked: True Developer 🏆",
    "",
    "🔗 Want more secrets? Visit /debug for the full experience!"
  ],
  matrix: () => [
    "🚨 Accessing the Matrix...",
    "Redirecting to debug mode...",
    "Visit /debug to see the Matrix effect!"
  ],
  konami: () => [
    "🎮 Konami Code Detected!",
    "↑↑↓↓←→←→BA - The classic cheat code",
    "Try it on /debug page for a special surprise!"
  ],
  funfacts: () => [
    "🤯 Fun Developer Facts:",
    "• The first computer bug was an actual bug (moth) found in 1947",
    "• 'Hello World' was first used in 1972 by Brian Kernighan",
    "• The average programmer drinks 3.2 cups of coffee per day",
    "• Rubber duck debugging is a real technique!",
    "• The term 'debugging' comes from Grace Hopper removing moths",
    "• StackOverflow gets 21 million visits monthly"
  ],
  quotes: () => [
    "💭 Coding Wisdom:",
    "• 'Talk is cheap. Show me the code.' - Linus Torvalds",
    "• 'First, solve the problem. Then, write the code.' - John Johnson",
    "• 'Code is like humor. When you have to explain it, it's bad.' - Cory House",
    "• 'Any fool can write code that a computer can understand.' - Martin Fowler",
    "• 'The best error message is the one that never shows up.' - Thomas Fuchs",
    "• 'Simplicity is the ultimate sophistication.' - Leonardo da Vinci"
  ]
};

export function TerminalSection() {
  const [history, setHistory] = useState<string[]>([
    "Welcome to Raghav's Interactive Terminal! 💻",
    "Type 'help' to see available commands.",
    "🤖 AI assistant enabled - try 'ask' or 'code' commands!",
    ""
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const typewriterEffect = (text: string[], callback?: () => void) => {
    if (!isClient) {
      // If not on client, just add text immediately
      setHistory(prev => [...prev, ...text, ""]);
      callback?.();
      return;
    }
    
    setIsTyping(true);
    let lineIndex = 0;
    let charIndex = 0;
    const currentLines: string[] = [];

    const typeChar = () => {
      if (lineIndex < text.length) {
        if (charIndex < text[lineIndex].length) {
          currentLines[lineIndex] = (currentLines[lineIndex] || '') + text[lineIndex][charIndex];
          setHistory(prev => [...prev.slice(0, -text.length), ...currentLines, ...Array(text.length - currentLines.length).fill('')]);
          charIndex++;
          setTimeout(typeChar, 20);
        } else {
          lineIndex++;
          charIndex = 0;
          setTimeout(typeChar, 100);
        }
      } else {
        setIsTyping(false);
        callback?.();
      }
    };

    setHistory(prev => [...prev, ...Array(text.length).fill('')]);
    setTimeout(typeChar, 100);
  };

  const callOpenAI = async (query: string, type: 'ask' | 'code' | 'review') => {
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, type }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('AI API error:', error);
      return 'Sorry, AI assistant is temporarily unavailable. Please try again later.';
    }
  };

  const simulateAIResponse = async (query: string, type: 'ask' | 'code' | 'review' = 'ask') => {
    if (!isClient) return;
    
    // Show loading message
    const loadingMessage = type === 'code' ? '🤖 AI: Generating code...' : '🤖 AI: Thinking...';
    setHistory(prev => [...prev, loadingMessage]);

    try {
      const response = await callOpenAI(query, type);
      const formattedResponse = response.split('\n').map((line: string) => 
        line.trim() ? (type === 'ask' ? `🤖 AI: ${line}` : line) : ''
      ).filter((line: string) => line !== '');

      // Remove loading message and add real response
      setHistory(prev => {
        const newHistory = prev.slice(0, -1); // Remove loading message
        return [...newHistory, ...formattedResponse, ''];
      });
    } catch (error) {
      // Remove loading message and show error
      setHistory(prev => {
        const newHistory = prev.slice(0, -1);
        return [...newHistory, '🤖 AI: Sorry, I encountered an error. Please try again.', ''];
      });
    }
  };

  const executeCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (trimmedCmd) {
      setCommandHistory(prev => [...prev, trimmedCmd]);
    }
    
    setHistory(prev => [...prev, `$ ${cmd}`]);
    
    if (waitingForCode) {
      setWaitingForCode(false);
      await simulateAIResponse(trimmedCmd, 'review');
      return;
    }

    const [command, ...args] = trimmedCmd.toLowerCase().split(' ');
    
    if (command === 'clear') {
      setHistory([
        "Welcome to Raghav's Interactive Terminal! 💻",
        "Type 'help' to see available commands.",
        "🤖 AI assistant enabled - try 'ask' or 'code' commands!",
        ""
      ]);
    } else if (command === 'history') {
      const historyOutput = [
        "Command History:",
        ...commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`)
      ];
      typewriterEffect(historyOutput);
    } else if (command === 'ask') {
      const query = args.join(' ');
      if (query) {
        await simulateAIResponse(query, 'ask');
      } else {
        setHistory(prev => [...prev, "Usage: ask <your question>", ""]);
      }
    } else if (command === 'code') {
      const description = args.join(' ');
      if (description) {
        await simulateAIResponse(description, 'code');
      } else {
        setHistory(prev => [...prev, "Usage: code <description>", ""]);
      }
    } else if (command === 'review') {
      setWaitingForCode(true);
      setHistory(prev => [...prev, "🤖 AI: Please paste your code in the next command for review:", ""]);
    } else if (command === 'cat') {
      const filename = args[0];
      if (filename === 'about.txt') {
        typewriterEffect([
          "Full-stack developer with expertise in modern web technologies.",
          "Passionate about AI/ML and building scalable applications.",
          "Always learning and exploring new technologies."
        ]);
      } else if (filename === 'resume.pdf') {
        setHistory(prev => [...prev, "📄 resume.pdf - binary file (use 'download resume' to get actual file)", ""]);
      } else {
        setHistory(prev => [...prev, `cat: ${filename}: No such file or directory`, ""]);
      }
    } else if (commands[command as keyof typeof commands]) {
      const output = commands[command as keyof typeof commands]();
      typewriterEffect(output);
    } else if (command === '') {
      setHistory(prev => [...prev, ""]);
    } else {
      setHistory(prev => [...prev, `Command not found: ${command}. Type 'help' for available commands.`, ""]);
    }
  };

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      await executeCommand(currentInput);
      setCurrentInput("");
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <section id="terminal" className="py-20 px-4 md:px-12 bg-black text-green-400 relative overflow-hidden">
      {/* Subtle scan lines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/5 to-transparent animate-pulse"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 font-space-grotesk tracking-tight">
            Terminal
          </h2>
          <p className="text-2xl text-green-400/80 font-inter max-w-2xl">
            🎮 Interactive CLI Interface - Now with AI Assistance!
          </p>
        </div>

        {/* Terminal Window */}
        <div className="bg-white/5 border border-green-400/20 rounded-lg overflow-hidden shadow-2xl hover:shadow-green-400/20 transition-all duration-300 backdrop-blur-sm">
          {/* Terminal Header */}
          <div className="bg-white/10 px-4 py-3 flex items-center space-x-2 border-b border-green-400/20">
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg animate-pulse"></div>
            <div className="ml-4 text-white/60 text-sm font-mono">raghav@portfolio:~</div>
            <div className="ml-auto text-green-400/60 text-xs font-mono">
              {waitingForCode ? "🤖 AI WAITING FOR CODE" : "🤖 AI READY"}
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            onClick={handleTerminalClick}
            className="p-4 h-96 overflow-y-auto cursor-text font-mono text-sm bg-black/20 relative"
          >
            {/* Content glow effect */}
            <div className="absolute inset-0 bg-gradient-radial from-green-400/10 via-transparent to-transparent pointer-events-none"></div>
            
            {!isClient ? (
              // Server-side placeholder to prevent hydration mismatch
              <div className="relative z-10 text-white/80">
                <div>Welcome to Raghav's Interactive Terminal! 💻</div>
                <div>Type 'help' to see available commands.</div>
                <div>🤖 AI assistant enabled - try 'ask' or 'code' commands!</div>
                <div></div>
                <div className="flex items-center text-green-400 mt-2">
                  <span className="mr-2">$</span>
                  <span className="text-white/40">Loading Terminal...</span>
                </div>
              </div>
            ) : (
              <>
                {history.map((line, index) => {
                  let textColor = 'text-white/80';
                  if (typeof line === 'string') {
                    if (line.startsWith('$')) {
                      textColor = 'text-green-400';
                    } else if (line.startsWith('🤖')) {
                      textColor = 'text-blue-400';
                    }
                  }
                  
                  return (
                    <div key={index} className={`relative z-10 ${textColor}`}>
                      {line || ''}
                    </div>
                  );
                })}
                
                {/* Current Input Line */}
                <div className="flex items-center text-green-400 relative z-10">
                  <span className="mr-2">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="bg-transparent border-none outline-none flex-1 text-green-400 font-mono"
                    placeholder={waitingForCode ? "Paste your code here..." : "Type a command..."}
                    disabled={isTyping}
                  />
                  <span className="animate-pulse">▋</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Commands */}
        {!isClient ? (
          // Server-side placeholder
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="px-4 py-2 bg-white/5 border border-green-400/20 text-green-400/50 rounded-md font-mono text-sm">
              Loading Commands...
            </div>
          </div>
        ) : (
          <div className="mt-8 flex flex-wrap gap-3">
            {Object.keys(commands).slice(0, 8).map((cmd) => (
              <button
                key={cmd}
                onClick={async () => {
                  if (!isTyping) {
                    await executeCommand(cmd);
                    setCurrentInput("");
                  }
                }}
                disabled={isTyping}
                className="px-4 py-2 bg-white/5 border border-green-400/20 text-green-400 rounded-md hover:bg-green-400/10 hover:border-green-400/50 transition-all duration-300 font-mono text-sm disabled:opacity-50"
              >
                {cmd}
              </button>
            ))}
            
            {/* AI Commands */}
            <button
              onClick={async () => {
                if (!isTyping) {
                  setCurrentInput("ask How to optimize React apps");
                  await executeCommand("ask How to optimize React apps");
                  setCurrentInput("");
                }
              }}
              disabled={isTyping}
              className="px-4 py-2 bg-blue-500/20 border border-blue-400/30 text-blue-400 rounded-md hover:bg-blue-400/20 hover:border-blue-400/50 transition-all duration-300 font-mono text-sm disabled:opacity-50"
            >
              🤖 ask demo
            </button>
            
            <button
              onClick={async () => {
                if (!isTyping) {
                  setCurrentInput("code React hook for API calls");
                  await executeCommand("code React hook for API calls");
                  setCurrentInput("");
                }
              }}
              disabled={isTyping}
              className="px-4 py-2 bg-purple-500/20 border border-purple-400/30 text-purple-400 rounded-md hover:bg-purple-400/20 hover:border-purple-400/50 transition-all duration-300 font-mono text-sm disabled:opacity-50"
            >
              🤖 code demo
            </button>
          </div>
        )}

        {/* AI Info */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-400/20 rounded-lg">
          <p className="text-blue-400 text-sm font-mono">
            <span className="text-blue-300">💡 AI Powered:</span> The AI commands are now powered by OpenAI GPT-3.5-turbo. 
            Ask questions, generate code, or get code reviews!
          </p>
        </div>
      </div>
    </section>
  )
}