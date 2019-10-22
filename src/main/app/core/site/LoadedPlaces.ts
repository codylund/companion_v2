import { Place } from 'src/main/shared/model';

export interface LoadedPlaces {
    places: Place[];
    isMore: boolean;
}