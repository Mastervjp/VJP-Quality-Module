module.exports = function(sequelize, DataTypes) {
    let OperationList = sequelize.define('OperationList', {

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
        tableName:'operation_list'
    })
    OperationList.associate = function (models) {
        OperationList.hasMany(models.ProcessList, { foreignKey: 'processId' })
    }
    return OperationList
}