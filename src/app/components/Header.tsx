import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Search, Heart, User, ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-11 w-11 rounded-lg bg-secondary p-1.5 shadow-sm">
              <img
                src="https://i.postimg.cc/vZhWWHHJ/FWC-LOGO-WHITE-300x-8.png"
                alt="FWC Lifestyle logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="leading-tight">
              <div className="text-base sm:text-lg font-bold tracking-[0.18em] text-foreground">FWC</div>
              <div className="text-[10px] sm:text-xs tracking-[0.24em] text-muted-foreground">LIFESTYLE</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/brands" className="text-sm tracking-wide hover:text-primary transition-colors">
              BRAND
            </Link>
            <Link to="/collections" className="text-sm tracking-wide hover:text-primary transition-colors">
              COLLECTION
            </Link>
            <Link to="/couple-watch" className="text-sm tracking-wide hover:text-primary transition-colors">
              COUPLE WATCH
            </Link>
            <Link to="/new-arrivals" className="text-sm tracking-wide hover:text-primary transition-colors">
              NEW ARRIVAL
            </Link>
            <Link to="/contact" className="text-sm tracking-wide hover:text-primary transition-colors">
              CONTACT US
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:text-primary transition-colors hidden md:block">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/wishlist" className="p-2 hover:text-primary transition-colors hidden md:block">
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/account" className="p-2 hover:text-primary transition-colors hidden md:block">
              <User className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="p-2 hover:text-primary transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border"
          >
            <nav className="flex flex-col space-y-4 px-6 py-6">
              <Link
                to="/brands"
                className="text-sm tracking-wide hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                BRAND
              </Link>
              <Link
                to="/collections"
                className="text-sm tracking-wide hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                COLLECTION
              </Link>
              <Link
                to="/couple-watch"
                className="text-sm tracking-wide hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                COUPLE WATCH
              </Link>
              <Link
                to="/new-arrivals"
                className="text-sm tracking-wide hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                NEW ARRIVAL
              </Link>
              <Link
                to="/contact"
                className="text-sm tracking-wide hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONTACT US
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
