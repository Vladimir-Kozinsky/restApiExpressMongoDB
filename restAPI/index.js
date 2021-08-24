import express from 'express'
import mongoose from 'mongoose'
import router from './router.js';


const DB_URL = "mongodb+srv://user1:user@cluster0.i1mxu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = 5000;

const app = express()
app.use(express.json())

app.use('/api', router)

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        app.listen(PORT, () => console.log(`SERVER WAS STARTED ON ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

startApp()
