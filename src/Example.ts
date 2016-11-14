
export default class Example {
    private _number: number

    public get number () : number {
        return this._number
    }

    constructor (number: number) {
        this._number = number
    }

    public double () : void {
        this._number *= 2
    }
}
