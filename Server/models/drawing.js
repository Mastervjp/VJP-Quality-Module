
module.exports = function (sequelize, DataTypes) {
    let Drawing = sequelize.define('Drawing', {

        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        partName: {
            type: DataTypes.STRING(250),
            field: 'part_name'
        },
        partNum: {
            type: DataTypes.STRING(250),
            field: 'part_num'
        },
        partNum1: {
            type: DataTypes.STRING(250),
            field: 'part_num1'
        },
        revNo: {
            type: DataTypes.STRING(250),
            field: 'rev_no'
        },
        revNo1: {
            type: DataTypes.STRING(250),
            field: 'rev_no1'
        },
        revDate: {
            type: DataTypes.DATE,
            field: 'rev_date'
        },
        revDate1: {
            type: DataTypes.DATE,
            field: 'rev_date1'
        },
        customerName: {
            type: DataTypes.STRING(250),
            field: 'customer_name'
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

        
        withRunerWeight:{
            type:DataTypes.STRING(250),
            field:'with_runer_weight',
        },
        castWeight:{
            type:DataTypes.STRING(250),
            field:'cast_weight',
        },
        machineWeight:{
            type:DataTypes.STRING(250),
            field:'machine_weight',
        },
        heatTreatmentCycle:{
            type:DataTypes.STRING(250),
            field:'heat_treatment_cycle',
        },
        castingToleranceStandard:{
            type:DataTypes.STRING(250),
            field:'casting_tolerance_standard',
        },
        machiningToleranceStandard:{
            type:DataTypes.STRING(250),
            field:'machining_tolerance_standard',
        },
        measurementUnit:{
            type:DataTypes.STRING(250),
            field:'measurement_unit',
        },
        fpi: {
            type: DataTypes.BOOLEAN,
            field: 'fpi',
            allowNull: true
        },
        radiographyTest: {
            type: DataTypes.BOOLEAN,
            field: 'radiography_test',
            allowNull: true
        },
        anodizing: {
            type: DataTypes.BOOLEAN,
            field: 'anodizing',
            allowNull: true
        },
        powderCoating: {
            type: DataTypes.BOOLEAN,
            field: 'powder_coating',
            allowNull: true
        },
        specialInstruction:{
            type:DataTypes.STRING(250),
            field:'special_instruction',
        },



        type: {
            type: DataTypes.STRING(250),
            field: 'type'
        },
        endCustomer: {
            type: DataTypes.STRING(250),
            field: 'end_customer'
        },
        unlockStatus:
        {
            type: DataTypes.BOOLEAN,
            field: 'unlock_status',
            defaultValue: true
        },
        pfStatus:
        {
            type: DataTypes.BOOLEAN,
            field: 'pf_status',
            defaultValue: false
        },
        qpStatus:
        {
            type: DataTypes.BOOLEAN,
            field: 'qp_status',
            defaultValue: false
        },
        techApproval:
        {
            type: DataTypes.BOOLEAN,
            field: 'pp_qp_techapproval',
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
            tableName: 'drawing'
        })

    Drawing.associate = function (models) {
        Drawing.hasMany(models.Process, { foreignKey: 'drgId' })
        Drawing.hasMany(models.PlanAbstract, { foreignKey: 'drgId' })
        Drawing.hasMany(models.MarketPurchase, { foreignKey: 'drgId' })

    }
  
    // Drawing.associate = function(models) {
    //     Drawing.belongsTo(models.User, { foreignKey: 'userId'})

    // }
    return Drawing
}