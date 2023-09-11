const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection'); 
   // En Mayúsculas y singular      // en minúsculas y singular
const Director = sequelize.define('director', {
    // Definimos las columnas aquí
    firtsName: {
        type: DataTypes.STRING(50),
        
    },
    lastName: {
        type: DataTypes.STRING(50),
        
    },
    nationality: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

module.exports = Director;