import express from 'express'
// Database
import db from './config/database.js'
// Routes
import positions from './routes/positions.js'
import applicants from './routes/applicants.js'


const app = express();
const port = process.env.PORT || 3000;

app.use(function logMethodAndUrl(request, response, next) {
    console.log(`${request.method} ${request.url}`)
    next()
})

app.use(express.json())

// Routes to positions
app.use('/positions', positions);
// Routes to applicants
app.use('/applicants', applicants);

app.get('/', (req, res, next) => {
    res.send('Index page.')
    next()
})


app.get('/health-check', (req, res) => {
    res.json({
        date: new Date,
        message: 'Server is running'
    });
})

// Database test
db.authenticate()
    .then(() => {console.log("Database is connected...")})
    .catch(err => console.log('Error: ' + err))

// Server start
app.listen(port, (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log(`Server is up on port ${port}`)
    }
})

app.use((err, req, res, next) => {
    console.log(err)
    response.status(500).send("Unexpected server error: " + JSON.stringify(err))
})


