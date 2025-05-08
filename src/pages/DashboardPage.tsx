
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import StoryGrid from "@/components/stories/StoryGrid";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Story } from "@/types";
import { mockApi } from "@/lib/utils";
import { PlusIcon } from "lucide-react";

const DashboardPage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await mockApi.getStories();
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();

    // Set up polling for updates (in a real app, you might use WebSockets)
    const intervalId = setInterval(fetchStories, 3000);
    
    return () => clearInterval(intervalId);
  }, []);

  const completedStories = stories.filter((story) => story.status === "complete");
  const inProgressStories = stories.filter(
    (story) => story.status !== "complete" && story.status !== "error"
  );
  const errorStories = stories.filter((story) => story.status === "error");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">Mis historias</h1>
          <Link to="/create">
            <Button className="btn-primary flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              <span>Crear nueva</span>
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-pulse text-xl text-muted-foreground">Cargando...</div>
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg border">
            <h2 className="text-2xl font-semibold mb-4">No tienes historias creadas</h2>
            <p className="text-muted-foreground mb-8">
              Crea tu primera historia para verla aquí
            </p>
            <Link to="/create">
              <Button className="btn-primary">Crear mi primera historia</Button>
            </Link>
          </div>
        ) : (
          <Tabs defaultValue="all" className="space-y-8">
            <TabsList className="grid grid-cols-4 max-w-[400px]">
              <TabsTrigger value="all">
                Todas ({stories.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completas ({completedStories.length})
              </TabsTrigger>
              <TabsTrigger value="in-progress">
                En proceso ({inProgressStories.length})
              </TabsTrigger>
              <TabsTrigger value="error">
                Errores ({errorStories.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <StoryGrid 
                stories={stories} 
                emptyMessage="No tienes historias creadas aún."
              />
            </TabsContent>
            
            <TabsContent value="completed" className="mt-6">
              <StoryGrid 
                stories={completedStories} 
                emptyMessage="No tienes historias completadas."
              />
            </TabsContent>
            
            <TabsContent value="in-progress" className="mt-6">
              <StoryGrid 
                stories={inProgressStories} 
                emptyMessage="No tienes historias en proceso."
              />
            </TabsContent>
            
            <TabsContent value="error" className="mt-6">
              <StoryGrid 
                stories={errorStories} 
                emptyMessage="No tienes historias con errores."
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;
