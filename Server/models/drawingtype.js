module.exports = function(sequelize, DataTypes) {
    let DrawingType = sequelize.define('DrawingType', {

       id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name:{
            type:DataTypes.STRING(250),
            field:'name',
            allowNull: false

        }
    },
    {
        timestamps:true,
        tableName:'drawing_type'
    })

    return DrawingType
}