import { useState } from "react";
import { Link } from "react-router";
import { formatPrice, type Product } from "../../lib/products";

type ProductCardProps = {
  item: Product;
};

function isNewProduct(createdAt: string) {
  const created = Date.parse(createdAt);
  if (Number.isNaN(created)) return false;
  const days = (Date.now() - created) / (1000 * 60 * 60 * 24);
  return days <= 120;
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-3 w-3 ${
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-transparent text-gray-300"
            }`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeWidth="1.5"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        ))}
      </div>
      {count > 0 && (
        <span className="text-[11px] text-muted-foreground">({count})</span>
      )}
    </div>
  );
}

export function ProductCard({ item }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImage, setActiveImage] = useState(item.thumbnail);

  const isNew = isNewProduct(item.createdAt);
  const hasDiscount =
    item.discountPercent && item.discountPercent > 0;
  const isOutOfStock = item.availability === "out_of_stock";
  const isLowStock = item.stock > 0 && item.stock <= 5;

  // Collect all unique images: thumbnail first, then extras
  const allImages = [
    item.thumbnail,
    ...item.images.filter((img) => img !== item.thumbnail),
  ].filter(Boolean);

  return (
    <article className="product-card group relative flex flex-col bg-transparent">
      {/* ── Image Block ── */}
      <Link
        to={`/product/${item.slug}`}
        className="block"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="product-card__image-wrap relative aspect-[1/1.18] overflow-hidden bg-[#f0f0ee]">
          {/* Main image */}
          <img
            src={imgError ? item.thumbnail : activeImage}
            alt={item.name}
            onError={() => setImgError(true)}
            className={`product-card__img h-full w-full object-contain transition-all duration-700 ease-out group-hover:scale-[1.04] ${
              isOutOfStock ? "opacity-60 grayscale-[40%]" : ""
            }`}
            loading="lazy"
          />

          {/* Gradient veil on hover for quick-action visibility */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* ── Badge Row ── */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {isNew && !hasDiscount && (
              <span className="product-card__badge product-card__badge--new">
                New
              </span>
            )}
            {hasDiscount && (
              <span className="product-card__badge product-card__badge--sale">
                -{item.discountPercent}%
              </span>
            )}
            {isOutOfStock && (
              <span className="product-card__badge product-card__badge--soldout">
                Sold Out
              </span>
            )}
            {isLowStock && !isOutOfStock && (
              <span className="product-card__badge product-card__badge--lowstock">
                Only {item.stock} left
              </span>
            )}
          </div>

          {/* ── Wishlist Button ── */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted((v) => !v);
            }}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="product-card__wishlist absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-md"
          >
            <svg
              className={`h-4 w-4 transition-colors duration-200 ${
                isWishlisted
                  ? "fill-red-500 text-red-500"
                  : "fill-transparent text-gray-500 group-hover:text-gray-700"
              }`}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
              />
            </svg>
          </button>

          {/* ── Thumbnail Strip (shown on hover when multiple images exist) ── */}
          {allImages.length > 1 && (
            <div className="product-card__thumbstrip absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {allImages.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  onMouseEnter={() => setActiveImage(img)}
                  onMouseLeave={() => setActiveImage(item.thumbnail)}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveImage(img);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    activeImage === img ? "w-6 bg-foreground" : "w-1.5 bg-foreground/30"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* ── Info Block ── */}
      <div className="flex flex-1 flex-col px-0.5 pb-1 pt-3">
        {/* Brand */}
        {item.brand?.name && (
          <Link
            to={`/brands/${item.brand.slug}`}
            className="mb-1 inline-block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
          >
            {item.brand.name}
          </Link>
        )}

        {/* Product Name */}
        <Link to={`/product/${item.slug}`}>
          <h3 className="line-clamp-2 text-[0.95rem] font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
            {item.name}
          </h3>
        </Link>

        {/* Short description — subtle, single line */}
        {item.shortDescription && (
          <p className="mt-1 line-clamp-1 text-[11px] leading-relaxed text-muted-foreground">
            {item.shortDescription}
          </p>
        )}

        {/* Rating */}
        {(item.rating > 0 || item.reviewCount > 0) && (
          <div className="mt-1.5">
            <StarRating rating={item.rating} count={item.reviewCount} />
          </div>
        )}

        {/* Spacer pushes price to bottom */}
        <div className="flex-1" />

        {/* Price Row */}
        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-[1rem] font-semibold text-foreground">
              {formatPrice(item.price, item.currency)}
            </span>
            {hasDiscount && item.originalPrice && (
              <span className="text-[0.8rem] text-muted-foreground line-through">
                {formatPrice(item.originalPrice, item.currency)}
              </span>
            )}
          </div>

          {/* Quick Add / Out-of-stock CTA */}
          <Link
            to={`/product/${item.slug}`}
            className={`product-card__cta shrink-0 rounded-sm px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-all duration-200 ${
              isOutOfStock
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-foreground text-background hover:bg-primary hover:text-primary-foreground"
            }`}
            onClick={isOutOfStock ? (e) => e.preventDefault() : undefined}
          >
            {isOutOfStock ? "Sold Out" : "View"}
          </Link>
        </div>

        {/* Variant color swatches */}
        {item.variants && item.variants.length > 0 && (
          <div className="mt-2 flex items-center gap-1.5">
            {item.variants.slice(0, 5).map((variant, idx) => (
              <span
                key={idx}
                title={variant.name ?? `Variant ${idx + 1}`}
                className="h-4 w-4 rounded-full border border-border"
                style={{ backgroundColor: variant.color ?? "#ccc" }}
              />
            ))}
            {item.variants.length > 5 && (
              <span className="text-[10px] text-muted-foreground">
                +{item.variants.length - 5}
              </span>
            )}
          </div>
        )}

        {/* SKU — ultra-subtle, helps shop staff */}
        {item.sku && (
          <p className="mt-2 text-[9.5px] uppercase tracking-widest text-muted-foreground/50">
            {item.sku}
          </p>
        )}
      </div>

      {/* Scoped styles */}
      <style>{`
        .product-card {
          contain: layout style;
        }

        /* Image zoom handled by Tailwind group-hover above */

        /* Badges */
        .product-card__badge {
          display: inline-block;
          padding: 2px 8px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          border-radius: 2px;
          backdrop-filter: blur(4px);
        }
        .product-card__badge--new {
          background: rgba(0,0,0,0.82);
          color: #fff;
        }
        .product-card__badge--sale {
          background: #c0392b;
          color: #fff;
        }
        .product-card__badge--soldout {
          background: rgba(100,100,100,0.78);
          color: #fff;
        }
        .product-card__badge--lowstock {
          background: rgba(210,120,0,0.85);
          color: #fff;
        }

        /* Wishlist pulse on activate */
        .product-card__wishlist:active {
          transform: scale(0.88);
        }

        /* CTA hover lift */
        .product-card__cta:not([data-disabled]):hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        }

        /* Responsive: tighter padding on small screens */
        @media (max-width: 480px) {
          .product-card__badge {
            font-size: 9px;
            padding: 2px 6px;
          }
        }
      `}</style>
    </article>
  );
}
