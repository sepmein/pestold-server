/**
 * Created by Spencer on 15/1/4.
 */

'use strict';

var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId;

var recipeSchema = mongoose.Schema({
    concentrationRaw: {
        data: Number,
        unit: {
            type: String,
            enum: ['percent', 'mg/mL', 'mg/L', 'ppm'],
            default: 'percent'
        }
    },
    concentrationHigh: {
        data: Number,
        unit: {
            type: String,
            enum: ['percent', 'mg/mL', 'mg/L', 'ppm'],
            default: 'mg/L'
        }
    },
    propotionRate: Number,
    groupNumber: Number,
    dose: {
        data: Number,
        unit: {
            type: String,
            enum: ['uL', 'mL', 'L']
        }
    },
    createdBy: ObjectId,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    staredBy: [ObjectId],
    method: String,
    description: String,
    originalMedicine: String
});

mongoose.model('Recipe', recipeSchema);
