const express = require('express');
const employeesRouter = express.Router();
const timeSheetRouter = require('./timesheets.js');

const sqlite = require('sqlite3');
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');

employeesRouter.use('/:employeeId/timesheets', timeSheetRouter);

// Return employee for a specified employee ID
employeesRouter.param('employeeId', (req, res, next, id) => {
    db.get('SELECT * FROM Employee WHERE Employee.id = $id',
        {
            $id: id
        },
        (err, result) => {
            if (err) {
                next(err);
            } else if (result) {
                req.employee = result;
                next();
            } else {
                res.sendStatus(404);
            }
        });
});

// Returns a 200 response containing all saved currently-employed employees (is_current_employee is equal to 1) on the employees property of the response body
employeesRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Employee WHERE is_current_employee = 1',
        (err, results) => {
            if (err) {
                next(err);
            } else {
                res.status(200).json({ employees: results });
            }
        });
});


// Creates a new employee with the information from the employee property of the request body and saves it to the database. Returns a 201 response with the newly-created employee on the employee property of the response body
// If any required fields are missing, returns a 400 response 
employeesRouter.post('/', (req, res, next) => {
    const name = req.body.employee.name;
    const position = req.body.employee.position;
    const wage = req.body.employee.wage;

    if (!name || !position || !wage) {
        res.sendStatus(400);
    }

    db.run('INSERT INTO Employee (name, position, wage) VALUES ($name, $position, $wage)',
        {
            $name: name,
            $position: position,
            $wage: wage,
        },
        (err, result) => {
            if (err) {
                next(err);
            } else {
                db.get(`SELECT * FROM Employee WHERE Employee.id = last_insert_rowid()`,
                    (error, results) => {
                        res.status(201).json({ employee: results });
                    });
            }
        })
});

// Returns a 200 response containing the employee with the supplied employee ID on the employee property of the response body
// If an employee with the supplied employee ID doesn't exist, returns a 404 response
employeesRouter.get('/:employeeId', (req, res, next) => {
    res.status(200).json(
        { employee: req.employee }
    );
});

// Updates the employee with the specified employee ID using the information from the employee property of the request body and saves it to the database. Returns a 200 response with the updated employee on the employee property of the response body
// If any required fields are missing, returns a 400 response
// If an employee with the supplied employee ID doesn't exist, returns a 404 response
employeesRouter.put('/:employeeId', (req, res, next) => {
    const name = req.body.employee.name;
    const position = req.body.employee.position;
    const wage = req.body.employee.wage;

    if (!name || !position || !wage) {
        res.sendStatus(400);
    }

    db.run('UPDATE Employee SET name = $name, position = $position, wage = $wage',
        {
            $name: name,
            $position: position,
            $wage: wage
        },
        (err) => {
            if (err) {
                next(err);
            } else {
                db.get(`SELECT * FROM Employee WHERE Employee.id = ${req.employee.id}`,
                    (err, results) => {
                        res.status(200).json({ employee: results });
                    })
            }
        })
});

// Updates the employee with the specified employee ID to be unemployed (is_current_employee equal to 0). Returns a 200 response.
// If an employee with the supplied employee ID doesn't exist, returns a 404 response
employeesRouter.delete('/:employeeId', (req, res, next) => {
    db.run(`UPDATE Employee SET is_current_employee = 0 WHERE Employee.id = ${req.employee.id}`,
        (err) => {
            if (err) {
                next(err);
            } else {
                db.get(`SELECT * FROM Employee WHERE Employee.id = ${req.employee.id}`,
                    (err, results) => {
                        if (err) {
                            next(err);
                        } else if (results) {
                            res.status(200).send({ employee: results });
                        }
                    })
            }
        })
});

module.exports = employeesRouter;