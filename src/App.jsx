import { ThemeProvider } from "@/contexts/ThemeContext";
import AppRoutes from "@/routes";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorFallback from "./features/ErrorFallback";

function App() {
    const queryClient = new QueryClient({});

    const handleReset = () => {
        window.location.reload();
    };

    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
                <QueryClientProvider client={queryClient}>
                    <AppRoutes />
                    <Toaster />
                </QueryClientProvider>
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;
