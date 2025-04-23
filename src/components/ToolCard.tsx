import { Tool } from '@/types/tools';

interface ToolCardProps {
  tool: Tool;
  onClick: (tool: Tool) => void;
}

export const ToolCard = ({ tool, onClick }: ToolCardProps) => {
  return (
    <div
      className='flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer transition-all hover:scale-105'
      style={{ backgroundColor: tool.color }}
      onClick={() => onClick(tool)}
    >
      <img
        src={tool.icon}
        alt={`${tool.name} ícone`}
        className='w-16 h-16 mb-4'
      />
      <h3 className='text-center text-white font-medium'>{tool.name}</h3>
    </div>
  );
};
