import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomesDashboard from './components/HomesDashboard';
import UserDashboard from './components/UserDashboard';
import Home from './components/Home';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
const queryClient = new QueryClient();
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/homes" element={<HomesDashboard />}/>
        <Route path="/users" element={<UserDashboard />}/>
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
