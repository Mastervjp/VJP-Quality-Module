const bcrypt = require('bcrypt')


module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define('User', {

        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(250),
            field: 'name'
        },
        email: {
            type: DataTypes.STRING(100),
            field: 'email',
            allowNull: false,
            validate: { isEmail: true }
        },
        password: {
            type: DataTypes.STRING(250),
            field: 'password'
        },
        passwordResetToken: {
            type: DataTypes.STRING(50),
            field: 'password_reset_token'
        },
        passwordResetExpires: {
            type: DataTypes.STRING(50),
            field: 'password_reset_expires'
        },
        emailConfirmationToken: {
            type: DataTypes.STRING(50),
            field: 'email_confirmation_token'
        },
        emailConfirmed: {
            type: DataTypes.BOOLEAN,
            field: 'email_confirmation',
            allowNull: false,
            defaultValue: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            field: 'active',
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
        role: {
            type: DataTypes.ENUM('SA', 'NA', 'NU'),
            allowNull: false
        },
        logRole: {
            type: DataTypes.ENUM('MT', 'MKT', 'TT','ET','UT','dIS'),
            field: 'log_role',
            allowNull: false
        },

    },
        {
            timestamps: true,
            tableName: 'user'
        })
    // User.associate = function(models) {
    //     User.hasMany(models.Drawing, { foreignKey: 'userId' })
    // }

    User.checkLogin = function (email, password) {
        return new Promise((resolve, reject) => {
            User.findOne({ where: { email: email } }).then(result => {
                if (!result) {
                    return reject('Email not registred!')
                }
                bcrypt.compare(password, result.password, (err, matches) => {
                    if (err)
                        return reject(err)
                    if (matches === false)
                        return reject('Username or password incorrect!!')
                    // if (!result.emailConfirmed)
                    //     return reject('Email not verified. Please check your email.')
                    resolve(result)
                })
            }).catch(reject)
        })
    }

    // User.afterValidate((user, options) => {
    //     return new Promise((resolve, reject) => {
    //         User.findOne({ where: { email: user.email } }).then(result => {
    //             if (result)
    //                 return reject(new Error('User already exists with that email.'))
    //             resolve(options)
    //         })
    //     })
    // })


    User.beforeCreate((user, options) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(user.password, 8, (err, hash) => {
                if (err)
                    reject(err)
                user.password = hash
                resolve(options)
            })
        })
    })


    User.validateEmail = function (token) {
        return new Promise((resolve, reject) => {
            try {
                return resolve(true, 'verified sucessfully')
            }

            catch (err) {
                console.log(err);
                return reject(err);
            }
        })
    }


    return User
}