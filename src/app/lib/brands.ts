export type Brand = {
  id: number | string;
  name: string;
  slug: string;
  logo: string;
};

export const BRANDS_API_URL =
  import.meta.env.VITE_BRANDS_API_URL ?? "http://localhost:3000/api/brands";

export async function fetchBrands(signal?: AbortSignal): Promise<Brand[]> {
  const response = await fetch(BRANDS_API_URL, { signal });

  if (!response.ok) {
    throw new Error(`Unable to load brands (${response.status}).`);
  }

  const data = (await response.json()) as unknown;

  if (!Array.isArray(data)) {
    throw new Error("Invalid brands response format.");
  }

  return data as Brand[];
}
