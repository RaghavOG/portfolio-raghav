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
    "  konami      - about the konami code",
    "  funfacts    - random developer fun facts",
    "  jokes       - programming jokes",
    "  quotes      - inspirational coding quotes",
    "  cat <file>  - view file contents",
    "  ask <query> - ask AI assistant anything",
    "  code <desc> - generate code snippets",
    "  review      - get code review (paste code after)",
    "  history     - show command history"
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
    "📧 email: info@raghavsingla.tech",
    "💼 linkedin: linkedin.com/in/singlaraghav",
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
  ],
  funfacts: () => [
    "🤯 fun developer facts:",
    "• the first computer bug was an actual bug (moth) found in 1947",
    "• 'hello world' was first used in 1972 by brian kernighan",
    "• the average programmer drinks 3.2 cups of coffee per day",
    "• rubber duck debugging is a real technique!",
    "• the term 'debugging' comes from grace hopper removing moths",
    "• stackoverflow gets 21 million visits monthly"
  ],
  jokes: () => [
    "� programming jokes:",
    "• why do programmers prefer dark mode? light attracts bugs!",
    "• how many programmers does it take to fix a lightbulb? none, it's a hardware issue",
    "• why do java developers wear glasses? because they can't c#",
    "• there are 10 types of people: those who understand binary and those who don't",
    "• 99 little bugs in the code, 99 bugs in the code...",
    "• it works on my machine! - every developer ever"
  ],
  quotes: () => [
    "💭 coding wisdom:",
    "• 'talk is cheap. show me the code.' - linus torvalds",
    "• 'first, solve the problem. then, write the code.' - john johnson",
    "• 'code is like humor. when you have to explain it, it's bad.' - cory house",
    "• 'any fool can write code that a computer can understand.' - martin fowler",
    "• 'the best error message is the one that never shows up.' - thomas fuchs",
    "• 'simplicity is the ultimate sophistication.' - leonardo da vinci"
  ]
};

export function TerminalSection() {
  const [history, setHistory] = useState<string[]>([
    "welcome to raghav's interactive terminal! 💻",
    "type 'help' to see available commands.",
    "🤖 ai assistant enabled - try 'ask' or 'code' commands!",
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
        "welcome to raghav's interactive terminal! 💻",
        "type 'help' to see available commands.",
        "🤖 ai assistant enabled - try 'ask' or 'code' commands!",
        ""
      ]);
    } else if (command === 'history') {
      const historyOutput = [
        "command history:",
        ...commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`)
      ];
      typewriterEffect(historyOutput);
    } else if (command === 'ask') {
      const query = args.join(' ');
      if (query) {
        await simulateAIResponse(query, 'ask');
      } else {
        setHistory(prev => [...prev, "usage: ask <your question>", ""]);
      }
    } else if (command === 'code') {
      const description = args.join(' ');
      if (description) {
        await simulateAIResponse(description, 'code');
      } else {
        setHistory(prev => [...prev, "usage: code <description>", ""]);
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
        setHistory(prev => [...prev, `cat: ${filename}: no such file or directory`, ""]);
      }
    } else if (commands[command as keyof typeof commands]) {
      const output = commands[command as keyof typeof commands]();
      typewriterEffect(output);
    } else if (command === '') {
      setHistory(prev => [...prev, ""]);
    } else {
      setHistory(prev => [...prev, `command not found: ${command}. type 'help' for available commands.`, ""]);
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
            terminal
          </h2>
          <p className="text-2xl text-green-400/80 font-inter max-w-2xl">
            🎮 interactive cli interface - now with ai assistance!
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
                <div>welcome to raghav's interactive terminal! 💻</div>
                <div>type 'help' to see available commands.</div>
                <div>🤖 ai assistant enabled - try 'ask' or 'code' commands!</div>
                <div></div>
                <div className="flex items-center text-green-400 mt-2">
                  <span className="mr-2">$</span>
                  <span className="text-white/40">Loading terminal...</span>
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
                    placeholder={waitingForCode ? "paste your code here..." : "type a command..."}
                    autoFocus
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
              Loading commands...
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
                  setCurrentInput("ask how to optimize React apps");
                  await executeCommand("ask how to optimize React apps");
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
                  setCurrentInput("code react hook for api calls");
                  await executeCommand("code react hook for api calls");
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