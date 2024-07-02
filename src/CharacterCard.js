
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from "@mui/material/CardHeader";
import { useState } from 'react';


export default function CharacterCard(props) {
  const [counter, setCounter] = useState(0)
  const [poemLines, setPoemLines] = useState([])
  //const[poemImage, setPoemImage] = useState()
  const [poemTitle, setPoemTitle] = useState("null")

  return (
    <Card>
              <CardMedia
                component="img"
                height="350px"
                image={props.image}
              />
              <CardHeader
                //title={props.title}
                title = {poemTitle}
                titleTypographyProps={{ align: "center" }}
                sx={{ mt: 1 }}
              />
              <CardContent sx={{ pt: 0 }}>
                <ul>
          
                {poemLines.map((line, index) => (

                <Typography component="li">
                  {index+1} - {line}
                </Typography>
                  ))}     

                  <Typography variant = "h1" > {counter}</Typography> 
                  <Typography variant = "h3" > bands</Typography>
                               
                </ul>
              </CardContent>
              <CardActions>
                <Button
                  //variant="contained"
                  sx={{ px: 6, mx: "auto", border: "1px solid black", variant: "outlined" }}   
                  onClick={() => {
                    fetchPoem();
                    setCounter(counter + 1);
                  }}  
                        
                >
                 click 2 give a dollar  
                
                </Button>
                
              </CardActions>
    </Card>  
  )

  function fetchPoem() {
    let poemNum = Math.floor(Math.random() * 10);
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };  
    fetch("https://poetrydb.org/author/Dickinson", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      let res = result[poemNum]
      console.log(res)
      setPoemLines(result[poemNum].lines)
      setPoemTitle(res.title)
    })
    .catch((error) => console.error(error));
  
  }
}



function fetchFact() {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };  
  fetch("https://uselessfacts.jsph.pl/api/v2/facts/random", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result)
    alert(result.text)
  })
  .catch((error) => console.error(error));

}