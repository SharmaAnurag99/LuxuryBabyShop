import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import familyNurseryImg from "@/assets/family-nursery.jpg";

gsap.registerPlugin(ScrollTrigger);

function YellowFlower({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="currentColor">
      <path d="M24 4c2 8-2 12-2 12s10-6 14-2c4 4-2 14-2 14s4 10 0 14c-4 4-14-2-14-2s-6 10-10 10-6-10-6-10S-6 44-10 40c-4-4 2-14 2-14S-12 16-8 12c4-4 14 2 14 2s-4-10 0-14c2-2 6 0 8 2 2 2 4 6 8 2z" />
    </svg>
  );
}

const testimonials = [
  {
    text: "This organic knit sweater is a game-changer! It fits so perfectly and feels incredibly luxurious. Beautiful craftsmanship! We couldn't be happier with how adorable she looks.",
    name: "Olivia Bucate",
    role: "Home Designer",
  },
  {
    text: "Possibly the single most adorable and functional clothing piece. My 8-month old loves it. I can't even start to explain how much easier getting dressed is now. Absolute perfection.",
    name: "Joanna Deli",
    role: "Product Manager",
  },
];

export default function LovedByFamilies() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let mm = gsap.matchMedia(containerRef);

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)"
      },
      (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };
        const standardDuration = reduceMotion ? 0 : 1;
        const imgDuration = reduceMotion ? 0 : 1.2;
        const staggerDuration = reduceMotion ? 0 : 0.2;

        gsap.from(".family-image", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
          scale: reduceMotion ? 1 : 0.9,
          autoAlpha: 0,
          filter: reduceMotion ? "none" : "blur(10px)",
          duration: imgDuration,
          ease: "power3.out",
        });

        gsap.from(".family-header", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
          y: reduceMotion ? 0 : 50,
          autoAlpha: 0,
          duration: standardDuration,
          ease: "power3.out",
        });

        gsap.from(".testimonial-card", {
          scrollTrigger: {
            trigger: ".testimonial-container",
            start: "top 85%",
          },
          y: reduceMotion ? 0 : 40,
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
    <section ref={containerRef} className="bg-card-peach text-chocolate py-24 lg:py-32 px-6 lg:px-12 rounded-[3rem] lg:rounded-[4rem] my-4 mx-4 lg:mx-8">
      <div className="max-w-7xl mx-auto">
        {/* Top area */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-center">
          
          {/* Left - Heading */}
          <div className="family-header order-2 lg:order-1">
            <h2 className="font-serif text-[3.5rem] lg:text-[6.5rem] leading-[0.85] tracking-tight mb-8">
              LOVED BY <br />
              <span className="flex items-center gap-4">
                FAMILIES 
                <YellowFlower className="w-10 h-10 lg:w-16 lg:h-16 text-accent-yellow animate-[spin_10s_linear_infinite]" />
              </span>
              EVERYWHERE
            </h2>
            <p className="text-lg lg:text-xl text-text-muted-dark font-medium max-w-md leading-relaxed">
              Don't just take our word for it, hear from parents who've brought our pieces into their homes.
            </p>
            <Link href="/shop" className="mt-8 bg-chocolate text-cream px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase inline-flex items-center gap-2 hover:bg-black transition-colors w-full sm:w-auto justify-center group shadow-md">
              SHOP NOW <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          {/* Right - Image */}
          <div className="family-image order-1 lg:order-2 w-full h-[400px] lg:h-[500px] rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl relative group">
            <div className="absolute inset-0 bg-chocolate/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img
              src="https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=800&auto=format&fit=crop"
              alt="Happy family with fashionable baby"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
              width={640}
              height={512}
            />
          </div>
        </div>

        {/* Testimonials */}
        <div className="testimonial-container mt-24 lg:mt-32">
          <div className="flex items-center justify-between mb-10">
            <p className="text-sm text-text-muted-dark font-bold tracking-widest uppercase">Testimonials</p>
            <div className="hidden sm:flex items-center gap-3">
              <button className="w-12 h-12 rounded-full border border-chocolate/20 flex items-center justify-center hover:bg-cream hover:border-cream transition-colors group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button className="w-12 h-12 rounded-full border border-chocolate/20 flex items-center justify-center hover:bg-cream hover:border-cream transition-colors group">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card bg-cream rounded-[2rem] p-8 lg:p-10 flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow duration-300">
                <p className="text-lg lg:text-xl leading-relaxed text-chocolate font-serif italic mb-10">"{t.text}"</p>
                <div className="flex items-center gap-4 mt-auto border-t border-border-light pt-6">
                  <div
                    className="w-14 h-14 rounded-full bg-card-peach object-cover border-2 border-white shadow-sm"
                    style={{
                      backgroundImage: `url(https://i.pravatar.cc/120?img=${i + 20})`,
                      backgroundSize: "cover",
                    }}
                  />
                  <div>
                    <p className="text-base font-bold text-chocolate">{t.name}</p>
                    <p className="text-xs font-semibold text-text-muted-dark uppercase tracking-wider mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Navigation */}
          <div className="flex sm:hidden items-center justify-center gap-4 mt-10">
            <button className="w-12 h-12 rounded-full border border-chocolate/20 flex items-center justify-center hover:bg-cream active:bg-cream/80 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full border border-chocolate/20 flex items-center justify-center hover:bg-cream active:bg-cream/80 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
