import React, { useEffect, useState } from 'react'
import { OpenWeatherData, getWeatherData } from '../../utilities/api'
import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'

type WeatherCardState = 'loading' | 'error' | 'success'

const WeatherCard: React.FC<{
    city: string,
    onDelete?: () => void
}> = ({ city, onDelete }) => {
    const [weatherData, setweatherData] = useState<OpenWeatherData | null>(null)
    const [cardState, setCardState] = useState<WeatherCardState>("loading")

    useEffect(() => {
        getWeatherData(city).then((res) => {
            setweatherData(res)
            setCardState("success")
        }).catch((err) => {
            console.log(err)
            setCardState("error")
        })
    }, [city])
    if (cardState === 'loading' || cardState === 'error') {
        return (
            <Box mx="4px" my={'10px'}>
                <Card>
                    <CardContent>
                        {cardState === 'loading' ? 'loading' : 'Error could not load weather data'}
                    </CardContent>
                    <CardActions>
                        <Button onClick={onDelete} color='secondary'>clear</Button>
                    </CardActions>
                </Card>
            </Box>
            )
    }
    return (
        <Box mx="4px" my={'10px'}>
            <Card>
                <CardContent>
                    <Typography variant="h5">{weatherData.name}</Typography>
                    <Typography variant="body1">{Math.round(weatherData.main.temp)}</Typography>
                    <Typography variant="body1">Feel's like {Math.round(weatherData.main.feels_like)}</Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={onDelete} color='secondary'>Delete</Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default WeatherCard