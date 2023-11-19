import React, { useEffect, useState } from 'react'
import { OpenWeatherData, getWeatherData } from '../../utilities/api'
import { Box, Card, CardContent, Typography } from '@material-ui/core'

const WeatherCard: React.FC<{
    city: string,
}> = ({ city }) => {
    const [weatherData, setweatherData] = useState<OpenWeatherData | null>(null)
    useEffect(() => {
        getWeatherData(city).then((res) => { setweatherData(res) }).catch((err) => console.log(err))
    }, [city])
    if (!weatherData) {
        return (<div>Loading...</div>)
    }
    return (
        <Box mx="4px" my={'10px'}>
            <Card>
                <CardContent>
                    <Typography variant="h5">{weatherData.name}</Typography>
                    <Typography variant="body1">{Math.round(weatherData.main.temp)}</Typography>
                    <Typography variant="body1">Feel's like {Math.round(weatherData.main.feels_like)}</Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default WeatherCard