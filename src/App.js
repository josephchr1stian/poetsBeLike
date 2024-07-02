import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import "./App.css";
import characters from './protagonists.json';
import Icon from '@mui/material/Icon';
import OutletIcon from '@mui/icons-material/Outlet';
import CharacterCard from './CharacterCard'
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useState } from 'react';

import fetchPoem from './CharacterCard'





function App() {

  console.log("Chars from JSON", characters);
  const [status, setStatus] = useState('')
  function fetchFact() {


    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };  
    fetch("https://uselessfacts.jsph.pl/api/v2/facts/random", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result.text)
      setStatus(result.text)

    })
    .catch((error) => console.error(error));
  
  }
  
  return (
    <div className="App">
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid lightgray" }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            welcome.
          </Typography>
          <Button
            href="#"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => fetchFact()}
          >
            Button
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ my: 4 }}>
      
        <Typography
          variant="h2"
          align="center"
          color="text.primary"
          sx={{ py: 2 }}
        >
          poetsBeLike.
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mx: 10 }}
          id = "subtitle"
        >
         {status}
        </Typography>
      </Container>
      {/* End hero unit */}

      <Container maxWidth="lg">
        <Grid
          container
          spacing={5}
          justifyContent="center"
          alignItems="flex-start"
        >

          {characters.map((entry) => (
          <Grid item xs={12} md={4}>
            <CharacterCard title = {entry.title}
              image = {entry.pic} description = {entry.description} 
            /> 
          </Grid>
          ))}
        </Grid> 

      </Container>
    </div>
  );
}

function fetchFact() {


  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };  
  fetch("https://uselessfacts.jsph.pl/api/v2/facts/random", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result.text)
    return(result.text)
    //let subtitle  = document.getElementById("subtitle")
    //subtitle.innerHTML = myFact;
  })
  .catch((error) => console.error(error));

}
export default App;
