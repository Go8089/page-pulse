import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = [
  "website",
  "SEO",
  "performance",
  "accessibility",
  "metadata",
];

export default function AnimatedHeadline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
        Understand your
      </h1>

      <div className="mt-2 h-12 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={words[index]}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.35 }}
            className="text-3xl font-semibold text-sky-400 md:text-5xl"
          >
            {words[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}