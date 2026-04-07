"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import Title from "./Title";
import { ReactLenis } from "lenis/react";

const Features = () => {
  const cards = [
    {
      id: 1,
      image: "resume1.jpg",
      title: "AI Resume Builder",
      description: "Generate a professional resume instantly with AI assistance.",
    },
    {
      id: 2,
      image:
        "resume2.jpeg",
      title: "Smart Resume Templates",
      description: "Choose from modern ATS-friendly templates for any job role.",
    },
    {
      id: 3,
      image:
        "resume3.jpg",
      title: "Cover Letter Generator",
      description: "Create personalized cover letters tailored to your job profile.",
    },
    {
      id: 4,
      image:
        "resume4.jpeg",  
      title: "Resume Optimization",
      description: "Improve your resume with AI suggestions to get more interviews.",
    },
  ];

  return (
    <>
      <div  id="features" className="bg-[#FAFAFA] py-16 px-4 flex flex-col items-center">
        <div className="text-center mb-15">
          <h1 className="text-[40px] font-medium text-slate-900 mb-4">
            Explore what you can build
          </h1>
          <p className="text-base text-slate-600 max-w-md leading-relaxed">
            Production-ready resume tools and AI-powered features designed to help you land your dream job faster.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 max-w-6xl w-full">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white border border-zinc-200 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-lg p-4 flex flex-col items-center"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full max-w-56 object-cover mb-6"
              />
              <div className="w-full max-w-56 flex flex-col h-full">
                <h3 className="text-base font-medium text-slate-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed mb-3">
                  {card.description}
                </p>
                <div className="flex items-end justify-end">
                  <button className="inline-flex items-center gap-2 bg-transparent border-0 text-slate-700 text-xs cursor-pointer p-0 hover:gap-2 group">
                    TRY NOW
                    <svg
                      width="22"
                      height="15"
                      viewBox="0 0 22 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M4.583 7.5h12.834M11 3.125 17.417 7.5 11 11.875"
                        stroke="#314158"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Features;