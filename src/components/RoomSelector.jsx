"use client";

import { useState } from "react";
import Image from "next/image";

export default function RoomSelector({ rooms, initialRoom }) {
  const [selected, setSelected] = useState(
    initialRoom || rooms[0]?.title || ""
  );
  const current = rooms.find((r) => r.title === selected) || rooms[0];

  return (
    <div className="space-y-8">
      <div className="relative group">
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg bg-surface-container">
          <Image
            src={current.image}
            alt={current.alt || current.title}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm">
            <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
              Selected Room
            </p>
            <p className="text-lg font-bold text-primary">{current.title}</p>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low p-6 rounded-2xl space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="room-category"
            className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1"
          >
            Select Room Category
          </label>
          <div className="relative">
            <select
              id="room-category"
              name="room-category"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full bg-white bg-none border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary pl-4 pr-12 py-3 text-sm appearance-none cursor-pointer"
            >
              {rooms.map((r) => (
                <option key={r.key || r.title}>{r.title}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
              expand_more
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
