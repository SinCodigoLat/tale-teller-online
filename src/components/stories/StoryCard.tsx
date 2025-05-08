
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Story } from "@/types";
import { formatDate, getStatusText } from "@/lib/utils";
import { PlayIcon, FilmIcon } from "lucide-react";

interface StoryCardProps {
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const isComplete = story.status === "complete";
  const isError = story.status === "error";
  
  return (
    <Card className="overflow-hidden card-hover">
      <div className="relative aspect-video bg-gray-100">
        {story.thumbnailUrl ? (
          <img
            src={story.thumbnailUrl}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FilmIcon className="h-10 w-10 text-gray-400" />
          </div>
        )}
        
        {/* Status badge */}
        <div 
          className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium ${
            isComplete 
              ? "bg-green-100 text-green-800" 
              : isError 
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"
          }`}
        >
          {getStatusText(story.status)}
        </div>
        
        {/* Play button (only for completed videos) */}
        {isComplete && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Link to={`/story/${story.id}`}>
              <Button 
                size="icon" 
                className="h-12 w-12 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 text-studio-primary"
              >
                <PlayIcon className="h-6 w-6" />
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg truncate">{story.title}</h3>
        <p className="text-sm text-muted-foreground mt-1 truncate">
          {story.description}
        </p>
        
        <div className="mt-3">
          {!isComplete && !isError && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>{getStatusText(story.status)}</span>
                <span>{story.progress}%</span>
              </div>
              <Progress value={story.progress} className="h-1" />
            </div>
          )}
          
          <div className="flex justify-between items-center mt-3">
            <div className="text-xs text-muted-foreground">
              {formatDate(story.createdAt)}
            </div>
            <Link to={`/story/${story.id}`}>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-studio-primary hover:text-studio-primary hover:bg-studio-primary/10"
              >
                {isComplete ? "Ver video" : "Ver detalles"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StoryCard;
