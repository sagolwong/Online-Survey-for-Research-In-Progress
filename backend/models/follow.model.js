const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const followSchema = new Schema({
    surveyId: {
        type: String,
        required: true,
        trim: true
    },userId: {
        type: String,
        required: true,
        trim: true
    },frequencyId: {
        type: String,
        required: true,
        trim: true
    },follow: Array
});

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;