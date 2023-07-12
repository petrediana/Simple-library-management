export class Book {
    private _name: string;
    private _isbn: string;
    private _priceToBorrow: number;

    public constructor(name: string, isbn: string, priceToBorrow: number) {
        this._name = name;
        this._isbn = isbn;
        this._priceToBorrow = priceToBorrow;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get isbn(): string {
        return this._isbn;
    }

    public set isbn(value: string) {
        this._isbn = value;
    }

    public get priceToBorrow(): number {
        return this._priceToBorrow;
    }

    public set priceToBorrow(value: number) {
        this._priceToBorrow = value;
    }
}
