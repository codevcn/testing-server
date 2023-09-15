import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: 'https://testing-client.vercel.app',
    credentials: true,
}))

app.get('/', (req, res, next) => {
    console.log('>>> req.headers 1 >>>', req.headers)

    res.status(200).json({
        status: 'start',
        message: 'Response from vcn server',
    })
})

app.post('/register', (req, res, next) => {
    let { pass, username } = req.body

    console.log('>>> body >>>', { pass, username })

    let headers = req.headers

    console.log('>>> req.headers 2 >>>', headers)

    res
        .status(200)
        .cookie('JWT_vcn', 'oke vcn jwt 112', {
            httpOnly: true,
            domain: headers.origin,
        })
        .json({
            status: 'register',
            message: 'Response from vcn server',
        })
})

app.post('/login', (req, res, next) => {
    let cookies = req.cookies

    console.log('>>> cookie >>>', cookies)

    let headers = req.headers

    console.log('>>> req.headers 3 >>>', headers)

    res.status(200).json({
        status: 'login',
        message: 'Response from vcn server',
    })
})

export default app