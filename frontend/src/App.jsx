import './App.css'
import Dashboard from './components/Dashboard'
import Edit from './components/EditModal'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
const queryClient = new QueryClient()
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard/>
  </QueryClientProvider>
  )
}

export default App
