export class Location {

    url: string;
    name: string;

    constructor(json: any) {
        this.url = json.url;
        this.name = json.name;
    }
}