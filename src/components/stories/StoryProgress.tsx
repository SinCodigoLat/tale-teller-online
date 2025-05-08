
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Story, StoryStatus } from "@/types";
import { getStatusText } from "@/lib/utils";
import { 
  BrainIcon, 
  FileTextIcon, 
  ImageIcon, 
  MicIcon, 
  MusicIcon, 
  FilmIcon, 
  PackageIcon, 
  CheckCircleIcon,
  AlertCircleIcon,
  ClockIcon
} from "lucide-react";

interface StoryProgressProps {
  story: Story;
}

const StoryProgress: React.FC<StoryProgressProps> = ({ story }) => {
  const isComplete = story.status === 'complete';
  const isError = story.status === 'error';

  const stages: {
    status: StoryStatus;
    label: string;
    icon: React.ReactNode;
    description: string;
  }[] = [
    {
      status: "pending",
      label: "Pendiente",
      icon: <ClockIcon className="h-5 w-5" />,
      description: "Tu historia está en cola para ser procesada.",
    },
    {
      status: "evaluating",
      label: "Evaluando",
      icon: <BrainIcon className="h-5 w-5" />,
      description: "Evaluando el potencial de la historia y optimizando para su viralidad.",
    },
    {
      status: "writing-script",
      label: "Guión",
      icon: <FileTextIcon className="h-5 w-5" />,
      description: "Creando un guión detallado para tu historia.",
    },
    {
      status: "generating-images",
      label: "Imágenes",
      icon: <ImageIcon className="h-5 w-5" />,
      description: "Generando las imágenes según el estilo seleccionado.",
    },
    {
      status: "creating-narration",
      label: "Narración",
      icon: <MicIcon className="h-5 w-5" />,
      description: "Creando la narración con voz natural.",
    },
    {
      status: "generating-music",
      label: "Música",
      icon: <MusicIcon className="h-5 w-5" />,
      description: "Componiendo música de fondo personalizada.",
    },
    {
      status: "creating-video",
      label: "Video",
      icon: <FilmIcon className="h-5 w-5" />,
      description: "Creando secuencias de video.",
    },
    {
      status: "assembling",
      label: "Ensamblando",
      icon: <PackageIcon className="h-5 w-5" />,
      description: "Uniendo todos los elementos para crear el video final.",
    },
    {
      status: "complete",
      label: "Completo",
      icon: <CheckCircleIcon className="h-5 w-5" />,
      description: "¡Tu video está listo para ser visto y compartido!",
    },
  ];

  // Find the current stage index
  const currentStageIndex = stages.findIndex(stage => stage.status === story.status);
  
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Estado del proyecto</h3>
        <div 
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            isComplete 
              ? "bg-green-100 text-green-800" 
              : isError 
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"
          }`}
        >
          {getStatusText(story.status)}
        </div>
      </div>
      
      {isError ? (
        <div className="flex items-center gap-3 p-4 bg-red-50 rounded-md">
          <AlertCircleIcon className="h-6 w-6 text-red-500" />
          <div>
            <h4 className="font-medium text-red-800">Ocurrió un error</h4>
            <p className="text-sm text-red-600">{story.error || "No se pudo completar el proceso. Por favor, intenta nuevamente."}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>{getStatusText(story.status)}</span>
              <span>{story.progress}%</span>
            </div>
            <Progress value={story.progress} className="h-2" />
          </div>
          
          <div className="space-y-3">
            {stages.map((stage, index) => {
              const isCurrentStage = stage.status === story.status;
              const isPastStage = currentStageIndex > index || isComplete;
              const isFutureStage = currentStageIndex < index && !isComplete;
              
              return (
                <div 
                  key={stage.status}
                  className={`flex items-center p-3 rounded-md ${
                    isCurrentStage 
                      ? "bg-studio-primary/10 border border-studio-primary/30"
                      : isPastStage
                        ? "bg-green-50"
                        : "bg-gray-50"
                  }`}
                >
                  <div 
                    className={`p-2 rounded-full mr-3 ${
                      isCurrentStage 
                        ? "bg-studio-primary text-white animate-pulse"
                        : isPastStage
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {stage.icon}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h4 className={`font-medium ${
                        isCurrentStage 
                          ? "text-studio-primary"
                          : isPastStage
                            ? "text-green-700"
                            : "text-gray-500"
                      }`}>
                        {stage.label}
                      </h4>
                      {isPastStage && stage.status !== story.status && (
                        <CheckCircleIcon className="ml-2 h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <p className={`text-sm ${
                      isFutureStage ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {stage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default StoryProgress;
