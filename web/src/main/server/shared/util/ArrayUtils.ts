export class ArrayUtils {

    private constructor() {
    }

    static intersect<T>(listOne: T[], listTwo: T[]) {
        // Interset all the lists by filtering for items in the previous list
        // that are also in the current list.
        return listOne.filter((item) => listTwo.includes(item))
    }
}
