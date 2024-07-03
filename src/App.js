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
import "./App.css";
import CharacterCard from "./CharacterCard";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";

function App() {
  const [status, setStatus] = useState("");
  const [authorList, setAuthorList] = useState([]);
  const [authorChoice, setAuthorChoice] = useState("Emily Dickinson");
  const [authorInput, setAuthorInput] = useState(authorChoice);
  const [wordChoices, setWordChoices] = useState([]);
  const [wordOne, setWordOne] = useState("");
  const [wordTwo, setWordTwo] = useState("");
  const [wordThree, setWordThree] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [poemList, setPoemList] = useState();
  const [matchPoems, setMatch] = useState([]);

  function fetchAuthorList() {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("https://poetrydb.org/author", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.authors);
        console.log(authorList);
        setAuthorList(result.authors);
      })
      .catch((error) => console.error(error));
  }
  function findMatches(poetName) {
    fetchPoems(poetName);
    const matches = new Set(); // will hold the matched entry
    if(poemList){
    poemList.map((entry) => {
      let allWordString = entry.lines.join(" ").toLowerCase(); //join the array of lines and make it all lower case
      let wordArray = allWordString.split(" "); // Split the string into an array of words
      const wordSet = new Set(wordArray); // make a set of all words
      const answerSet = new Set(wordChoices);
      for (let i of answerSet) {
        if (wordSet.has(i)) {
          matches.add(entry);
        }
      }
    })};
    setMatch(Array.from(matches));
    setUserScore(matches.size)
    console.log("Log Matched objects", matches)
  }
  function fetchPoems(poetName) {
    //let poemNum = Math.floor(Math.random() * 10);
    console.log("you are trying to fetch", poetName);
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("https://poetrydb.org/author/" + poetName, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let res = result;
        //console.log("From fetch poem", res);
        //put the object in a var
        setPoemList(res);
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
            onClick={() => fetchAuthorList()}
          >
            load it...
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
        <Stack direction="row" spacing={15}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={authorList}
            onChange={(event, newValue) => {
              setAuthorInput(newValue);
              console.log("New Value is " + authorInput);
            }}
            inputValue={authorInput}
            onInputChange={(event, newInputValue) => {
              setAuthorChoice(newInputValue);
              setAuthorInput(newInputValue);
            }}
            value={authorChoice}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Poets" />}
          />
          <Button
            sx={{
              color: "black",
              px: 3,
              mx: "auto",
              border: "1px solid black",
            }}
            onClick={() => {
              // Send the words to chars and display the matching poems

              setWordChoices([wordOne, wordTwo, wordThree]);
              console.log("Word Choices are: " + wordChoices);
              //console.log(authorChoice)
              console.log(authorInput);
              findMatches(authorChoice);
            }}
          >
            lock In
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
        <Grid container spacing={5}  justifyContent="center" alignItems="flex-start" >
          {[...matchPoems].map((entry, index) => (
            <Grid item xs={12} md={4} key = {index}>
            <CharacterCard
              title={entry.title}
              description={entry.lines}
            />
          </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
export default App;
