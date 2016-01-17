var mongoose = require('mongoose'),
    uploadSchema = require('../schema/upload_schema');

var Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;