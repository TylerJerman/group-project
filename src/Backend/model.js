import { DataTypes, Model } from "sequelize";
import util from "util";
import connectToDB from "./db.js";

export const db = await connectToDB("postgresql:///recipes");

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class Recipe extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class Rating extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
export class Comment extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

// user model

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
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
    profilePic: {
      type: DataTypes.TEXT
    }
  },
  {
    modelName: "users",
    sequelize: db,
  }
);

// recipe model

Recipe.init(
  {
    recipeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING
    },
    steps: {
      type: DataTypes.TEXT,
    },
    ingredients: {
      type: DataTypes.STRING
    },
    images: {
        type: DataTypes.TEXT
    }
  },
  {
    modelName: "recipes",
    sequelize: db,
  }
);

// rating model

Rating.init(
  {
    ratingId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isUpVote: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    modelName: "ratings",
    sequelize: db,
  }
);

// comment model

Comment.init(
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
User.hasMany(Recipe, { foreignKey: 'userId' });
// user has many comments
User.hasMany(Comment, { foreignKey: 'userId' })
// user has many ratings 
User.hasMany(Rating, { foreignKey: 'userId' })
// recipe belongs to user
Recipe.belongsTo(User, { foreignKey: 'userId' });
// comments have one user
Comment.belongsTo(User, { foreignKey: 'userId' })
// recipes has many ratings
Recipe.hasMany(Rating, { foreignKey: 'recipeId' });
// recipes has many comments
Recipe.hasMany(Comment, { foreignKey: 'recipeId' });
// rating belongs to recipe
Rating.belongsTo(Recipe, { foreignKey: 'recipeId' })
// comment belongs to recipe
Comment.belongsTo(Recipe, { foreignKey: 'recipeId' })
