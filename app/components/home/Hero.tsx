"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center py-12 md:py-20 pt-24 md:pt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Backend Developer
          </h1>
          <p className="text-lg mb-8 text-on-surface dark:text-dark-on-surface">
            I&apos;m a backend developer with a passion for building scalable
            and efficient systems.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-primary text-on-primary px-8 py-3 rounded-full"
          >
            Contact me
          </motion.button>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full flex justify-end"
        >
          <Image
            src="https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=500&h=500&fit=crop"
            alt="Developer"
            width={500}
            height={500}
            className="rounded-2xl shadow-lg object-cover w-full md:w-auto"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
