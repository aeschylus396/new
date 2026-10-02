"use client";

import { motion } from "framer-motion";

const projects = [
  { id: 1, title: "E-Commerce Experience", category: "WebGL / React" },
  { id: 2, title: "Interactive Portfolio", category: "Next.js / Framer Motion" },
  { id: 3, title: "3D Product Configurator", category: "Three.js / Tailwind" },
];

export default function Projects() {
  return (
    <section className="relative z-20 bg-[#121212] min-h-screen py-24 px-8 md:px-24 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-16"
        >
          Selected Work
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 cursor-pointer flex flex-col justify-end p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              
              <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-sm text-gray-400 mb-2">{project.category}</p>
                <h3 className="text-2xl font-bold">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
