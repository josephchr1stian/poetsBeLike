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
import characters from './protagonists.json'

function App() {

  console.log("Chars from JSON", characters);
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
            Characters Inc
          </Typography>
          <Button
            href="#"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => alert("Boop!")}
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
          Hello.
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mx: 10 }}
        >
          Hmm, seems like we're missing some of the other protagonists.
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
            <Card>
              <CardMedia
                component="img"
                height="350px"
                image={entry.pic}
              />
              <CardHeader
                title={entry.title}
                titleTypographyProps={{ align: "center" }}
                sx={{ mt: 1 }}
              />
              <CardContent sx={{ pt: 0 }}>
                <ul>
                {entry.description.map((descriptionBulletPoint) => (
                <Typography component="li">
                  {descriptionBulletPoint}
                </Typography>
                  ))}               
                </ul>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{ px: 6, mx: "auto", border: "5px solid black", variant: "outlined" }}            
                >
                  Vote
                </Button>
              </CardActions>
            </Card>        
          </Grid>
          ))}
        </Grid> 
        
      </Container>
    </div>
  );
}

export default App;
