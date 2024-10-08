import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./App.css";
import CharacterCard from "./CharacterCard";
import Card from "@mui/material/Card";
import Toolbar from "@mui/material/Toolbar";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect } from "react";
import { useState } from "react";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";

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
  const [matchPoems, setMatchPoems] = useState([]);
  const [titleWord, setTitleWord] = useState([]);

  function fetchAuthorList() {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("https://poetrydb.org/author", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAuthorList(result.authors);
      })
      .catch((error) => console.error(error));
  }

  function findMatches(poetName, wordOne, wordTwo, wordThree) {
    fetchPoems(poetName, wordOne, wordTwo, wordThree);
    return "null";
  }

  function fetchPoems(poetName, wordOne, wordTwo, wordThree) {
    //let poemNum = Math.floor(Math.random() * 10);
    console.log(
      "Finding Poems containing words,",
      wordOne,
      wordTwo,
      wordThree,
      " written by",
      poetName
    );
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("https://poetrydb.org/author/" + poetName, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let res = [];
        result.map((entry) => {
          let curr = entry.lines.join(" ").toLowerCase();
          if ( curr.includes( wordOne) || curr.includes(wordTwo) || curr.includes(wordThree) ) 
            {
            res.push(entry);
          }
          
        });
        console.log("Ans is", res);
        setMatchPoems(res);
        setUserScore(res.length)
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    // Everything in here gets run once on first page load
    fetchAuthorList();
  }, []);

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
        <Card
          sx={{
            boxShadow: 0,
            py: 4,
          }}
        >
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
            size="small"
            sx={{
              color: "black",
              px: 2,
              border: "1px solid black",
            }}
            onClick={() => {
              console.log(wordOne);
              //setTitleWord(wordOne)
              console.log("Titles containing: " + titleWord);

              //setUserScore[matchPoems.length]
            }}
          >
            search all titles
          </Button>
          <Button
            size="small"
            sx={{
              color: "black",
              px: 2,
              border: "1px solid black",
            }}
            onClick={() => {
              console.log(wordOne);
              console.log(wordTwo);
              console.log(wordThree);
              console.log(authorInput);
              findMatches(authorChoice, wordOne, wordTwo, wordThree); // Pass all the words to the find matches rather than making a new object/ set. set poens to what we find
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
              setWordOne(newInputValue.toLowerCase());
              //console.log(wordOne);
            }}
          />
          <TextField
            defaultValue=""
            value={wordTwo}
            onChange={(event) => {
              //console.log(newInputValue);
              let newInputValue = event.target.value;
              setWordTwo(newInputValue.toLowerCase());
            }}
          />
          <TextField
            defaultValue=""
            value={wordThree}
            onChange={(event) => {
              let newInputValue = event.target.value;
              setWordThree(newInputValue.toLowerCase());
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
              <CharacterCard title={entry.title} description={entry.lines} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
export default App;
