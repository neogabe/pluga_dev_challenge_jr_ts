import { ToolsList } from '@/components/ToolsList';

// Aos avaliadores, o desgin foi baseado no design do site da Pluga. (eu tentei)
const App = () => {
  return (
    <main className='min-h-screen bg-gray-50'>
      <h1 className='text-3xl font-bold text-center pt-8 pb-2 text-blue-600'>
        Ferramentas Pluga
      </h1>
      <p className='text-center text-gray-600 mb-8'>
        Integre em um passe de mágica as ferramentas web que você mais usa. 💙
      </p>
      <ToolsList />
    </main>
  );
};

export default App;
