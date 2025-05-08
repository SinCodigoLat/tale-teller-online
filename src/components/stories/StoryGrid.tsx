
import React from "react";
import { Story } from "@/types";
import StoryCard from "./StoryCard";

interface StoryGridProps {
  stories: Story[];
  emptyMessage?: string;
}

const StoryGrid: React.FC<StoryGridProps> = ({ 
  stories, 
  emptyMessage = "No hay historias para mostrar." 
}) => {
  if (stories.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
};

export default StoryGrid;
