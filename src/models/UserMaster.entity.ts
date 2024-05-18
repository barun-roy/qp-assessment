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
  class tbl_user_masters
    extends Model<UserAttributes>
    implements UserAttributes
  {
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
      // User.belongsToMany(models.Grocery, { through: "UserGroceryMapping" });
    }
  }
  tbl_user_masters.init(
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
      timestamps: false,
      paranoid: true,
    }
  );
  return tbl_user_masters;
};
