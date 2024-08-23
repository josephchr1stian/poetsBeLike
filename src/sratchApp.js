import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./App.css"; 
import CharacterCard from "./CharacterCard";
import Card from "@mui/material/Card";
//import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { CardMedia, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import cutiveMono from "./CutiveMono-Regular.ttf"
import { RequestPageSharp } from "@mui/icons-material";


function fetchAuthorList() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch("https://poetrydb.org/author", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.authors;
    })
    .catch((error) => console.error(error));
}
function findMatches(poetName, wordOne, wordTwo, wordThree) {
  const keywords = [wordOne.toLowerCase(), wordTwo.toLowerCase(), wordThree.toLowerCase()]
  const poems = fetchPoems(poetName);
// The poem object is filled with an API. We parse thru it and only return the ones that match our keyword. We use what we return to set the state variable in our component
  return poems.filter(entry => {
    return entry.lines.some(line => {
      return keywords.some(keyword => line.toLowerCase().includes(keyword))
    })
  })
}
function fetchPoems(poetName) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch("https://poetrydb.org/author/" + poetName, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result
    })
    .catch((error) => console.error(error));
}
// fetch title will matches will find all titles from any author that have keyword
function fetchTitleMatches(wordOne) {
  //let poemNum = Math.floor(Math.random() * 10);
  console.log("you are trying to fetch poems with titles that contain", wordOne);
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch("https://poetrydb.org/title/" + wordOne, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      let res = result;
      console.log("sent req was:", )
      return result// set match to res, set score to res.length
    })
    .catch((error) => console.error(error));
}



function App() {
  const [status, setStatus] = useState("");
  const [authorList, setAuthorList] = useState([]);
  const [authorChoice, setAuthorChoice] = useState("Emily Dickinson");
  const [authorInput, setAuthorInput] = useState(authorChoice);

  const [wordOne, setWordOne] = useState("");
  const [wordTwo, setWordTwo] = useState("");
  const [wordThree, setWordThree] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [poemList, setPoemList] = useState();
  const [matchPoems, setMatch] = useState([]);
  const [titleWord, setTitleWord] = useState([]);


  useEffect(() => {
    // Everything in here gets run once on first page load
    setAuthorList(fetchAuthorList());
  }, []);

  return (
    <div className="App">
      <CssBaseline  />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid lightgray" }}
      >
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
        <Card
            sx = {{
              boxShadow: 0, 
              py : 4}}>
          <CardMedia
            component="img"
            height="360"
            alt="randimg"
            image="https://picsum.photos/300?grayscale&blur=2"
            
          />
        </Card>
        <Stack direction="row" spacing={15}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={authorList}
            onChange={(event, newValue) => {
              if (newValue != null) {
                setAuthorInput(newValue);
                console.log("New Value is " + authorInput);
              }
            }}
            inputValue={authorInput}
            onInputChange={(event, newInputValue) => {
              if (newInputValue != null) {
                setAuthorChoice(newInputValue);
                setAuthorInput(newInputValue);
              }
            }}
            value={authorChoice}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Poets" />}
          />
          <Button 
            size ="small"
            sx={{
              color: "black",
              px: 2,
              border: "1px solid black",
            }}
            onClick={() => {


              console.log(wordOne)
              //setTitleWord(wordOne)
              console.log("Titles containing: " + titleWord);
              setMatch(fetchTitleMatches(wordOne));
              //setUserScore[matchPoems.length]
            }}
          >
            search all titles
          </Button>
          <Button 
            size ="small"
            sx={{
              color: "black",
              px: 2,
              border: "1px solid black",
            }}
            onClick={() => {
              console.log(wordOne)
              console.log(wordTwo)
              console.log(wordThree)
              console.log(authorInput);
             setMatch(findMatches(authorChoice, wordOne, wordTwo, wordThree)); // Pass all the words to the find matches rather than making a new object/ set. set poens to what we find
            }}
          >
            search lines
          </Button>
          <Typography variant="h3">scoree: {userScore}</Typography>
        </Stack>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
            p: 3,
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            defaultValue=""
            value={wordOne}
            onChange={(event) => {
              //console.log(newInputValue);
              let newInputValue = event.target.value;
              setWordOne(newInputValue);
              //console.log(wordOne);
            }}
          />
          <TextField
            defaultValue=""
            value={wordTwo}
            onChange={(event) => {
              //console.log(newInputValue);
              let newInputValue = event.target.value;
              setWordTwo(newInputValue);
              //console.log(wordTwo);
            }}
          />
          <TextField
            defaultValue=""
            value={wordThree}
            onChange={(event) => {
              //console.log(newInputValue);
              let newInputValue = event.target.value;
              setWordThree(newInputValue);
              //console.log(wordThree);
            }}
          />
        </Box>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mx: 10 }}
          id="subtitle"
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
          {[...matchPoems].map((entry, index) => (
            <Grid item xs={12} md={4} key={index}>
              <CharacterCard
                title={entry.title}
                description={entry.lines}
                //keywords={wordChoices}
                wordUno = {wordOne}
                wordDos = {wordTwo}
                wordTres = {wordThree}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
export default App;
