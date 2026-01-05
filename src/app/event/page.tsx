"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Header, BottomNav } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { EventDetailsModal } from "@/components/event";
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
  htmlContent: string;
}

const events: Event[] = [
  {
    id: "1",
    image: "/events/daily-deposit.jpg",
    title: "Top Up Free MYR 5",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    category: ["all", "slots", "live", "sports", "lottery"],
    htmlContent: `
      <h2>Top Up Free MYR 5</h2>
      <ul>
        <li><strong>FREE MYR 5</strong>.</li>
        <li>Minimum Deposit MYR 30 or USDT 30 and above.</li>
        <li>One Promotion Required.</li>
        <li>Minimum Withdrawal MYR 100.</li>
        <li>ONLY ONE USER/MOBILE NUMBER/ NAME / BANK claimable per (1)day.</li>
        <li>Transfer credit function disable after claimed this promotion and successfully achieve the target Turnover.</li>
      </ul>
      <ol>
        <li>This promotion is only available for AONE Global Gaming members.</li>
        <li>Promotion is subject to availability. Applicable to all aforementioned providers only.</li>
        <li>All customer offers are limited to one per person. Meaning one per family, household address, IP address, email address, telephone number, credit or debit card and/or e-payment account, and shared computer (e.g. school, public library or workplace).</li>
        <li>Bonuses are valid for thirty (30) days upon issuance unless stated otherwise. Any unused bonus funds will be removed from the member's account if prerequisites are not fulfilled within the given time frame.</li>
        <li>Any bets resulting in void, tie, cancelled, or made on opposite or the same outcome will not be counted towards wagering requirement.</li>
      </ol>
    `,
  },
  {
    id: "2",
    image: "/events/welcome-bonus.jpg",
    title: "150% Welcome Bonus",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    category: ["all", "slots", "app-slots"],
    htmlContent: `
      <h2>150% Welcome Bonus</h2>
      <p>Get up to 150% bonus on your first deposit! New members only.</p>
      <ul>
        <li>Minimum deposit: MYR 30</li>
        <li>Maximum bonus: MYR 500</li>
        <li>Wagering requirement: 30x</li>
        <li>Valid for slots and app slots only</li>
      </ul>
      <p><strong>Terms and Conditions:</strong></p>
      <ol>
        <li>Available for new members only</li>
        <li>Bonus must be claimed within 24 hours of registration</li>
        <li>One-time offer per member</li>
      </ol>
    `,
  },
  {
    id: "3",
    image: "/events/sport-bonus.jpg",
    title: "100% Sport Welcome Bonus",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    category: ["all", "sports"],
    htmlContent: `
      <h2>100% Sport Welcome Bonus</h2>
      <p>Double your first sports deposit with our 100% welcome bonus!</p>
      <ul>
        <li>Minimum deposit: MYR 50</li>
        <li>Maximum bonus: MYR 1000</li>
        <li>Wagering requirement: 15x</li>
        <li>Valid for sports betting only</li>
      </ul>
      <p><strong>Eligible Sports:</strong></p>
      <ul>
        <li>Football</li>
        <li>Basketball</li>
        <li>Tennis</li>
        <li>Esports</li>
      </ul>
    `,
  },
];

export default function EventPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredEvents = events.filter((event) =>
    event.category.includes(activeCategory)
  );

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
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
                  onClick={() => setSelectedEvent(event)}
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

      {/* Event Details Modal */}
      <EventDetailsModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
      />
    </div>
  );
}
