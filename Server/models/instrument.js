module.exports = function(sequelize, DataTypes) {
    let Instrument = sequelize.define('Instrument', {

       id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        insId:{
            type:DataTypes.STRING(250),
            field:'ins_id',
            allowNull: false

        },

        name:{
            type:DataTypes.STRING(250),
            field:'name',
            allowNull: false
        },

        insImage:{
            type:DataTypes.STRING(250),
            field:'ins_image',
            allowNull: false
        },

        insSpecs:{
            type:DataTypes.STRING(250),
            field:'ins_specs',
            allowNull: false
        },

        dueDate:{
            type:DataTypes.DATE,
            field:'due_date',
            allowNull: false

        }
    },
    {
        timestamps:true,
        tableName:'instrument'
    })


    Instrument.associate = function (models) {
        Instrument.hasMany(models.Process, { foreignKey: 'insId' })
    
    }


    return Instrument
}