
export type VideoStyle = 'cartoon' | 'realistic' | 'cinematic' | 'anime' | 'minimalist';
export type VideoAspect = 'vertical' | 'square' | 'horizontal';
export type StoryStatus = 
  'draft' | 
  'pending' | 
  'evaluating' | 
  'writing-script' | 
  'generating-images' | 
  'creating-narration' |
  'generating-music' | 
  'creating-video' | 
  'assembling' | 
  'complete' | 
  'error';

export interface StoryOptions {
  hasNarration: boolean;
  hasMusic: boolean;
  hasSoundEffects: boolean;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  style: VideoStyle;
  aspect: VideoAspect;
  options: StoryOptions;
  status: StoryStatus;
  progress: number; // 0-100
  createdAt: string;
  updatedAt: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  error?: string;
}

export interface StoryFormData {
  title: string;
  description: string;
  style: VideoStyle;
  aspect: VideoAspect;
  options: StoryOptions;
}
