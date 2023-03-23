import { Component } from '@angular/core';
import { Weather } from 'src/modal/Weather';
import { Forecast } from 'src/modal/Weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'weather';

  public weather: any;
  public showLoading = true;
  public inDegreeCelsius = true;
  private apiKey = '6cd3158087d540a48ef163808232203';
  public error = false;
  public imgUrl: any;
  public forecast :Forecast[] = [];

  ngOnInit() {
    window.addEventListener('load', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${latitude},${longitude}&days=8`;
            fetch(apiUrl)
              .then((response) => response.json())
              .then((data) => {
                this.showLoading = false;
                this.weather = new Weather(
                  data.current.condition.text,
                  data.location.name,
                  data.current.temp_c,
                  data.current.temp_f,
                  new Date(data.current.last_updated),
                  data.current.feelslike_c,
                  data.current.feelslike_f,
                  data.current.wind_mph,
                  data.current.humidity,
                  data.forecast.forecastday[0].day.maxtemp_c,
                  data.forecast.forecastday[0].day.mintemp_c,
                  data.forecast.forecastday[0].day.maxtemp_f,
                  data.forecast.forecastday[0].day.mintemp_f,
                );
                
                setTimeout(()=>{
                  this.getWeatherCondition(data.current.is_day,data.current.condition.code);
                  this.getForeCast(data.forecast.forecastday)
                },100)
              })
              .catch((error) =>
                console.error('Error getting weather data:', error)
              );
          },
          (error: any) => console.error('Error getting location:', error)
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    });
    
  }

  changeDisplay(value: any) {
    value === 'c'
      ? (this.inDegreeCelsius = true)
      : (this.inDegreeCelsius = false);
  }

  getWeatherForLocation() {
    let input = <HTMLInputElement>document.querySelector('.search-box-input');
    let location = input?.value.trim();
    if (location) {
      const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${location}&days=8`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          this.error = false;
          this.weather = new Weather(
            data.current.condition.text,
            data.location.name,
            data.current.temp_c,
            data.current.temp_f,
            new Date(data.current.last_updated),
            data.current.feelslike_c,
            data.current.feelslike_f,
            data.current.wind_mph,
            data.current.humidity,
            data.forecast.forecastday[0].day.maxtemp_c,
            data.forecast.forecastday[0].day.mintemp_c,
            data.forecast.forecastday[0].day.maxtemp_f,
            data.forecast.forecastday[0].day.mintemp_f,
          );
          setTimeout(()=>{
            this.getWeatherCondition(data.current.is_day,data.current.condition.code);
            this.getForeCast(data.forecast.forecastday)
          },100)
        })
        .catch((error) => (this.error = true));
    }
  }

  getWeatherCondition(is_day:any,code:any){
    const imgUrlbase = '/assets/images/64x64';
    const apiUrl = 'https://www.weatherapi.com/docs/weather_conditions.json';
    const img = document.getElementById('image') as HTMLElement;
    fetch(apiUrl)
    .then(response => response.json())
    .then((data)=> {
       let obj = data.find((item:any)=> item.code == code).icon;
       this.imgUrl = is_day == 1 ? imgUrlbase + '/day/' + obj + '.png' : imgUrlbase + '/night/' + obj + '.png';
       img.setAttribute("src",this.imgUrl);
      
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  getForeCast(forecast:any){
   this.forecast = []
   for(let i = 1; i<forecast.length; i++){
     const each_day = new Forecast(
       forecast[i].date,
       forecast[i].day.maxtemp_c,
       forecast[i].day.mintemp_c,
       forecast[i].day.maxtemp_f,
       forecast[i].day.mintemp_f,
       forecast[i].day.condition.code
     )
     this.forecast.push(each_day);
   }
  }
}
