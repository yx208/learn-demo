class Stack<T> {

    private stackArr: T[] = []

    constructor() {}

    public push(element: T): void {
        this.stackArr.push(element)
    }

    public pop(): T {
        return this.stackArr.pop()
    }

    public size(): number {
        return this.stackArr.length
    }

    public at(index: number) {
        if (index < 0 || index >= this.size()) return null

        return this.stackArr[index]
    }

    public lastElement() {
        return this.stackArr[this.size() - 1]
    }

    public firstElement() {
        return this.stackArr[0]
    }
}

export default Stack
