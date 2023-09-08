
import RecipeForm from "./newRecipeForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"

export default function NewRecipePage() {

    const navigate = useNavigate()

    const userName = useSelector((state) => state.userName)

    const handleRecipe = async (event, formData) => {
      event.preventDefault();
    

      const res = await axios.post('/api/new-recipe', formData);

      navigate('/')
    }

      return (
        <>
          { userName &&
            <>
              <h1>New Recipe</h1>
              <RecipeForm onNewRecipe={handleRecipe} />
            </>
          }
        </>
      )
}