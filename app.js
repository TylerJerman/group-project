import express, { text } from 'express';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import bcrypt from "bcrypt"
import session from "express-session"
import { User, Recipe, Comment, Rating } from './src/Backend/model.js';

const app = express()

const port = 5173

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(express.json())
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

ViteExpress.config({printViteDevServerHost: true})



// routes 

//sign up route
app.post('/api/signup', async (req, res) =>
{
    console.log(req.body)

    const {email, password, firstName, lastName} = req.body

    bcrypt.genSalt(10, (err, salt) => 
    {
        bcrypt.hash(password, salt, async function(err, hash) 
        {
            if (await User.findOne({where: {email: email}}))
            {
                res.json({message: 'user already exists'})
                console.log('here')
            }
            else
            {
                let newCustomer = await User.create({email: email, password: hash, firstName: firstName, lastName: lastName})
                res.json({message: "account created"})
            }
        });
    })
})


//login route
app.post('/api/logIn', async (req, res) =>
{
    const {email, password} = req.body

    let customer = await User.findOne({where: {email: email}, attributes: ['password', "userId"]})

    if (!customer)
    {
        res.json({message: 'user not found'})
        console.log('no user')
    }
    else
    {
        let hash = customer.password
    
        bcrypt.compare(password, hash, async function(err, result)
        {
            if (result)
            {
                if (await User.findOne({where: {email: email, password: hash}}))
                {
                    req.session.userId = customer.userId
                    res.json({message: "user logged in", id: customer.userId})
                }
            }
            else
            {
                res.json({message: 'password was incorrect'})
                console.log(err)
            }
        })
    }
})

// post new recipe
app.post('/api/new-recipe', async (req, res) => {
    const { name, title, steps, ingredients, image } = req.body
    const { userId } = req.session

    const newRecipe = await Recipe.create({userId, name, title, steps, ingredients, image})

    res.json(newRecipe)
})


// get recipes
app.get('/api/recipes', async (req, res) => {
    let timeline = await Recipe.findAll()

    res.json(timeline)
})

//recipe page
app.get('/api/recipes/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
    //   const recipe = await Recipe.findOne({ where: { recipeId: id }, include: [Rating, Comment]});

    const recipe = await Recipe.findByPk(id)
      const comments = await Comment.findAll({where: { recipeId: id}});
      res.json({recipe, comments});

    } catch (error) {

      console.error(error);

      res.status(500).json({ message: 'Recipe has not been gathered' });
    }
  });

  // delete recipe
  app.post('/api/delete-recipe/recipes/:id', async (req, res) => {
    const { id } = req.params
    await Recipe.destroy({
        where: {
            recipeId: id
        }
    })

    res.json(`Recipe ${id} has been deleted`)
  })

  //ratings
app.get('/api/ratings', async (req, res) => {
    try{
        const { id } = req.params;

        const rating = await Rating.findOne({ where: { rating: rating }});

        res.json(rating);

    } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Rating has not been gathered' });
    }
});
  //comments
app.get('/api/comments/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const findComment = await Comment.findByPk({id});
      res.json(findComment);

    } catch (error) {

      console.error(error);

      res.status(500).json({ message: 'Comments have not been gathered' });
    }
  });

  app.post('/api/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const createComment = await Comment.create({id});
        res.json(createComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Comment has not been created'})
    }
  });

//   app.post('/api/delete-comment/comments/:id', async (req, res) => {
//       const { id } = req.params
//       if (!id) {
//           return res.status(400).json({ message: 'Missing commentId' });
//         } try {
//             await Comment.destroy({ where: { commentId: id }});
//             res.json({ success: true });
//         } catch (error) {
//             console.error("Error deleting comment", error);
//             res.status(500).json({ error: 'Failed to delete the comment' })

//   app.delete('/api/cart/clear/:userId', async (req, res) => {
//     const { userId } = req.params;
//     if (!userId) {
//       return res.status(400).json({ error: 'Missing userId.' });
//     }
//     try {
//       await Cart.destroy({ where: { user_Id: userId } });
//       res.json({ success: true });
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//       res.status(500).json({ error: 'Failed to clear cart.' });
//     }
//   });

// end routes



ViteExpress.listen(app, port, () => console.log(`running on http://localhost:${port}`));