import { IGolfRound } from './golf-round.interface';

export class GolfRound implements IGolfRound {
    private _datePlayed: Date;
    get date(): Date {
        if (!this._datePlayed) {
            this._datePlayed = new Date();
        }
        return this._datePlayed;
    }
    set date(value: Date) { this._datePlayed = value; }

    get datePlayed(): number {
        return this.date.getTime();
    }

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

    constructor(round?: IGolfRound) {
        if (round) {
            this._datePlayed = new Date(round.datePlayed);
            this._course = round.course;
            this._greensFee = round.greensFee;
            this._rodeCart = round.rodeCart;
            this._ateFood = round.ateFood;
            this._foodCost = round.foodCost;
        }
    }
}

