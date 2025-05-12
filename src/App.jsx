import { ThemeProvider } from "@/contexts/ThemeContext";
import AppRoutes from "@/routes";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "react-error-boundary";

function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
                <AppRoutes />
                <Toaster />
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;
