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
const all_grades = {"A+":"4.00", "A":"4.00", "A-":"3.67", "B+":"3.33", "B":"3.00", "B-":"2.67", "C+":"2.33", "C":"2.00", "C-":"1.67", "D+":"1.33", "D": "1.00", "D-":"0.67", "F":"0.00"}

app.get('/', (req, res) => {
    res.send('Healthcheck');
});

app.get('/subjects/:subjectName', async (req, res) => {
    let x = await gpa.find({ 
        Subject: req.params.subjectName.trim().toUpperCase() 
    }).toArray(); // stores array 
    for (var i = 0; i < x.length; i++) { // loop through each course
        var num_enrolled = 0;
        // counting total students enrolled in course
        for (var j = 0; j < 13; j++) { 
            var letter_grade = Object.keys(all_grades)[j] // returns each grade (ex: when j = 0 ->"A+")
            num_enrolled += parseInt(x[i][letter_grade]) // adds num of students with that grade
        }
        x[i]["Total Students"] = num_enrolled;
        // finding average GPA of class 

        // var half_students = num_enrolled / 2
        var avg_gpa = 0
        
        // (x[i][Object.keys(all_grades)[1]] / num_enrolled) * all_grades[Object.keys(all_grades)[1]]
        for (var j = 0; j < 13; j++) {
            var letter_grade = Object.keys(all_grades)[j]
            var grade_to_add = (x[i][letter_grade] / num_enrolled) * all_grades[Object.keys(all_grades)[j]]
            avg_gpa += grade_to_add
            // half_students -= parseInt(x[i][letter_grade])
            // if (half_students <= 0) {
            //     avg_gpa = all_grades[letter_grade] 
            //     break
            // }
        }
        x[i]["Average GPA"] = avg_gpa.toFixed(2);
        
        var num_students
        // declaring new aggregate letter grades as 0 
        x[i]["% A"] = 0
        x[i]["% B"] = 0
        x[i]["% C"] = 0
        x[i]["% D"] = 0
        x[i]["% F"] = 0
        for (var j = 0; j < 13; j++) {
            var letter_grade = Object.keys(all_grades)[j]
            x[i]["% ".concat(Object.keys(all_grades)[j].charAt(0))] += parseInt(x[i][letter_grade]) // combines num of students to larger letter grade (drops sign)
        }
        x[i]["% A"] = ((x[i]["% A"] * 100 / num_enrolled).toFixed(0)).concat("%")
        x[i]["% B"] = ((x[i]["% B"] * 100 / num_enrolled).toFixed(0)).concat("%")
        x[i]["% C"] = ((x[i]["% C"] * 100 / num_enrolled).toFixed(0)).concat("%")
        x[i]["% D"] = ((x[i]["% D"] * 100 / num_enrolled).toFixed(0)).concat("%")
        x[i]["% F"] = ((x[i]["% F"] * 100 / num_enrolled).toFixed(0)).concat("%")
    }
    return res.send(x);
});

