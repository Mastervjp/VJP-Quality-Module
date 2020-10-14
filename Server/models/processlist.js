module.exports = function(sequelize, DataTypes) {
    let ProcessList = sequelize.define('ProcessList', {

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
        },
        description:{
            type:DataTypes.STRING(250),
            field:'description',
        },
        baloonNo: {
            type: DataTypes.INTEGER(20),
            field: 'baloon_no',
        },
        specification:{
            type:DataTypes.STRING(250),
            field:'specification',
        },

        tolFrom:{
            type:DataTypes.STRING(250),
            field:'tol_from',
        },
        tolTo:{
            type:DataTypes.STRING(250),
            field:'tol_to',
        }, 

        processId:{
            type:DataTypes.INTEGER(11).UNSIGNED,
            field:'process_id',

        },        
    },
    {
        timestamps:true,
        tableName:'process_list'
    })
    ProcessList.associate = function(models) {
        ProcessList.belongsTo(models.OperationList, { foreignKey: 'processId'})
    }

    return ProcessList
} 