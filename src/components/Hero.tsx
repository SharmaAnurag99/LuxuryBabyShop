import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Heart, ArrowUpRight, Flower2 } from "lucide-react";
import highchairImg from "@/assets/highchair.png";
import babyImg from "@/assets/black.jpg";
import Cribimg from "@/assets/crib.jpg";
// Make sure to save the image you uploaded to the src/assets folder as "hero-romper.png"
import heroRomperImg from "@/assets/hero-romper.png";

function YellowFlower({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="currentColor">
      <path d="M24 4c2 8-2 12-2 12s10-6 14-2c4 4-2 14-2 14s4 10 0 14c-4 4-14-2-14-2s-6 10-10 10-6-10-6-10S-6 44-10 40c-4-4 2-14 2-14S-12 16-8 12c4-4 14 2 14 2s-4-10 0-14c2-2 6 0 8 2 2 2 4 6 8 2z" />
    </svg>
  );
}

function GreenFlower({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="currentColor">
      <circle cx="20" cy="8" r="7" />
      <circle cx="32" cy="16" r="7" />
      <circle cx="28" cy="30" r="7" />
      <circle cx="12" cy="30" r="7" />
      <circle cx="8" cy="16" r="7" />
      <circle cx="20" cy="20" r="6" />
    </svg>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        isDefault: "(min-width: 0px)"
      },
      (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };
        const duration = reduceMotion ? 0 : 1.2;
        const staggerDuration = reduceMotion ? 0 : 0.1;
        const ease = "power3.out";

        const tl = gsap.timeline({ defaults: { ease } });

        tl.from(".hero-title", {
          y: 60,
          autoAlpha: 0,
          duration: reduceMotion ? 0 : 1.2,
          scale: 0.95,
          ease: "expo.out",
        })
        .from(".hero-image", {
          y: 40,
          autoAlpha: 0,
          duration: reduceMotion ? 0 : 1.2,
          ease: "expo.out"
        }, reduceMotion ? 0 : "-=0.8")
        .from(".fade-up", {
          y: 20,
          autoAlpha: 0,
          duration: reduceMotion ? 0 : 0.8,
          stagger: staggerDuration,
        }, reduceMotion ? 0 : "-=0.8")
        .from(".accent-flower", {
          scale: 0,
          autoAlpha: 0,
          rotate: reduceMotion ? 0 : -45,
          duration: reduceMotion ? 0 : 0.8,
          ease: "back.out(1.7)",
          stagger: reduceMotion ? 0 : 0.15,
        }, reduceMotion ? 0 : "-=0.6");

        if (!reduceMotion) {
          gsap.to(".hero-image img", {
            y: -10,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

          gsap.to(".accent-flower", {
            rotation: "+=360",
            duration: 40,
            ease: "none",
            repeat: -1,
            transformOrigin: "center center"
          });

          const handleMouseMove = (e: MouseEvent) => {
            const xPos = (e.clientX / window.innerWidth - 0.5) * 30;
            const yPos = (e.clientY / window.innerHeight - 0.5) * 15;

            gsap.to(".hero-title", {
              x: -xPos,
              y: -yPos,
              duration: 1,
              ease: "power2.out",
            });
          };

          window.addEventListener("mousemove", handleMouseMove);
          
          return () => {
            tl.kill();
            window.removeEventListener("mousemove", handleMouseMove);
          };
        }

        return () => tl.kill();
      }, containerRef
    );
    
    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#FBF8F1] pt-8 lg:pt-12 pb-16 lg:pb-24 flex flex-col items-center justify-start z-20 overflow-hidden">
      
      {/* Background Typography */}
      <h1 className="hero-title absolute top-6 lg:top-8 left-0 right-0 text-center font-serif text-[18vw] xl:text-[19vw] leading-[0.75] text-[#2A1610] tracking-tighter select-none pointer-events-none z-0 opacity-100">
        BABY WEAR
      </h1>

      <div className="container mx-auto px-6 max-w-[1300px] relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between min-h-0 pt-16 lg:pt-24 gap-8 lg:gap-0">
        
        {/* Left Column */}
        <div className="flex flex-col gap-6 lg:gap-8 lg:w-[32%] order-2 lg:order-1 mt-4 lg:mt-8 z-20">
          <div className="fade-up relative z-20">
            <Flower2 className="w-5 h-5 mb-2 text-accent-green" />
            <p className="text-[10px] sm:text-[11px] font-bold text-text-muted-dark tracking-widest uppercase mb-1">
              Soft, Snug, & Stylish
            </p>
            <p className="text-sm font-semibold text-[#2A1610]">
              The Wardrobe for Your Little Star
            </p>
          </div>

          <div className="fade-up flex items-center gap-3.5 relative z-20">
            <div className="w-[42px] h-[42px] rounded-full bg-[#FF5C35] flex items-center justify-center shrink-0 shadow-sm">
              <Heart className="w-5 h-5 text-white" fill="currentColor" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-serif text-[24px] sm:text-[28px] leading-[0.9] text-[#2A1610] tracking-tight uppercase">
                Love Every
              </p>
              <p className="font-serif text-[24px] sm:text-[28px] leading-[0.9] text-[#2A1610] tracking-tight uppercase mt-1">
                Moment
              </p>
            </div>
          </div>
        </div>

        {/* Center Main Product */}
        <div className="relative w-full lg:w-[45%] flex justify-center order-1 lg:order-2 mt-4 lg:-mt-10 z-30">
          <div className="hero-image relative w-[320px] sm:w-[420px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px]">
            <img
              src={heroRomperImg.src}
              alt="Baby romper on hanger"
              className="w-full h-auto object-contain relative z-20 drop-shadow-2xl"
              width={800}
              height={1000}
            />
            
            {/* Flower accents */}
            <YellowFlower className="accent-flower absolute -left-4 sm:-left-8 top-[35%] w-10 sm:w-14 h-10 sm:h-14 text-accent-yellow z-10" />
            <GreenFlower className="accent-flower absolute -right-2 sm:-right-4 top-[65%] w-8 sm:w-10 h-8 sm:h-10 text-accent-green z-30" />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 lg:gap-8 lg:w-[32%] order-3 lg:items-end lg:text-right mt-8 lg:mt-8 z-20">
          <div className="fade-up w-full lg:max-w-[220px]">
            <p className="text-[12px] font-semibold text-[#2A1610] tracking-wide mb-5 flex flex-wrap lg:justify-end gap-1.5">
              Baby <span className="font-serif italic text-[#FF5C35]">Apparels,</span> Beautifully <span className="font-serif italic">Knit</span>
            </p>
            <Link href="/shop" className="bg-[#2A1610] text-[#FFFDF9] px-7 py-3.5 rounded-full text-[10px] font-bold tracking-widest uppercase inline-flex items-center gap-2 hover:bg-[#3d241c] hover:scale-105 transition-all w-max shadow-md group">
              SHOP NOW <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Black Friday Card */}
          <div className="fade-up bg-[#FDF8F0] border border-[#F0E6D8] rounded-[1.75rem] p-4 flex gap-4 items-center shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] w-full max-w-[320px] lg:max-w-[280px] lg:w-full mt-4 lg:mt-8 relative z-20">
            <div className="w-[60px] h-[60px] p-1 bg-[#F3ECE1] rounded-2xl shrink-0 overflow-hidden relative shadow-inner">
              <img
                src={Cribimg.src}
                alt="Product"
                className="w-full h-full object-cover rounded-[12px]"
                loading="lazy"
                width={60}
                height={60}
              />
            </div>
            <div className="flex flex-col justify-center text-left">
              <span className="inline-block rounded-md text-[9px] font-bold text-text-muted-dark tracking-widest uppercase w-fit mb-0.5">
                Black Friday
              </span>
              <p className="text-[15px] font-serif text-[#2A1610] leading-[1.1] mb-1">
                Big sale <span className="text-[#FF5C35] font-sans font-bold text-[14px]">50% Off</span>
              </p>
              <Link href="/shop" className="flex items-center gap-1.5 group w-fit">
                <span className="text-[10px] font-bold tracking-wider text-[#2A1610] border-b border-[#2A1610]/20 group-hover:border-[#2A1610] transition-colors pb-0.5">View collection</span>
                <ArrowUpRight className="w-3 h-3 text-[#2A1610] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
