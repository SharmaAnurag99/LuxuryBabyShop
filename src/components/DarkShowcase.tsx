import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Plus, ArrowUpRight } from "lucide-react";
import babyImg from "@/assets/baby-pacifier.jpg";
import bouncerImg from "@/assets/bouncer.png";

gsap.registerPlugin(ScrollTrigger);

export default function DarkShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let mm = gsap.matchMedia(sectionRef);

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };
        const duration = reduceMotion ? 0 : 1;
        const imgDuration = reduceMotion ? 0 : 1.2;

        gsap.from(".showcase-item", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          y: reduceMotion ? 0 : 60,
          autoAlpha: 0,
          duration: duration,
          stagger: reduceMotion ? 0 : 0.15,
          ease: "power3.out",
        });
        
        gsap.from(".hero-overlap-image", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
          y: reduceMotion ? 0 : 100,
          scale: reduceMotion ? 1 : 0.9,
          autoAlpha: 0,
          duration: imgDuration,
          ease: "expo.out",
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#25100a] text-cream pt-24 lg:pt-32 pb-24 lg:pb-32 px-6 lg:px-12 z-30 overflow-visible -mt-[4rem]">
      <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 pt-12">
        
        {/* Col 1 - Overlapping Image */}
        <div className="flex flex-col relative z-[100] md:-mt-32 lg:-mt-48 w-full lg:w-[320px] xl:w-[400px] shrink-0">
          <div className="hero-overlap-image relative rounded-[24px] overflow-hidden shadow-2xl aspect-[4/3] w-full max-w-[400px] mx-auto lg:mx-0 group">
            <img
              src={babyImg.src}
              alt="Baby with pacifier"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
              width={400}
              height={300}
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[24px]" />
          </div>
          
          <div className="showcase-item mt-10 text-center lg:text-left">
            <p className="text-base text-gray-300 leading-relaxed max-w-[320px] mx-auto lg:mx-0">
              Watch how every piece is thoughtfully crafted to support your baby's development.
            </p>
            <Link href="/shop" className="flex items-center gap-3 mt-8 group mx-auto lg:mx-0 w-fit">
              <span className="text-base font-semibold tracking-wide border-b border-white group-hover:border-accent-orange transition-colors pb-1.5 text-white group-hover:text-accent-orange">Shop Now</span>
              <span className="bg-white/5 p-3 rounded-xl group-hover:bg-white/10 transition-colors">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </span>
            </Link>
          </div>
        </div>

        {/* Col 2 - Bouncer */}
        <div className="showcase-item flex flex-col sm:flex-row gap-8 items-center flex-1 max-w-[500px]">
          <div className="relative shrink-0 group cursor-pointer w-40 h-48 bg-[#3d241c] rounded-[24px] flex items-center justify-center p-6 shadow-xl border border-white/5">
            <img
              src="https://images.unsplash.com/photo-1542355581-caf7454785ca?q=80&w=400&auto=format&fit=crop"
              alt="Baby romper"
              className="w-full h-full object-cover rounded-xl relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
              loading="lazy"
            />
            <button className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-[#ff6b4a] flex items-center justify-center z-20 shadow-[0_8px_16px_rgba(255,107,74,0.4)] group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
            </button>
          </div>
          <div className="flex-1 w-full text-center sm:text-left">
            <h3 className="text-2xl font-medium text-white mb-3">Cozy Knit Romper</h3>
            <p className="text-sm text-gray-400 font-medium leading-relaxed mb-6 max-w-[200px] mx-auto sm:mx-0">
              Soft, safe, and breathable for your baby
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <span className="text-3xl font-bold text-white">$230</span>
              <span className="text-lg text-gray-500 line-through decoration-gray-500/50">$350</span>
              <button className="ml-auto w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Col 3 - Trust */}
        <div className="showcase-item flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-auto shrink-0 mt-8 lg:mt-0">
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-14 h-14 rounded-full border-[3px] border-[#25100a] bg-card-peach relative z-10 hover:z-20 hover:-translate-y-1 transition-transform"
                  style={{
                    backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 15})`,
                    backgroundSize: "cover",
                  }}
                />
              ))}
            </div>
            <div className="text-left">
              <p className="text-3xl font-bold tracking-tight text-white leading-none mb-2">10K+</p>
              <p className="text-xs text-[#ff6b4a] font-bold uppercase tracking-widest leading-none">Parents Trust</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-400 mt-8 max-w-[240px] leading-relaxed font-medium lg:text-right w-full lg:ml-auto">
            Trusted by parents who value care that feels personal
          </p>
          
          <button className="flex items-center gap-2 mt-6 lg:ml-auto group cursor-pointer">
            <span className="text-sm font-semibold tracking-wider uppercase border-b border-white/50 group-hover:border-white transition-colors pb-1 text-white/90 group-hover:text-white">Discover Care</span>
            <ArrowUpRight className="w-4 h-4 text-white/90 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
        
      </div>
    </section>
  );
}
