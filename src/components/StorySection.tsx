import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ArrowUpRight } from "lucide-react";
import Link from "next/link";
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

        if (!reduceMotion) {
          gsap.from(".story-heading", {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
            },
            y: 50,
            autoAlpha: 0.5,
          });

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

          gsap.set(".story-image-container", { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" });
          gsap.set(".story-image-container img", { scale: 1.3 });

          gsap.to(".story-image-container", {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
            },
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.2,
            stagger: 0.2,
            ease: "power4.inOut"
          });

          gsap.to(".story-image-container img", {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
            },
            scale: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power4.inOut"
          });
        } else {
          gsap.from(".story-image-container", {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
            },
            autoAlpha: 0,
            duration: standardDuration,
          });
        }

        gsap.from(".story-content > *", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
          y: reduceMotion ? 0 : 30,
          autoAlpha: 0,
          duration: standardDuration,
          stagger: reduceMotion ? 0 : 0.1,
          ease: "power3.out",
        });
      }
    );
    
    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#FFFDF9] text-chocolate py-20 lg:py-32 px-6 lg:px-12 relative z-40 rounded-[2rem] lg:rounded-[3rem] mt-4 mb-24">
      <div className="max-w-[1300px] mx-auto story-content">
        
        {/* Top Row: Heading and Text/Button */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-16 lg:mb-24">
          <div>
            <h2 className="story-heading font-serif text-[4rem] lg:text-[6.5rem] xl:text-[7rem] leading-[0.88] tracking-tighter uppercase text-[#2A1610]">
              OBSERVE <br /> WITH TEAM
            </h2>
          </div>
          
          <div className="flex flex-col items-start pt-2 lg:pt-4">
            <p className="text-[1.25rem] lg:text-[1.5rem] leading-[1.4] font-medium text-[#2A1610] tracking-tight mb-8">
              We're a family run brand started by new parents who couldn't find baby clothes that
              were truly soft, stylish, and free of harsh chemicals. <span className="text-[#2A1610]/70">Every piece is spun from pure organic cotton, crafted to be lived in.</span>
            </p>
            <Link href="/shop" className="bg-[#2A1610] text-[#FFFDF9] px-7 py-3.5 rounded-full text-[11px] font-bold tracking-widest uppercase inline-flex items-center justify-center gap-3 hover:bg-black transition-colors shadow-md group">
              SHOP NOW <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bottom Row: Images and Quotes */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-end">
          
          {/* Images */}
          <div className="flex gap-4 lg:gap-6 items-end">
            <div className="story-image-container w-full max-w-[320px] rounded-[2rem] overflow-hidden shadow-sm h-[320px] lg:h-[440px]">
              <img
                src="https://images.unsplash.com/photo-1549069786-641f4cb652c7?q=80&w=600&auto=format&fit=crop"
                alt="Baby clothing close up"
                className="w-full h-full object-cover"
                loading="lazy"
                width={320}
                height={440}
              />
            </div>
            <div className="story-image-container w-full max-w-[240px] rounded-[2rem] overflow-hidden shadow-sm h-[220px] lg:h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1543866163-971e1ef9e7a8?q=80&w=400&auto=format&fit=crop"
                alt="Baby on blanket"
                className="w-full h-full object-cover"
                loading="lazy"
                width={240}
                height={300}
              />
            </div>
          </div>

          {/* Quotes and Rating */}
          <div className="flex flex-col relative h-full justify-between pb-2">
            <div className="absolute -top-16 lg:top-0 right-0 flex justify-end w-full">
              <YellowFlower className="rotating-flower w-14 h-14 text-accent-yellow" />
            </div>

            <div className="max-w-[400px] mt-12 lg:mt-auto relative z-10">
              <p className="text-[#2A1610] text-[15px] leading-[1.6] font-medium mb-12 relative before:content-[''] before:absolute before:-top-6 before:left-0 before:w-16 before:h-[1px] before:bg-[#2A1610]/15">
                The softest onesies we could’ve chosen. No synthetic feels, beautifully dyed, and they’ve survived hundreds of washes!
                <span className="block font-bold mt-4">— Sarah M.</span>
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-8 border-t border-[#2A1610]/10 w-full gap-6">
                <div className="flex items-center gap-5">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[38px] font-serif tracking-tighter text-[#2A1610] leading-none">4.9</span>
                      <Star className="w-4 h-4 text-accent-yellow -mt-2" fill="currentColor" />
                    </div>
                  </div>
                  <p className="text-[12px] text-[#2A1610] font-semibold tracking-wide leading-tight px-5 border-l border-[#2A1610]/10">
                    Top rated baby products<br/>parents trust
                  </p>
                </div>
                <button className="flex items-center gap-1.5 text-[#2A1610] group whitespace-nowrap self-start sm:self-auto">
                  <span className="text-[11px] font-bold tracking-wide border-b border-[#2A1610]/30 group-hover:border-[#2A1610] transition-colors pb-0.5">Read More</span>
                  <ArrowUpRight className="w-[10px] h-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
