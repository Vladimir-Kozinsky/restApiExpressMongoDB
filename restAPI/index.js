import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'
import cors from 'cors'

const DB_URL = "mongodb+srv://user1:user@cluster0.i1mxu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = 3001;

const app = express()
app.use(express.json())

app.use('/api', router)
//app.use(cors())

// app.use(
//     cors({
//         credentials: true,
//         origin: [
//             'http://localhost:3001',
//         ]
//     }),
// )
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
