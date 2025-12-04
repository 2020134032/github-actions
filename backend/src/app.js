import 'dotenv/config';
import express from 'express';
import { fib, fact } from '#src/calc.js';
import { healthcheckRouter } from '#src/healthcheck.js'

const {
  FRONTEND_URL: CORS_ALLOWED_ORIGIN = "http://localhost:3000"
} = process.env; // Overridden by the environment variable

const app = express();

app.use(express.json());
app.use(healthcheckRouter);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', CORS_ALLOWED_ORIGIN);
    next();
})

// endpoint for fib
app.get('/fib', (req, res) => {
    const x = Number(req.query.x);
    if (typeof x !== 'number' || isNaN(x)) {
        res.status(400).json({
            type: 'error',
            message: 'x should be a nonnegative integer'
        });
    } else {
        res.status(200).json({
            type: 'success',
            result: fib(x)
        });
    }
});

// endpoint for fact
app.get('/fact', (req, res) => {
    const x = Number(req.query.x);
    if (typeof x !== 'number' || isNaN(x)) {
        res.status(400).json({
            type: 'error',
            message: 'x should be a nonnegative integer'
        });
    } else {
        res.status(200).json({
            type: 'success',
            result: fact(x)
        });
    }
});

// Web server for local testing
const ENV = process.env.ENV || 'production';

if (ENV === 'development') {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`App is listening on port ${port}`);
    });
} else if (ENV === 'production') {
    const port = process.env.PORT || 3031;
    app.listen(port);
}