app.get('/subjects/:subjectName/:courseNumber', async (req, res) => {
    let x = await gpa.find({ 
        Subject: req.params.subjectName.trim().toUpperCase(),
        Number: req.params.courseNumber.trim()
    }).toArray()
    for (var i = 0; i < x.length; i++) { // loop through each course
        var num_enrolled = 0;
        // counting total students enrolled in course
        for (var j = 0; j < 13; j++) { 
            var letter_grade = Object.keys(all_grades)[j] // returns each grade (ex: when j = 0 ->"A+")
            num_enrolled += parseInt(x[i][letter_grade]) // adds num of students with that grade
        }
        x[i]["Total Students"] = num_enrolled;
        // finding average GPA of class 

        // var half_students = num_enrolled / 2
        var avg_gpa = 0
        
        // (x[i][Object.keys(all_grades)[1]] / num_enrolled) * all_grades[Object.keys(all_grades)[1]]
        for (var j = 0; j < 13; j++) {
            var letter_grade = Object.keys(all_grades)[j]
            var grade_to_add = (x[i][letter_grade] / num_enrolled) * all_grades[Object.keys(all_grades)[j]]
            avg_gpa += grade_to_add
            // half_students -= parseInt(x[i][letter_grade])
            // if (half_students <= 0) {
            //     avg_gpa = all_grades[letter_grade] 
            //     break
            // }
        }
        x[i]["Average GPA"] = avg_gpa.toFixed(2);
        
        var num_students
        // declaring new aggregate letter grades as 0 
        x[i]["% A"] = 0
        x[i]["% B"] = 0
        x[i]["% C"] = 0
        x[i]["% D"] = 0
        x[i]["% F"] = 0
        for (var j = 0; j < 13; j++) {
            var letter_grade = Object.keys(all_grades)[j]
            x[i]["% ".concat(Object.keys(all_grades)[j].charAt(0))] += parseInt(x[i][letter_grade]) // combines num of students to larger letter grade (drops sign)
        }
        x[i]["% A"] = ((x[i]["% A"] * 100 / num_enrolled).toFixed(0)).concat("%")
        x[i]["% B"] = ((x[i]["% B"] * 100 / num_enrolled).toFixed(0)).concat("%")
        x[i]["% C"] = ((x[i]["% C"] * 100 / num_enrolled).toFixed(0)).concat("%")
        x[i]["% D"] = ((x[i]["% D"] * 100 / num_enrolled).toFixed(0)).concat("%")
        x[i]["% F"] = ((x[i]["% F"] * 100 / num_enrolled).toFixed(0)).concat("%")
    }
    return res.send(x)
});

app.get('/courses/:year/:term/:subjectName/:courseNumber', async (req, res) => {
    let x = await gpa.find({
        Year: req.params.year.trim(),
        Term: capitalizeFirstLetter(req.params.term.trim()),
        Subject: req.params.subjectName.trim().toUpperCase(),
        Number: req.params.courseNumber.trim()
    }).toArray()
    for (var i = 0; i < x.length; i++) { // loop through each course
        var num_enrolled = 0;
        // counting total students enrolled in course
        for (var j = 0; j < 13; j++) { 
            var letter_grade = Object.keys(all_grades)[j] // returns each grade (ex: when j = 0 ->"A+")
            num_enrolled += parseInt(x[i][letter_grade]) // adds num of students with that grade
        }
        x[i]["Total Students"] = num_enrolled;
        // finding average GPA of class 

        // var half_students = num_enrolled / 2
        var avg_gpa = 0
        
        // (x[i][Object.keys(all_grades)[1]] / num_enrolled) * all_grades[Object.keys(all_grades)[1]]
        for (var j = 0; j < 13; j++) {
            var letter_grade = Object.keys(all_grades)[j]
            var grade_to_add = (x[i][letter_grade] / num_enrolled) * all_grades[Object.keys(all_grades)[j]]
            avg_gpa += grade_to_add
            // half_students -= parseInt(x[i][letter_grade])
            // if (half_students <= 0) {
            //     avg_gpa = all_grades[letter_grade] 
            //     break
            // }
        }
        x[i]["Average GPA"] = avg_gpa.toFixed(2);
        
        var num_students
        // declaring new aggregate letter grades as 0 
        x[i]["% A"] = 0
        x[i]["% B"] = 0
        x[i]["% C"] = 0
        x[i]["% D"] = 0
        x[i]["% F"] = 0
        for (var j = 0; j < 13; j++) {
            var letter_grade = Object.keys(all_grades)[j]
            x[i]["% ".concat(Object.keys(all_grades)[j].charAt(0))] += parseInt(x[i][letter_grade]) // combines num of students to larger letter grade (drops sign)
        }
        x[i]["% A"] = ((x[i]["% A"] * 100 / num_enrolled).toFixed(0)).concat("%")
        x[i]["% B"] = ((x[i]["% B"] * 100 / num_enrolled).toFixed(0)).concat("%")
        x[i]["% C"] = ((x[i]["% C"] * 100 / num_enrolled).toFixed(0)).concat("%")
        x[i]["% D"] = ((x[i]["% D"] * 100 / num_enrolled).toFixed(0)).concat("%")
        x[i]["% F"] = ((x[i]["% F"] * 100 / num_enrolled).toFixed(0)).concat("%")
    }
    return res.send(x);
});

app.listen(port, () => {
    console.log(`Backend API listening on port ${port}`);
});
