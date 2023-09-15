import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

const VCNID = 1003
const JWT_TOKEN_MAX_AGE_IN_HOUR = 3

const app = express()

//body
app.use(bodyParser.urlencoded({ extended: true })) //handle data with form-data
app.use(bodyParser.json())
app.use(express.json())

//cookie
app.use(cookieParser())

app.use(cors({
    origin: 'https://testing-client.vercel.app',
    credentials: true,
}))

app.get('/', (req, res, next) => {
    let headers = req.headers

    console.log('>>> req.headers 1 >>>', headers)

    res.status(200).json({
        status: 'start',
        message: 'Response from vcn server',
        headers: headers,
        VCNID,
    })
})

app.post('/register', (req, res, next) => {
    let body = req.body

    console.log('>>> body >>>', body)

    let headers = req.headers

    console.log('>>> req.headers 2 >>>', headers)

    res
        .status(200)
        .cookie(
            'JWT_vcn',
            'oke-vcn-jwt-112',
            {
                maxAge: JWT_TOKEN_MAX_AGE_IN_HOUR * 3600000,
                domain: 'vcn-testing.onrender.com',
                path: '/',
                httpOnly: true,
                secure: true,
            }
        )
        .json({
            status: 'register',
            message: 'Response from vcn server',
            headers: headers,
            body: body,
            VCNID,
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
        headers: headers,
        cookies: cookies,
        VCNID,
    })
})

app.post('/logout', (req, res, next) => {
    let cookies = req.cookies

    res
        .status(200)
        .clearCookie(
            'JWT_token',
            {
                domain: this.cookie_options.domain,
                path: this.cookie_options.path,
            }
        )
        .json({
            status: 'logout',
            message: 'Response from vcn server',
            headers: headers,
            cookies: cookies,
            VCNID,
        })
})

export default app