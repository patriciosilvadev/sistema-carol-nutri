const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Scheduling = new mongoose.Schema({
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    virtualDate:{
        type: String,
        required: true
    },
    actualDate: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    note: {
        type: String,
    }
})


Scheduling.plugin(mongoosePaginate)

mongoose.model('Scheduling', Scheduling)