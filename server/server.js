const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);

const app = express();
const userRouter = require('./routes/user');
const bookRouter = require('./routes/books');

// mongodb+srv://admin_user3:PpTkkZcsBZFnJfdO@cluster0.odoxl.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);

app.use(express.static('client/build'));

if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (req, res) => {
        console.log('Works');
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
}
const port = process.env.PORT || 3003;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
