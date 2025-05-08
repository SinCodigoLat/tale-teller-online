
import React from "react";

const steps = [
  {
    number: "01",
    title: "Describe tu idea",
    description: "Ingresa un título y una breve descripción de tu historia.",
    color: "from-studio-primary to-studio-secondary",
  },
  {
    number: "02",
    title: "Personaliza",
    description: "Elige el estilo visual y opciones para tu video.",
    color: "from-studio-secondary to-studio-accent",
  },
  {
    number: "03",
    title: "Genera",
    description: "Nuestro sistema creará automáticamente tu video completo.",
    color: "from-studio-accent to-studio-primary",
  },
  {
    number: "04",
    title: "Comparte",
    description: "Descarga y comparte tu creación en cualquier plataforma.",
    color: "from-studio-primary to-studio-accent",
  },
];

const StepsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Crea videos en 4 simples pasos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            De la idea al video final en cuestión de minutos
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div 
                className={`w-20 h-20 flex items-center justify-center rounded-full text-2xl font-bold text-white mb-6 bg-gradient-to-r ${step.color}`}
              >
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
