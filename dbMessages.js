import mongoose from 'mongoose';

const whatsapSchema = mongoose.Schema({
     message: String,
     name: String,
     timeStamp: String,
     recieved: Boolean,
})

export default mongoose.model('messagecontents', whatsapSchema)