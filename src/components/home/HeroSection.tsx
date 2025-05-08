
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FilmIcon, Wand2Icon } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <div className="bg-creative-gradient bg-size-200 animate-gradient-shift py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-block p-2 bg-white bg-opacity-20 rounded-full mb-6">
          <FilmIcon className="h-7 w-7 text-white" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Transforma tus ideas en videos impactantes
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 drop-shadow-md">
          Usando inteligencia artificial para crear videos personalizados desde una simple idea
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/create">
            <Button className="bg-white hover:bg-gray-100 text-studio-primary font-medium text-lg px-8 py-6">
              <Wand2Icon className="mr-2 h-5 w-5" />
              Crear mi historia
            </Button>
          </Link>
          
          <Link to="/dashboard">
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:bg-opacity-10 text-lg px-8 py-6"
            >
              Ver mis creaciones
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
