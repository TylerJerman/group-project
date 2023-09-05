import { DataTypes, Model } from "sequelize";
import util from "util";
import connectToDB from "./db.js";

export const db = await connectToDB("postgresql:///recipes");

export class Users extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class Recipes extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class Ratings extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
export class Comments extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

// user model

Users.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "users",
    sequelize: db,
  }
);

// recipe model

Recipes.init(
  {
    recipeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
    },
    recipe: {
      type: DataTypes.TEXT,
    },
    images: {
        type: DataTypes.STRING
    }
  },
  {
    modelName: "recipes",
    sequelize: db,
  }
);

// rating model

Ratings.init(
  {
    ratingId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
    },
    review: {
      type: DataTypes.TEXT,
    },
    score: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "ratings",
    sequelize: db,
  }
);

// comment model

Comments.init(
  {
    commentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.TEXT,
    },
  },
  {
    modelName: "comments",
    sequelize: db,
  }
);

// users has many recipes 
Users.hasMany(Recipes, { foreignKey: 'userId' });
// user has many comments
Users.hasMany(Comments, { foreignKey: 'userId' })
// user has many ratings 
Users.hasMany(Ratings, { foreignKey: 'userId' })
// recipe belongs to user
Recipes.belongsTo(Users, { foreignKey: 'userId' });
// comments have one user
Comments.belongsTo(Users, { foreignKey: 'userId' })
// recipes has many ratings
Recipes.hasMany(Ratings, { foreignKey: 'recipeId' });
// recipes has many comments
Recipes.hasMany(Comments, { foreignKey: 'recipeId' });
// rating belongs to recipe
Ratings.belongsTo(Recipes, { foreignKey: 'recipeId' })
// comment belongs to recipe
Comments.belongsTo(Recipes, { foreignKey: 'recipeId' })