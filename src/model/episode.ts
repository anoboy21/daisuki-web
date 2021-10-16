import { Anime } from "./anime";

export interface Episode {
  id?: number;
  episode_number?: number;
  imageUrl?: string;
  videoUrl?: string;
  views?: number;
  anime?: Anime;
  createdAt?: string;
  updatedAt?: string;
}
