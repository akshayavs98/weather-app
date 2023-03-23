export class Weather {
    condition: string;
    place: any;
    tempinC: any;
    tempinF: any;
    dateNtime: any;
    feelslike_c: any;
    feelslike_f: any;
    wind: any;
    humidity: any;
    max_temp: any;
    min_temp: any;
    max_temp_f: any;
    min_temp_f: any;
    constructor(
        condition: any,
        place: any,
        tempinC: any,
        tempinF: any,
        dateNtime: any,
        feelslike_c:any,
        feelslike_f:any,
        wind:any,
        humidity:any,
        max_temp:any,
        min_temp:any,
        max_temp_f:any,
        min_temp_f:any

    ){
        this.condition = condition;
        this.place = place;
        this.tempinC = tempinC;
        this.tempinF = tempinF;
        this.dateNtime = dateNtime;
        this.feelslike_c = feelslike_c;
        this.feelslike_f = feelslike_f,
        this.wind = wind,
        this.humidity = humidity,
        this.max_temp = max_temp,
        this.min_temp = min_temp,
        this.max_temp_f = max_temp_f,
        this.min_temp_f = min_temp_f
    }
}

export class Forecast{
    day: any;
    maxtemp_c: any;
    mintemp_c: any;
    maxtemp_f: any;
    mintemp_f: any;
    icon: any;
    weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    constructor(day: any,maxtemp_c: any,mintemp_c: any,maxtemp_f: any,mintemp_f: any,icon: any){
        this.day = this.weekday[new Date(day).getDay()];
        this.maxtemp_c = maxtemp_c;
        this.mintemp_c = mintemp_c;
        this.maxtemp_f = maxtemp_f;
        this.mintemp_f = mintemp_f;
        this.icon = icon;
    }
}

