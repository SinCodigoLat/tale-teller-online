
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FilmIcon, PlusIcon } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <header className="border-b py-4 bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FilmIcon className="h-6 w-6 text-studio-primary" />
          <Link to="/" className="text-xl font-bold text-studio-text">
            La Fábrica de Historias
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-studio-text hover:text-studio-primary transition-colors">
            Inicio
          </Link>
          <Link to="/dashboard" className="text-studio-text hover:text-studio-primary transition-colors">
            Mis Videos
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link to="/create">
            <Button className="btn-primary flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              <span>Crear Historia</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
