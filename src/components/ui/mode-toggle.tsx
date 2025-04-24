import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './theme-provider';
import toggleSound from '@/assets/toggle-sound.wav';
import { useRef } from 'react';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const audioRef = useRef<HTMLAudioElement>(new Audio(toggleSound));

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <Button
      variant='ghost'
      size='icon'
      className='cursor-pointer'
      onClick={handleThemeToggle}
    >
      <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Alternar tema</span>
    </Button>
  );
}
