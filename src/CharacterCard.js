import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { useState } from "react";

export default function CharacterCard(props) {
  const [counter, setCounter] = useState(0);
  const [poemLines, setPoemLines] = useState([]);
  const [poemImage, setPoemImage] = useState(
    "https://picsum.photos/300?grayscale&blur=3"
  );
  const [poemTitle, setPoemTitle] = useState("");
  const [commonWord, setCommonWord] = useState("helios");

  return (
    <Card>
      <CardMedia component="img" height="350px" image={poemImage} />
      <CardHeader
        //title={props.title}
        title={poemTitle}
        titleTypographyProps={{ align: "center" }}
        sx={{ mt: 1 }}
      />
      <CardContent sx={{ pt: 0 }}>
        <ul>
          {poemLines.map((line, index) => (
            <Typography>
              {index + 1} - {line}
            </Typography>
          ))}
        </ul>
      </CardContent>
      <CardActions>
        <Button
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
        </Button>
      </CardActions>
    </Card>
  );

  function fetchPoem() {
    let poemNum = Math.floor(Math.random() * 10);
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("https://poetrydb.org/author/Dickinson", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let res = result[poemNum];
        console.log(res);
        setPoemLines(result[poemNum].lines);
        setPoemTitle(res.title);
      })
      .catch((error) => console.error(error));
  }

  function setImage() {
    let blurLevel = Math.floor(Math.random() * 3);
    console.log(blurLevel);
    console.log(
      "https://picsum.photos/300?grayscale&blur=" + toString(blurLevel)
    );
    setPoemImage(
      "https://picsum.photos/300?grayscale&blur=" + toString(blurLevel)
    );
  }

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
