import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {Link as GoLink} from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
/*<a href="https://ibb.co/t4H0yP4"><img src="https://i.ibb.co/KX5tCzX/Screen-Shot-2020-06-13-at-5-39-20-PM.png" alt="Screen-Shot-2020-06-13-at-5-39-20-PM" border="0"></a>
<a href="https://ibb.co/dmKJ4Rr"><img src="https://i.ibb.co/kmc62tx/Screen-Shot-2020-06-13-at-5-39-49-PM.png" alt="Screen-Shot-2020-06-13-at-5-39-49-PM" border="0"></a>
<a href="https://ibb.co/VjZfTMm"><img src="https://i.ibb.co/vwG0kLY/Screen-Shot-2020-06-13-at-5-41-41-PM.png" alt="Screen-Shot-2020-06-13-at-5-41-41-PM" border="0"></a>
<a href="https://ibb.co/vx6hDFb"><img src="https://i.ibb.co/KjpDmPY/Screen-Shot-2020-06-13-at-6-07-41-PM.png" alt="Screen-Shot-2020-06-13-at-6-07-41-PM" border="0"></a>
<a href="https://ibb.co/hdMrTvW"><img src="https://i.ibb.co/FYWcdtw/Screen-Shot-2020-06-13-at-6-07-58-PM.png" alt="Screen-Shot-2020-06-13-at-6-07-58-PM" border="0"></a>*/
export default function Blog() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative" style={{backgroundColor:'#FC9C05  '}}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Exercise Together
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Exercise Together
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              This is your opportunity to finally get motivated to exercise! Exercise with your friends through live video 
              streaming along with watching a youtube video for leisure, fun, or training. Moreover, see the amount of
              time you've spent exercising everyday so that you could see the gains and your progress. Start exercising 
              with us today!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={4} justify="center">
                <Grid item>
                  <GoLink push to="/signin">
                  <Button variant="contained"  style={{backgroundColor:'#BCBCBC'}}>
                    Log In
                  </Button>
                  </GoLink>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
              <Grid item key={1} xs={12} sm={6} md={4}>
                <Card className={classes[1]}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://i.ibb.co/KX5tCzX/Screen-Shot-2020-06-13-at-5-39-20-PM.png"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Secure signin
                    </Typography>
                    <Typography>
                      Keep the data in your account specific to you!
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item key={2} xs={12} sm={6} md={4}>
                <Card className={classes[2]}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://i.ibb.co/kmc62tx/Screen-Shot-2020-06-13-at-5-39-49-PM.png"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Data Chart
                    </Typography>
                    <Typography>
                      Keep track of the time you spent in all your workouts!
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item key={3} xs={12} sm={6} md={4}>
                <Card className={classes[3]}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://i.ibb.co/vwG0kLY/Screen-Shot-2020-06-13-at-5-41-41-PM.png"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Youtube
                    </Typography>
                    <Typography>
                      Watch youtube videos while you exercise!
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item key={1} xs={12} sm={6} md={4}>
                <Card className={classes[1]}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://i.ibb.co/KjpDmPY/Screen-Shot-2020-06-13-at-6-07-41-PM.png"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Search bar
                    </Typography>
                    <Typography>
                      Choose your video room with this seemlessly integrated searchbar!
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item key={2} xs={12} sm={6} md={4}>
                <Card className={classes[2]}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://i.ibb.co/FYWcdtw/Screen-Shot-2020-06-13-at-6-07-58-PM.png"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Video
                    </Typography>
                    <Typography>
                      Be on a video with up to 3 friends in a room while you exercise!
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item key={3} xs={12} sm={6} md={4}>
                <Card className={classes[3]}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://i.ibb.co/q51NFJK/Screen-Shot-2020-06-13-at-6-13-53-PM.png"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Start Exercising!
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}