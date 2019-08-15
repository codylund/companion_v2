export interface IndexOption<T> {
    apply(key: T): T;
}