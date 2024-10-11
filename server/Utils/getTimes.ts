interface sunrise {
  results: {
    date: string,
    sunrise: string,
    sunset: string,
    first_light: string,
    last_light: string,
    dawn: string,
    dusk: string,
    solar_noon: string,
    golden_hour: string,
    day_length: string,
    timezone: string,
    utc_offset: number
  },
  status: string
}

interface dawn {
  dawn : string,
  dusk: string
}

async function getSunrise() : Promise<dawn> {
  const date = new Date();
  const dateStr = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
  console.log(dateStr);
  const uri = `https://api.sunrisesunset.io/json?lat=50.41136&lng=4.44448&date=${dateStr}&time_format=24`;
  console.log(uri);
  const jsonResponse = await fetch(uri);
  const jsonData: sunrise = await jsonResponse.json();
  console.log(jsonData, "\n");
  const result : dawn = {"dawn": jsonData.results.dawn, "dusk": jsonData.results.dusk}; 
  return result;
}

export default getSunrise;
