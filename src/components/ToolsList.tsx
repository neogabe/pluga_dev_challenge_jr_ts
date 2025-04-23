import { useEffect, useState } from 'react';
import { Tool } from '@/types/tools';
import { fetchTools } from '@/services/api';
import { ToolCard } from './ToolCard';
import { Input } from '@/components/ui/input';

export const ToolsList = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // carrega as ferramentas retornadas pela api da pluga
  useEffect(() => {
    const loadTools = async () => {
      const data = await fetchTools();
      setTools(data);
    };
    loadTools();
  }, []);

  // essa função filtra baseado no nome da ferramente
  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLocaleLowerCase())
  );

  // essa função seleciona apenas os itens da página atual
  const paginatedTools = filteredTools.slice(
    (currentPage - 1) * itemsPerPage, //inicio da pagina
    currentPage * itemsPerPage //fim da pagina
  );

  // função que é chamada quando o card for clicado
  const handleToolClick = (tool: Tool) => {
    console.log('O card foi clicado', tool);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* input de busca */}
      <div className='mb-8'>
        <Input
          type='text'
          placeholder='Buscar +100 ferramentas'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='max-w-md mx-auto border-1 border-gray-300 focus:border-blue-500 focus-visible:ring-0'
        />
      </div>
      {/* grid de cards das ferramentas */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {paginatedTools.map((tool) => (
          <ToolCard key={tool.app_id} tool={tool} onClick={handleToolClick} />
        ))}
      </div>
    </div>
  );
};
