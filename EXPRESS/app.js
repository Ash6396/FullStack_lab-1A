
const express = require("express");

const app = express();
const PORT = 3000;

// Set EJS as template engine
app.set("view engine", "ejs");

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));

// Temporary student data
let students = [
    { id: 1, name: "Arpit", course: "MCA" },
    { id: 2, name: "Rahul", course: "BCA" },
    { id: 3, name: "Aman", course: "B.Tech" }
];

// Route 1: Home page (GET)
app.get("/", (req, res) => {
    res.render("index");
});

// Route 2: About page (GET)
app.get("/about", (req, res) => {
    res.render("about");
});

// Route 3: Display all students (GET)
app.get("/students", (req, res) => {
    res.render("students", { students: students });
});

// Route 4: Display add student form (GET)
app.get("/add-student", (req, res) => {
    res.render("addStudent");
});

// Route 5: Add new student (POST)
app.post("/add-student", (req, res) => {

    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        course: req.body.course
    };

    students.push(newStudent);

    res.redirect("/students");
});

// Route 6: Contact page (GET)
app.get("/contact", (req, res) => {
    res.send("Contact us: contact@example.com");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
