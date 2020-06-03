module.exports = function (sequelize, DataTypes) {
    let QualityPlan = sequelize.define('QualityPlan', {

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
        qpNo: {
            type: DataTypes.STRING(250),
            field: 'qp_no'
        },
        pfNo: {
            type: DataTypes.STRING(250),
            field: 'pf_no'
        },
        kind: {
            type: DataTypes.STRING(250),
            field: 'kind'
        },
        revNo: {
            type: DataTypes.STRING(250),
            field: 'rev_no'
        },
        revDate: {
            type: DataTypes.DATE,
            field: 'rev_date'
        },
        componentName: {
            type: DataTypes.STRING(250),
            field: 'component_name'
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
            tableName: 'quality_plan'
        })

    QualityPlan.associate = function (models) {

        // QualityPlan.hasMany(models.Operation, { foreignKey: 'qpId' })

        //     Process.belongsTo(models.Operation, { foreignKey: 'opnNo'})
        QualityPlan.belongsTo(models.Drawing, { foreignKey: 'drgId' })

    }

    return QualityPlan
}