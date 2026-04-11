import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded font-semibold hover:bg-primary/90 transition-colors"
        >
          RETURN HOME
        </Link>
      </div>
    </div>
  );
}
