import express, { text } from 'express';
import session from "express-session"
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import bcrypt from "bcrypt"
import { User, Recipe, Comment, Rating } from './src/Backend/model.js';

const app = express()

const port = 5173
ViteExpress.config({printViteDevServerHost: true})

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(express.json())
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false}));




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
                let newCustomer = await User.create({email: email, password: hash, firstName: firstName, lastName: lastName, profilePic: 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'})
                res.json({message: "account created"})
            }
        });
    })
})


//login route
app.post('/api/logIn', async (req, res) =>
{
    const {email, password} = req.body

    let customer = await User.findOne({where: {email: email}, attributes: ['password', 'firstName', 'lastName', "userId", "profilePic"]})

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
                    
                    res.json({message: "user logged in", id: customer.userId, firstName: customer.firstName, lastName: customer.lastName, profilePic: customer.profilePic})
                    
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

//update account info route
app.post('/api/updateAccount', async (req, res) =>
{
    const {email, password, firstName, lastName, newEmail, profilePic, userId} = req.body

    let user = await User.findOne({ where: {email: email}})

    bcrypt.genSalt(10, (err, salt) => 
    {
        bcrypt.hash(password, salt, async function(err, hash) 
        {
            user.email = newEmail
            user.password = hash
            user.firstName = firstName
            user.lastName = lastName
            user.profilePic = profilePic

            await user.save()

            res.json({ message: 'success' })
        });
    })
})

// post new recipe
app.post('/api/new-recipe', async (req, res) => {
    const { name, title, steps, ingredients, image } = req.body
    const { userId } = req.session

    const newRecipe = await Recipe.create({userId, name, title, steps, ingredients, images: image})
    console.log(req.body)

    res.json(newRecipe)
})

// get users
app.get('/api/users', async (req, res) => {
    let users = await User.findAll()
    res.json(users)
})

// get user profile
app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params

    const user = await User.findByPk(id)
    res.json(user)
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

  // edit recipe
  app.post('/api/edit-recipe/recipes/:id', async (req, res) => {
    const { id } = req.params
    const { title, steps, ingredients, images } = req.body

    const recipe = await Recipe.findByPk(id)

    recipe.title = title 
    recipe.steps = steps 
    recipe.ingredients = ingredients 
    recipe.images = images 

    await recipe.save()

    res.json(recipe)
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


  //get comments
app.get('/api/comments/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const findComment = await Comment.findAll({ where: {recipeId: id}})
      res.json(findComment);

    } catch (error) {

      console.error(error);

      res.status(500).json({ message: 'Comments have not been gathered' });
    }
  });
//post a new comment 
app.post('/api/newComment', async (req, res) => {
    const { userName, message, recipeId, userId } = req.body

    console.log("yeah")

    const newComment = await Comment.create({ recipeId, userName, message, userId })

    console.log("hit")

    res.json(newComment)
});

app.post('/api/deleteComment', async (req, res) => {

    const {commentId} = req.body

    const comment = await Comment.findOne({ where: { commentId: commentId}})

    await comment.destroy()

    res.json({ message: 'success'})
})

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