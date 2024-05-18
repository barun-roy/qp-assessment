"use strict";
import { Model, UUIDV4 } from "sequelize";

type GroceryUserAttributes = {
  id: number;
  grocery_id: number;
  quantity: number;
  created_by: number;
  updated_by: number;
  deleted_by: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class GroceryUser
    extends Model<GroceryUserAttributes>
    implements GroceryUserAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    grocery_id!: number;
    quantity!: number;
    created_by!: number;
    updated_by!: number;
    deleted_by!: number;
    created_at!: Date;
    updated_at!: Date;
    deleted_at!: Date;
    static associate(models: any) {
      // define association here
      GroceryUser.belongsTo(models.tbl_grocery_masters, {
        foreignKey: "grocery_id",
      });
      GroceryUser.belongsTo(models.tbl_user_masters, {
        foreignKey: "created_by",
        as: "CreatedBy",
      });
      GroceryUser.belongsTo(models.tbl_user_masters, {
        foreignKey: "updated_by",
        as: "UpdatedBy",
      });
      GroceryUser.belongsTo(models.tbl_user_masters, {
        foreignKey: "deleted_by",
        as: "DeletedBy",
      });
    }
  }
  GroceryUser.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      grocery_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      modelName: "tbl_grocery_user_mappings",
      timestamps: true, // Enable automatic handling of timestamps
      paranoid: true, // Enable paranoid mode for soft deletes
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return GroceryUser;
};
