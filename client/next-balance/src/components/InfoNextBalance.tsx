"use client";
import { Sparkles, Star, Target } from "lucide-react";
import { FaRunning } from "react-icons/fa";
import { JSX } from "react/jsx-dev-runtime";

interface FeatureItem {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: <FaRunning className="w-6 h-6 text-red-600" />,
    title: "Performance First",
    description: "Engineered for athletes who demand excellence in every step.",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-red-600" />,
    title: "Premium Quality",
    description: "Crafted with the finest materials for unmatched durability.",
  },
  {
    icon: <Target className="w-6 h-6 text-red-600" />,
    title: "Perfect Fit",
    description: "Advanced sizing technology ensures comfort all day long.",
  },
  {
    icon: <Star className="w-6 h-6 text-red-600" />,
    title: "Style Icon",
    description: "Where athletic performance meets contemporary fashion.",
  },
];

export default function InfoNextBalance() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Next Balance?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the perfect blend of innovation, comfort, and style with
            our premium athletic footwear collection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div key={index} className="text-center group">
              <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-100 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
