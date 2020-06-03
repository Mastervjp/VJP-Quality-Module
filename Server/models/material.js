module.exports = function(sequelize, DataTypes) {
    let Material = sequelize.define('Material', {

       id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        materialSpec:{
            type:DataTypes.STRING(250),
            field:'material_spec',
        },

        materialGrade:{
            type:DataTypes.STRING(250),
            field:'material_grade',
        },
        materialWeight:{
            type:DataTypes.STRING(250),
            field:'material_weight',
        },

    },
    {
        timestamps:true,
        tableName:'material'
    })

    return Material
}