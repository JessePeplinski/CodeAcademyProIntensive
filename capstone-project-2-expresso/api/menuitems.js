const express = require('express');
const menuItemRouter = express.Router({ mergeParams: true });

const sqlite = require('sqlite3');
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');

// Return menu item id
menuItemRouter.param('menuItemId', (req, res, next, menuItemId) => {
    db.get('SELECT * FROM MenuItem WHERE id = $id', { $id: menuItemId },
        (err, result) => {
            if (err) {
                next(err)
            } else if (result) {
                req.menuItem = result;
                next();
            } else {
                res.sendStatus(404);
            }
        })
});

// Returns a 200 response containing all saved menu items related to the menu with the supplied menu ID on the menu items property of the response body
// If a menu with the supplied menu ID doesn't exist, returns a 404 response
menuItemRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM MenuItem WHERE menu_id = $menu_id', { $menu_id: req.menu.id },
        (err, result) => {
            if (err) {
                next(err);
            } else {
                res.status(200).send({ menuItems: result });
            }
        })
});

// Creates a new menu item, related to the menu with the supplied menu ID, with the information from the menuItem property of the request body and saves it to the database. Returns a 201 response with the newly-created menu item on the menuItem property of the response body
// If any required fields are missing, returns a 400 response
// If a menu with the supplied menu ID doesn't exist, returns a 404 response
menuItemRouter.post('/', (req, res, next) => {

    const name = req.body.menuItem.name;
    const description = req.body.menuItem.description;
    const inventory = req.body.menuItem.inventory;
    const price = req.body.menuItem.price;

    if (!name || !description || !inventory || !price) {
        return res.sendStatus(400);
    }
    db.run('INSERT INTO MenuItem (name,description,inventory,price,menu_id) VALUES ($name,$description,$inventory,$price,$menu_id)',
        {
            $name: name,
            $description: description,
            $inventory: inventory,
            $price: price,
            $menu_id: req.menu.id
        }, (err) => {
            if (err) {
                next(err);
            } else {
                db.get('SELECT * FROM MenuItem WHERE id = last_insert_rowid()', (err, result) => {
                    res.status(201).json({ menuItem: result });
                })
            }
        })
})

// Updates the menu item with the specified menu item ID using the information from the menuItem property of the request body and saves it to the database. Returns a 200 response with the updated menu item on the menuItem property of the response body
// If any required fields are missing, returns a 400 response
// If a menu with the supplied menu ID doesn't exist, returns a 404 response
// If a menu item with the supplied menu item ID doesn't exist, returns a 404 response
menuItemRouter.put('/:menuItemId', (req, res, next) => {

    const name = req.body.menuItem.name;
    const description = req.body.menuItem.description;
    const inventory = req.body.menuItem.inventory;
    const price = req.body.menuItem.price;

    if (!name || !description || !inventory || !price) {
        return res.sendStatus(400);
    }

    db.run('UPDATE MenuItem SET name = $name, description = $description, inventory = $inventory, price = $price, menu_id = $menu_id WHERE id =$id',
        {
            $name: name,
            $description: description,
            $inventory: inventory,
            $price: price,
            $menu_id: req.menu.id,
            $id: req.menuItem.id
        }, (err) => {
            if (err) {
                next(err);
            } else {
                db.get('SELECT * FROM MenuItem WHERE id = $id', { $id: req.menuItem.id }, (err, result) => {
                    res.status(200).json({ menuItem: result });
                })
            }
        })
});

// Deletes the menu item with the supplied menu item ID from the database. Returns a 204 response.
// If a menu with the supplied menu ID doesn't exist, returns a 404 response
// If a menu item with the supplied menu item ID doesn't exist, returns a 404 response
menuItemRouter.delete('/:menuItemId', (req, res, next) => {
    db.run('DELETE FROM MenuItem WHERE id = $id', { $id: req.menuItem.id }, (err) => {
        if (err) {
            next(err);
        } else {
            res.sendStatus(204);
        }
    })
})

module.exports = menuItemRouter;