module.exports = function(sequelize, DataTypes) {
    let MeasuringFrequency = sequelize.define('MeasuringFrequency', {

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
        tableName:'measuring_frequency'
    })

    return MeasuringFrequency
}