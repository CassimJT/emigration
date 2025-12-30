import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>

      <p className="mt-4 text-xl font-semibold">
        Page Not Found
      </p>

      <p className="mt-2 text-muted-foreground max-w-md">
        The page you are looking for does not exist or may have been moved.
        Please check the URL or return to the homepage.
      </p>

      <div className="mt-8">
        <Button asChild>
          <Link to="/">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
