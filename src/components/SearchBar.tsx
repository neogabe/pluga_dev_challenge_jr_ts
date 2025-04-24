import { Input } from '@/components/ui/input';
import { Tool } from '@/types/tools';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SearchBarProps {
  tools: Tool[];
  onFilteredToolsChange: (filteredTools: Tool[]) => void;
}

export const SearchBar = ({ tools, onFilteredToolsChange }: SearchBarProps) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const filtered = tools.filter((tool) =>
      tool.name.toLowerCase().includes(search.toLowerCase())
    );
    onFilteredToolsChange(filtered);
  }, [search, tools, onFilteredToolsChange]);

  return (
    <div className='mb-8 relative max-w-md mx-auto'>
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
        <Input
          type='text'
          placeholder='Buscar +100 ferramentas'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='pl-10 max-w-md mx-auto border-1 border-gray-300 focus:border-blue-500 focus-visible:ring-0'
        />
      </div>
    </div>
  );
};
