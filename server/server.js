const express = require('express');
const app = express();
var cors = require('cors')
const config = require('./config');
const mongoose = require('mongoose');
const helmet = require('helmet');
const sanitize = require('mongo-sanitize');

const taskRoutes = require('./routes/task.routes');

const loadTestData = require('./testData');


const Schema = mongoose.Schema;
/* const userSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: String,
    columns: [
        {
            id: { type: Number, required: true, unique: true },
            name: String,
            cards: [
                {
                    id: { type: Number, required: true, unique: true },
                    kanban_column_id: { type: Number, required: true, unique: true },
                    name: String
                }
            ]
        }
    ]
}) */


mongoose.connect(config.DB, { useNewUrlParser: true });
let db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database');
    loadTestData();
});
db.on('error', (err) => console.log('Error ' + err));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use((req, res, next) => {
    sanitize(req.body);
    next();
});
app.use('/', taskRoutes);

/* app.get('/', (req, res) => res.send('Hello World!'));
app.get('/board', (req, res) => {
    res.json(board);
});

app.post('/column/', (req, res) => { res.send('add column') });
app.put('/column/:id', (req, res) => {
    res.json(board.columns.find(x => x.id === req.params.id))
});
app.delete('/column/:id', (req, res) => { res.send('ID kolumny: ' + req.params.id) });

app.post('/card', (req, res) => { res.send("add card") });
app.put('/card/:id', (req, res) => { res.send('ID karty: ' + req.params.id) });
app.delete('/card/:id', (req, res) => { res.send('ID karty: ' + req.params.id) }); */

app.listen(config.PORT, () => console.log(`Example app listening on port ${config.PORT}!`));