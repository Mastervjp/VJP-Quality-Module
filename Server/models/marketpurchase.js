module.exports = function(sequelize, DataTypes) {
    let MarketPurchase = sequelize.define('MarketPurchase', {

       id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        poNo:{
            type:DataTypes.STRING(250),
            field:'po_no'
        },
        orderQty: {
            type: DataTypes.INTEGER(250),
            field: 'order_qty'
        },
        remainingQty :{
            type: DataTypes.INTEGER(20),
            field: 'remaining_qty'
        },
        poDate:{
            type:DataTypes.DATEONLY,
            field:'po_date'
        },
    
        PoRevNo:{
            type:DataTypes.STRING(250),
            field:'po_rev_no'
        },
        
        LineItem:{
            type:DataTypes.STRING(250),
            field:'line_item'
        },
        CommittedDate:{
            type:DataTypes.DATEONLY,
            field:'committed_date'
        },
       
        drgId:{
            type: DataTypes.INTEGER(11).UNSIGNED,
            field:'drg_id'
        },
        
    },
    {
        timestamps:true,
        tableName:'market_purchase'
    })

    MarketPurchase.associate = function(models) {
        MarketPurchase.belongsTo(models.Drawing, { foreignKey: 'drgId'})
        MarketPurchase.hasMany(models.MarketCard, { foreignKey: 'mpId' })
    }
    return MarketPurchase
}