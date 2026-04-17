import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flower2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const companyLinks = ["Shop Baby Apparels", "Baby Shoes", "Knitwear", "Summer Collection", "Accessories", "Gift Cards"];
const resourceLinks = ["Customer Support", "Sizing Guide", "Shipping Info", "Return and Exchange Policy", "Order Tracking", "Fabric Care"];
const aboutLinks = ["About Us", "Our Story", "Sustainability", "Safety Standards", "Reviews"];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let mm = gsap.matchMedia(footerRef);

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)"
      },
      (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };
        const duration = reduceMotion ? 0 : 0.8;
        const stagger = reduceMotion ? 0 : 0.1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        });

        tl.from(".footer-section", {
          y: reduceMotion ? 0 : 40,
          autoAlpha: 0,
          duration: duration,
          stagger: stagger,
          ease: "power3.out",
        })
        .from(".footer-watermark", {
          y: reduceMotion ? 0 : 60,
          autoAlpha: 0,
          duration: duration,
          ease: "power3.out",
        }, reduceMotion ? 0 : "-=0.4");
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-chocolate text-cream pt-20 pb-8 px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-10 border-b border-chocolate-light footer-section">
          <div className="flex items-center gap-2">
            <Flower2 className="w-5 h-5" />
            <span className="font-sans font-bold tracking-widest text-sm">TINYNEST</span>
          </div>
          <p className="text-sm text-text-muted-dark hidden md:block">
            Designing spaces for sweet beginnings, with care.
          </p>
          <div className="flex gap-4">
            {["f", "in", "x"].map((s) => (
              <div key={s} className="w-8 h-8 rounded-full border border-chocolate-light flex items-center justify-center text-xs text-text-muted-dark">
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 py-12 footer-section">
          {/* Tagline */}
          <div>
            <h3 className="font-serif text-3xl lg:text-4xl leading-[0.95]">
              COMFORT CRAFTED
              <br />
              FOR DELICATE SKIN
            </h3>
            <p className="text-xs text-text-muted-dark mt-4">
              Create the perfect wardrobe with thoughtfully designed, eco-friendly knits.
            </p>
            <div className="flex gap-2 mt-6">
              <input
                type="email"
                placeholder="Your email"
                className="bg-chocolate-light text-cream placeholder:text-text-muted-dark text-xs px-4 py-3 rounded-full flex-1 border-none outline-none"
              />
              <button className="bg-accent-orange text-cream px-5 py-3 rounded-full text-xs font-semibold hover:opacity-90 transition-opacity">
                Sign up
              </button>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold tracking-widest mb-4">Company</p>
            <ul className="space-y-2">
              {companyLinks.map((l) => (
                <li key={l} className="text-xs text-text-muted-dark hover:text-cream transition-colors cursor-pointer">{l}</li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-semibold tracking-widest mb-4">Resources</p>
            <ul className="space-y-2">
              {resourceLinks.map((l) => (
                <li key={l} className="text-xs text-text-muted-dark hover:text-cream transition-colors cursor-pointer">{l}</li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <p className="text-xs font-semibold tracking-widest mb-4">About Us</p>
            <ul className="space-y-2">
              {aboutLinks.map((l) => (
                <li key={l} className="text-xs text-text-muted-dark hover:text-cream transition-colors cursor-pointer">{l}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-chocolate-light pt-6 flex flex-col md:flex-row items-center justify-between gap-4 footer-section">
          <p className="text-[10px] text-text-muted-dark">
            Made with love by QodeML Labs
          </p>
          <div className="flex gap-6">
            <span className="text-[10px] text-text-muted-dark cursor-pointer hover:text-cream">Terms of Use</span>
            <span className="text-[10px] text-text-muted-dark cursor-pointer hover:text-cream">Privacy</span>
            <span className="text-[10px] text-text-muted-dark cursor-pointer hover:text-cream">Cookie Consent Terms</span>
          </div>
        </div>

        {/* Giant TINYNEST watermark */}
        <div className="mt-8 overflow-hidden footer-watermark">
          <p className="font-serif text-[12vw] leading-[0.85] text-chocolate-light/30 tracking-tight select-none text-center">
            TINYNEST
          </p>
        </div>
      </div>
    </footer>
  );
}
