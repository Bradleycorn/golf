export class UTILS {
    public static coerceToInt(value: any, defaultValue: number = 0) {
        let result = parseInt(value);
        if (isNaN(result)) {
            result = defaultValue;
        }
        return result;
    }

    public static coerceToFloat(value: any, defaultValue: number = 0) {
        let result = parseFloat(value);
        if (isNaN(result)) {
            result = defaultValue;
        }
        return result;
    }
    
    public static coerceToDate(value: any) {
        let result: Date;
        
        result = new Date(value);
        
        return result;
        
    }
}
