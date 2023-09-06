import express, { text } from 'express';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import bcrypt from "bcrypt"
import { User, Recipe, Comment, Rating } from './src/Backend/model.js';

const app = express()

const port = 5173

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(express.json())

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

//recipe page
app.get('/api/recipes/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const recipe = await Recipe.findOne({ where: { recipeId: id }, include: [Rating, Comment]});
      
      res.json(recipe);

    } catch (error) {

      console.error(error);

      res.status(500).json({ message: 'Recipe has not been gathered' });
    }
  });

// end routes

ViteExpress.listen(app, port, () => console.log(`running on http://localhost:${port}`));