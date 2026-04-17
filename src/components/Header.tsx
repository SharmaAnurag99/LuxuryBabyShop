import { Flower2, Search, ShoppingCart, Menu } from "lucide-react";

import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="w-full bg-cream text-chocolate border-b border-[#e8dfd8] sticky top-0 z-50 transition-all duration-300">
      <div className="flex items-stretch h-[80px] w-full max-w-[1600px] mx-auto">
        
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 shrink-0 px-8 border-r border-[#e8dfd8] min-w-[240px] cursor-pointer group">
          <Flower2 className="w-7 h-7 text-chocolate fill-chocolate group-hover:text-accent-orange group-hover:fill-accent-orange transition-colors" />
          <span className="font-sans font-extrabold tracking-[0.2em] text-lg uppercase group-hover:text-accent-orange transition-colors">TINYNEST</span>
        </Link>

        {/* Search */}
        <div className="hidden lg:flex flex-1 items-center gap-3 px-8 border-r border-[#e8dfd8] group">
          <Search className="w-5 h-5 text-gray-400 group-hover:text-accent-orange transition-colors" />
          <input 
            type="text" 
            placeholder="Search for a Category, Brand or Product.." 
            className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder:text-gray-400"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-stretch">
          <Link to="/shop" className="flex items-center px-8 text-xs font-semibold uppercase tracking-wider hover:text-accent-orange transition-colors border-r border-[#e8dfd8]">
            Boy Fashion
          </Link>
          <Link to="/shop" className="flex items-center px-8 text-xs font-semibold uppercase tracking-wider hover:text-accent-orange transition-colors border-r border-[#e8dfd8]">
            Girl Fashion
          </Link>
          <Link to="/shop" className="flex items-center px-8 text-xs font-semibold uppercase tracking-wider hover:text-accent-orange transition-colors border-r border-[#e8dfd8]">
            Toys & Gear
          </Link>
          <Link to="/shop" className="flex items-center px-8 text-xs font-semibold uppercase tracking-wider hover:text-accent-orange transition-colors border-r border-[#e8dfd8]">
            Daily Care
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-stretch">
          {/* Cart */}
          <button className="hidden lg:flex items-center justify-center gap-2 px-10 hover:text-accent-orange transition-colors">
            <span className="text-sm font-semibold">Cart</span>
            <ShoppingCart className="w-5 h-5" />
          </button>

          {/* Mobile Menu */}
          <button className="flex lg:hidden items-center justify-center px-6 border-l border-[#e8dfd8] text-chocolate hover:text-accent-orange transition-colors ml-auto">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
      </div>
    </header>
  );
}
