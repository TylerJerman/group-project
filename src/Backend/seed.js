import { User, Recipe, Rating, Comment, db } from './model.js';
import userData from '../Data/userData.json' assert { type: 'json' }
import recipeData from '../Data/recipeData.json' assert { type: 'json' }

//waits for the db to be synced before seeding
await db.sync({ force: true})

  // await User.create({
  //   userId: 1,
  //   firstName: 'Tyler',
  //   lastName: 'Jerman',
  //   email: 'tyler.s.jerman@gmail.com',
  //   password: 'jylerterman'
  // });

  // await User.create({
  //   userId: 1,
  //   firstName: 'Sam',
  //   lastName: 'Dorius',
  //   email: 'doriussam@gmail.com',
  //   password: 'damsorius'
  // });

  // await User.create({
  //   userId: 1,
  //   firstName: 'Jens',
  //   lastName: 'Cox',
  //   email: 'jenscx8@gmail.com',
  //   password: 'censjox'
  // });

  // await Recipe.create({
  //   recipeId: 1,
  //   userName: 'TylerJerman',
  //   recipe: 'Cereal',
  //   image: 'https://th.bing.com/th/id/R.787e8f5938e3478ec0d57ded2875b2b7?rik=6VeJLuZitBp9bw&riu=http%3a%2f%2fa4.images.reviewed.com%2fimage%2ffetch%2fs--l8GQF4AU--%2fc_fill%2ccs_srgb%2cf_auto%2cfl_progressive.strip_profile%2cg_center%2cq_jpegmini%2cw_1200%2fhttps%3a%2f%2freviewed-production.s3.amazonaws.com%2f1488862064000%2fcereal-hero.jpg&ehk=UGRVJ2G3nmCiB61mBd3bMCoUzL%2fyPDt6VrJIaTC5vcc%3d&risl=&pid=ImgRaw&r=0'
  // });

  // await Recipe.create({
  //   recipeId: 2,
  //   userName: 'SamDorius',
  //   recipe: 'Toast',
  //   image: 'https://th.bing.com/th/id/R.ba19a68a576a7a2512253f5c2f8d26b7?rik=vft4mZKtC6q7BQ&pid=ImgRaw&r=0'
  // });

  // await Recipe.create({
  //   recipeId: 3,
  //   userName: 'JensCox',
  //   recipe: 'Eggs',
  //   image: 'https://i2.wp.com/blog.suvie.com/wp-content/uploads/2020/02/Sunnyside-egg.jpg?fit=1000%2C664&ssl=1'
  // });

  // await Rating.create({
  //   ratingId: 1,
  //   userName: 'TylerJerman',
  //   review: 'Eggs are pretty chill',
  //   score: 5
  // });

  // await Rating.create({
  //   ratingId: 2,
  //   userName: 'SamDorius',
  //   review: 'Cereal is pretty chill',
  //   score: 5
  // });

  // await Rating.create({
  //   ratingId: 3,
  //   userName: 'JensCox',
  //   review: 'Toast is pretty chill',
  //   score: 5
  // });

  // await Comment.create({
  //   commentId: 1,
  //   userName: 'TylerJerman',
  //   message: 'Eggs are pretty dope'
  // });

  // await Comment.create({
  //   commentId: 2,
  //   userName: 'SamDorius',
  //   message: 'Cereal is pretty chill'
  // });

  // await Comment.create({
  //   commentId: 3,
  //   userName: 'JensCox',
  //   message: 'Toast is pretty dope'
  // });



  // seed dataabse with test data

  const usersInDb = await Promise.all(
    userData.map((user) => {
      const { 
        firstName,
        lastName,
        email,
        password 
      } = user

      const newUser = User.create({
      firstName,
      lastName,
      email,
      password
      })

      return newUser
    })
  )

  // finnd or create recipe based on username

  const recipesInDb = await Promise.all(
    recipeData.map((recipe) => {
      const { email, title, steps, ingredients, images } = recipe

      const newRecipe = Recipe.create({
        email,
        title,
        steps,
        ingredients,
        images
      })

      // associate recipes with users
      return newRecipe
    })
  )



  await db.close()
