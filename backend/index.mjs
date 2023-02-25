import * as dotenv from 'dotenv';
dotenv.config({ path: './.envrc' });

import express from 'express';
import db from './db.mjs';
const gpa = db.collection('gpa');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Healthcheck');
});

app.get('/subjects/:subjectName', async (req, res) => {
    return res.send(
        await gpa.find({ 
            Subject: req.params.subjectName.trim().toUpperCase() 
        }).toArray()
    );
});

app.get('/subjects/:subjectName/:courseNumber', async (req, res) => {
    return res.send(
        await gpa.find({ 
            Subject: req.params.subjectName.trim().toUpperCase(),
            Number: req.params.courseNumber.trim()
        }).toArray()
    );
});

app.get('/courses/:year/:term/:subjectName/:courseNumber', async (req, res) => {
    return res.send(
        await gpa.find({
            Year: req.params.year.trim(),
            Term: capitalizeFirstLetter(req.params.term.trim()),
            Subject: req.params.subjectName.trim().toUpperCase(),
            Number: req.params.courseNumber.trim()
        }).toArray()
    );
});

app.listen(port, () => {
    console.log(`Backend API listening on port ${port}`);
});
