module.exports = function (sequelize, DataTypes) {
    let ContractReview = sequelize.define('ContractReview', {

        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        customerName: {
            type: DataTypes.STRING(250),
            field: 'customer_name',
            allowNull: true
        },
        billTo: {
            type: DataTypes.STRING(250),
            field: 'bill_to',
            allowNull: true
        },
        shipTo: {
            type: DataTypes.STRING(250),
            field: 'ship_to',
            allowNull: true
        },
        offerNo: {
            type: DataTypes.STRING(250),
            field: 'offer_no',
            allowNull: true
        },
        offerDate: {
            type: DataTypes.DATE,
            field: 'offer_date',
            allowNull: true
        },
        poNumber: {
            type: DataTypes.STRING(250),
            field: 'po_number',
            allowNull: true
        },
        poDate: {
            type: DataTypes.DATE,
            field: 'po_date',
            allowNull: true
        },
        poReceived: {
            type: DataTypes.DATE,
            field: 'po_received',
            allowNull: true
        },
        deliveryDate: {
            type: DataTypes.DATE,
            field: 'delivery_date',
            allowNull: true
        },
        legend: {
            type: DataTypes.STRING(250),
            field: 'legend',
            allowNull: true
        },

        regular: {
            type: DataTypes.BOOLEAN,
            field: 'regular',
            allowNull: true
        },
        tooling: {
            type: DataTypes.BOOLEAN,
            field: 'tooling',
            allowNull: true
        },
        purchaseOrderType: {
            type: DataTypes.BOOLEAN,
            field: 'purchase_order_type',
            allowNull: true
        },
        componentName: {
            type: DataTypes.STRING(250),
            field: 'component_name',
            allowNull: true
        },
        partNo: {
            type: DataTypes.STRING(250),
            field: 'part_no',
            allowNull: true
        },
        rev: {
            type: DataTypes.STRING(250),
            field: 'rev',
            allowNull: true
        },
        asCast: {
            type: DataTypes.BOOLEAN,
            field: 'as_cast',
            allowNull: true
        },
        heatTreatment: {
            type: DataTypes.BOOLEAN,
            field: 'heat_treatment',
            allowNull: true
        },
        shotBlast: {
            type: DataTypes.BOOLEAN,
            field: 'shot_blast',
            allowNull: true
        },
        machined: {
            type: DataTypes.BOOLEAN,
            field: 'machined',
            allowNull: true
        },
        leakTest: {
            type: DataTypes.BOOLEAN,
            field: 'leak_test',
            allowNull: true
        },
        ndtXrayDp: {
            type: DataTypes.BOOLEAN,
            field: 'ndt_xray_and_dp',
            allowNull: true
        },
        dp: {
            type: DataTypes.BOOLEAN,
            field: 'dp',
            allowNull: true
        },
        fpi: {
            type: DataTypes.BOOLEAN,
            field: 'fpi',
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
        painting: {
            type: DataTypes.BOOLEAN,
            field: 'painting',
            allowNull: true
        },
        poQuantity:{
            type: DataTypes.STRING(250),
            field: 'po_quantity',
            allowNull: true
        },
        
        alloyGrade: {
            type: DataTypes.STRING(250),
            field: ' alloy_grade',
            allowNull: true
        },
        vjpComponentquotedPrice: {
            type: DataTypes.STRING(250),
            field: 'vjp_component_quoted_price',
            allowNull: true
        },
        shippingAddress: {
            type: DataTypes.ENUM('ok','notOk'),
            field: ' shipping_address',
            allowNull: true
        },
        ourNameAddress: {
            type: DataTypes.ENUM('ok','notOk'),
            field: 'our_aame_address',
            allowNull: true
        },
        vendorCode: {
            type: DataTypes.ENUM('ok','notOk','na'),
            field: 'vendor_code',
            allowNull: true
        },
        price: {
            type: DataTypes.STRING(250),
            field: 'price',
            allowNull: true
        },
        exWorks: {
            type: DataTypes.BOOLEAN,
            field: 'ex_works',
            allowNull: true
        },
        dap: {
            type: DataTypes.BOOLEAN,
            field: 'dap',
            allowNull: true
        },
        fob: {
            type: DataTypes.BOOLEAN,
            field: 'fob',
            allowNull: true
        },
        cif: {
            type: DataTypes.BOOLEAN,
            field: 'cif',
            allowNull: true
        },

        paymentTerms: {
            type: DataTypes.ENUM('ok','notOk','na'),
            field: 'payment_terms',
            allowNull: true
        },
        deliveryRequirement: {
            type: DataTypes.STRING(250),
            field: 'delivery_requirement',
            allowNull: true
        },
        specialDocumentationRequirements: {
            type: DataTypes.STRING(250),
            field: 'special_documentation_requirements',
            allowNull: true
        },
        freightTerms: {
            type: DataTypes.STRING(250),
            field: 'freight_terms',
            allowNull: true
        },
        shippingMethod: {
            type: DataTypes.STRING(250),
            field: 'shipping_method',
            allowNull: true
        },
        aluminiumVariationClause: {
            type: DataTypes.STRING(250),
            field: 'aluminium_variation_clause',
            allowNull: true
        },
        foreignExchangeVariationClause: {
            type: DataTypes.ENUM('ok','notOk','na'),
            field: ' foreign_exchange_variation_clause',
            allowNull: true
        },
        tax: {
            type: DataTypes.ENUM('ok','notOk','na'),
            field: 'tax',
            allowNull: true
        },
        termsConditions: {
            type: DataTypes.ENUM('ok','notOk'),
            field: 'terms_conditions',
            allowNull: true
        },
        otherRequirements: {
            type: DataTypes.STRING(250),
            field: 'other_requirements',
            allowNull: true
        },
        conditionsInPONotPresentInYYQuote: {
            type: DataTypes.STRING(250),
            field: 'conditions_in_po_not_pPresent_in_yy_quote',
            allowNull: true
        },
        conditionsInPONotPresentInYYQuoteA: {
            type: DataTypes.STRING(250),
            field: 'conditions_in_po_not_pPresent_in_yy_quote_a',
            allowNull: true
        },
        conditionsInPONotPresentInYYQuoteB: {
            type: DataTypes.STRING(250),
            field: 'conditions_in_po_not_pPresent_in_yy_quote_b',
            allowNull: true
        },
        conditionsInPONotPresentInYYQuoteC: {
            type: DataTypes.STRING(250),
            field: 'conditions_in_po_not_pPresent_in_yy_quote_c',
            allowNull: true
        },
        conditionsInPONotPresentInYYQuoteD: {
            type: DataTypes.STRING(250),
            field: 'conditions_in_po_not_pPresent_in_yy_quote-d',
            allowNull: true
        },
        processLeadTime: {
            type: DataTypes.STRING(250),
            field: 'process_lead_time',
            allowNull: true
        },
        status:
        {
            type: DataTypes.BOOLEAN,
            field: 'status',
            allowNull: true
        },
        statusComment: {
            type: DataTypes.STRING(50),
            field: 'statusComment'
        },
    }, {
        timestamps: true,
        tableName: 'contract_review'
    })
    
  
    return ContractReview
}
