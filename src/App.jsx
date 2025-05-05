import { ThemeProvider } from "@/contexts/ThemeContext";
import AppRoutes from "@/routes";
import { Toaster } from "@/components/ui/sonner";

function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <AppRoutes />
            <Toaster />
        </ThemeProvider>
    );
}

export default App;
