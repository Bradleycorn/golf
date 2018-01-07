import { IGolfRound } from './golf-round.interface';

export class GolfRound implements IGolfRound {
    
    private _roundId: string;
    get Id(): string { return this._roundId; }
    set Id(value: string) { this._roundId = value; }
    
    private _date: Date;
    get date(): Date {
        if (!this._date) {
            this._date = new Date();
        }
        return this._date;
    }
    set date(value: Date) { this._date = value; }

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

    get totalSpent(): number {
        return this.greensFee + this.foodCost;
    }

    constructor(refId?: string, round?: IGolfRound) {
        this._roundId = null;
        this._date = new Date();
        this._course = '';
        this._greensFee = 0;
        this._rodeCart = true;
        this._ateFood = false;
        this._foodCost = 0;

        if (round) {
            this._date = round.date;
            this._course = round.course;
            this._greensFee = round.greensFee;
            this._rodeCart = round.rodeCart;
            this._ateFood = round.ateFood;
            this._foodCost = round.foodCost;
        }

        if (refId) {
            this._roundId = refId;
        }
    }

    public asIGolfRound(): IGolfRound {
        return {
            date: this.date,
            course: this.course,
            greensFee: this.greensFee,
            rodeCart: this.rodeCart,
            ateFood: this.ateFood,
            foodCost: this.foodCost
        };
    }
}

