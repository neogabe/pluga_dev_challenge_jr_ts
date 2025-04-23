import { useState, useEffect } from 'react';
import { Tool } from '@/types/tools';

const STORAGE_KEY = 'recentTools';
const MAX_RECENT_TOOLS = 3;

export const useRecentTools = () => {
  const [recentTools, setRecentTools] = useState<Tool[]>([]);

  useEffect(() => {
    const storedTools = localStorage.getItem(STORAGE_KEY);
    if (storedTools) {
      setRecentTools(JSON.parse(storedTools));
    }
  }, []);

  const addToolToRecent = (tool: Tool) => {
    setRecentTools((prevTools) => {
      const filteredTools = prevTools.filter((t) => t.app_id !== tool.app_id);
      const newTools = [tool, ...filteredTools].slice(0, MAX_RECENT_TOOLS);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTools));
      return newTools;
    });
  };

  return {
    recentTools,
    addToolToRecent,
  };
};
