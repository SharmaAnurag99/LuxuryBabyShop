import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, SlidersHorizontal, Plus, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/shop")({
  component: ShopPage,
});

const DEMO_PRODUCTS = [
  { id: 1, name: "Organic Cotton Onesie", price: 35, category: "Tops", tag: "New", img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=400&auto=format&fit=crop" },
  { id: 2, name: "Chunky Knit Cardigan", price: 45, category: "Outerwear", tag: "Bestseller", img: "https://images.unsplash.com/photo-1542355581-caf7454785ca?q=80&w=400&auto=format&fit=crop" },
  { id: 3, name: "Linen Summer Overalls", price: 28, category: "Bottoms", tag: "Trending", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=400&auto=format&fit=crop" },
  { id: 4, name: "Cozy Ribbed Sweats", price: 32, category: "Bottoms", img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=400&auto=format&fit=crop" },
  { id: 5, name: "Classic Denim Jacket", price: 55, category: "Outerwear", img: "https://images.unsplash.com/photo-1560506840-ec148e82a604?q=80&w=400&auto=format&fit=crop" },
  { id: 6, name: "Soft Cotton Beanie", price: 18, category: "Accessories", img: "https://images.unsplash.com/photo-1616666428759-679a7d578307?q=80&w=400&auto=format&fit=crop" },
  { id: 7, name: "Newborn Knotted Gown", price: 42, category: "Sleepwear", tag: "Sale", img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=400&auto=format&fit=crop" },
  { id: 8, name: "Leather Pre-Walkers", price: 48, category: "Footwear", img: "https://images.unsplash.com/photo-1622290291720-ac961c43ee30?q=80&w=400&auto=format&fit=crop" },
];

const CATEGORIES = ["All", "Tops", "Bottoms", "Outerwear", "Sleepwear", "Accessories", "Footwear"];

function ShopPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = DEMO_PRODUCTS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  useEffect(() => {
    let mm = gsap.matchMedia(containerRef);

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        isDefault: "(min-width: 0px)"
      },
      (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };
        const duration = reduceMotion ? 0 : 0.8;
        const staggerAmount = reduceMotion ? 0 : 0.1;

        // Intense mask reveal for page transition
        gsap.to(".page-transition-mask", {
          scaleY: 0,
          transformOrigin: "top",
          duration: reduceMotion ? 0 : 1.2,
          ease: "expo.inOut",
        });

        if (!reduceMotion) {
          gsap.from(".shop-content-wrapper", {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
            delay: 0.3
          });
        }

        gsap.from(".shop-header", {
          y: reduceMotion ? 0 : 30,
          autoAlpha: 0,
          duration: duration,
          ease: "power3.out"
        });

        gsap.from(".category-pill", {
          x: reduceMotion ? 0 : -20,
          autoAlpha: 0,
          duration: duration,
          stagger: staggerAmount,
          ease: "power3.out",
          delay: 0.2
        });
      }
    );

    return () => mm.revert();
  }, []);

  useEffect(() => {
    // Re-animate grid when category changes
    let mm = gsap.matchMedia();
    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        isDefault: "(min-width: 0px)"
      },
      (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };
        gsap.fromTo(
          ".shop-product-card",
          { y: reduceMotion ? 0 : 40, autoAlpha: 0, scale: reduceMotion ? 1 : 0.95 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: reduceMotion ? 0 : 0.6,
            stagger: reduceMotion ? 0 : 0.05,
            ease: "power3.out",
            clearProps: "all"
          }
        );
      }
    );
    return () => mm.revert();
  }, [activeCategory]);

  return (
    <>
      <Header />
      <div ref={containerRef} className="min-h-screen bg-cream text-chocolate pt-24 lg:pt-32 pb-24 px-6 lg:px-12 flex flex-col z-20 relative">
        <div className="page-transition-mask absolute inset-0 bg-[#25100a] z-50 pointer-events-none" />
        <div className="shop-content-wrapper max-w-[1400px] mx-auto w-full relative z-40">
        {/* Header Section */}
        <div className="shop-header flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight uppercase mb-4">
              Our <br /> Collection
            </h1>
            <p className="text-text-muted-dark max-w-md text-sm leading-relaxed">
              Discover beautiful, functional apparels for your baby. Thoughtfully designed and sustainably crafted.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 px-5 py-3 bg-white rounded-full border border-border-light focus-within:border-chocolate transition-colors w-64">
              <Search className="w-4 h-4 text-text-muted-dark" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-text-muted-dark"
              />
            </div>
            <button className="flex items-center justify-center gap-2 bg-white border border-border-light px-5 py-3 rounded-full hover:bg-border-light/30 transition-colors">
              <SlidersHorizontal className="w-4 h-4 text-chocolate" />
              <span className="text-sm font-semibold">Filter</span>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`category-pill px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeCategory === category
                  ? "bg-chocolate text-cream shadow-md"
                  : "bg-white text-chocolate border border-border-light hover:border-chocolate/30 hover:bg-white/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="shop-product-card group bg-white hover:bg-card-peach/10 border border-border-light/50 transition-all duration-500 rounded-[24px] p-6 flex flex-col cursor-pointer hover:shadow-xl hover:shadow-chocolate/5 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4 h-6">
                {product.tag ? (
                  <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${
                    product.tag === "New" ? "bg-[#ff6b4a] text-white" :
                    product.tag === "Sale" ? "bg-accent-yellow text-chocolate" :
                    "bg-[#25100a] text-cream"
                  }`}>
                    {product.tag}
                  </span>
                ) : (
                  <span /> // spacer
                )}
                <button className="text-text-muted-dark hover:text-[#ff6b4a] transition-colors rounded-full p-1 border border-transparent hover:bg-[#ff6b4a]/10">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
              </div>
              
              <div className="flex-1 flex items-center justify-center py-8 relative">
                {/* Subtle background shape behind image */}
                <div className="absolute inset-0 bg-[#f8f5f2] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-95 group-hover:scale-100" />
                <img
                  src={product.img}
                  alt={product.name}
                  className="h-[160px] w-auto object-contain relative z-10 group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>
              
              <div className="mt-6">
                <p className="text-xs font-semibold text-text-muted-dark tracking-widest uppercase mb-1">{product.category}</p>
                <p className="text-base font-semibold tracking-tight text-chocolate mb-3">{product.name}</p>
                <div className="flex items-end justify-between">
                  <span className="text-lg font-bold text-chocolate">${product.price}</span>
                  <button className="w-10 h-10 rounded-full bg-[#f8f5f2] border border-border-light flex items-center justify-center group-hover:bg-[#25100a] group-hover:text-cream group-hover:border-[#25100a] transition-all duration-300">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
      <Footer />
    </>
  );
}