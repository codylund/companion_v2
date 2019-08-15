import { Nugget } from './Nugget';

export class NuggetPage {
    pageIndex: number;
    totalPages: number;
    nuggets: Nugget[];

    constructor(json: any) {
        this.pageIndex = json.pageIndex,
        this.totalPages = json.totalPages,
        this.nuggets = json.nuggets.map((nugget: any) => new Nugget(nugget))
    }
}