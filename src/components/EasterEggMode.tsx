"use client"
import { useState, useEffect } from 'react';

export function EasterEggMode() {
  const [konami, setKonami] = useState<string[]>([]);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showKeys, setShowKeys] = useState(false);
  const [devStats, setDevStats] = useState({
    coffeeConsumed: 0,
    bugsFixed: 0,
    linesOfCode: 0,
    stackOverflowVisits: 0
  });

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('Key pressed:', e.code); // Debug log
      
      setKonami(prev => {
        const newSequence = [...prev, e.code].slice(-10);
        console.log('Current sequence:', newSequence); // Debug log
        console.log('Target sequence:', konamiCode); // Debug log
        
        if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
          console.log('Konami code activated!'); // Debug log
          setShowMatrix(true);
          setTimeout(() => setShowMatrix(false), 5000);
        }
        return newSequence;
      });
      
      // Show key indicator
      setShowKeys(true);
      setTimeout(() => setShowKeys(false), 1000);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiCode]);

  useEffect(() => {
    // Simulate real-time dev stats
    const interval = setInterval(() => {
      setDevStats(prev => ({
        coffeeConsumed: prev.coffeeConsumed + Math.floor(Math.random() * 2),
        bugsFixed: prev.bugsFixed + Math.floor(Math.random() * 3),
        linesOfCode: prev.linesOfCode + Math.floor(Math.random() * 50),
        stackOverflowVisits: prev.stackOverflowVisits + Math.floor(Math.random() * 1)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const Matrix = () => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    return (
      <div className="fixed inset-0 z-50 bg-black overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 font-mono text-sm animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j} className="opacity-80">
                {chars[Math.floor(Math.random() * chars.length)]}
              </div>
            ))}
          </div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-green-400 text-4xl font-mono animate-pulse">
            🚨 hacker mode activated 🚨
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-8 font-mono relative">
      {showMatrix && <Matrix />}
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4 animate-pulse font-space-grotesk">🪄 debug mode</h1>
        <p className="text-xl font-inter">you found the secret developer console!</p>
        <p className="text-sm text-green-400/60 mt-2 font-inter">
          tip: try the konami code (↑↑↓↓←→←→ba) for a surprise 👀
        </p>
        {showKeys && (
          <div className="mt-4 p-2 bg-yellow-400/20 rounded-lg text-yellow-400 text-sm">
            key detected! current sequence: {konami.slice(-5).join(' → ')}
          </div>
        )}
        <button 
          onClick={() => {
            setShowMatrix(true);
            setTimeout(() => setShowMatrix(false), 5000);
          }}
          className="mt-4 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-md hover:bg-red-500/30 transition-all duration-300 text-sm"
        >
          test matrix effect
        </button>
      </div>

      {/* Live Dev Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
          <div className="text-3xl mb-2">☕</div>
          <div className="text-2xl font-bold font-space-grotesk">{devStats.coffeeConsumed}</div>
          <div className="text-sm font-inter">cups of coffee</div>
        </div>
        <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
          <div className="text-3xl mb-2">🐛</div>
          <div className="text-2xl font-bold font-space-grotesk">{devStats.bugsFixed}</div>
          <div className="text-sm font-inter">bugs squashed</div>
        </div>
        <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
          <div className="text-3xl mb-2">💻</div>
          <div className="text-2xl font-bold font-space-grotesk">{devStats.linesOfCode.toLocaleString()}</div>
          <div className="text-sm font-inter">lines of code</div>
        </div>
        <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
          <div className="text-3xl mb-2">🔍</div>
          <div className="text-2xl font-bold font-space-grotesk">{devStats.stackOverflowVisits}</div>
          <div className="text-sm font-inter">stack overflow visits</div>
        </div>
      </div>

      {/* Developer Confession */}
      <div className="bg-white/5 p-8 rounded-lg border border-white/10 mb-8 hover:bg-white/10 transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4 font-space-grotesk">🤫 developer confessions</h2>
        <div className="space-y-3 text-green-400/80 font-inter">
          <p>• i still google "how to center a div" sometimes</p>
          <p>• my commit messages are 50% "fix" and 50% "working version"</p>
          <p>• i have 47 chrome tabs open right now</p>
          <p>• i've definitely pushed to production on a friday</p>
          <p>• my code works on my machine™</p>
          <p>• i name variables like "thing", "stuff", and "doTheThing"</p>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-white/5 p-8 rounded-lg border border-white/10 mb-8 hover:bg-white/10 transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4 font-space-grotesk">📊 system information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-inter">
          <div>
            <div className="text-green-400/60">runtime:</div>
            <div>next.js + react + typescript</div>
          </div>
          <div>
            <div className="text-green-400/60">styling:</div>
            <div>tailwind css + custom components</div>
          </div>
          <div>
            <div className="text-green-400/60">database:</div>
            <div>mongodb + prisma orm</div>
          </div>
          <div>
            <div className="text-green-400/60">deployment:</div>
            <div>vercel + github actions</div>
          </div>
          <div>
            <div className="text-green-400/60">ai integration:</div>
            <div>langchain + vector dbs</div>
          </div>
          <div>
            <div className="text-green-400/60">version control:</div>
            <div>git + github</div>
          </div>
        </div>
      </div>

      {/* Fun Commands */}
      <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4 font-space-grotesk">🎮 fun commands</h2>
        <div className="space-y-2 text-sm font-mono">
          <div><span className="text-yellow-400">sudo make coffee</span> - brewing virtual coffee...</div>
          <div><span className="text-yellow-400">rm -rf bugs</span> - if only it were that easy!</div>
          <div><span className="text-yellow-400">git blame</span> - it was probably me 😅</div>
          <div><span className="text-yellow-400">npm install happiness</span> - package not found</div>
          <div><span className="text-yellow-400">console.log("hello world")</span> - the classic!</div>
        </div>
      </div>

      {/* Back to Portfolio */}
      <div className="text-center mt-12">
        <a 
          href="/"
          className="inline-block px-8 py-3 bg-green-400 text-black font-bold rounded-lg hover:bg-green-300 transition-all duration-300 font-inter"
        >
          back to portfolio
        </a>
      </div>
    </div>
  );
}
