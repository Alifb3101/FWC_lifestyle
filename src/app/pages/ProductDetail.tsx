import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useParams } from "react-router";
import {
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  Check,
  Star,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { PRODUCTS_API_URL } from "../lib/products";

type ProductApiResponse = {
  id: number;
  name: string;
  slug: string;
  sku: string;
  modelNumber: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice: number | null;
  discountPercent: number | null;
  currency: string;
  stock: number;
  availability: string;
  thumbnail: string;
  images: string[];
  rating: number;
  reviewCount: number;
  watchDescription?: string | null;
  brand: {
    name: string;
    slug: string;
  };
  category: {
    name: string;
    slug: string;
  };
  specifications?: Record<string, string | number | boolean | null>;
  strap?: Record<string, string | number | boolean | null>;
};

type TabKey = "details" | "specs" | "shipping";

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState("");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<TabKey>("details");
  const tabs: Array<{ id: TabKey; label: string }> = [
    { id: "details", label: "Description" },
    { id: "specs", label: "Specifications" },
    { id: "shipping", label: "Shipping & Return" },
  ];

  useEffect(() => {
    if (!id) {
      setError("Invalid product id.");
      setLoading(false);
      return;
    }

    const productId = id;

    const controller = new AbortController();

    async function loadProduct() {
      try {
        setLoading(true);
        const response = await fetch(`${PRODUCTS_API_URL}/${encodeURIComponent(productId)}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Unable to load product (${response.status}).`);
        }

        const data = (await response.json()) as ProductApiResponse;
        setProduct(data);
        setActiveImage(data.images[0] ?? data.thumbnail);
        setQty(1);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError("Failed to load product details from API.");
      } finally {
        setLoading(false);
      }
    }

    void loadProduct();

    return () => controller.abort();
  }, [id]);

  const savings = useMemo(() => {
    if (!product || !product.originalPrice || product.originalPrice <= product.price) {
      return 0;
    }

    return product.originalPrice - product.price;
  }, [product]);

  const specs = useMemo(() => {
    if (!product) {
      return [] as Array<[string, string | number | boolean | null]>;
    }

    return [
      ...Object.entries(product.specifications ?? {}),
      ...Object.entries(product.strap ?? {}),
    ];
  }, [product]);

  const gallery = useMemo(() => {
    if (!product) {
      return [] as string[];
    }

    return product.images.length > 0 ? product.images : [product.thumbnail];
  }, [product]);

  const increase = () => {
    if (!product) {
      return;
    }

    if (qty < product.stock) setQty((p) => p + 1);
  };

  const decrease = () => {
    if (qty > 1) setQty((p) => p - 1);
  };

  if (loading) {
    return (
      <div className="bg-[#f8f8f6] min-h-screen">
        <div className="max-w-[1450px] mx-auto px-4 md:px-8 lg:px-10 py-10">
          <div className="h-[36rem] rounded-3xl border border-gray-200 bg-white animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-[#f8f8f6] min-h-screen">
        <div className="max-w-[1450px] mx-auto px-4 md:px-8 lg:px-10 py-10">
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
            {error ?? "Product not found."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f8f6] text-[#111827] min-h-screen">
      {/* Container */}
      <div className="max-w-[1450px] mx-auto px-4 md:px-8 lg:px-10 py-8">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-[12px] tracking-[0.22em] uppercase text-gray-500 mb-8">
          <span>Home</span>
          <ChevronRight size={14} />
          <span>{product.category.name}</span>
          <ChevronRight size={14} />
          <span className="text-[#0f172a] font-medium">{product.name}</span>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* LEFT IMAGES */}
          <div className="grid grid-cols-[90px_1fr] gap-4">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3 order-2 lg:order-1 overflow-auto">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`border rounded-xl p-2 bg-white transition ${
                    activeImage === img
                      ? "border-[#bfa37a] ring-1 ring-[#bfa37a]"
                      : "border-gray-200 hover:border-[#bfa37a]"
                  }`}
                >
                  <img
                    src={img}
                    alt="thumb"
                    className="w-16 h-16 object-contain mx-auto"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative bg-white rounded-3xl border border-gray-200 overflow-hidden order-1 lg:order-2">
              {(product.discountPercent ?? 0) > 0 && (
                <div className="absolute top-5 left-5 z-10 bg-[#b91c1c] text-white text-xs px-3 py-1 rounded-full tracking-wider">
                  -{product.discountPercent}%
                </div>
              )}

              <button className="absolute top-5 right-5 z-10 bg-white/90 backdrop-blur p-3 rounded-full border border-gray-200 hover:scale-105 transition">
                <Heart size={18} />
              </button>

              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-[500px] md:h-[650px] object-contain p-8"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col">
            {/* Brand */}
            <p className="text-[12px] tracking-[0.28em] uppercase text-[#8b7355] font-semibold mb-3">
              {product.brand.name}
            </p>

            {/* Name */}
            <h1 className="text-3xl md:text-5xl font-light leading-tight tracking-tight text-[#0f172a]">
              {product.name}
            </h1>

            {/* Short Description */}
            <p className="mt-5 text-gray-600 leading-7 text-[15px] max-w-xl">
              {product.shortDescription}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-5">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-[#d4af37] text-[#d4af37]"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.reviewCount > 0
                  ? `${product.rating} (${product.reviewCount} reviews)`
                  : "No reviews yet"}
              </span>
            </div>

            {/* Price */}
            <div className="mt-7 border-y border-gray-200 py-6">
              <div className="flex items-end gap-3 flex-wrap">
                <span className="text-4xl md:text-5xl font-light text-[#111827]">
                  {formatMoney(product.price, product.currency)}
                </span>

                  {(product.originalPrice ?? 0) > product.price && (
                  <span className="line-through text-gray-400 text-xl">
                      {formatMoney(product.originalPrice as number, product.currency)}
                  </span>
                )}
              </div>

                {savings > 0 && <div className="mt-2 text-sm text-emerald-700 font-medium">You save {formatMoney(savings, product.currency)}</div>}
            </div>

            {/* Stock */}
            <div className="mt-6 flex items-center gap-2">
              <Check size={16} className="text-emerald-600" />
              <span className="text-sm text-gray-700">
                {product.stock} pieces available
              </span>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <p className="text-sm font-medium mb-3 uppercase tracking-widest text-gray-500">
                Quantity
              </p>

              <div className="flex items-center gap-4">
                <div className="inline-flex items-center border border-gray-300 rounded-full overflow-hidden bg-white">
                  <button
                    onClick={decrease}
                    className="w-12 h-12 grid place-items-center hover:bg-gray-50"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="w-12 text-center font-medium">{qty}</span>

                  <button
                    onClick={increase}
                    className="w-12 h-12 grid place-items-center hover:bg-gray-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <button className="h-14 rounded-full bg-[#111827] text-white hover:opacity-95 transition flex items-center justify-center gap-2 tracking-wide">
                <ShoppingBag size={18} />
                Add to Bag
              </button>

              <button className="h-14 rounded-full border border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-white transition flex items-center justify-center gap-2 tracking-wide">
                <Share2 size={18} />
                Buy Now
              </button>
            </div>

            {/* Benefits */}
            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <FeatureCard
                icon={<Truck size={18} />}
                title="Free Delivery"
                text="Across UAE on premium orders"
              />
              <FeatureCard
                icon={<ShieldCheck size={18} />}
                title="Authentic"
                text="100% original timepieces"
              />
              <FeatureCard
                icon={<RotateCcw size={18} />}
                title="Easy Returns"
                text="Smooth exchange support"
              />
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-20">
          <div className="border-b border-gray-200 flex gap-8 overflow-auto">
            {tabs.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`pb-4 text-sm uppercase tracking-[0.22em] whitespace-nowrap transition ${
                  tab === item.id
                    ? "border-b-2 border-[#111827] text-[#111827]"
                    : "text-gray-500"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-10">
            {tab === "details" && (
              <div className="grid lg:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-2xl font-light mb-4">About This Watch</h3>
                  <p className="text-gray-600 leading-8">
                    {product.description}
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-3xl p-8">
                  <h4 className="font-medium mb-4">Highlights</h4>

                  <ul className="space-y-4 text-sm text-gray-600">
                    <li>• Signature textured dial finish</li>
                    <li>• Premium polished steel construction</li>
                    <li>• Ideal for business & formal styling</li>
                    <li>• Reliable precision movement</li>
                    <li>• Luxury gifting presentation</li>
                  </ul>
                </div>
              </div>
            )}

            {tab === "specs" && (
              <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
                {specs.map(([key, value], i) => (
                  <div
                    key={key}
                    className={`grid grid-cols-2 px-6 md:px-8 py-4 ${
                      i !== specs.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <span className="capitalize text-gray-500">
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                    <span className="font-medium text-[#111827]">{String(value ?? "-")}</span>
                  </div>
                ))}
              </div>
            )}

            {tab === "shipping" && (
              <div className="grid md:grid-cols-2 gap-8">
                <InfoBox
                  title="Shipping"
                  text="Orders are processed quickly and dispatched with secure tracked delivery. Premium packaging included."
                />
                <InfoBox
                  title="Returns"
                  text="Easy return and exchange process subject to store policy. Product must remain unused and complete."
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable Components */

function InfoBox({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-8">
      <h3 className="text-xl font-light mb-4">{title}</h3>
      <p className="text-gray-600 leading-8">{text}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4">
      <div className="w-10 h-10 rounded-full bg-gray-100 grid place-items-center mb-3">{icon}</div>
      <h4 className="text-sm font-semibold text-[#111827]">{title}</h4>
      <p className="text-xs text-gray-500 mt-1 leading-6">{text}</p>
    </div>
  );
}