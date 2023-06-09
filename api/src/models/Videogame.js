const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    
    platforms: {
      type: DataTypes.JSON,
      allowNull: true
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true
    },

    release_date: {
      type: DataTypes.STRING,
      allowNull: true
    },

    rating: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  },
    { freezeTableName: true, timestamps: false }
  );
};
