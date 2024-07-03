import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { useState } from "react";


//I am gonna want to pass in the poem name to the character card.
// For every card I make, you get a point
export default function CharacterCard(props) {
  const [counter, setCounter] = useState(0);
  const [title, setTitle] = useState("");
  const [poemLines, setPoemLines] = useState();
  const [commonWord, setCommonWord] = useState("helios");
  const poemImage = "https://picsum.photos/300?grayscale&blur=3";
  // 0
  // : 
  // value
  // : 
  // author
  // : 
  // "Emily Dickinson"
  // linecount
  // : 
  // "16"
  // lines
  // : 
  // (19) ['Summer begins to have the look', 'Peruser of enchanting Book', 'Reluctantly but sure perceives', 'A gain upon the backward leaves --', '', 'Autumn begins to be inferred', 'By millinery of the cloud', 'Or deeper color in the shawl', 'That wraps the everlasting hill.', '', 'The eye begins its avarice', 'A meditation chastens speech', 'Some Dyer of a distant tree', 'Resumes his gaudy industry.', '', 'Conclusion is the course of All', 'At most to be perennial', 'And then elude stability', 'Recalls to immortality.']
  // title
  // : 
  // "Summer begins to have the look"
  // How the prop will come in

  return (
    <Card>
      <CardMedia component="img" height="350px" image={poemImage} />
      <CardHeader
        //title={props.title}
        title={props.title}
        titleTypographyProps={{ align: "center" }}
        sx={{ mt: 1 }}
      />
      <CardContent sx={{ pt: 0 }}>
        <ul>
          {props.description.map((line, index) => (
            <Typography>
              {index + 1} - {line}
            </Typography>
          ))}
        </ul>
      </CardContent>
      <CardActions>
        {/* <Button
          //variant="contained"
          sx={{
            px: 6,
            mx: "auto",
            border: "1px solid black",
            variant: "outlined",
          }}
          onClick={() => {
            fetchPoem();
            findMostCommonWord(poemLines.join(" "));
            setImage();
            setCounter(counter + 1);
          }}
        >
          load poem
        </Button> */}
      </CardActions>
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
