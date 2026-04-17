import { useState } from "react";
import { Link } from "react-router";
import { Search, Heart, User, ShoppingBag, Menu, X, MapPin, Phone } from "lucide-react";

const NAV_ITEMS = [
  { label: "Brands", to: "/brands" },
  { label: "Alarm Clocks", to: "/collections" },
  { label: "Men", to: "/men" },
  { label: "Women", to: "/women" },
  { label: "Couple Watch", to: "/couple-watch" },
  { label: "New Arrival", to: "/new-arrivals", isNew: true },
];

const TICKER_ITEMS = [
  "Certified Authentic Timepieces  ·  Est. Since 2015",
  "Free Shipping on Orders Over AED 500",
  "New Arrivals: TAG Heuer & Tissot Collections",
  "Exclusive Couples Collection Now Available",
];


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const leftNav = NAV_ITEMS.slice(0, 3);
  const rightNav = NAV_ITEMS.slice(3);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e6e0d8]">
      <style>{`
        .fwc-marquee {
          display: flex;
          width: max-content;
          animation: fwc-scroll 26s linear infinite;
        }
        .fwc-marquee:hover { animation-play-state: paused; }
        @keyframes fwc-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .fwc-search-transition {
          transition: width 0.35s cubic-bezier(.4,0,.2,1), opacity 0.35s cubic-bezier(.4,0,.2,1);
        }
      `}</style>

      <div className="overflow-hidden border-b border-[#27221b] bg-[#14110f] text-[#f5eee3]">
        <div className="hidden lg:block">
          <div className="fwc-marquee">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
              <span
                key={`${item}-${idx}`}
                className="flex items-center gap-2 px-10 py-2 text-[10px] font-medium uppercase tracking-[0.23em] text-[#f7f0e4]"
              >
                <span className="h-[3px] w-[3px] rounded-full bg-[#c8a96e]" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="px-4 py-2 text-center text-[9px] font-medium uppercase tracking-[0.2em] text-[#f7f0e4] lg:hidden">
          Certified Authentic Timepieces
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-between border-b border-[#e5ddd0] bg-[#f8f4ed] px-10 py-2 text-[10px] uppercase tracking-[0.18em] text-[#6f6458]">
        <div className="flex items-center gap-5">
          <Link to="/contact" className="inline-flex items-center gap-1.5 hover:text-[#9a7c4a] transition-colors">
            <MapPin className="h-3 w-3" />
            Store Locator
          </Link>
          <span className="h-3 w-px bg-[#d9d0c2]" />
          <Link to="/contact" className="inline-flex items-center gap-1.5 hover:text-[#9a7c4a] transition-colors">
            <Phone className="h-3 w-3" />
            Contact Us
          </Link>
        </div>

        <div className="text-[12px] normal-case tracking-[0.12em] text-[#a79885] italic" style={{ fontFamily: '"Playfair Display", serif' }}>
        Authorized Seller of Luxury Watches in the UAE
        </div>

        <div className="flex items-center gap-4">
          <span>AED</span>
          <span className="h-3 w-[1px] bg-[#d9d0c2]" />
          <span>EN</span>
        </div>
      </div>

      <div className="hidden lg:block h-[1px] bg-gradient-to-r from-transparent via-[#c8a96e] to-transparent" />

      <div className="lg:hidden flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="rounded-full p-2 text-[#2d435f] hover:bg-[#f1f5f9]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <Link to="/" className="flex-1 flex justify-center lg:flex-none">
          <img
            src="https://i.postimg.cc/vZhWWHHJ/FWC-LOGO-WHITE-300x-8.png"
            alt="FWC Lifestyle"
            className="h-9 w-auto object-contain brightness-0"
          />
        </Link>

        <div className="flex flex-1 items-center justify-end gap-1">
          <button className="rounded-full p-2 text-[#2d435f] hover:bg-[#f1f5f9]" aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
          <Link to="/wishlist" className="rounded-full p-2 text-[#2d435f] hover:bg-[#f1f5f9]" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
          </Link>
          <Link to="/account" className="rounded-full p-2 text-[#2d435f] hover:bg-[#f1f5f9]" aria-label="Account">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/cart" className="rounded-full p-2 text-[#2d435f] hover:bg-[#f1f5f9]" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center h-[78px] px-10 border-t border-[#eee7dc]">
        <nav className="flex items-center gap-8 text-[11px] font-medium uppercase tracking-[0.16em] text-[#473d33]">
          {leftNav.map((item) => (
            <Link key={item.to} to={item.to} className="hover:text-[#9a7c4a] transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link to="/" className="relative px-16 py-1 flex flex-col items-center justify-center">
          <span className="absolute left-0 top-1/2 h-8 w-px -translate-y-1/2 bg-[#e4dbcd]" />
          <span className="absolute right-0 top-1/2 h-8 w-px -translate-y-1/2 bg-[#e4dbcd]" />
          <img
            src="https://i.postimg.cc/vZhWWHHJ/FWC-LOGO-WHITE-300x-8.png"
            alt="FWC Lifestyle"
            className="h-10 w-auto object-contain brightness-0"
          />
          <span className="mt-0.5 text-[7px] uppercase tracking-[0.42em] text-[#b49a69]">Authorized Seller</span>
        </Link>

        <div className="flex items-center justify-end">
          <nav className="flex items-center gap-8 text-[11px] font-medium uppercase tracking-[0.16em] text-[#473d33] mr-6">
            {rightNav.map((item) => (
              item.isNew ? (
                <Link key={item.to} to={item.to} className="relative flex items-center group">
                  <span className="text-[#b49a69] font-semibold tracking-[0.18em]">{item.label}</span>
                  <span className="ml-1 px-1.5 py-0.5 rounded bg-[#b49a69] text-white text-[8px] font-bold leading-none align-middle" style={{letterSpacing: '0.18em', position: 'relative', top: '-2px'}}>NEW</span>
                </Link>
              ) : (
                <Link key={item.to} to={item.to} className="hover:text-[#9a7c4a] transition-colors">
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center gap-1 border-l border-[#e4dbcd] pl-4">
            {/* Search Reveal */}
            <div className="relative flex items-center">
              <button
                className="rounded-full p-2 text-[#2d435f] hover:bg-[#f1f5f9]"
                aria-label="Search"
                onClick={() => setShowSearch((v) => !v)}
              >
                <Search className="h-4 w-4" />
              </button>
              <input
                type="text"
                placeholder="Search for watches, brands, collections..."
                className={`fwc-search-transition ml-2 px-3 py-1.5 text-[12px] border border-[#e6e0d8] rounded bg-[#f8f4ed] text-[#473d33] placeholder-[#b49a69] focus:outline-none focus:ring-2 focus:ring-[#b49a69] ${showSearch ? 'w-72 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}
                style={{ minWidth: 0 }}
                autoFocus={showSearch}
                onBlur={() => setShowSearch(false)}
              />
            </div>
            <Link to="/wishlist" className="rounded-full p-2 text-[#2d435f] hover:bg-[#f1f5f9]" aria-label="Wishlist">
              <Heart className="h-4 w-4" />
            </Link>
            <Link to="/account" className="rounded-full p-2 text-[#2d435f] hover:bg-[#f1f5f9]" aria-label="Account">
              <User className="h-4 w-4" />
            </Link>
            <Link to="/cart" className="ml-2 inline-flex items-center gap-2 bg-[#1a1815] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f5efe3] hover:bg-[#2b2722] transition-colors" aria-label="Cart">
              <ShoppingBag className="h-3.5 w-3.5" />
              Bag
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e6e0d8] bg-white">
          <nav className="flex flex-col px-5 py-5 space-y-4 text-[12px] uppercase tracking-[0.14em] text-[#4b4136]">
            {NAV_ITEMS.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-[#9a7c4a]" onClick={() => setIsMobileMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link to="/contact" className="hover:text-[#9a7c4a]" onClick={() => setIsMobileMenuOpen(false)}>
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
