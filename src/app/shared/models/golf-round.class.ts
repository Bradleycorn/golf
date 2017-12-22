export class GolfRound {
    private _datePlayed: Date;
    get date(): Date { return this._datePlayed; }
    set date(value: Date) { this._datePlayed = value; }

    private _course: string;
    get course(): string { return this._course; }
    set course(value: string) { this._course = value; }

    private _greensFee: number;
    get greensFee(): number { return this._greensFee; }
    set greensFee(value: number) { this._greensFee = value; }

    private _rodeCart: boolean;
    get rodeCart(): boolean { return this._rodeCart; }
    set rodeCart(value: boolean) { this._rodeCart = value; }

    private _ateFood: boolean;
    get ateFood(): boolean { return this._ateFood; }
    set ateFood(value: boolean) { this._ateFood = value; }

    private _foodCost: number = 0;
    get foodCost(): number { return this._foodCost; }
    set foodCost(value: number) { this._foodCost = value; }

    constructor(roundDate: Date, course: string, greensFee: number, cart: boolean = true, food: boolean = false, foodCost: number = 0) {
        this._datePlayed = roundDate;
        this._course = course;
        this._greensFee = greensFee;
        this._rodeCart = cart;
        this._ateFood = food;
        this._foodCost = foodCost;
    }
}

