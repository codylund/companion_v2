import { IndexOption } from "./IndexOption";

export class IgnoreCaseIndexOption implements IndexOption<string>{
    apply(key: string): string {
        // Just make it all lowercase.
        return key.toLowerCase();
    }
}