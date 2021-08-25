import mongoose from 'mongoose'

const PostAuth = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    rememberMe: { type: Boolean },
    rememberMe: { type: String }

})

export default mongoose.model('PostAuth', PostAuth)