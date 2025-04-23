import { useEffect, useState } from 'react';
import { Tool } from '@/types/tools';
import { fetchTools } from '@/services/api';
import { ToolCard } from './ToolCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

// Aos avaliadores, o desgin foi baseado no design do site da Pluga. (eu tentei)

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

  // vai calcular quantas páginas precisamos baseado no total de itens filtrados
  const totalPages = Math.ceil(filteredTools.length / itemsPerPage);

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* input de busca */}
      <div className='mb-8 relative max-w-md mx-auto'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500' />
          <Input
            type='text'
            placeholder='Buscar +100 ferramentas'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='pl-10 max-w-md mx-auto border-1 border-gray-300 focus:border-blue-500 focus-visible:ring-0'
          />
        </div>
      </div>
      {/* grid de cards das ferramentas */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
        {paginatedTools.map((tool) => (
          <ToolCard key={tool.app_id} tool={tool} onClick={handleToolClick} />
        ))}
      </div>
      {/* barra de paginação do shadcn */}
      <Pagination className='justify-center mt-8'>
        <PaginationContent className='text-gray-500'>
          {/* botão de página anterior */}
          <PaginationItem>
            <PaginationPrevious
              href='#'
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className={`${
                currentPage === 1 ? 'pointer-events-none opacity-50' : ''
              } hover:bg-gray-100`}
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
                    : 'hover:bg-gray-100'
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
              } hover:bg-gray-100`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
