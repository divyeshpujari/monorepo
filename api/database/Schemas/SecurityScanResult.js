'use strict';
const mongoose = require('mongoose');
const {Schema} = mongoose;

const FindingSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  ruleId: { // We can use an enum too for this field.
    type: String,
    required: true
  },
  location: {
    path: {
      type: String,
      required: true
    },
    positions: {
      begin: {
        line: {
          type: Number,
          required: true
        }
      }
    }
  },
  metadata: {
    description: {
      type: String
    },
    severity: { // We can use an enum too for this field
      type: String,
      required: true
    }
  }
}, {_id: false});

const SecurityScanResultSchema = new Schema({
  RepositoryName: {
    type: String,
    required: true
  },
  Status: {
    type: String,
    required: true,
    enum: ['Queued', 'In Progress', 'Success', 'Failure']
  },
  QueuedAt: {
    type: Date,
    default: new Date()
  },
  ScanningAt: {
    type: Date
  },
  FinishedAt: {
    type: Date
  },
  Findings: [FindingSchema]
}, {
  timestamps: true,
  collection: 'SecurityScanResult'
});

/**
 * @module SecurityScanResult
 * @description - Expose the SecurityScanResult model over the system
 */
module.exports = mongoose.model('SecurityScanResult', SecurityScanResultSchema);