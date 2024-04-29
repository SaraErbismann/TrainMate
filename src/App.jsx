import Navbar from './components/Navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  console.log("this is from App component");

  return (
    <>
      <QueryClientProvider client={queryClient}>
      <div className='App'>
        <Navbar />

      </div>
      </QueryClientProvider>
    </>
  )
}

export default App
