const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {

    id:{
      type:DataTypes.UUID,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull:false,
    },
    platforms:{
      type: DataTypes.STRING,
      allowNull:false
    },
    rating:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    img:{
      type:DataTypes.TEXT,
      allowNull: true
    },
    launchDate:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    genres:{
      type: DataTypes.TEXT,
      allowNull:true
    },
    stores:{
      type: DataTypes.TEXT,
      allowNull:true
    }

  },{timestamps:false}
  );
};
