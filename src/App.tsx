import { ToolsList } from '@/components/ToolsList';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { ModeToggle } from '@/components/ui/mode-toggle';

// Aos avaliadores, o desgin foi baseado no design do site da Pluga. (eu tentei)
const App = () => {
  return (
    <ThemeProvider defaultTheme='light' storageKey='pluga-theme'>
      <main className='min-h-screen bg-background'>
        <div className='absolute top-4 right-4'>
          <ModeToggle />
        </div>
        <h1 className='text-3xl font-bold text-center pt-8 pb-2 text-blue-600'>
          Ferramentas Pluga
        </h1>
        <p className='text-center text-muted-foreground mb-8'>
          Integre em um passe de mágica as ferramentas web que você mais usa. 💙
        </p>
        <ToolsList />
      </main>
    </ThemeProvider>
  );
};

export default App;
