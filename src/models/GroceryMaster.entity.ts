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
      Grocery.hasMany(models.tbl_grocery_user_mappings, {
        foreignKey: "grocery_id",
        as: "grocery_map",
      });
      Grocery.belongsTo(models.tbl_user_masters, {
        foreignKey: "created_by",
        as: "createdByVal",
      });
      Grocery.belongsTo(models.tbl_user_masters, {
        foreignKey: "updated_by",
        as: "updatedByVal",
      });
      Grocery.belongsTo(models.tbl_user_masters, {
        foreignKey: "deleted_by",
        as: "deletedByVal",
      });
      // Grocery.belongsToMany(models.tbl_user_masters, {
      //   through: models.tbl_grocery_user_mappings,
      //   as: "grocery_user",
      //   foreignKey: "grocery_id", // Foreign key in the join table referencing Grocery
      //   otherKey: "created_by",
      // });
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
      timestamps: true, // Enable automatic handling of timestamps
      paranoid: true, // Enable paranoid mode for soft deletes
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return Grocery;
};
