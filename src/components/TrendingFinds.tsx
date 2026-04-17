import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import cribImg from "@/assets/crib.jpg";
import babyToysImg from "@/assets/baby-toys.jpg";
import babyGearImg from "@/assets/baby-gear.jpg";
import bouncerImg from "@/assets/bouncer.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function YellowFlower({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="currentColor">
      <path d="M24 4c2 8-2 12-2 12s10-6 14-2c4 4-2 14-2 14s4 10 0 14c-4 4-14-2-14-2s-6 10-10 10-6-10-6-10S-6 44-10 40c-4-4 2-14 2-14S-12 16-8 12c4-4 14 2 14 2s-4-10 0-14c2-2 6 0 8 2 2 2 4 6 8 2z" />
    </svg>
  );
}

const categories = [
  { label: "Baby Cribs & Bassinets", img: cribImg, span: "col-span-1 row-span-2" },
  { label: "21 New Arrivals", img: bouncerImg, span: "col-span-1" },
  { label: "Baby Toys", img: babyToysImg, span: "col-span-1" },
  { label: "Baby Gear", img: babyGearImg, span: "col-span-1" },
  { label: "Dr. Sleep Collection", img: cribImg, span: "col-span-1" },
];

export default function TrendingFinds() {
  return (
    <section className="bg-cream text-chocolate py-24 px-8 lg:px-12">
      <motion.div
        className="max-w-[1400px] mx-auto"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="flex items-start justify-between mb-12">
          <h2 className="font-serif text-5xl lg:text-7xl leading-[0.9] tracking-tight">
            TRENDING FINDS
            <br />
            EVERYONE LOVE
          </h2>
          <div className="flex items-center gap-3">
            <YellowFlower className="w-10 h-10 text-accent-yellow" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold">View All Categories</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </motion.div>

        {/* Category Grid */}
        <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px]">
          {/* Large card */}
          <motion.div
            variants={fadeUp}
            className="col-span-1 row-span-2 rounded-2xl overflow-hidden relative group"
          >
            <img
              src={categories[0].img}
              alt={categories[0].label}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              width={300}
              height={360}
            />
            <div className="absolute bottom-4 left-4">
              <span className="bg-cream/90 text-chocolate text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-sm">
                {categories[0].label}
              </span>
            </div>
          </motion.div>

          {/* Smaller cards */}
          {categories.slice(1).map((cat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-2xl overflow-hidden relative group"
            >
              <img
                src={cat.img}
                alt={cat.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                width={200}
                height={180}
              />
              <div className="absolute bottom-3 left-3">
                <span className="bg-cream/90 text-chocolate text-[10px] font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  {cat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom tagline */}
        <motion.div variants={fadeUp} className="mt-12 flex items-end justify-between">
          <p className="font-serif text-3xl lg:text-4xl leading-snug max-w-md">
            Beautiful furniture for <span className="italic">every</span> stage of childhood.
          </p>
          <button className="bg-accent-orange text-cream px-6 py-3 rounded-full text-xs font-semibold tracking-wide inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
            TOP FINDS <ArrowUpRight className="w-3 h-3" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
