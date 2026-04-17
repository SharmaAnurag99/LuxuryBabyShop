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
    <section ref={sectionRef} className="relative bg-[#2A1610] text-[#FFFDF9] pt-12 lg:pt-16 pb-12 lg:pb-16 px-6 lg:px-12 z-30 flex flex-col items-center flex-none mt-0 lg:-mt-[4rem] rounded-[2rem] lg:rounded-[2.5rem] rounded-b-none">
      <div className="w-full max-w-[1300px] mx-auto flex flex-col lg:flex-row items-end justify-between gap-12 lg:gap-8 relative z-40 lg:pt-8">
        
        {/* Col 1 - Overlapping Image */}
        <div className="flex flex-col relative z-[100] w-full lg:w-[340px] xl:w-[380px] shrink-0 lg:self-start -mt-8 lg:-mt-40 xl:-mt-48">
          <div className="hero-overlap-image relative rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[5/4] w-[90%] max-w-[380px] mx-auto lg:mx-0 group border-4 border-[#2A1610] lg:border-none">
            <img
              src={babyImg.src}
              alt="Baby with pacifier"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
              width={400}
              height={320}
            />
          </div>
          
          <div className="showcase-item mt-8 text-left max-w-[280px] mx-auto lg:mx-0 pl-1">
            <p className="text-[13px] text-[#FFFDF9] leading-[1.6]">
              Watch how every piece is thoughtfully crafted to support your baby's development.
            </p>
            <Link href="/shop" className="flex items-center justify-between mt-6 group w-full max-w-[160px]">
              <span className="text-[11px] font-bold tracking-widest border-b border-[#FFFDF9]/40 group-hover:border-[#FFFDF9] transition-colors pb-0.5 text-white uppercase">Shop Now</span>
              <span className="bg-[#422218] p-2 rounded-lg group-hover:bg-[#522b1e] transition-colors">
                <ArrowUpRight className="w-4 h-4 text-[#FF5C35]" />
              </span>
            </Link>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-px h-32 bg-[#FFFDF9]/10 self-end mb-4 mx-4"></div>

        {/* Col 2 - Bouncer */}
        <div className="showcase-item flex flex-col sm:flex-row gap-6 items-center flex-1 max-w-[480px] lg:self-end lg:mb-4">
          <div className="relative shrink-0 group cursor-pointer w-[120px] h-[140px] bg-transparent flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1542355581-caf7454785ca?q=80&w=400&auto=format&fit=crop"
              alt="Baby product"
              className="w-full h-full object-cover rounded-[24px] relative z-10 group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
              loading="lazy"
            />
            <button className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#FF5C35] flex items-center justify-center z-20 shadow-[0_4px_12px_rgba(255,92,53,0.4)] group-hover:scale-110 transition-transform">
              <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
            </button>
          </div>
          <div className="flex-1 w-full text-center sm:text-left flex flex-col justify-center">
            <h3 className="text-[18px] font-serif text-[#FFFDF9] mb-2 leading-none">Cozy Knit Romper</h3>
            <p className="text-[12px] text-[#FFFDF9]/70 font-medium leading-[1.4] mb-6 max-w-[190px] mx-auto sm:mx-0">
              Soft, safe, and breathable for your baby
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <span className="text-[18px] font-bold text-[#FFFDF9]">$230</span>
              <span className="text-[14px] text-[#FFFDF9]/40 line-through decoration-[#FFFDF9]/30">$350</span>
              <button className="ml-auto w-8 h-8 rounded-lg bg-[#422218] hover:bg-[#522b1e] flex items-center justify-center transition-colors">
                <Plus className="w-4 h-4 text-[#FFFDF9]" />
              </button>
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-px h-32 bg-[#FFFDF9]/10 self-end mb-4 mx-4"></div>

        {/* Col 3 - Trust */}
        <div className="showcase-item flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-[280px] shrink-0 mt-8 lg:mt-0 lg:self-end lg:mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex -space-x-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="w-[42px] h-[42px] rounded-full border-[3px] border-[#2A1610] relative z-10 hover:z-20 hover:-translate-y-1 transition-transform overflow-hidden"
                >
                  <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-left flex flex-col">
              <p className="text-[28px] font-serif tracking-tight text-[#FFFDF9] leading-none mb-1">10K+</p>
              <p className="text-[12px] text-[#FF5C35] font-bold tracking-wide leading-none">Parents Trust</p>
            </div>
          </div>
          
          <p className="text-[12px] text-[#FFFDF9]/80 max-w-[200px] leading-[1.5] font-medium mx-auto lg:mx-0">
            Trusted by parents who value care that feels personal
          </p>
          
          <Link href="/shop" className="flex items-center gap-1.5 mt-6 group">
            <span className="text-[11px] font-bold tracking-wide border-b border-[#FFFDF9]/40 group-hover:border-[#FFFDF9] transition-colors pb-0.5 text-[#FFFDF9]">Discover Care</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FFFDF9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
        
      </div>
    </section>
  );
}
