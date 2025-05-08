
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

const CTASection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-studio-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-3xl mx-auto">
          Comienza a crear historias asombrosas hoy mismo
        </h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Transforma tus ideas en videos atractivos con un solo clic. No se requieren habilidades técnicas.
        </p>
        <Link to="/create">
          <Button className="bg-white text-studio-primary hover:bg-gray-100 font-medium text-lg px-8 py-6 group">
            Crear mi primera historia
            <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
