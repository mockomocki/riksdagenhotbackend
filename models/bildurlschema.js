const mongoose = require('mongoose');
const {Schema} = mongoose;

const riksdagSchema = new Schema({
        bild_url: String,
        elo_rating: Number,
        id: String
})


module.exports = mongoose.model('riksdag', riksdagSchema);