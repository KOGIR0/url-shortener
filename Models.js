import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let urlMapSchema = new Schema({
    url: String,
    shortUrl: String
});

const UrlMap = mongoose.model("UrlMap", urlMapSchema);

export {UrlMap}
