"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary dark:text-dark-primary">
              About me
            </h2>
            <p className="text-lg">
              I am a backend developer with more than 1 years of experience in
              building modern web applications. I am passionate about creating
              great user experiences and have deep knowledge of the React
              ecosystem.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#contact"
                className="bg-primary dark:bg-dark-primary text-on-primary dark:text-dark-on-primary px-6 py-2 rounded-full"
              >
                Contact me
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="/cv.pdf"
                className="border border-primary dark:border-dark-primary text-primary dark:text-dark-primary px-6 py-2 rounded-full"
              >
                View CV
              </motion.a>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            className="relative h-[400px] rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop"
              alt="About me"
              width={800}
              height={600}
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
