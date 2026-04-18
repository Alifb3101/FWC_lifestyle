import { useEffect, useState } from "react";
import { fetchHomepage, type HomepageData } from "../lib/homepage";

type UseHomepageResult = {
  homepage: HomepageData | null;
  loading: boolean;
  error: string | null;
};

export function useHomepage(): UseHomepageResult {
  const [homepage, setHomepage] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadHomepage() {
      try {
        setLoading(true);
        const result = await fetchHomepage(controller.signal);
        setHomepage(result);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError("We could not load homepage data right now. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    void loadHomepage();

    return () => {
      controller.abort();
    };
  }, []);

  return { homepage, loading, error };
}
