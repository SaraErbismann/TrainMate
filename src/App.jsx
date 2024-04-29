import Navbar from './components/Navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

//create a client instance with QueryClient
const queryClient = new QueryClient();

function App() {
  

  //Navbar goes inside the Query client
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
