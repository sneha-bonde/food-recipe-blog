import "./App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux"
import * as types from "./redux/userAction";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun"



function App() {
  // const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [cardValue, setCardValue] = useState("")
  const [search, setSearch] = useState("");
  const [curry, setCurry] = useState("");
   
  const {recipes} = useSelector(state => state.data)
  // console.log("state", state);
  // console.log("state")
  const updateSearch = () => {
    setCurry(search);
    setSearch("");
  };
  const dispatch = useDispatch();
  useEffect(()=>{
  dispatch({type: types.FETCH_RECIPE_START,curry})
  },[ curry, dispatch]);

  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
//   export default function RecipeReviewCard() {
    
  
    const handleExpandClick = (index) => {
      setCardValue(index);
      setExpanded(!expanded);
    };


  return (
    <div className="App">
      <h2>Recipe App</h2>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 2, width: "45ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ width: "80px", height: "50px" }}
          onClick={updateSearch}
        >
          Search
        </Button>
      </Box>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          {recipes && recipes.hits && recipes.hits.map((item, index) => (
            <Grid key={index} item>
              <Card sx={{ maxWidth: 345 }} style={{width:340}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.recipe.label}
        subheader={
            <span>
                <DirectionsRunIcon />
                {item.recipe.calories}
            </span>
        }
      />
      <CardMedia
        component="img"
        // width='345'
        height="194"
        image={item.recipe.image}
        title={item.recipe.calories}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={() => handleExpandClick(index)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={index === cardValue && expanded} 
      timeout="auto" 
      unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          {item.recipe.ingredients.map((item) =>(
            <Typography paragraph>{item.text}</Typography>
          ))}
        </CardContent>
      </Collapse>
    </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
        {/* {recipes && recipes.hits && recipes.hits.map((item,index)=>(
          <h4>{item.recipe.label}</h4>
        ))} */}
        </Grid>
    </div>
  );
}

export default App;