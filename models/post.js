const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    body: {
        type: String,
        required: true,
        index: true
    },
    authorId: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })
topicSchema.index({ title: 'text', body: 'text' });
const Post = module.exports = mongoose.model('Post', topicSchema);