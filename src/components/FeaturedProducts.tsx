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
  { tag: "Bestseller", tagColor: "bg-chocolate text-cream", name: "Chunky Knit Cardigan", price: "$45", img: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=400&auto=format&fit=crop" },
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
    <section ref={containerRef} className="bg-[#2A1610] text-[#FFFDF9] py-20 lg:py-28 px-6 lg:px-12 -mt-12 relative z-10 w-full overflow-hidden">
      <div className="max-w-[1300px] mx-auto w-full">
        {/* Header */}
        <div className="product-header flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8 w-full">
          <h2 className="font-serif text-[4rem] md:text-[5rem] lg:text-[6rem] leading-[0.85] tracking-tight uppercase whitespace-nowrap">
            FEATURED APPARELS
          </h2>
          <Link href="/shop" className="bg-[#2A1610] border border-[#FFFDF9]/20 text-[#FFFDF9] px-7 py-3.5 rounded-full text-[11px] font-bold tracking-widest uppercase inline-flex items-center gap-3 hover:bg-[#FFFDF9] hover:text-[#2A1610] transition-colors shadow-md group shrink-0 mb-2 md:mb-4">
            VIEW PRODUCT <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {products.map((product, i) => (
            <div
              key={i}
              className="product-card bg-[#FFFDF9] text-[#2A1610] group hover:-translate-y-2 transition-transform duration-500 rounded-[2rem] p-6 flex flex-col cursor-pointer shadow-lg w-full"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <span className="bg-white text-[#2A1610] border border-[#2A1610]/10 text-[10px] uppercase font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    New
                  </span>
                  <span className="bg-[#FDF8F0] text-[#2A1610] border border-[#2A1610]/10 text-[10px] uppercase font-bold px-3 py-1 rounded-full whitespace-nowrap hidden sm:inline-block">
                    Bestseller
                  </span>
                </div>
                <button className="text-[#2A1610]/40 hover:text-[#FF5C35] transition-colors shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
              </div>
              
              <div className="flex-1 flex items-center justify-center p-2 bg-[#F3ECE1]/40 rounded-[1.5rem] mb-6 overflow-hidden relative">
                <img
                  src={product.img}
                  alt={product.name}
                  className="h-[220px] lg:h-[260px] w-full object-cover rounded-[1rem] shadow-sm group-hover:scale-105 transition-transform duration-700 ease-out z-10"
                  loading="lazy"
                  width={340}
                  height={260}
                />
              </div>
              
              <div className="flex items-end justify-between pt-2">
                <div className="flex flex-col">
                  <p className="text-[17px] font-semibold tracking-tight text-[#2A1610] leading-snug max-w-[180px]">{product.name}</p>
                  <p className="text-[14px] text-[#2A1610]/60 mt-1 font-medium">From {product.price}</p>
                </div>
                <div className="w-11 h-11 shrink-0 rounded-xl bg-white border border-[#2A1610]/10 flex items-center justify-center group-hover:bg-[#2A1610] group-hover:text-[#FFFDF9] transition-colors duration-300 shadow-sm">
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
