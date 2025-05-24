import { ThemeProvider } from "@/contexts/ThemeContext";
import AppRoutes from "@/routes";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
    const queryClient = new QueryClient({});

    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
                <QueryClientProvider client={queryClient}>
                    <AppRoutes />
                    <Toaster />
                </QueryClientProvider>
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;
