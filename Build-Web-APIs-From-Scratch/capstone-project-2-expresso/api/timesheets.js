const express = require('express');
const timeSheetRouter = express.Router({ mergeParams: true });

const sqlite = require('sqlite3')
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');

// Return timesheet for a specified employee ID
timeSheetRouter.param('timesheetId', (req, res, next, id) => {
    db.get('SELECT * FROM Timesheet WHERE id = $id',
        {
            $id: id
        }, 
        (err, result) => {
            if (err) {
                next(err);
            } else if (result) {
                req.timesheet = result;
                next();
            } else {
                res.sendStatus(404);
            }
        })
});

// Returns a 200 response containing all saved timesheets related to the employee with the supplied employee ID on the timesheets property of the response body
// If an employee with the supplied employee ID doesn't exist, returns a 404 response
timeSheetRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Timesheet WHERE Timesheet.employee_id = $employee_id',
        {
            $employee_id: req.employee.id
        }, 
        (err, timesheets) => {
            if (err) {
                next(err);
            } else {
                res.status(200).json({ timesheets: timesheets });
            }
        })
});

// Creates a new timesheet, related to the employee with the supplied employee ID, with the information from the timesheet property of the request body and saves it to the database. 
// Returns a 201 response with the newly-created timesheet on the timesheet property of the response body
// If an employee with the supplied employee ID doesn't exist, returns a 404 response
timeSheetRouter.post('/', (req, res, next) => {

    const hours = req.body.timesheet.hours;
    const rate = req.body.timesheet.rate;
    const date = req.body.timesheet.date;

    if (!hours || !rate || !date || !req.employee.id) {
        return res.sendStatus(400);
    }

    db.run('INSERT INTO Timesheet (hours, rate, date ,employee_id) VALUES ($hours, $rate, $date, $employee_id)',
        {
            $hours: hours,
            $rate: rate,
            $date: date,
            $employee_id: req.employee.id
        }, 
        (err) => {
            if (err) {
                throw (err);
            } else {
                db.get('SELECT * FROM Timesheet WHERE id = last_insert_rowid()',
                    (err, result) => {
                        res.status(201).json({ timesheet: result });
                    })
            }
        })
});

// Updates the timesheet with the specified timesheet ID using the information from the timesheet property of the request body and saves it to the database. Returns a 200 response with the updated timesheet on the timesheet property of the response body
// If any required fields are missing, returns a 400 response
// If an employee with the supplied employee ID doesn't exist, returns a 404 response
// If an timesheet with the supplied timesheet ID doesn't exist, returns a 404 response
timeSheetRouter.put('/:timesheetId', (req, res, next) => {
    const hours = req.body.timesheet.hours;
    const rate = req.body.timesheet.rate;
    const date = req.body.timesheet.date;

    if (!hours || !rate || !date) {
        return res.sendStatus(400);
    }
    
    db.run('UPDATE Timesheet SET hours = $hours, rate = $rate, date = $date WHERE id = $timesheetId',
        {
            $hours: hours,
            $rate: rate,
            $date: date,
            $timesheetId: req.timesheet.id
        }, 
        (err) => {
            if (err) {
                next(err);
            } else {
                db.get(`SELECT * FROM Timesheet WHERE id = ${req.timesheet.id}`,
                    (err, timesheet) => {
                        res.status(200).json({ timesheet: timesheet });
                    });
            }
        });
});

// Deletes the timesheet with the supplied timesheet ID from the database. Returns a 204 response.
// If an employee with the supplied employee ID doesn't exist, returns a 404 response
// If an timesheet with the supplied timesheet ID doesn't exist, returns a 404 response
timeSheetRouter.delete('/:timesheetId', (req, res, next) => {
    db.run('DELETE FROM Timesheet WHERE id = $id', { $id: req.timesheet.id }, (err) => {
        if (err) {
            next(err);
        } else {
            res.sendStatus(204);
        }
    })
});

module.exports = timeSheetRouter;