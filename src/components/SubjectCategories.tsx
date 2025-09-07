import { BookOpen, HelpCircle, CheckSquare, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SubjectCategories = () => {
  const navigate = useNavigate();

  const sections = [
    { name: "Level-Up", icon: BookOpen, color: "bg-eco-green", path: "/levelup" },
    { name: "Quiz", icon: HelpCircle, color: "bg-eco-blue"},
    { name: "To-Do", icon: CheckSquare, color: "bg-eco-yellow", path: "/todo" },
    { name: "Notes", icon: FileText, color: "bg-eco-brown", path: "/notes" }
  ];

  return (
    <section className="py-12 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <div
                key={section.name}
                onClick={() => section.path && navigate(section.path)}
                className="section-pill text-center cursor-pointer group transition-all duration-300 p-6 rounded-2xl border-2 border-green-100 bg-green-50/30 hover:bg-green-100/50 hover:border-green-200 hover:shadow-xl hover:shadow-green-200/30 hover:-translate-y-1"
              >
                <div
                  className={`w-16 h-16 ${section.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-slate-400/20`}
                >
                  <IconComponent className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold transition-all duration-300 group-hover:text-green-700 text-gray-700">
                  {section.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
