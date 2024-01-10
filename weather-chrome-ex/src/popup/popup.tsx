import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import WeatherCard from './WeatherCard/WeatherCard'
import 'fontsource-roboto'
import { Box, Grid, IconButton, InputBase, Paper } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { getStoredCities, setStoredCities } from '../utilities/storage'
// ... (import statements remain the same)

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [city, setCity] = useState<string>('');
  useEffect(() => {
    getStoredCities().then((cities) => { setCities(cities) })
  }, [])
  const handleCityClick = () => {
    console.log(city);
    if (city === "") return;
    setStoredCities([...cities, city]).then(()=>{
      setCities([...cities, city]);
      setCity('');
    })
  }
  const handleOnDelete = (index: number) => {
    cities.splice(index, 1);
    setStoredCities([...cities]).then(()=>{
      setCities([...cities]);
    })
  }

  return (
    <Box mx={'8px'} my={'8px'}>
      <Grid container alignItems="center">
        <Grid item xs={10}>
          <Paper>
            <Box px={'10px'} py={'9px'} display="flex" alignItems="center">
              <InputBase placeholder='Add a city' fullWidth value={city} onChange={e => setCity(e.target.value)} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper>
            <Box px={'10px'} display="flex" alignItems="center" justifyContent="center">
              <IconButton onClick={handleCityClick}>
                <Add />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {cities.map((city, i) => (
        <WeatherCard city={city} key={i} onDelete={() => handleOnDelete(i)} />
      ))}
      <Box height={'10px'} />
    </Box>
  );
}

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);