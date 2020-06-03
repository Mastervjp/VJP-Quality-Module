module.exports = function (sequelize, DataTypes) {
    let MachiningToleranceStandard = sequelize.define('MachiningToleranceStandard', {

        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(250),
            field: 'name',
            allowNull: false
        },
        
    },
        {
            timestamps: true,
            tableName: 'machining_tolerance_standard'
        })

    return MachiningToleranceStandard
}