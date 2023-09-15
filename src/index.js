
import 'dotenv/config'
import app from "./app.js"

const { PORT } = process.env || 8080

app.listen(PORT, () => {
    console.log('>>> Server is working on port', PORT)
})