"use strict";
import { Model, UUIDV4 } from "sequelize";

type GroceryAttributes = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  created_by: number;
  updated_by: number;
  deleted_by: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class Grocery extends Model<GroceryAttributes> implements GroceryAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    name!: string;
    price!: number;
    quantity!: number;
    created_by!: number;
    updated_by!: number;
    deleted_by!: number;
    created_at!: Date;
    updated_at!: Date;
    deleted_at!: Date;
    static associate(models: any) {
      // define association here
    }
  }
  Grocery.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        defaultValue: "",
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      deleted_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      modelName: "tbl_grocery_masters",
      timestamps: false,
      paranoid: true,
    }
  );
  return Grocery;
};
