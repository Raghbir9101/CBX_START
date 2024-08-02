// import React, { useState } from 'react';
// import axios from 'axios';
// import './weather.css';

// const App = () => {
//   const [city, setCity] = useState('');
//   const [weather, setWeather] = useState(null);

//   const API_KEY = 'd805050848674d87bf681441240208'; // Replace with your WeatherAPI key

//   const getWeather = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get(
//         `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`
//       );
//       setWeather(response.data);
//     } catch (error) {
//       console.error('Error fetching weather data', error);
//       setWeather(null);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Weather App</h1>
//       <form onSubmit={getWeather}>
//         <input
//           type="text"
//           placeholder="Enter city"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//         />
//         <button type="submit">Get Weather</button>
//       </form>
//       {weather && <Weather weather={weather} />}
//     </div>
//   );
// };

// export default App;


// const Weather = ({ weather }) => {
//   return (
//     <div className="weather-info">
//       <h2>{weather.location.name}, {weather.location.country}</h2>
//       <p>{weather.current.condition.text}</p>
//       <p>Temperature: {weather.current.temp_c}°C</p>
//       <p>Humidity: {weather.current.humidity}%</p>
//       <p>Wind Speed: {weather.current.wind_kph} kph</p>

//       <h3>4-Day Forecast</h3>
//       <div className="forecast">
//         {weather.forecast.forecastday.slice(1).map(day => (
//           <div key={day.date} className="forecast-day">
//             <h4>{day.date}</h4>
//             <p>{day.day.condition.text}</p>
//             <p>Max Temp: {day.day.maxtemp_c}°C</p>
//             <p>Min Temp: {day.day.mintemp_c}°C</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export { Weather };



import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, CssBaseline, Autocomplete } from '@mui/material';
import './weather.css';

let cities = []

const App = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const [weather, setWeather] = useState(null);

    const API_KEY = 'd805050848674d87bf681441240208'; // Replace with your WeatherAPI key

    const getWeather = async (e) => {
        e.preventDefault();
        if (!selectedCity) return;

        try {
            const response = await axios.get(
                `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${selectedCity.value}&days=5&aqi=no&alerts=no`
            );
            setWeather(response.data);
        } catch (error) {
            console.error('Error fetching weather data', error);
            setWeather(null);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Weather App
                </Typography>
                <Box component="form" onSubmit={getWeather} sx={{ mt: 3 }}>
                    <Autocomplete
                        options={cities}
                        getOptionLabel={(option) => option.label}
                        onChange={(event, newValue) => setSelectedCity(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} label="Enter city" variant="outlined" fullWidth />
                        )}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Get Weather
                    </Button>
                </Box>
                {weather && <Weather weather={weather} />}
            </Box>
        </Container>
    );
};

export default App;


const Weather = ({ weather }) => {
    return (
        <div className="weather-info">
            <h2>{weather.location.name}, {weather.location.country}</h2>
            <p>{weather.current.condition.text}</p>
            <p>Temperature: {weather.current.temp_c}°C</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Wind Speed: {weather.current.wind_kph} kph</p>

            <h3>4-Day Forecast</h3>
            <div className="forecast">
                {weather.forecast.forecastday.slice(1).map(day => (
                    <div key={day.date} className="forecast-day">
                        <h4>{day.date}</h4>
                        <p>{day.day.condition.text}</p>
                        <p>Max Temp: {day.day.maxtemp_c}°C</p>
                        <p>Min Temp: {day.day.mintemp_c}°C</p>
                    </div>
                ))}
            </div>
        </div>
    );
};