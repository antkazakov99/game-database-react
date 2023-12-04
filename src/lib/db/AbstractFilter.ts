abstract class AbstractFilter<Type> {
    private _page: number = 1;
    private _total: number = 25;

    public get page(): number {
        return this._page;
    }

    public set page(value: number) {
        this._page = value;
    }

    public get total(): number {
        return this._total
    }

    public set total(value: number) {
        this._total = value;
    }
}