const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const draftSurveySchema = new Schema({
    projectId: {
        type: String,
        required: true,
        trim: true
    }, sampleGroupId: {
        type: String,
        trim: true
    }, nameSurvey: {
        type: String,
        required: true,
        trim: true
    }, description: {
        type: String,
    }, shareTo: {
        type: String,
        enum: ["public", "open", "close"],
        required: true,
    }, wantName: {
        type: Boolean,
        required: true
    },
    haveGroup: {
        type: Boolean,
        required: true
    }, frequency: {
        amount: {
            type: Number,
            required: true
        },
        unitsOfTime: {
            type: String,
            required: true
        }
    }, doOnce: {
        type: Boolean,
        required: true
    }, openAndCloseTimes: {
        start: {
            day: {
                type: Number,
                required: true
            }, month: {
                type: Number,
                required: true
            }, year: {
                type: Number,
                required: true
            }
        }, end: {
            day: {
                type: Number,
                required: true
            }, month: {
                type: Number,
                required: true
            }, year: {
                type: Number,
                required: true
            }
        }
    }, builtIns: Array,
    data: {
        type: Object,
        required: true
    }
});

const DraftSurvey = mongoose.model('DraftSurvey', draftSurveySchema);

module.exports = DraftSurvey;