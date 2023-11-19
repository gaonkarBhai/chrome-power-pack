const OPEN_WEATHER_API_KEY = "903ac7871cf70791d922738189fbe0c6";

export interface OpenWeatherData {
  name:string;
  main:{
    temp:number;
    feels_like:number;
    humidity:number;
    pressure:number;
    twmp_min:number;
    temp_max:number;
  };
  weather:{
    description:string;
    icon:string;
    id:number;
    main:string;
  }[];
  wind:{
    deg:number;
    speed:number;
  }
}

export async function getWeatherData(city: string):Promise<any>{
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
  );
  if(!response.ok) throw new Error("City not found!");
  const data = await response.json();
  return data;
}