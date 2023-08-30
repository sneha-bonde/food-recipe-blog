import axios from "axios";

const YOUR_APP_KEY = "e0a36ee45e88af94b9a0dd555e38e812";
const YOUR_APP_ID = "32a3425f" ;


export const getRecipes = async (query) => {
          
const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
return await axios.get(url);
}


