"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Header, BottomNav } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "ALL" },
  { id: "slots", label: "SLOTS" },
  { id: "app-slots", label: "APP SLOTS" },
  { id: "live", label: "LIVE" },
  { id: "sports", label: "SPORTS" },
  { id: "lottery", label: "LOTTERY" },
  { id: "fishing", label: "FISHING" },
];

interface Event {
  id: string;
  image: string;
  title: string;
  description: string;
  category: string[];
}

const events: Event[] = [
  {
    id: "1",
    image: "/events/daily-deposit.jpg",
    title: "Top Up Free MYR 5",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    category: ["all", "slots", "live", "sports", "lottery"],
  },
  {
    id: "2",
    image: "/events/welcome-bonus.jpg",
    title: "150% Welcome Bonus",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    category: ["all", "slots", "app-slots"],
  },
  {
    id: "3",
    image: "/events/sport-bonus.jpg",
    title: "100% Sport Welcome Bonus",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    category: ["all", "sports"],
  },
];

export default function EventPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredEvents = events.filter((event) =>
    event.category.includes(activeCategory)
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header variant="logo" />

      {/* Horizontally Scrollable Categories */}
      <div
        ref={scrollRef}
        className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
              activeCategory === category.id
                ? "bg-primary text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div className="flex-1 px-4 pb-4 space-y-4 overflow-auto">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl border border-zinc-100 overflow-hidden shadow-sm"
          >
            {/* Event Image */}
            <div className="relative h-40 bg-gradient-to-r from-zinc-700 to-zinc-500">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                onError={(e) => {
                  // Hide broken image, show gradient background
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            {/* Event Content */}
            <div className="p-4">
              <h3 className="text-base font-semibold text-zinc-800 mb-1">
                {event.title}
              </h3>
              <p className="text-sm text-zinc-500 mb-4 line-clamp-2">
                {event.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1 bg-zinc-700 hover:bg-zinc-800 text-white rounded-full"
                >
                  INFO
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-full">
                  APPLY
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
