"use client"
import { useState, useEffect, useRef } from 'react';

const commands = {
  help: () => [
    "available commands:",
    "  whoami      - about me",
    "  skills      - my technical skills", 
    "  projects    - recent projects",
    "  contact     - get in touch",
    "  clear       - clear terminal",
    "  easter      - find the easter egg 🥚",
    "  matrix      - access the matrix",
    "  konami      - about the konami code"
  ],
  whoami: () => [
    "raghav - full stack developer",
    "location: india",
    "passion: building scalable applications with modern tech",
    "specialties: react, node.js, ai/ml, vector dbs",
    "fun fact: i debug with console.log more than i'd like to admit 😅"
  ],
  skills: () => [
    "frontend: react, next.js, typescript, tailwind css",
    "backend: node.js, express.js, python, firebase",
    "database: mongodb, postgresql, pinecone, vector dbs",
    "ai/ml: langchain, langgraph, rag, agentic ai, mcp servers",
    "devops: docker, git, github, nginx"
  ],
  projects: () => [
    "🚀 ai-powered portfolio - this website you're on!",
    "🤖 rag chat application - langchain + vector db",
    "📊 full-stack dashboard - react + node.js + mongodb",
    "🔧 mcp server integration - ai agent communication",
    "💼 more projects at github.com/raghavog"
  ],
  contact: () => [
    "📧 email: your.email@example.com", // Replace with your actual email
    "💼 linkedin: linkedin.com/in/YOUR_LINKEDIN", // Replace with your LinkedIn
    "🐙 github: github.com/raghavog",
    "🌐 portfolio: this website!",
    "📱 always open to interesting opportunities!"
  ],
  easter: () => [
    "🎉 you found the easter egg! 🥚",
    "here's a secret: i once spent 3 hours debugging only to find",
    "i had a typo in a variable name. classic developer moment! 😂",
    "achievement unlocked: true developer 🏆",
    "",
    "🔗 want more secrets? visit /debug for the full experience!"
  ],
  matrix: () => [
    "🚨 accessing the matrix...",
    "redirecting to debug mode...",
    "visit /debug to see the matrix effect!"
  ],
  konami: () => [
    "🎮 konami code detected!",
    "↑↑↓↓←→←→ba - the classic cheat code",
    "try it on /debug page for a special surprise!"
  ]
};

export function TerminalSection() {
  const [history, setHistory] = useState<string[]>([
    "welcome to raghav's interactive terminal! 💻",
    "type 'help' to see available commands.",
    ""
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    setHistory(prev => [...prev, `$ ${cmd}`]);
    
    if (command === 'clear') {
      setHistory([
        "welcome to raghav's interactive terminal! 💻",
        "type 'help' to see available commands.",
        ""
      ]);
    } else if (commands[command as keyof typeof commands]) {
      const output = commands[command as keyof typeof commands]();
      setHistory(prev => [...prev, ...output, ""]);
    } else if (command === '') {
      setHistory(prev => [...prev, ""]);
    } else {
      setHistory(prev => [...prev, `command not found: ${cmd}. type 'help' for available commands.`, ""]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput("");
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <section id="terminal" className="py-20 px-4 md:px-12 bg-black text-green-400">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 font-space-grotesk tracking-tight">
            terminal
          </h2>
          <p className="text-2xl text-green-400/80 font-inter max-w-2xl">
            🎮 interactive cli interface - because guis are overrated
          </p>
        </div>

        {/* Terminal Window */}
        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden shadow-2xl hover:bg-white/10 transition-all duration-300">
          {/* Terminal Header */}
          <div className="bg-white/10 px-4 py-3 flex items-center space-x-2 border-b border-white/10">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="ml-4 text-white/60 text-sm font-mono">raghav@portfolio:~</div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            onClick={handleTerminalClick}
            className="p-4 h-96 overflow-y-auto cursor-text font-mono text-sm"
          >
            {history.map((line, index) => (
              <div key={index} className={line.startsWith('$') ? 'text-green-400' : 'text-white/80'}>
                {line}
              </div>
            ))}
            
            {/* Current Input Line */}
            <div className="flex items-center text-green-400">
              <span className="mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-transparent border-none outline-none flex-1 text-green-400 font-mono"
                placeholder="type a command..."
                autoFocus
              />
              <span className="animate-pulse">▋</span>
            </div>
          </div>
        </div>

        {/* Quick Commands */}
        <div className="mt-8 flex flex-wrap gap-3">
          {Object.keys(commands).map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                setCurrentInput(cmd);
                executeCommand(cmd);
                setCurrentInput("");
              }}
              className="px-4 py-2 bg-white/5 border border-white/10 text-green-400 rounded-md hover:bg-white/10 hover:border-green-400/30 transition-all duration-300 font-mono text-sm"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
