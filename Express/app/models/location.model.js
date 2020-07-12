const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
	_id: Schema.Types.ObjectId,
    name: String,
    admin_id:Schema.Types.ObjectId,
    adress: String,
    boundary: Number,
    type: String,
    shape:{
        typeOfStruct:String,
        additionalPoints: [{
            lat:Number,
            lng:Number
        }]
    },
},
{
    timestamps: true
}
);

module.exports = mongoose.model('locations',LocationSchema,'locations');

