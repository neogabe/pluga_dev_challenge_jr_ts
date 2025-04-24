import { useEffect, useState } from 'react';
import { Tool } from '@/types/tools';
import { fetchTools } from '@/services/api';
import { ToolCard } from './ToolCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ToolModal } from './ToolModal';
import { useRecentTools } from '@/hooks/useRecentTools';
import { LoadingSpinner } from './LoadingSpinner';
import { SearchBar } from './SearchBar';

// Aos avaliadores, o desgin foi baseado no design do site da Pluga. (eu tentei)
export const ToolsList = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { recentTools, addToolToRecent } = useRecentTools();

  // carrega as ferramentas retornadas pela api da pluga
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

  // essa função seleciona apenas os itens da página atual
  const paginatedTools = filteredTools.slice(
    (currentPage - 1) * itemsPerPage, //inicio da pagina
    currentPage * itemsPerPage //fim da pagina
  );

  // função que é chamada quando o card for clicado
  const handleToolClick = (tool: Tool) => {
    setSelectedTool(tool);
    addToolToRecent(tool);
  };

  // vai calcular quantas páginas precisamos baseado no total de itens filtrados
  const totalPages = Math.ceil(filteredTools.length / itemsPerPage);

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* input de busca */}
      <SearchBar tools={tools} onFilteredToolsChange={setFilteredTools} />
      {/* grid de cards das ferramentas */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
          {paginatedTools.map((tool) => (
            <ToolCard key={tool.app_id} tool={tool} onClick={handleToolClick} />
          ))}
        </div>
      )}
      {/* barra de paginação do shadcn */}
      <Pagination className='justify-center mt-8'>
        <PaginationContent className='text-muted-foreground'>
          {/* botão de página anterior */}
          <PaginationItem>
            <PaginationPrevious
              href='#'
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className={`${
                currentPage === 1 ? 'pointer-events-none opacity-50' : ''
              } hover:bg-muted`}
            />
          </PaginationItem>
          {/* números das páginas */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href='#'
                onClick={() => setCurrentPage(page)}
                isActive={currentPage === page}
                className={
                  currentPage === page
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'hover:bg-muted'
                }
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {/* botão de próxima página */}
          <PaginationItem>
            <PaginationNext
              href='#'
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              className={`${
                currentPage === totalPages
                  ? 'pointer-events-none opacity-50'
                  : ''
              } hover:bg-muted`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <ToolModal
        tool={selectedTool}
        isOpen={!!selectedTool}
        onClose={() => setSelectedTool(null)}
        recentTools={recentTools}
      />
    </div>
  );
};
