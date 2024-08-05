const express = require('express')
const router = express.Router()

const adminControllers = require('../controllers/admin')

// Routes related to students 
router.post('/addOneStudent', adminControllers.addOneStudent);

router.get('/allStudent', adminControllers.getAllStudents);

// Routes related Hours addition and deletion 
router.post('/addMultipleHours', adminControllers.addMultipleHours);

// Routes related Event  
router.post('/addEvent', adminControllers.addOneEvent);

router.get('/event/:eventId', adminControllers.getEventById);
router.put('/event/:eventId', adminControllers.updateEventById);
router.delete('/event/:eventId', adminControllers.deleteEventById);

// Routes related Grade Generation
router.get('/studentsWith80Hours', adminControllers.getAllStudentsWith80Hours);
router.get('/gradeHistory', adminControllers.downloadGradeHistory);



module.exports = router
