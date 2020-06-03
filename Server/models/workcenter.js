
module.exports = function(sequelize, DataTypes) {
    let WorkCenter = sequelize.define('WorkCenter', {

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
        tableName:'workcenter'
    })

    return WorkCenter
}