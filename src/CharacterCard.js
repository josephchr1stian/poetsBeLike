import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import { Collapse } from "@mui/material";
import { useState } from "react";

//I am gonna want to pass in the poem name to the character card.
// For every card I make, you get a point
export default function CharacterCard(props) {
  const [counter, setCounter] = useState(0);
  const [title, setTitle] = useState("");
  const [poemLines, setPoemLines] = useState();
  const [commonWord, setCommonWord] = useState("helios");
  const poemImage = "https://picsum.photos/300?grayscale&blur=3";

  return (
    <Card>
      {/* <CardMedia component="img" height="350px" image={poemImage} /> */}
      <CardHeader
        //title={props.title}
        title={props.title}
        titleTypographyProps={{ align: "center" }}
        sx={{ mt: 1 }}
      />
      <Accordion> 
        <CardContent sx={{ pt: 0 }}>
          <ul>
            {props.description.map((line, index) => (
              <Typography>
                {index + 1} - {line}
              </Typography>
            ))}
          </ul>
        </CardContent>
      </Accordion>
      <CardActions></CardActions>
    </Card>
  );
  function findMostCommonWord(str) {
    // Remove punctuation and convert string to lowercase
    const cleanedStr = str.replace(/[^\w\s]/g, "").toLowerCase();

    // Split the string into words
    const words = cleanedStr.split(/\s+/);

    // Create a frequency map
    const wordMap = {};
    words.forEach((word) => {
      if (wordMap[word]) {
        wordMap[word]++;
      } else {
        wordMap[word] = 1;
      }
    });

    // Find the most common word
    let maxCount = 0;
    let mostCommonWord = "";
    for (const word in wordMap) {
      if (wordMap[word] > maxCount) {
        maxCount = wordMap[word];
        mostCommonWord = word;
      }
    }
    console.log(mostCommonWord + " is the most common word");
    setCommonWord(mostCommonWord);
  }
}
