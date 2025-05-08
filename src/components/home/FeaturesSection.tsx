
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  WandSparklesIcon,
  ImageIcon,
  MusicIcon,
  VideoIcon,
  SparklesIcon,
  Share2Icon,
} from "lucide-react";

const features = [
  {
    icon: <WandSparklesIcon className="h-8 w-8 text-studio-primary" />,
    title: "Guión inteligente",
    description: "La IA crea guiones cautivadores basados en tu idea inicial.",
  },
  {
    icon: <ImageIcon className="h-8 w-8 text-studio-primary" />,
    title: "Imágenes generativas",
    description: "Crea imágenes únicas personalizadas para tu historia.",
  },
  {
    icon: <MusicIcon className="h-8 w-8 text-studio-primary" />,
    title: "Música y narración",
    description: "Añade voces naturales y música de fondo personalizada.",
  },
  {
    icon: <VideoIcon className="h-8 w-8 text-studio-primary" />,
    title: "Videos completos",
    description: "Obtén un video final listo para compartir en cualquier plataforma.",
  },
  {
    icon: <SparklesIcon className="h-8 w-8 text-studio-primary" />,
    title: "Múltiples estilos",
    description: "Elige entre una variedad de estilos visuales para tu historia.",
  },
  {
    icon: <Share2Icon className="h-8 w-8 text-studio-primary" />,
    title: "Fácil de compartir",
    description: "Descarga y comparte tus creaciones en redes sociales.",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Todo lo que necesitas para crear historias increíbles
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nuestra plataforma unifica todo el proceso creativo en un solo lugar
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-200 card-hover">
              <CardHeader className="pb-2">
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
