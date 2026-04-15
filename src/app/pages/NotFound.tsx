import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="min-h-screen pt-28 md:pt-32 flex items-center justify-center">
      <div className="container-shell text-center section-block">
        <h1 className="text-[clamp(4rem,14vw,8rem)] font-bold text-primary mb-4">404</h1>
        <h2 className="text-[clamp(1.5rem,3.5vw,2.2rem)] font-bold mb-4">Page Not Found</h2>
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
