
module.exports = function(sequelize, DataTypes) {
    let Process = sequelize.define('Process', {

       id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        opnName: {
            type: DataTypes.STRING(250),
            field: 'opn_name'
        },
        description:{
            type:DataTypes.STRING(250),
            field:'description'
        },
        baloonNo: {
            type: DataTypes.INTEGER(20),
            field: 'baloon_no'
        },
        specification:{
            type:DataTypes.STRING(250),
            field:'specification'
        },
        toloreanceGrade:{
            type:DataTypes.STRING(250),
            field:'toloreance_grade'
        },
        tolFrom:{
            type:DataTypes.STRING(250),
            field:'tol_from'
        },
        tolTo:{
            type:DataTypes.STRING(250),
            field:'tol_to'
        },
        instrument: {
            type: DataTypes.STRING(250),
            field: 'instrument'
        },
        measuringFrequency: {
            type: DataTypes.STRING(250),
            field: 'measuring_frequency'
        },
        grid: {
            type: DataTypes.STRING(50),
            field: 'grid'
        },
        type: {
            type: DataTypes.STRING(250),
            field: 'type'
        },
        remarks: {
            type: DataTypes.STRING(50),
            field: 'remarks'
        },
        firstPartInspection: {
            type: DataTypes.BOOLEAN,
            field: 'first_part_inspection',
            allowNull: true
        },
        periodicInspection: {
            type: DataTypes.BOOLEAN,
            field: 'periodic_inspection',
            allowNull: true
        },
        ctq: {
            type: DataTypes.BOOLEAN,
            field: 'ctq',
            allowNull: true
        },
        pdi: {
            type: DataTypes.BOOLEAN,
            field: 'pdi',
            allowNull: true
        },
        cfir: {
            type: DataTypes.BOOLEAN,
            field: 'cfir',
            allowNull: true
        },
        opnId:{
            type:DataTypes.INTEGER(11).UNSIGNED,
            field:'opn_no'
        },
        drgId:{
            type:DataTypes.INTEGER(11).UNSIGNED,
            field:'drg_code',
            allowNull: false
        },
        insId:{
            type:DataTypes.INTEGER(11).UNSIGNED,
            field:'ins_id',
        },

        altProcess:
        {
            type: DataTypes.BOOLEAN,
            field: 'alt_process',
            defaultValue: false
        },
        addKind:
        {
            type: DataTypes.BOOLEAN,
            field: 'add_kind',
            defaultValue: false
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
        timestamps:true,
        tableName:'process'
    })

    Process.associate = function(models) {
        Process.belongsTo(models.Operation, { foreignKey: 'opnId'})
        Process.belongsTo(models.Drawing, { foreignKey: 'drgId'})
        Process.belongsTo(models.Instrument, { foreignKey: 'insId'})


    }
    
    return Process
}