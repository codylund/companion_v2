import { Place } from '../../shared/model';
import { ArrayUtils } from '../utils/ArrayUtils'
import { IndexOption } from './IndexOption';

export class PlaceIndex<T> {

    private places = new Map<T, Place[]>();
    private options: IndexOption<T>[]

    constructor(...options: IndexOption<T>[]) {
        this.options = (options) ? options : [];
    }

    put(key: T, item: Place) {
        key = this.initKey(key);
        this.places.get(key).push(item);
    }

    private initKey(key: T): T {
        key = this.applyOptions(key);

        if (this.places.has(key))
            return key;
        
        this.places.set(key, []);

        return key;
    }

    private applyOptions(key: T): T {
        this.options.forEach((option) => {
            key = option.apply(key);
        })
        return key;
    }

    keys(): T[] {
        return Array.from(this.places.keys());
    }

    get(...keys: T[]) {
        return keys.map((key) => {
            return this.applyOptions(key);
        }).map((key) => {
            return this.places.get(key)
        }).reduce((prev, cur, idx) => {
            return (idx == 0) ? cur : ArrayUtils.intersect(prev, cur);
        }).sort(Place.compareByDate);
    }
}