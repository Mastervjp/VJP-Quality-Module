const Sequelize = require('sequelize')
const { dbConfig } = require('../startup')
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)

let models = {};

models.User = sequelize.import('./user')
models.Operation = sequelize.import('./operation')
models.Process = sequelize.import('./process')
models.Drawing = sequelize.import('./drawing')
models.QualityPlan = sequelize.import('./qualityplan')
models.WorkCenter = sequelize.import('./workcenter')

models.DrawingType = sequelize.import('./drawingtype')
models.Instrument = sequelize.import('./instrument')
models.Machining = sequelize.import('./machining')
models.MeasuringFrequency = sequelize.import('./measuringfrequency')
models.OperationList = sequelize.import('./operationlist')
models.PlanAbstract = sequelize.import('./planabstract')
models.MarketPurchase = sequelize.import('./marketpurchase')
models.Material = sequelize.import('./material')


models.MarketCard = sequelize.import('./marketcard')

models.MachiningToleranceStandard = sequelize.import('./machiningtolerance')
models.CastingToleranceStandard = sequelize.import('./castingtolerance')
models.HeatTreatmentCycle = sequelize.import('./heattreatment')
models.SpecialProcess = sequelize.import('./specialprocess')
models.ContractReview = sequelize.import('./ContractReview')
models.ProcessCharacteristics = sequelize.import('./processcharacteristics')
models.IncomingSource = sequelize.import('./incomingsource')
models.ProductCharacteristics = sequelize.import('./productcharacteristics')
models.ProcessList = sequelize.import('./ProcessList')




// models.User.sync({});
// models.Drawing.sync({});
// models.Operation.sync({});
// models.Process.sync({});
// models.QualityPlan.sync({});
// models.WorkCenter.sync({});
// models.DrawingType.sync({});
// models.Instrument.sync({});
// models.Machining.sync({});
// models.MeasuringFrequency.sync({});
// models.OperationList.sync({});
// models.PlanAbstract.sync({});
// models.MarketPurchase.sync({});
// models.MarketCard.sync({});


// models.Material.sync({});
// models.MachiningToleranceStandard.sync({});
// models.CastingToleranceStandard.sync({});
// models.HeatTreatmentCycle.sync({});
// models.SpecialProcess.sync({});
 models.ContractReview.sync({});

models.ProcessCharacteristics.sync({});
models.IncomingSource.sync({});
models.ProductCharacteristics.sync({});
models.ProcessList.sync({});





Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models)
    }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models;