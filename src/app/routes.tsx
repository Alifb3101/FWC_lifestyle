import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { BrandListing } from "./pages/BrandListing";
import { CollectionListing } from "./pages/CollectionListing";
import { CoupleWatch } from "./pages/CoupleWatch";
import { NewArrival } from "./pages/NewArrival";
import { Men } from "./pages/Men";
import { Women } from "./pages/Women";
import { ProductDetail } from "./pages/ProductDetail";
import { Contact } from "./pages/Contact";
import { Cart } from "./pages/Cart";
import { Wishlist } from "./pages/Wishlist";
import { Account } from "./pages/Account";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "brands", Component: BrandListing },
      { path: "collections", Component: CollectionListing },
      { path: "couple-watch", Component: CoupleWatch },
      { path: "new-arrivals", Component: NewArrival },
      { path: "men", Component: Men },
      { path: "women", Component: Women },
      { path: "product/:id", Component: ProductDetail },
      { path: "contact", Component: Contact },
      { path: "cart", Component: Cart },
      { path: "wishlist", Component: Wishlist },
      { path: "account", Component: Account },
      { path: "*", Component: NotFound },
    ],
  },
]);
