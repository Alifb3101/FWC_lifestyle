import {
  Check,
  Minus,
  Plus,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Heart,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ProductDetailData } from "./types";

type ProductInfoProps = {
  product: ProductDetailData;
};

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

// ─── Serif display font applied via inline style for portability ───────────────
const serif = { fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" };

export function ProductInfo({ product }: ProductInfoProps) {
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const savings = useMemo(() => {
    if (!product.originalPrice || product.originalPrice <= product.price) return 0;
    return product.originalPrice - product.price;
  }, [product.originalPrice, product.price]);

  const inStock = product.availability === "in_stock" && product.stock > 0;

  return (
    <div className="pb-28 md:pb-0">

      {/* ── Brand & Category ── */}
      <div className="flex items-center justify-between">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-neutral-400">
          {product.brand.name}
        </p>
        <button
          type="button"
          className="text-[0.68rem] uppercase tracking-[0.2em] text-neutral-400 underline underline-offset-4 hover:text-neutral-700 transition-colors"
        >
          View brand
        </button>
      </div>

      {/* ── Product Name ── */}
      <h1
        className="mt-3 text-[2.4rem] leading-[1.05] tracking-[-0.02em] text-neutral-900 md:text-[3.2rem]"
        style={serif}
      >
        {product.name}
      </h1>

      {/* ── SKU / Model ── */}
      <p className="mt-2.5 text-[0.72rem] uppercase tracking-[0.18em] text-neutral-400">
        SKU {product.sku}
        {product.modelNumber ? (
          <span className="ml-3 pl-3 border-l border-neutral-300">{product.modelNumber}</span>
        ) : null}
      </p>

      {/* ── Short Description ── */}
      <p className="mt-5 max-w-[38ch] text-[0.94rem] leading-[1.8] text-neutral-600">
        {product.shortDescription}
      </p>

      {/* ── Divider ── */}
      <div className="mt-8 h-px w-full bg-neutral-200" />

      {/* ── Pricing block ── */}
      <div className="mt-6">
        <div className="flex flex-wrap items-end gap-3">
          <p
            className="text-[2.6rem] leading-none tracking-[-0.03em] text-neutral-900"
            style={serif}
          >
            {formatMoney(product.price, product.currency)}
          </p>

          {(product.originalPrice ?? 0) > product.price && (
            <p className="mb-1 text-[1.1rem] leading-none text-neutral-400 line-through">
              {formatMoney(product.originalPrice as number, product.currency)}
            </p>
          )}

          {(product.discountPercent ?? 0) > 0 && (
            <span className="mb-1 rounded-sm border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {product.discountPercent}% off
            </span>
          )}
        </div>

        {savings > 0 && (
          <p className="mt-2 text-[0.8rem] font-medium text-emerald-700">
            You save {formatMoney(savings, product.currency)}
          </p>
        )}
      </div>

      {/* ── Availability ── */}
      <div className="mt-5 flex items-center gap-2">
        <span
          className={`inline-flex h-2 w-2 rounded-full ${inStock ? "bg-emerald-500" : "bg-red-400"}`}
        />
        <span className={`text-[0.82rem] font-medium ${inStock ? "text-emerald-700" : "text-red-500"}`}>
          {inStock ? `${product.stock} pieces in stock` : "Out of stock"}
        </span>
      </div>

      {/* ── Divider ── */}
      <div className="mt-7 h-px w-full bg-neutral-200" />

      {/* ── Quantity ── */}
      <div className="mt-6">
        <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-neutral-400">
          Quantity
        </p>
        <div className="inline-flex h-11 items-center rounded-full border border-neutral-200 bg-white">
          <button
            type="button"
            onClick={() => setQty((v) => Math.max(1, v - 1))}
            className="grid h-11 w-11 place-items-center rounded-full text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-9 text-center text-[0.9rem] font-semibold text-neutral-900">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((v) => Math.min(Math.max(product.stock, 1), v + 1))}
            className="grid h-11 w-11 place-items-center rounded-full text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ── CTA Buttons — desktop ── */}
      <div className="mt-6 hidden flex-col gap-3 sm:flex">
        <button
          type="button"
          disabled={!inStock}
          className="inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-neutral-900 px-8 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-200 hover:bg-neutral-700 disabled:opacity-40"
          style={{ height: "3.125rem" }}
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2.5 rounded-full border border-neutral-900 px-8 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-neutral-900 transition-all duration-200 hover:bg-neutral-900 hover:text-white"
          style={{ height: "3.125rem" }}
        >
          Buy Now
        </button>
      </div>

      {/* ── Secondary actions — desktop ── */}
      <div className="mt-4 hidden items-center gap-2 sm:flex">
        <button
          type="button"
          onClick={() => setWishlisted((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.78rem] font-medium tracking-[0.08em] transition-all duration-200 ${
            wishlisted
              ? "border-rose-300 bg-rose-50 text-rose-500"
              : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
          }`}
        >
          <Heart className={`h-3.5 w-3.5 ${wishlisted ? "fill-rose-400" : ""}`} />
          {wishlisted ? "Wishlisted" : "Wishlist"}
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2.5 text-[0.78rem] font-medium tracking-[0.08em] text-neutral-600 hover:border-neutral-400 transition-all duration-200"
        >
          <Share2 className="h-3.5 w-3.5" />
          Share
        </button>
      </div>

      {/* ── Trust badges ── */}
      <div className="mt-8 grid grid-cols-3 gap-2.5">
        <TrustBadge icon={<Truck className="h-4 w-4" />} title="Free Delivery" text="Across UAE" />
        <TrustBadge icon={<ShieldCheck className="h-4 w-4" />} title="100% Authentic" text="Guaranteed original" />
        <TrustBadge icon={<Check className="h-4 w-4" />} title="Easy Returns" text="Hassle-free" />
      </div>

      {/* ── Mobile sticky bar ── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur-sm sm:hidden">
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            disabled={!inStock}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-neutral-900 text-[0.78rem] font-semibold uppercase tracking-[0.15em] text-white disabled:opacity-40 transition-all"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </button>
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-neutral-900 text-[0.78rem] font-semibold uppercase tracking-[0.15em] text-neutral-900 transition-all hover:bg-neutral-900 hover:text-white"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Trust Badge ──────────────────────────────────────────────────────────────
type TrustBadgeProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

function TrustBadge({ icon, title, text }: TrustBadgeProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 px-3.5 py-4 transition-all duration-200 hover:border-neutral-300 hover:bg-white hover:shadow-sm">
      <div className="text-neutral-600">{icon}</div>
      <div>
        <p className="text-[0.78rem] font-semibold text-neutral-900 leading-tight">{title}</p>
        <p className="mt-0.5 text-[0.7rem] text-neutral-500 leading-tight">{text}</p>
      </div>
    </div>
  );
}