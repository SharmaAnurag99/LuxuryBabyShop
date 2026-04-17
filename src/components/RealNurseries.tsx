import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Truck, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import nurseryReal1Img from "@/assets/nursery-real-1.jpg";
import nurseryReal2Img from "@/assets/nursery-real-2.jpg";
import highchairImg from "@/assets/highchair.png";

gsap.registerPlugin(ScrollTrigger);

export default function RealNurseries() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let mm = gsap.matchMedia(containerRef);

    mm.add("(min-width: 0px)", () => {
      // 1. Mask reveal on images
      gsap.set(".nursery-mask", { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" });
      gsap.set(".nursery-mask img", { scale: 1.2 });
      
      gsap.to(".nursery-mask", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%", 
        },
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.inOut"
      });

      gsap.to(".nursery-mask img", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
        },
        scale: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      });

      // 2. Content fade up
      gsap.from(".nursery-text > *", {
        scrollTrigger: {
          trigger: ".nursery-text",
          start: "top 75%",
        },
        y: 50,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-card-peach text-chocolate py-24 px-8 lg:px-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Images */}
          <div className="flex gap-4">
            <div className="nursery-mask w-1/2 h-[300px] rounded-2xl overflow-hidden">
              <img
                src={nurseryReal1Img.src}
                alt="Real nursery with crib"
                className="w-full h-full object-cover"
                loading="lazy"
                width={300}
                height={300}
              />
            </div>
            <div className="w-1/2 flex flex-col gap-4">
              <div className="nursery-mask h-[180px] rounded-2xl overflow-hidden">
                <img
                  src={nurseryReal2Img.src}
                  alt="Nursery corner with highchair"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={300}
                  height={180}
                />
              </div>
              <div className="nursery-mask h-[110px] rounded-2xl overflow-hidden bg-cream p-2">
                <img
                  src={highchairImg.src}
                  alt="Highchair product"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  width={200}
                  height={110}
                />
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="nursery-text">
            <h2 className="font-serif text-5xl lg:text-7xl leading-[0.9] tracking-tight">
              SEE IT IN REAL
              <br />
              NURSERIES
            </h2>
            <div className="flex items-center gap-3 mt-6">
              <button className="bg-accent-orange text-cream px-5 py-2 rounded-full text-xs font-semibold shrink-0">
                @TINYNEST
              </button>
              <p className="text-sm text-text-muted-warm max-w-xs">
                Don't just take our word for it, hear from parents who've also recommend them.
              </p>
            </div>

            {/* Delivery info */}
            <div className="mt-10 bg-cream rounded-2xl p-5 flex gap-4 items-center max-w-md">
              <div className="w-12 h-12 rounded-xl bg-card-peach flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-chocolate" />
              </div>
              <div>
                <p className="text-sm font-semibold text-chocolate">Delivery in 2-5 Days from USA</p>
                <p className="text-xs text-text-muted-warm mt-1">
                  Customized in an hour
                </p>
              </div>
            </div>

            <Link href="/shop" className="mt-8 bg-chocolate text-cream px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase inline-flex items-center justify-center gap-2 hover:bg-black transition-colors w-full sm:w-auto shadow-md group">
              SHOP NOW <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
