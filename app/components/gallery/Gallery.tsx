"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: "cover" | "gift" | "typography";
}

const galleryItems: GalleryItem[] = [
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<GalleryItem["category"] | "all">("all");
  const t = useTranslations("gallery");

  // Prevent right click
  const preventContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Prevent drag
  const preventDrag = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const filteredItems = galleryItems.filter(
    (item) => filter === "all" || item.category === filter
  );

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary dark:text-dark-primary mb-4">
            {t("title")}
          </h1>
          <p className="text-on-surface/70 dark:text-dark-on-surface/70 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["all", "cover", "gift", "typography"].map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category as typeof filter)}
              className={`px-6 py-2 rounded-full transition-colors ${
                filter === category
                  ? "bg-primary dark:bg-dark-primary text-on-primary dark:text-dark-on-primary"
                  : "bg-surface-variant/50 dark:bg-dark-surface-variant/50"
              }`}
            >
              {t(`categories.${category}`)}
            </motion.button>
          ))}
        </div>

        {/* Gallery grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ y: -8 }}
              className="cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  onContextMenu={preventContextMenu}
                  onDragStart={preventDrag}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </motion.div>
          ))
          ) : (
            <p className="text-center text-on-surface/70 dark:text-dark-on-surface/70">
              {t("noItems")}
            </p>
          )}
        </motion.div>

        {/* Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full bg-surface dark:bg-dark-surface rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-surface/80 dark:bg-dark-surface/80 hover:bg-surface-variant/80 dark:hover:bg-dark-surface-variant/80 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <div className="relative h-[70vh]">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  onContextMenu={preventContextMenu}
                  onDragStart={preventDrag}
                  sizes="100vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary dark:text-dark-primary mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-on-surface/70 dark:text-dark-on-surface/70">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
