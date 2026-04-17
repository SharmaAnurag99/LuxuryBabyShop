import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { Heart, ArrowUpRight, Flower2 } from "lucide-react";
import highchairImg from "@/assets/highchair.png";
import babyImg from "@/assets/baby-pacifier.jpg";
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
        isDefault: "(min-width: 0px)" // this acts as a default catch-all
      },
      (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };
        
        // If reduced motion is preferred, we skip the animations by setting duration to 0 and immediateRender
        const duration = reduceMotion ? 0 : 1.2;
        const staggerDuration = reduceMotion ? 0 : 0.1;
        const ease = "power3.out";

        const tl = gsap.timeline({ defaults: { ease } });

        // Title animation
        tl.from(".hero-title", {
          y: 100,
          autoAlpha: 0,
          duration: reduceMotion ? 0 : 1.2,
          scale: 0.95,
          ease: "expo.out",
        })
        // Hero image animation
        .from(".hero-image", {
          y: 80,
          autoAlpha: 0,
          duration: reduceMotion ? 0 : 1.2,
          ease: "expo.out"
        }, reduceMotion ? 0 : "-=0.8")
        // Left and right column elements staggered
        .from(".fade-up", {
          y: 30,
          autoAlpha: 0,
          duration: reduceMotion ? 0 : 0.8,
          stagger: staggerDuration,
        }, reduceMotion ? 0 : "-=0.8")
        // Flowers popping in
        .from(".accent-flower", {
          scale: 0,
          autoAlpha: 0,
          rotate: reduceMotion ? 0 : -45,
          duration: reduceMotion ? 0 : 0.8,
          ease: "back.out(1.7)",
          stagger: reduceMotion ? 0 : 0.15,
        }, reduceMotion ? 0 : "-=0.6");

        if (!reduceMotion) {
          // Floating animation for the hero image (clothing on hanger)
          gsap.to(".hero-image img", {
            y: -15,
            duration: 2.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

          // Continuous slow rotation for flowers
          gsap.to(".accent-flower", {
            rotation: "+=360",
            duration: 30,
            ease: "none",
            repeat: -1,
            transformOrigin: "center center"
          });

          // Subtle pulse for the background glow
          gsap.to(".hero-glow", {
            scale: 1.1,
            opacity: 0.8,
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

          // Parallax mouse move effect for the giant BABY WEAR title
          const handleMouseMove = (e: MouseEvent) => {
            const xPos = (e.clientX / window.innerWidth - 0.5) * 40; // max moved distance
            const yPos = (e.clientY / window.innerHeight - 0.5) * 20;

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
    <section ref={containerRef} className="relative w-full min-h-[90vh] bg-cream pt-20 pb-32 overflow-visible flex flex-col items-center justify-center z-20">
      {/* Background Typography */}
      <h1 className="hero-title absolute top-12 left-0 right-0 text-center font-serif text-[18vw] leading-[0.8] text-chocolate tracking-tight select-none pointer-events-none z-0 mix-blend-multiply opacity-5">
        BABY WEAR
      </h1>

      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-[600px]">
        
        {/* Left Column */}
        <div className="flex flex-col gap-12 lg:w-1/3 order-2 lg:order-1 mt-12 lg:mt-0">
          <div className="fade-up">
            <Flower2 className="w-6 h-6 mb-3 text-accent-green" />
            <p className="text-sm text-text-muted-warm tracking-wider uppercase mb-1">
              Soft, Snug, & Stylish
            </p>
            <p className="text-xl font-medium text-chocolate">
              The Wardrobe for Your Little Star
            </p>
          </div>

          <div className="fade-up flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent-orange flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-white" fill="currentColor" />
            </div>
            <div>
              <p className="font-serif text-3xl leading-none text-chocolate">
                Love Every
              </p>
              <p className="font-serif text-3xl leading-none text-chocolate mt-1">
                Moment
              </p>
            </div>
          </div>

          {/* Baby image card */}
          <div className="fade-up relative w-[240px]">
            <div className="overflow-hidden rounded-2xl aspect-[4/3]">
              <img
                src={babyImg}
                alt="Sleeping baby"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                width={240}
                height={180}
              />
            </div>
            <p className="text-sm text-text-muted-warm mt-4 leading-relaxed">
              Watch how every piece is thoughtfully knit for ultimate comfort.
            </p>
            <Link to="/shop" className="flex items-center gap-2 mt-3 group w-fit">
              <span className="text-sm font-semibold text-chocolate border-b border-chocolate/30 group-hover:border-chocolate transition-colors pb-0.5">Shop Accessories</span>
              <ArrowUpRight className="w-4 h-4 text-chocolate group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Center Highchair */}
        <div className="relative w-full lg:w-1/3 flex justify-center order-1 lg:order-2 mt-8 lg:mt-0">
          <div className="hero-image relative w-[320px] sm:w-[400px] lg:w-[480px]">
            {/* Soft glow behind the romper */}
            <div className="hero-glow absolute inset-0 bg-accent-yellow/20 blur-3xl rounded-full scale-75" />
            <img
              src={heroRomperImg}
              alt="Baby romper on hanger"
              className="w-full h-auto object-contain relative z-20 drop-shadow-2xl"
              width={800}
              height={1000}
            />
            
            {/* Flower accents */}
            <YellowFlower className="accent-flower absolute -left-8 top-[40%] w-12 h-12 text-accent-yellow z-30" />
            <GreenFlower className="accent-flower absolute -right-4 top-[60%] w-10 h-10 text-accent-green z-30" />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-12 lg:w-1/3 order-3 lg:items-end lg:text-right mt-16 lg:mt-0 px-4 lg:px-0">
          <div className="fade-up max-w-[280px]">
            <p className="text-2xl text-chocolate font-light leading-snug">
              Baby <span className="font-serif italic text-accent-orange">Apparels,</span> Beautifully <span className="font-serif italic">Knit</span>
            </p>
            <Link to="/shop" className="mt-8 bg-chocolate text-cream px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase inline-flex items-center gap-2 hover:bg-black transition-colors w-full lg:w-auto justify-center group">
              SHOP COLLECTION <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          {/* Black Friday Card */}
          <div className="fade-up bg-card-peach/50 backdrop-blur-md border border-white/40 rounded-3xl p-5 flex gap-5 items-center shadow-xl w-full max-w-[320px] lg:max-w-none text-left">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-inner">
              <img
                src={Cribimg}
                alt="Product"
                className="w-full h-full object-cover"
                loading="lazy"
                width={80}
                height={80}
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="inline-block px-2 py-1 bg-white/60 rounded text-[10px] font-bold text-accent-orange uppercase tracking-wider w-fit mb-2">
                Sale
              </span>
              <p className="text-base font-serif text-chocolate leading-tight">
                Black Friday <br />
                <span className="text-accent-orange font-bold font-sans">50% Off</span>
              </p>
              <Link to="/shop" className="flex items-center gap-1 mt-2 cursor-pointer group w-fit">
                <span className="text-xs text-chocolate/80 font-medium group-hover:text-chocolate transition-colors">View collection</span>
                <ArrowUpRight className="w-3 h-3 text-chocolate/80 group-hover:text-chocolate group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
