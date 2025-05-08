
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { StoryStatus } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getStatusText(status: StoryStatus): string {
  const statusMap: Record<StoryStatus, string> = {
    'draft': 'Borrador',
    'pending': 'Pendiente',
    'evaluating': 'Evaluando potencial',
    'writing-script': 'Escribiendo guión',
    'generating-images': 'Generando imágenes',
    'creating-narration': 'Creando narración',
    'generating-music': 'Generando música',
    'creating-video': 'Creando video',
    'assembling': 'Ensamblando',
    'complete': 'Completo',
    'error': 'Error'
  };

  return statusMap[status] || 'Desconocido';
}

export function getProgressForStatus(status: StoryStatus): number {
  const statusProgressMap: Record<StoryStatus, number> = {
    'draft': 0,
    'pending': 5,
    'evaluating': 10,
    'writing-script': 20,
    'generating-images': 40,
    'creating-narration': 60,
    'generating-music': 75,
    'creating-video': 85,
    'assembling': 95,
    'complete': 100,
    'error': 0
  };

  return statusProgressMap[status] || 0;
}

// Mock API functions (these would connect to your backend/Supabase in a real implementation)
export const mockApi = {
  stories: [] as any[],
  
  createStory: async (storyData: any): Promise<any> => {
    const newStory = {
      id: `story-${Date.now()}`,
      ...storyData,
      status: 'pending' as StoryStatus,
      progress: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockApi.stories.push(newStory);
    
    // Simulate the n8n pipeline advancing the story through stages
    setTimeout(() => mockApi.updateStoryStatus(newStory.id, 'evaluating'), 3000);
    setTimeout(() => mockApi.updateStoryStatus(newStory.id, 'writing-script'), 6000);
    setTimeout(() => mockApi.updateStoryStatus(newStory.id, 'generating-images'), 10000);
    setTimeout(() => mockApi.updateStoryStatus(newStory.id, 'creating-narration'), 15000);
    setTimeout(() => mockApi.updateStoryStatus(newStory.id, 'generating-music'), 20000);
    setTimeout(() => mockApi.updateStoryStatus(newStory.id, 'creating-video'), 25000);
    setTimeout(() => mockApi.updateStoryStatus(newStory.id, 'assembling'), 30000);
    setTimeout(() => {
      mockApi.updateStoryStatus(newStory.id, 'complete');
      mockApi.updateStory(newStory.id, {
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        thumbnailUrl: 'https://picsum.photos/300/200'
      });
    }, 35000);
    
    return newStory;
  },
  
  getStories: async (): Promise<any[]> => {
    return mockApi.stories;
  },
  
  getStory: async (id: string): Promise<any | null> => {
    return mockApi.stories.find(story => story.id === id) || null;
  },
  
  updateStory: async (id: string, data: any): Promise<any> => {
    const storyIndex = mockApi.stories.findIndex(story => story.id === id);
    if (storyIndex === -1) return null;
    
    const updatedStory = {
      ...mockApi.stories[storyIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    mockApi.stories[storyIndex] = updatedStory;
    return updatedStory;
  },
  
  updateStoryStatus: async (id: string, status: StoryStatus): Promise<any> => {
    const storyIndex = mockApi.stories.findIndex(story => story.id === id);
    if (storyIndex === -1) return null;
    
    const progress = getProgressForStatus(status);
    
    const updatedStory = {
      ...mockApi.stories[storyIndex],
      status,
      progress,
      updatedAt: new Date().toISOString(),
    };
    
    mockApi.stories[storyIndex] = updatedStory;
    return updatedStory;
  },
  
  deleteStory: async (id: string): Promise<boolean> => {
    const storyIndex = mockApi.stories.findIndex(story => story.id === id);
    if (storyIndex === -1) return false;
    
    mockApi.stories.splice(storyIndex, 1);
    return true;
  }
};
