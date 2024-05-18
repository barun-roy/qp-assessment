"use strict";
import { Model } from "sequelize";

type UserAttributes = {
  id: number;
  role: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  // other attributes...
};

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    role!: string;
    first_name!: string;
    last_name!: string;
    email!: string;
    password!: string;
    created_at!: Date;
    updated_at!: Date;
    deleted_at!: Date;
    static associate(models: any) {
      // define association here
      User.hasMany(models.tbl_grocery_user_mappings, {
        foreignKey: "created_by",
      });
      User.hasMany(models.tbl_grocery_user_mappings, {
        foreignKey: "updated_by",
      });
      User.hasMany(models.tbl_grocery_user_mappings, {
        foreignKey: "deleted_by",
      });
      User.hasMany(models.tbl_grocery_masters, {
        foreignKey: "created_by",
      });
      // User.belongsToMany(models.tbl_grocery_masters, {
      //   through: models.tbl_grocery_user_mappings,
      //   as: "UserGrocery",
      // });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      role: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "user",
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "",
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "",
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "",
        unique: true,
      },
      password: {
        type: DataTypes.STRING(150),
        allowNull: false,
        defaultValue: "",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "tbl_user_masters",
      timestamps: true, // Enable automatic handling of timestamps
      paranoid: true, // Enable paranoid mode for soft deletes
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return User;
};
