'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Clock, Activity, AlertTriangle } from 'lucide-react';

export default function SecurityMonitor() {
  const { sessionInfo, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!sessionInfo) return null;

  const timeUntilExpiry = sessionInfo.expiresAt - currentTime;
  const timeSinceActivity = currentTime - sessionInfo.lastActivity;
  
  const formatTime = (ms: number) => {
    if (ms <= 0) return '0:00';
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const isExpiringSoon = timeUntilExpiry < (60 * 60 * 1000); // 1 hour
  const isActivityWarning = timeSinceActivity > (2 * 60 * 60 * 1000); // 2 hours

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-xl max-w-sm">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-4 w-4 text-blue-400" />
        <span className="text-sm font-medium text-white">Security Monitor</span>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className={`flex items-center gap-2 ${isExpiringSoon ? 'text-yellow-400' : 'text-gray-400'}`}>
          <Clock className="h-3 w-3" />
          <span>Session expires in: {formatTime(timeUntilExpiry)}</span>
        </div>
        
        <div className={`flex items-center gap-2 ${isActivityWarning ? 'text-yellow-400' : 'text-gray-400'}`}>
          <Activity className="h-3 w-3" />
          <span>Last activity: {formatTime(timeSinceActivity)} ago</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-400">
          <span className="text-xs">ID: {sessionInfo.sessionId.slice(-8)}</span>
        </div>
      </div>

      {(isExpiringSoon || isActivityWarning) && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex items-center gap-2 text-yellow-400 text-xs mb-2">
            <AlertTriangle className="h-3 w-3" />
            <span>Security Warning</span>
          </div>
          <button
            onClick={logout}
            className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded transition-colors"
          >
            Secure Logout
          </button>
        </div>
      )}
    </div>
  );
}
