import { Tool } from '@/types/tools';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ExternalLink } from 'lucide-react';

interface ToolModalProps {
  tool: Tool | null;
  isOpen: boolean;
  onClose: () => void;
  recentTools: Tool[];
}

export const ToolModal = ({
  tool,
  isOpen,
  onClose,
  recentTools,
}: ToolModalProps) => {
  if (!tool) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-md p-0 gap-0 rounded-lg overflow-hidden bg-background border-none'>
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

          {recentTools.length > 0 && (
            <div className='mt-4'>
              <hr className='border-gray-200' />
              <h3 className='text-base font-medium text-muted-foreground mb-6 mt-4'>
                Últimas ferramentas visualizadas
              </h3>
              <div className='grid grid-cols-3 gap-4'>
                {recentTools.map((recentTool) => (
                  <div
                    key={recentTool.app_id}
                    className='flex flex-col items-center'
                  >
                    <div
                      className='w-12 h-12 flex items-center justify-center rounded-lg mb-2'
                      style={{ backgroundColor: recentTool.color }}
                    >
                      <img
                        src={recentTool.icon}
                        alt={`Ícone do ${recentTool.name}`}
                        className='w-6 h-6'
                      />
                    </div>
                    <span className='text-sm text-foreground text-center truncate w-full'>
                      {recentTool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
