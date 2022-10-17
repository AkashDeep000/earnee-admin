import {
  useState
} from 'react'
import Header from "@/components/Header"
import Tool from "@/components/Tool"
import Login from "@/components/Login"
import pb from "@/pb"
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

function App() {
const queryClient = new QueryClient();

  return (
        <QueryClientProvider client={queryClient}>
    <div className="App">
    {pb.authStore.isValid ?
    (
      <>
      <Header />
      <Tool />
      < />
      ): < Login/ >
      }
    </div>
    </QueryClientProvider>
  )
}

export default App