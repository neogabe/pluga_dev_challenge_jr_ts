import { Tool } from '@/types/tools';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ExternalLink } from 'lucide-react';

interface ToolModalProps {
  tool: Tool | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ToolModal = ({ tool, isOpen, onClose }: ToolModalProps) => {
  if (!tool) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-md p-0 gap-0 rounded-lg overflow-hidden bg-white border-none'>
        <div
          className='p-6 flex items-center justify-between'
          style={{ backgroundColor: tool.color }}
        >
          <div className='flex items-center gap-4'>
            <img
              src={tool.icon}
              alt={`${tool.name} icon`}
              className='w-10 h-10'
            />
            <span className='text-2xl font-semibold text-white'>
              {tool.name}
            </span>
          </div>
        </div>

        <div className='p-6 flex flex-col gap-4'>
          <button
            className='w-full py-3 px-4 bg-[#00e173] hover:bg-[#00c863] transition-colors text-white font-medium rounded-md flex items-center justify-center gap-2 cursor-pointer border-none outline-none'
            onClick={() => window.open(tool.link, '_blank')}
          >
            Acessar ferramenta <ExternalLink size={16} />
          </button>

          <hr className='border-gray-200' />

          <div className=''>
            <h3 className='text-base font-medium text-gray-900 mb-4'>
              Últimas ferramentas visualizadas
            </h3>
            <div className='flex gap-4'>
              {/* aqui vai o histórico */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
