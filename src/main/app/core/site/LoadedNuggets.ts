import { Nugget } from 'src/main/shared/model';

export interface LoadedNuggets {
    nuggets: Nugget[];
    isMore: boolean;
}