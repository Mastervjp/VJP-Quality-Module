module.exports = function(sequelize, DataTypes) {
    let MarketCard = sequelize.define('MarketCard', {

       id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        cardNo:{
            type:DataTypes.STRING(250),
            field:'card_no'
        },
        qty: {
            type: DataTypes.INTEGER(20),
            field: 'qty'
        },
        rQty: {
            type: DataTypes.INTEGER(20),
            field: 'r_qty'
        },
        mpId :{
            type: DataTypes.INTEGER(20).UNSIGNED,
            field: 'mp_id'
        },
       
        drgId:{
            type: DataTypes.INTEGER(11).UNSIGNED,
            field:'drg_id'
        },
        
    },
    {
        timestamps:true,
        tableName:'market_card'
    })

    MarketCard.associate = function(models) {
        MarketCard.belongsTo(models.Drawing, { foreignKey: 'drgId'})
        MarketCard.belongsTo(models.MarketPurchase, { foreignKey: 'mpId'})
    }
    return MarketCard
}