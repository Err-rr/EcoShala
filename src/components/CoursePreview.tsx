import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Recycle, Droplets, TreePine, Sun, Wind, Sprout, Globe } from "lucide-react";

export const CoursePreview = () => {
  const categories = [
    { name: "Sustainability", active: true },
    { name: "Climate Action", active: false },
    { name: "Conservation", active: false },
    { name: "Green Tech", active: false }
  ];

  const ecoCourses = [
    { icon: Leaf, title: "Sustainable Living", color: "bg-eco-green/20 text-eco-green" },
    { icon: Recycle, title: "Waste Reduction", color: "bg-eco-blue/20 text-eco-blue" },
    { icon: TreePine, title: "Forest Protection", color: "bg-eco-leaf/20 text-eco-leaf" },
    { icon: Droplets, title: "Water Conservation", color: "bg-eco-blue/20 text-eco-blue" },
    { icon: Sun, title: "Solar Energy", color: "bg-eco-yellow/20 text-eco-yellow" },
    { icon: Wind, title: "Wind Power", color: "bg-eco-blue/20 text-eco-blue" },
    { icon: Sprout, title: "Organic Farming", color: "bg-eco-green/20 text-eco-green" },
    { icon: Globe, title: "Climate Science", color: "bg-eco-brown/20 text-eco-brown" }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Guided eco-paths for every green journey
          </h2>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                category.active 
                  ? "bg-eco-green text-white" 
                  : "bg-muted text-foreground/70 hover:bg-eco-green/20 hover:text-foreground"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Eco Courses Section */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-foreground">Sustainability Quests</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {ecoCourses.map((course, index) => (
              <Card 
                key={course.title}
                className="p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer bg-card border border-border/50 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${course.color} group-hover:scale-110 transition-transform`}>
                    <course.icon className="w-8 h-8" />
                  </div>
                  <h4 className="font-semibold text-lg text-foreground group-hover:text-eco-green transition-colors">
                    {course.title}
                  </h4>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};