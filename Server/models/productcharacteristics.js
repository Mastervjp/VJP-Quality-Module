module.exports = function (sequelize, DataTypes) {
    let ProductCharacteristics = sequelize.define('ProductCharacteristics', {

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
            tableName: 'product_characteristics'
        })

    return ProductCharacteristics
}