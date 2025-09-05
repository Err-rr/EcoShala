import { BookOpen, HelpCircle, CheckSquare, FileText } from "lucide-react";

export const SubjectCategories = () => {
  const sections = [
    { name: "Lectures", icon: BookOpen, color: "bg-eco-green" },
    { name: "Quiz", icon: HelpCircle, color: "bg-eco-blue" },
    { name: "To-Do", icon: CheckSquare, color: "bg-eco-yellow" },
    { name: "Notes", icon: FileText, color: "bg-eco-brown" }
  ];

  return (
    <section className="py-12 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={section.name}
                className="section-pill text-center hover:shadow-lg cursor-pointer group"
              >
                <div className={`w-16 h-16 ${section.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold group-hover:text-eco-green transition-colors">{section.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};