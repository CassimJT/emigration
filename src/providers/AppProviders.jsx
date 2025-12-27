import { QueryClientProvider } from "./QueryClientProvider";
import { AuthProvider } from "./AuthProvider";

export function AppProviders({ children }) {
  return (
    <QueryClientProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}

