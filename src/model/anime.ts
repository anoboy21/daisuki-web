import { Episode } from "./episode";

export interface Anime {
  id?: number;
  name?: string;
  synopsis?: string;
  imageUrl?: string;
  totalEpisodes?: number;
  isMovie?: boolean;
  isDubbed?: boolean;
  isCompleted?: boolean;
  episodes?: Episode[];
  createdAt?: string;
  rating?: number;
}
