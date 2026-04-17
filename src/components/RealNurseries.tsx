import { motion } from "framer-motion";
import { ArrowUpRight, Truck } from "lucide-react";
import nurseryReal1Img from "@/assets/nursery-real-1.jpg";
import nurseryReal2Img from "@/assets/nursery-real-2.jpg";
import highchairImg from "@/assets/highchair.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function RealNurseries() {
  return (
    <section className="bg-card-peach text-chocolate py-24 px-8 lg:px-12">
      <motion.div
        className="max-w-[1400px] mx-auto"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Images */}
          <motion.div variants={fadeUp} className="flex gap-4">
            <img
              src={nurseryReal1Img.src}
              alt="Real nursery with crib"
              className="w-1/2 h-[300px] rounded-2xl object-cover"
              loading="lazy"
              width={300}
              height={300}
            />
            <div className="w-1/2 flex flex-col gap-4">
              <img
                src={nurseryReal2Img.src}
                alt="Nursery corner with highchair"
                className="h-[180px] rounded-2xl object-cover"
                loading="lazy"
                width={300}
                height={180}
              />
              <img
                src={highchairImg}
                alt="Highchair product"
                className="h-[110px] rounded-2xl object-contain bg-cream p-2"
                loading="lazy"
                width={200}
                height={110}
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div variants={fadeUp}>
            <h2 className="font-serif text-5xl lg:text-7xl leading-[0.9] tracking-tight">
              SEE IT IN REAL
              <br />
              NURSERIES
            </h2>
            <div className="flex items-center gap-3 mt-6">
              <button className="bg-accent-orange text-cream px-5 py-2 rounded-full text-xs font-semibold">
                @TINYNEST
              </button>
              <p className="text-sm text-text-muted-warm max-w-xs">
                Don't just take our word for it, hear from parents who've also recommend them.
              </p>
            </div>

            {/* Delivery info */}
            <motion.div variants={fadeUp} className="mt-10 bg-cream rounded-2xl p-5 flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-card-peach flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-chocolate" />
              </div>
              <div>
                <p className="text-sm font-semibold">Delivery in 2-5 Days from USA</p>
                <p className="text-xs text-text-muted-warm mt-1">
                  Customized in an hour
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
