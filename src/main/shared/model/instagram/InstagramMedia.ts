import { InstagramMediaType } from './InstramMediaType';

export interface InstagramMedia {
    type: InstagramMediaType;
    url: string;
    time: number;
}