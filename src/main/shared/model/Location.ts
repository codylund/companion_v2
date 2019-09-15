export class Location {

    url: string;
    city: string;
    state: string;
    country: string;

    constructor(json: any) {
        this.url = json.url;
        this.city = json.city;
        this.state = json.state;
        this.country = json.country;
    }

    toString(): string {
        return [
            this.city,
            this.state,
            this.country
        ].filter(val => val).join(', ');
    }
}