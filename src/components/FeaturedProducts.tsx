import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, ArrowUpRight } from "lucide-react";
import productCribImg from "@/assets/product-crib.png";
import productRockerImg from "@/assets/product-rocker.png";
import productStrollerImg from "@/assets/product-stroller.png";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { tag: "New", tagColor: "bg-accent-orange", name: "Organic Cotton Onesie", price: "$35", img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=400&auto=format&fit=crop" },
  { tag: "Bestseller", tagColor: "bg-chocolate text-cream", name: "Chunky Knit Cardigan", price: "$45", img: "https://images.unsplash.com/photo-1542355581-caf7454785ca?q=80&w=400&auto=format&fit=crop" },
  { tag: "Trending", tagColor: "bg-accent-green text-chocolate", name: "Linen Summer Overalls", price: "$28", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=400&auto=format&fit=crop" },
];

export default function FeaturedProducts() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let mm = gsap.matchMedia(containerRef);

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        isDefault: "(min-width: 0px)"
      },
      (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };
        const duration = reduceMotion ? 0 : 1;
        const staggerDuration = reduceMotion ? 0 : 0.15;

        gsap.from(".product-header", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
          y: reduceMotion ? 0 : 40,
          autoAlpha: 0,
          duration: duration,
          ease: "power3.out",
        });

        gsap.from(".product-card", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
          y: reduceMotion ? 0 : 60,
          autoAlpha: 0,
          duration: reduceMotion ? 0 : 0.8,
          stagger: staggerDuration,
          ease: "power3.out",
        });
      }
    );
    
    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-chocolate text-cream py-24 lg:py-32 px-6 lg:px-12 -mt-12 relative z-10">
      <div className="max-w-7xl mx-auto pt-16">
        {/* Header */}
        <div className="product-header flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8">
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight uppercase">
            FEATURED <br className="hidden md:block" />
            APPARELS
          </h2>
          <Link href="/shop" className="bg-chocolate-light border border-cream/20 text-cream px-8 py-3 rounded-full text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2 hover:bg-cream hover:text-chocolate transition-all group">
            VIEW PRODUCT <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <div
              key={i}
              className="product-card bg-cream text-chocolate group hover:-translate-y-2 transition-transform duration-500 rounded-[24px] p-6 lg:p-8 flex flex-col cursor-pointer"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <span className="bg-white text-chocolate border border-border-light text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                    New
                  </span>
                  <span className="bg-card-peach text-chocolate border border-border-light text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                    Bestseller
                  </span>
                </div>
                <button className="text-text-muted-dark hover:text-chocolate transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
              </div>
              
              <div className="flex-1 flex items-center justify-center py-6 bg-card-peach/30 rounded-xl mb-6">
                <img
                  src={product.img}
                  alt={product.name}
                  className="h-[180px] lg:h-[220px] w-full object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                  width={260}
                  height={260}
                />
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-base font-semibold tracking-tight">{product.name}</p>
                  <p className="text-xs text-text-muted-dark mt-1">From {product.price}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white border border-border-light flex items-center justify-center group-hover:bg-chocolate group-hover:text-cream transition-colors duration-300">
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
