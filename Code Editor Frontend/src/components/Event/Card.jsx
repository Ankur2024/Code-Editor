import React from "react";

export default function Card({ title, description, tags = [], footer, children }) {
  return (
    <div className="group relative overflow-hidden rounded-xl backdrop-blur-lg transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
      {/* Purple gradient background with low opacity */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-purple-700/30 to-purple-800/40 opacity-80" />

      {/* Subtle animated border */}
      <div className="absolute inset-0 rounded-xl border border-purple-500/20 transition-all duration-300 group-hover:border-purple-500/40" />

      {/* Card content */}
      <div className="relative z-10 flex flex-col p-6">
        <div className="mb-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-black/20 px-3 py-1 text-xs font-medium text-purple-100 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>

        <p className="mb-4 text-purple-100/80">{description}</p>

        {children}

        {footer && <div className="mt-auto border-t border-purple-500/20 pt-4">{footer}</div>}
      </div>

      {/* Decorative elements */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-purple-500/20 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-purple-700/20 blur-3xl" />
    </div>
  );
}