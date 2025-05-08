
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { VideoStyle, VideoAspect, StoryOptions, StoryFormData } from "@/types";
import { mockApi } from "@/lib/utils";

interface StyleOption {
  value: VideoStyle;
  label: string;
  description: string;
}

interface AspectOption {
  value: VideoAspect;
  label: string;
  description: string;
  icon: string;
}

const styleOptions: StyleOption[] = [
  {
    value: "cartoon",
    label: "Cartoon",
    description: "Estilo animado con colores vivos",
  },
  {
    value: "realistic",
    label: "Realista",
    description: "Estilo fotorealista con gran detalle",
  },
  {
    value: "cinematic",
    label: "Cinematográfico",
    description: "Estilo de película con efectos visuales",
  },
  {
    value: "anime",
    label: "Anime",
    description: "Estilo de animación japonesa",
  },
  {
    value: "minimalist",
    label: "Minimalista",
    description: "Estilo simple con pocos elementos",
  },
];

const aspectOptions: AspectOption[] = [
  {
    value: "vertical",
    label: "Vertical (9:16)",
    description: "Ideal para móviles y stories",
    icon: "│",
  },
  {
    value: "square",
    label: "Cuadrado (1:1)",
    description: "Perfecto para redes sociales",
    icon: "□",
  },
  {
    value: "horizontal",
    label: "Horizontal (16:9)",
    description: "Formato estándar para video",
    icon: "—",
  },
];

const StoryForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<StoryFormData>({
    title: "",
    description: "",
    style: "cartoon",
    aspect: "vertical",
    options: {
      hasNarration: true,
      hasMusic: true,
      hasSoundEffects: true,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStyleChange = (style: VideoStyle) => {
    setFormData((prev) => ({
      ...prev,
      style,
    }));
  };

  const handleAspectChange = (aspect: VideoAspect) => {
    setFormData((prev) => ({
      ...prev,
      aspect,
    }));
  };

  const handleOptionChange = (option: keyof StoryOptions) => {
    setFormData((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        [option]: !prev.options[option],
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would use your actual API
      const story = await mockApi.createStory(formData);
      
      toast.success("Historia creada con éxito");
      navigate(`/story/${story.id}`);
    } catch (error) {
      toast.error("Ocurrió un error al crear la historia");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title and Description */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Título de la historia</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ej: Aventura en el Espacio"
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Descripción o prompt</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe tu historia o da un prompt detallado..."
                required
                className="mt-1 h-32"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Cuanto más detallada sea la descripción, mejor será el resultado.
              </p>
            </div>
          </div>

          {/* Visual Style */}
          <div>
            <Label>Estilo visual</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-2">
              {styleOptions.map((option) => (
                <div
                  key={option.value}
                  className={`relative p-4 border rounded-md cursor-pointer transition-all ${
                    formData.style === option.value
                      ? "border-studio-primary bg-studio-primary bg-opacity-5"
                      : "hover:border-studio-primary"
                  }`}
                  onClick={() => handleStyleChange(option.value)}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {option.description}
                  </div>
                  {formData.style === option.value && (
                    <div className="absolute top-2 right-2 h-3 w-3 bg-studio-primary rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div>
            <Label>Formato de video</Label>
            <RadioGroup
              value={formData.aspect}
              onValueChange={(value) => handleAspectChange(value as VideoAspect)}
              className="flex flex-wrap gap-4 mt-2"
            >
              {aspectOptions.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-start space-x-2 p-4 border rounded-md transition-all ${
                    formData.aspect === option.value
                      ? "border-studio-primary bg-studio-primary bg-opacity-5"
                      : "hover:border-studio-primary"
                  }`}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <div>
                    <Label htmlFor={option.value} className="font-medium cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">{option.icon}</span>
                        {option.label}
                      </div>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Options */}
          <div>
            <Label>Opciones</Label>
            <div className="space-y-4 mt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Narración</h4>
                  <p className="text-sm text-muted-foreground">
                    Añadir voz en off para narrar la historia
                  </p>
                </div>
                <Switch
                  checked={formData.options.hasNarration}
                  onCheckedChange={() => handleOptionChange("hasNarration")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Música</h4>
                  <p className="text-sm text-muted-foreground">
                    Añadir música de fondo
                  </p>
                </div>
                <Switch
                  checked={formData.options.hasMusic}
                  onCheckedChange={() => handleOptionChange("hasMusic")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Efectos de sonido</h4>
                  <p className="text-sm text-muted-foreground">
                    Añadir efectos de sonido para enriquecer la experiencia
                  </p>
                </div>
                <Switch
                  checked={formData.options.hasSoundEffects}
                  onCheckedChange={() => handleOptionChange("hasSoundEffects")}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="btn-primary text-lg px-8 py-6" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando historia..." : "Generar historia"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StoryForm;
