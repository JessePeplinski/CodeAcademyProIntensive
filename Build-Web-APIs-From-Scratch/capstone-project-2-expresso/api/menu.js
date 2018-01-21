const express = require('express');
const menuRouter = express.Router();
const menuItemRouter = require('./menuitems.js');
menuRouter.use('/:menuId/menu-items', menuItemRouter);

const sqlite = require('sqlite3');
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');

// Return current menu for a specified ID
menuRouter.param('menuId', (req, res, next, id) => {
    db.get('SELECT * FROM Menu WHERE id = $id', { $id: id },
    (err, results) => {
        if (err) {
            next(err);
        } else if (results) {
            req.menu = results;
            next();
        } else {
            res.sendStatus(404);
        }
    })
})

// Returns a 200 response containing all saved menus on the menus property of the response body
menuRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Menu',
    (err, results) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json({ menus: results });
        }
    })
})

// Creates a new menu with the information from the menu property of the request body and saves it to the database. Returns a 201 response with the newly-created menu on the menu property of the response body
// If any required fields are missing, returns a 400 response
menuRouter.post('/', (req, res, next) => {

    const title = req.body.menu.title;

    if (!title) {
        res.sendStatus(400);
    }

    db.run('INSERT INTO Menu (title) VALUES ($title)', { $title: title }, 
    (err) => {
        if (err) {
            next(err);
        } else {
            db.get('SELECT * FROM Menu WHERE id = last_insert_rowid()', 
            (err, results) => {
                if (err) {
                    next(err);
                } else {
                    res.status(201).json({ menu: results });
                }
            })
        }
    })
});

// Returns a 200 response containing the menu with the supplied menu ID on the menu property of the response body
// If a menu with the supplied menu ID doesn't exist, returns a 404 response
menuRouter.get('/:menuId', (req, res, next) => {
    res.status(200).json({ menu: req.menu });
})

// Updates the menu with the specified menu ID using the information from the menu property of the request body and saves it to the database. Returns a 200 response with the updated menu on the menu property of the response body
// If any required fields are missing, returns a 400 response
// If a menu with the supplied menu ID doesn't exist, returns a 404 response
menuRouter.put('/:menuId', (req, res, next) => {

    const title = req.body.menu.title;

    if (!title) {
        res.sendStatus(400);
    }

    db.run('UPDATE Menu SET title = $title WHERE id = $id', { $title: title, $id: req.menu.id }, 
    (err) => {
        if (err) {
            next(err);
        } else {
            db.get('SELECT * FROM Menu WHERE id = $id', { $id: req.menu.id }, 
            (err, result) => {
                res.status(200).json({ menu: result });
            })
        }
    })
})

// Deletes the menu with the supplied menu ID from the database if that menu has no related menu items. Returns a 204 response.
// If the menu with the supplied menu ID has related menu items, returns a 400 response.
// If a menu with the supplied menu ID doesn't exist, returns a 404 response
menuRouter.delete('/:menuId', (req, res, next) => {
    db.get('SELECT * FROM MenuItem WHERE MenuItem.menu_id = $id', { $id: req.menu.id }, 
    (err, result) => {
        if (err) {
            next(err);
        } else if (result) {
            res.sendStatus(400);
        } else if (!result) {
            db.run('DELETE FROM Menu WHERE NOT EXISTS (SELECT * FROM MenuItem WHERE menu_id = $id)', 
            { $id: req.menu.id }, 
            (err) => {
                res.sendStatus(204);
            })
        }
    })
});

module.exports = menuRouter;