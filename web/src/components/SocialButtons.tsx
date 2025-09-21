"use client";

import { Linkedin, Instagram, Youtube } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function SocialButtons() {
  return (
    <div className="fade-in delay-480 mt-10 flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="#"
            aria-label="X"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 sm:p-4 rounded-xl bg-white-600/10 border-1 border-white/20 backdrop-blur-lg text-[#1d9bf0] hover-lift group glow hover:glow-blue transition-all duration-300 cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
            >
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Follow us on X</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="#"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 sm:p-4 rounded-xl bg-white-600/10 border-1 border-white/20 backdrop-blur-lg text-[#0A66C2] hover-lift group glow hover:glow-blue transition-all duration-300 cursor-pointer"
          >
            <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Connect with us on LinkedIn</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="#"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 sm:p-4 rounded-xl bg-white-600/10 border-1 border-white/20 backdrop-blur-lg text-[#E1306C] hover-lift group glow hover:glow-pink transition-all duration-300 cursor-pointer"
          >
            <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Follow us on Instagram</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="#"
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 sm:p-4 rounded-xl bg-white-600/10 border-1 border-white/20 backdrop-blur-lg text-[#FF0000] hover-lift group glow hover:glow-pink transition-all duration-300 cursor-pointer"
          >
            <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Subscribe to our YouTube</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
