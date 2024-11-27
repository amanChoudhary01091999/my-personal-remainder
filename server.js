import express from 'express';
import cors from 'cors';
import http from 'http';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Import route modules
import userRoutes from '../my-react-app/server/routes/user.js'
import passwordRoutes from '../my-react-app/server/routes/forgotPasswordRoute.js'
import remainderRoute from '../my-react-app/server/routes/remainderRoutes.js'

const app = express();
const mongoUserName = 'amanchoudharyofficial';
const mongoPassword = 'chaman0109';

const uri = `mongodb+srv://${mongoUserName}:${mongoPassword}@cluster0.zpiraa7.mongodb.net/?retryWrites=true&w=majority`;

// Connect to MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Adding headers for CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes to handle requests
app.use("/user", userRoutes);
app.use('/password', passwordRoutes);
app.use('/reminders', remainderRoute);

// Handle not found endpoints
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Handle other errors
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

const port = 3005;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// Export server (optional)
export default server;
