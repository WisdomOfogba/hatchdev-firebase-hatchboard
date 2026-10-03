import { useFetch } from '@/hooks/useFetch';

interface Weather {
  current: { temperature_2m: number; wind_speed_10m: number };
  current_units: { temperature_2m: string; wind_speed_10m: string };
}


const WeatherPage = () => {

    const { data, loading, error }  = useFetch<Weather>('https://api.open-meteo.com/v1/forecast' +
  '?latitude=6.5244&longitude=3.3792&current=temperature_2m,wind_speed_10m');
    console.log('Weather data:', data, 'Loading:', loading, 'Error:', error);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No data available</div>;

  return (
    <div>
        <h1>Weather Information</h1>
        <p>Temperature: {data.current.temperature_2m} {data.current_units.temperature_2m}</p>
        <p>Wind Speed: {data.current.wind_speed_10m} {data.current_units.wind_speed_10m}</p>
    </div>
  )
}

export default WeatherPage