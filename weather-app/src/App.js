import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import './App.css';

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "627faa3598ec63acf55bff35e2958f0f"; // Replace with your OpenWeatherMap API key.

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }
    setError("");  // Clear previous errors.
    setLoading(true);  // Show loading spinner.
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (error) {
      setError("Unable to fetch weather data. Please check the city name.");
      setWeatherData(null);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography className="Heading" variant="h3" gutterBottom>Weather Application</Typography>
        <TextField
          variant="outlined"
          label="Enter City"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={getWeather}
          sx={{ marginTop: 2 }}
        >
          Get Weather
        </Button>

        {loading && <CircularProgress sx={{ marginTop: 2 }} />}

        {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}

        {weatherData && (
          <Card sx={{ marginTop: 4 }}>
            <CardContent>
              <Typography variant="h5">{weatherData.name}</Typography>
              <Typography variant="body1">Temperature: {weatherData.main.temp}°C</Typography>
              <Typography variant="body1">Weather: {weatherData.weather[0].description}</Typography>
              <Typography variant="body1">Humidity: {weatherData.main.humidity}%</Typography>
              <Typography variant="body1">Wind Speed: {weatherData.wind.speed} m/s</Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default App;
