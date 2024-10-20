import { aqualightData, lights } from "../interfaces/planning.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();
const getAquaLightData = async (): Promise<aqualightData> => {
  const response = await fetch(`${env.AQUALIGHT_URL}/data`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);;
  } else {
    const data = await response.json();
    return data;
  }
}

const setAqualightData = async (data: lights) => {
  const response = await fetch(`${env.AQUALIGHT_URL}/light`,{
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);;
  } else {
    console.log("data", data);
  }
}

export {getAquaLightData, setAqualightData};