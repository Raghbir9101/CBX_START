import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    CssBaseline,
    Autocomplete,
    Grid,
    CircularProgress,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { initGoogleMapsScript, fetchCities } from './fetchCities';
import './weather.css';

const App = ({
    provided,
    item,
    handleDelete,
    onChange,
    data,
    pageMetaData,
}) => {
    const [collapsed, setCollapsed] = useState(data?.collapsed);
    const [selectedCity, setSelectedCity] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    const API_KEY = 'd805050848674d87bf681441240208'; // Replace with your WeatherAPI key

    useEffect(() => {
        initGoogleMapsScript(() => setScriptLoaded(true));
    }, []);

    useEffect(() => {
        if (!scriptLoaded) return;

        let active = true;

        if (inputValue === '') {
            setOptions(selectedCity ? [selectedCity] : []);
            return undefined;
        }

        fetchCities(inputValue, (results) => {
            if (active) {
                let newOptions = [];

                if (selectedCity) {
                    newOptions = [selectedCity];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [selectedCity, inputValue, scriptLoaded]);

    const getWeather = async (e) => {
        // e.preventDefault();
        if (!selectedCity) return;

        setLoading(true);
        try {
            const response = await axios.get(
                `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${selectedCity.description}&days=5&aqi=no&alerts=no`
            );
            setWeather(response.data);
        } catch (error) {
            console.error('Error fetching weather data', error);
            setWeather(null);
        }
        setLoading(false);
    };

    const highlightMatch = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <b key={index}>{part}</b>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    useEffect(() => {
        getWeather()
    }, [selectedCity])

    return (
        <ElementWrapper
            editable={pageMetaData.role == "OWNER" || pageMetaData.role == "EDITOR"}
            collapsed={data?.collapsed}
            setCollapsed={setCollapsed}
            handleDelete={handleDelete}
            provided={provided}
            item={item}
        >
            <Box sx={{ padding: "10px" }}>
                <Box>

                    <Box >
                        <Autocomplete fullWidth
                            id="google-map-demo"
                            sx={{ background: 'white', width: "100%" }}
                            size="small"
                            getOptionLabel={(option) =>
                                typeof option === 'string' ? option : option.description
                            }
                            filterOptions={(x) => x}
                            options={options}
                            autoComplete
                            includeInputInList
                            filterSelectedOptions
                            value={selectedCity}
                            noOptionsText="No locations"
                            onChange={(event, newValue) => {
                                setOptions(newValue ? [newValue, ...options] : options);
                                setSelectedCity(newValue);
                            }}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Add a location" variant="outlined" fullWidth />
                            )}
                            renderOption={(props, option) => (
                                <li {...props} style={{ background: 'white' }}>
                                    <Grid container sx={{ alignItems: 'center' }}>
                                        <Grid item sx={{ display: 'flex', width: 44 }}>
                                            <LocationOnIcon sx={{ color: 'text.secondary' }} />
                                        </Grid>
                                        <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                            {highlightMatch(
                                                option.structured_formatting.main_text,
                                                inputValue
                                            )}
                                            <Typography variant="body2" color="text.secondary">
                                                {option.structured_formatting.secondary_text}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </li>
                            )}
                        />
                    </Box>
                    {weather && <Weather weather={weather} />}
                </Box>
            </Box>
        </ElementWrapper>
    );
};

export default App;


import './weather.css';
import { ElementWrapper } from '../Page/Page';

const Weather = ({ weather }) => {
    return (
        <div className="weather-info">
            <h2>
                {weather.location.name}, {weather.location.country}
            </h2>
            <p>{weather.current.condition.text}</p>
            <p>Temperature: {weather.current.temp_c}°C</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Wind Speed: {weather.current.wind_kph} kph</p>

            <h3>4-Day Forecast</h3>
            <div className="forecast">
                {weather.forecast.forecastday.slice(1).map((day) => (
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