import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Brunch from "./pages/Brunch";
import Lunch from "./pages/Lunch";
import Contact from "./pages/Contact";
import Questions from "./pages/questions"; // <--- الصفحة الجديدة
import NotFound from "./pages/NotFound";
// Admin pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lunch" element={<Lunch />} />
          <Route path="/brunch" element={<Brunch />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/questions" element={<Questions />} /> {/* <--- جديد */}
          
          {/* Admin routes */}
          <Route path="/admin/login" element={
            <ProtectedRoute requireAuth={false}>
              <AdminLogin />
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute requireAuth={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
