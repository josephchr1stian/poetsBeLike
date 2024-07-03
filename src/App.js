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
import characters from "./protagonists.json";
import CharacterCard from "./CharacterCard";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import fetchPoem from "./CharacterCard";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";

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
  const [matchPoems, setMatch] = useState();

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
  function showMatches(poetName) {
    console.log("From Show Matches", poemList);
    const matches = new Set(); // will hold the matched entry
    poemList.map((entry) => {
      let allWordString = entry.lines.join(" ").toLowerCase(); //join the array of lines and make it all lower case
      let wordArray = allWordString.split(" "); // Split the string into an array of words
      const wordSet = new Set(wordArray); // make a set of all words
      const answerSet = new Set(wordChoices);
      for (let i of answerSet) {
        if (wordSet.has(i)) {
          matches.add(entry)
        }
      }
    });
    console.log(matches);
    setMatch(matches);
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
        //console.log("From Poem Function Call", res);
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
              showMatches(authorChoice);
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
        <Grid
          container
          spacing={5}
          justifyContent="center"
          alignItems="flex-start"
        >
          {characters.map((entry) => (
            <Grid item xs={12} md={4}>
              <CharacterCard
                title={entry.title}
                image={entry.pic}
                description={entry.description}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
