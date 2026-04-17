import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ArrowUpRight } from "lucide-react";
import cribImg from "@/assets/crib.jpg";
import babyBlanketImg from "@/assets/baby-blanket.jpg";

gsap.registerPlugin(ScrollTrigger);

function YellowFlower({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="currentColor">
      <path d="M24 4c2 8-2 12-2 12s10-6 14-2c4 4-2 14-2 14s4 10 0 14c-4 4-14-2-14-2s-6 10-10 10-6-10-6-10S-6 44-10 40c-4-4 2-14 2-14S-12 16-8 12c4-4 14 2 14 2s-4-10 0-14c2-2 6 0 8 2 2 2 4 6 8 2z" />
    </svg>
  );
}

export default function StorySection() {
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
        const standardDuration = reduceMotion ? 0 : 1;
        const imgDuration = reduceMotion ? 0 : 1.2;

        if (!reduceMotion) {
          // Heading parallax (only applies if motion isn't reduced)
          gsap.from(".story-heading", {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
            },
            y: 100,
            autoAlpha: 0.5,
          });

          // Flower rotation on scroll
          gsap.to(".rotating-flower", {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
            rotation: 360,
            ease: "none"
          });

          // Mask Reveal for Images
          gsap.set(".story-image-container", { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" });
          gsap.set(".story-image-container img", { scale: 1.3 });

          gsap.to(".story-image-container", {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%",
            },
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.5,
            stagger: 0.2,
            ease: "power4.inOut"
          });

          gsap.to(".story-image-container img", {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%",
            },
            scale: 1,
            duration: 1.5,
            stagger: 0.2,
            ease: "power4.inOut"
          });
        } else {
          // Images stagger animation fallback for reduced motion
          gsap.from(".story-image-container", {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
            },
            autoAlpha: 0,
            duration: imgDuration,
          });
        }

        // Content fade in
        gsap.from(".story-content > *", {
          scrollTrigger: {
            trigger: ".story-content",
            start: "top 80%",
          },
          y: reduceMotion ? 0 : 40,
          autoAlpha: 0,
          duration: standardDuration,
          stagger: reduceMotion ? 0 : 0.15,
          ease: "power3.out",
        });
      }
    );
    
    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-cream text-chocolate pt-24 lg:pt-32 pb-24 lg:pb-32 px-6 lg:px-12 rounded-t-[2rem] lg:rounded-t-[3rem] relative z-40 -mt-[4rem] lg:-mt-[6rem] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-20 lg:gap-24 items-center relative z-10">
        
        {/* Left Column */}
        <div className="relative">
          <h2 className="story-heading font-serif text-[4.5rem] lg:text-[6rem] leading-[0.85] tracking-tight uppercase absolute md:-top-16 lg:-top-24 left-0 lg:-left-6 z-0 hidden sm:block">
            OBSERVE <br /> WITH TEAM
          </h2>
          <h2 className="font-serif text-[4rem] leading-[0.85] tracking-tight uppercase mb-8 sm:hidden text-chocolate">
            OBSERVE <br /> WITH TEAM
          </h2>

          <div className="flex gap-4 lg:gap-6 mt-12 lg:mt-32 relative z-10">
            <div className="story-image-container bg-cream rounded-[2rem] w-[200px] lg:w-[280px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=600&auto=format&fit=crop"
                alt="Baby clothing close up"
                className="w-full h-[260px] lg:h-[340px] rounded-xl object-cover"
                loading="lazy"
                width={280}
                height={340}
              />
            </div>
            <div className="story-image-container bg-cream rounded-[2rem] mt-16 lg:mt-24 w-[180px] lg:w-[260px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=400&auto=format&fit=crop"
                alt="Baby on blanket"
                className="w-full h-[220px] lg:h-[300px] rounded-xl object-cover"
                loading="lazy"
                width={260}
                height={300}
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="story-content flex flex-col justify-center max-w-2xl mx-auto lg:mx-0 pt-10">
          <YellowFlower className="rotating-flower w-12 h-12 text-accent-yellow absolute top-12 right-12 lg:-mt-6 lg:mr-0 hidden lg:block" />
          
          <p className="text-[1.75rem] lg:text-[2rem] leading-[1.2] font-semibold tracking-tight mb-8 text-chocolate">
            We're a family run brand started by new parents who couldn't find baby clothes that
            were truly soft, stylish, and free of harsh chemicals. <span className="text-text-muted-dark font-medium font-sans text-xl">Every piece is spun from pure organic cotton, crafted to be lived in.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-16">
            <button className="bg-chocolate text-cream px-8 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase inline-flex items-center justify-center gap-3 hover:bg-black transition-colors w-full sm:w-auto shadow-md group">
              ABOUT US <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <div className="hidden sm:block">
              <YellowFlower className="rotating-flower w-10 h-10 text-accent-yellow" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-8 border-t border-border-light relative">
            {/* Quote */}
            <div className="relative">
              <p className="text-sm text-chocolate leading-relaxed font-medium">
                The softest onesies we could’ve chosen. No synthetic feels, beautifully dyed, and they’ve survived hundreds of washes!
                <br /><br /><span className="font-bold">— Sarah M.</span>
              </p>
            </div>

            {/* Footer Row */}
            <div className="flex flex-col justify-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-5xl font-serif tracking-tighter text-chocolate">4.9</span>
                <Star className="w-5 h-5 text-accent-yellow -mt-2" fill="currentColor" />
              </div>
              <p className="text-xs text-text-muted-dark font-medium tracking-wide">
                Top rated baby products<br/>parents trust
              </p>
              <button className="flex items-center gap-2 mt-4 text-chocolate w-fit group">
                <span className="text-xs font-semibold tracking-wide border-b border-chocolate/30 group-hover:border-chocolate transition-colors pb-0.5">Read More</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
