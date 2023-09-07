
import RecipeForm from "./newRecipeForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewRecipePage() {

    const navigate = useNavigate()

    const handleRecipe = async (event, formData) => {
      event.preventDefault();
    

      const res = await axios.post('/api/new-recipe', formData);

      navigate('/')
    }

      return (
        <>

        <h1>nnew recipe</h1>
        <RecipeForm onNewRecipe={handleRecipe} />
        
        
        </>
      )
}