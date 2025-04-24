import { useEffect, useState } from 'react';
import { Tool } from '@/types/tools';
import { fetchTools } from '@/services/api';
import { ToolCard } from './ToolCard';
import { SearchBar } from './SearchBar';
import { ToolsPagination } from './ToolsPagination';
import { ToolModal } from './ToolModal';
import { useRecentTools } from '@/hooks/useRecentTools';
import { LoadingSpinner } from './LoadingSpinner';

export const ToolsList = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [paginatedTools, setPaginatedTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const { recentTools, addToolToRecent } = useRecentTools();

  useEffect(() => {
    const loadTools = async () => {
      setIsLoading(true);
      const data = await fetchTools();
      setTools(data);
      setFilteredTools(data);
      setIsLoading(false);
    };
    loadTools();
  }, []);

  const handleToolClick = (tool: Tool) => {
    setSelectedTool(tool);
    addToolToRecent(tool);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <SearchBar tools={tools} onFilteredToolsChange={setFilteredTools} />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
          {paginatedTools.map((tool) => (
            <ToolCard key={tool.app_id} tool={tool} onClick={handleToolClick} />
          ))}
        </div>
      )}

      <ToolsPagination
        tools={filteredTools}
        itemsPerPage={12}
        onPaginatedToolsChange={setPaginatedTools}
      />

      <ToolModal
        tool={selectedTool}
        isOpen={!!selectedTool}
        onClose={() => setSelectedTool(null)}
        recentTools={recentTools}
      />
    </div>
  );
};
