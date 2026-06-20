const moogoose = require('mongoose');

const userSchema = new moogoose.Schema({
    nickName: {
        type: String,
        required: [ true, 'NickName es obligatorio' ],
        unique: true,
        trim: true,     
    },
    firstName: {
        type: String,
        required: [ true, 'Nombre es obligatorio' ],
        trim: true,
    },
    lastName: {
        type: String,
        required: [ true, 'Apellido es obligatorio' ],
        trim: true,
    },
    birthDate: {
        type: Date,
        required: [ true, 'Fecha de nacimiento es obligatoria' ],
    },
    email: {
        type: String,
        required: [ true, 'Email es obligatorio' ],
        unique: true,
        trim: true,
    },
    follwers: [
        {
            type: moogoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    following: [
        {
            type: moogoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
}, {
    timestamps: true,
});

userSchema.virtual("age").get(function() {
    if (!this.birthDate) return null;
    const hoy = new Date();
    let edad = hoy.getFullYear() - this.birthDate.getFullYear();
    const mes = hoy.getMonth() - this.birthDate.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < this.birthDate.getDate())) {
        edad--;
    }
    return edad;
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

const User = moogoose.model('User', userSchema);

module.exports = User;