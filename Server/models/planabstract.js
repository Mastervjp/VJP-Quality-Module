module.exports = function (sequelize, DataTypes) {
    let PlanAbstract = sequelize.define('PlanAbstract', {

        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        drgId: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'drg_id',
            allowNull: false
        },
        opnId: {
            type: DataTypes.INTEGER(11),
            field: 'op_no',
        },
        
        qpNo: {
            type: DataTypes.STRING(250),
            field: 'qp_no'
        },
        pfNo: {
            type: DataTypes.STRING(250),
            field: 'pf_no'
        },
        status:
        {
            type: DataTypes.BOOLEAN,
            field: 'status',
            allowNull: true
        },
        masterStatus:
        {
            type: DataTypes.BOOLEAN,
            field: 'master_status',
            allowNull: true
        },
        operatorStatus:
        {
            type: DataTypes.BOOLEAN,
            field: 'operator_status',
            allowNull: true
        },
        createdBy: {
            type: DataTypes.STRING(50),
            field: 'created_by'
        },
        updatedBy: {
            type: DataTypes.STRING(50),
            field: 'updated_by'
        },
        deletedBy: {
            type: DataTypes.STRING(50),
            field: 'deleted_by'
        },
        deleteStatus:
        {
            type: DataTypes.BOOLEAN,
            field: 'delete_status',
            defaultValue: false
        },


    },
        {
            timestamps: true,
            tableName: 'planabstract'
        })

        PlanAbstract.associate = function (models) {
        PlanAbstract.belongsTo(models.Drawing, { foreignKey: 'drgId' })

    }

    return PlanAbstract
}