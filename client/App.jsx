import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GroupPage from "./pages/GroupPage";
const queryClient = new QueryClient();
const localFontFaces = `
  @import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap');
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/inter-400.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/inter-500.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/inter-600.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/inter-700.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/inter-800.ttf') format('truetype');
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'DM Sans';
    src: url('/fonts/dm-sans-400.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'DM Sans';
    src: url('/fonts/dm-sans-500.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'DM Sans';
    src: url('/fonts/dm-sans-600.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'DM Sans';
    src: url('/fonts/dm-sans-700.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
`;
const App = () => (<QueryClientProvider client={queryClient}>
    <style>{localFontFaces}</style>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}/>
          <Route path="/group" element={<GroupPage />}/>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>);
createRoot(document.getElementById("root")).render(<App />);
