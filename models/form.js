const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    full_name : String,
    scholar : Number,
    enr : String,
    user_id : String,
    phone : Number
});

module.exports = mongoose.model('form', schema);
