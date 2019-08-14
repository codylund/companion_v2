import { IndexOption } from "./IndexOption";

export class NoPuncIndexOption implements IndexOption<string> {
    apply(key: string): string {
        return key.replace(/[^\w ]/g, '');   
    }
}