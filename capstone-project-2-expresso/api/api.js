const express = require('express');
const apiRouter = express.Router();

const menuRouter = require('./menu.js');
const employeesRouter = require('./employees.js');
const timeSheetRouter = require('./timesheets.js');
const menuItemRouter = require('./menuitems.js')

apiRouter.use('/menus', menuRouter);
apiRouter.use('/employees', employeesRouter);
apiRouter.use('/timesheets', timeSheetRouter);
apiRouter.use('/menuitems', menuItemRouter);

module.exports = apiRouter;