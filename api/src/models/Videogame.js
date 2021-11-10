const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {

    id:{
      type:DataTypes.UUID,
      allowNull:false,
      defaultValue: DataTypes.UUIDV4,
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
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false
    },
    rating:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    img:{
      type:DataTypes.TEXT,
      allowNull: false
    },
    launchDate:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    stores:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:true
    },
    released:{
      type:DataTypes.STRING,
      allowNull:true
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      defaultValue:true,
      allowNull:false
    }

  },{timestamps:false}
  );
};
