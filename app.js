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

    let customer = await User.findOne({where: {email: email}, attributes: ['password', 'firstName', 'lastName', "userId"]})

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
                    res.json({message: "user logged in", id: customer.userId, firstName: customer.firstName, lastName: customer.lastName})
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
app.post('/api/ratings', async (req, res) => {
    
        const {title} = req.body;

        const rating = await Rating.findAll({ where: { recipeName: title }});

        res.json(rating);
});

app.post('/api/upVote', async (req, res) =>
{
    const {userName, title} = req.body

    try 
    {
        if 
        ( 
            await Rating.findOne({ where: {userName: userName, recipeName: title, isUpVote: false}})
        )
        {
            const previousDownVote = await Rating.findOne({ where: {userName: userName, recipeName: title, isUpVote: false}})

            previousDownVote.destroy()
        }

        const rating = await Rating.create({userName: userName, recipeName: title, isUpVote: true})

        res.json(rating)
    }
    catch (error)
    {
        console.log(error)

        res.status(500).json({ message: 'Failed to up vote'})
    }
})

app.post('/api/downVote', async (req, res) =>
{
    const {userName, title} = req.body

    try 
    {
        
        if 
        (
            await Rating.findOne({ where: {userName: userName, recipeName: title, isUpVote: true}})
        )
        {
            const previousUpVote = await Rating.findOne({ where: {userName: userName, recipeName: title, isUpVote: true}})

            previousUpVote.destroy()
        }
        
        const rating = await Rating.create({userName: userName, recipeName: title, isUpVote: false})

        res.json({message: "success"})
    }
    catch (error)
    {
        console.log(error)

        res.status(500).json({ message: 'Failed to up vote'})
    }
})



  //comments
app.get('/api/comments/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const recipe = await Comment.findByPk({id});
      res.json(recipe);

    } catch (error) {

      console.error(error);

      res.status(500).json({ message: 'Comment has not been gathered' });
    }
  });


app.post('/api/deleteAccount', async (req, res) =>
{
    try 
    {
        const {email} = req.body

        const user = await User.findOne({ where: {email: email}})

        console.log(user)

        await user.destroy()

        res.json({ message: 'success'})
    }
    catch (error)
    {
        console.error(error)

        res.status(500).json({ message: 'Account was not deleted'})
    }
})

// end routes



ViteExpress.listen(app, port, () => console.log(`running on http://localhost:${port}`));