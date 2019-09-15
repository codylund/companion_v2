import { Nugget } from '../../shared/model';
import { ArrayUtils } from '../utils/ArrayUtils'
import { IndexOption } from './IndexOption';

export class NuggetIndex<T> {

    private nuggets = new Map<T, Nugget[]>();
    private options: IndexOption<T>[]

    constructor(...options: IndexOption<T>[]) {
        this.options = (options) ? options : [];
    }

    put(key: T, item: Nugget) {
        key = this.initKey(key);
        this.nuggets.get(key).push(item);
    }

    private initKey(key: T): T {
        key = this.applyOptions(key);

        if (this.nuggets.has(key))
            return key;
        
        this.nuggets.set(key, []);

        return key;
    }

    private applyOptions(key: T): T {
        this.options.forEach((option) => {
            key = option.apply(key);
        })
        return key;
    }

    keys(): T[] {
        return Array.from(this.nuggets.keys());
    }

    get(...keys: T[]) {
        return keys.map((key) => {
            return this.applyOptions(key);
        }).map((key) => {
            return this.nuggets.get(key)
        }).reduce((prev, cur, idx) => {
            return (idx == 0) ? cur : ArrayUtils.intersect(prev, cur);
        }).sort(Nugget.compareByDate);
    }
}