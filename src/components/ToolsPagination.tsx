import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Tool } from '@/types/tools';
import { useState, useEffect } from 'react';

interface ToolsPaginationProps {
  tools: Tool[];
  itemsPerPage: number;
  onPaginatedToolsChange: (paginatedTools: Tool[]) => void;
}

export const ToolsPagination = ({
  tools,
  itemsPerPage,
  onPaginatedToolsChange,
}: ToolsPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // cálculo do total de páginas dividindo o total de itens pelo número de itens por página
  // o math.ceil vai arredondar pra cima
  const totalPages = Math.ceil(tools.length / itemsPerPage);

  useEffect(() => {
    // pegar os itens da página atual usando o slice (se for página 1, pegar os 10 primeiros itens, se for página 2, pegar os 10 itens seguintes, etc)
    const paginatedTools = tools.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    onPaginatedToolsChange(paginatedTools);
  }, [currentPage, tools, itemsPerPage, onPaginatedToolsChange]);

  // resetar para a primeira página quando o mudar a lista de ferramentas
  useEffect(() => {
    setCurrentPage(1);
  }, [tools.length]);
  return (
    <Pagination className='justify-center mt-8'>
      <PaginationContent className='text-muted-foreground'>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            className={`${
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            } hover:bg-muted`}
          />
        </PaginationItem>
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
        <PaginationItem>
          <PaginationNext
            href='#'
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            className={`${
              currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
            } hover:bg-muted`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
