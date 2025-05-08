
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import StoryProgress from "@/components/stories/StoryProgress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Story } from "@/types";
import { getStatusText, formatDate, mockApi } from "@/lib/utils";
import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  DownloadIcon,
  RefreshCwIcon,
  TrashIcon,
} from "lucide-react";

const StoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      if (!id) return;
      
      try {
        const data = await mockApi.getStory(id);
        
        if (!data) {
          toast.error("Historia no encontrada");
          navigate("/dashboard");
          return;
        }
        
        setStory(data);
      } catch (error) {
        console.error("Error fetching story:", error);
        toast.error("Error al cargar la historia");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();

    // Set up polling for updates (in a real app, you might use WebSockets)
    const intervalId = setInterval(fetchStory, 2000);
    
    return () => clearInterval(intervalId);
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!story) return;
    
    if (!confirm("¿Estás seguro de que deseas eliminar esta historia?")) {
      return;
    }
    
    try {
      await mockApi.deleteStory(story.id);
      toast.success("Historia eliminada con éxito");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting story:", error);
      toast.error("Error al eliminar la historia");
    }
  };

  const isComplete = story?.status === "complete";

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center py-16">
            <div className="animate-pulse text-xl text-muted-foreground">Cargando...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!story) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Historia no encontrada</h2>
            <Link to="/dashboard">
              <Button variant="outline">Volver al dashboard</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link to="/dashboard">
              <ArrowLeftIcon className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{story.title}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            {isComplete && story.videoUrl ? (
              <Card className="overflow-hidden">
                <div className="aspect-video">
                  <video
                    src={story.videoUrl}
                    poster={story.thumbnailUrl}
                    controls
                    className="w-full h-full object-contain bg-black"
                  />
                </div>
              </Card>
            ) : (
              <Card className="flex items-center justify-center p-8 aspect-video bg-gray-50">
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-2">
                    {story.status === "error"
                      ? "Error en la generación"
                      : "Video en proceso"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {story.status === "error"
                      ? "Ocurrió un error al generar tu video."
                      : "Tu video se está generando, ¡no tardará mucho!"}
                  </p>
                  {story.status === "error" && (
                    <Button 
                      onClick={() => mockApi.updateStoryStatus(story.id, "pending")}
                      className="flex items-center gap-2"
                    >
                      <RefreshCwIcon className="h-4 w-4" />
                      <span>Reintentar</span>
                    </Button>
                  )}
                </div>
              </Card>
            )}

            {/* Story Details */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Detalles de la historia</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Descripción
                  </h4>
                  <p className="mt-1">{story.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Estilo
                    </h4>
                    <p className="mt-1 capitalize">{story.style}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Formato
                    </h4>
                    <p className="mt-1 capitalize">{story.aspect}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Fecha de creación
                    </h4>
                    <p className="mt-1">{formatDate(story.createdAt)}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Opciones
                  </h4>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {story.options.hasNarration && (
                      <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                        Narración
                      </span>
                    )}
                    {story.options.hasMusic && (
                      <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                        Música
                      </span>
                    )}
                    {story.options.hasSoundEffects && (
                      <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                        Efectos de sonido
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex flex-wrap items-center gap-4">
                {isComplete && (
                  <>
                    <Button className="flex items-center gap-2">
                      <DownloadIcon className="h-4 w-4" />
                      <span>Descargar video</span>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <ExternalLinkIcon className="h-4 w-4" />
                      <span>Compartir</span>
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-auto"
                  onClick={handleDelete}
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  <span>Eliminar</span>
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <StoryProgress story={story} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StoryPage;
