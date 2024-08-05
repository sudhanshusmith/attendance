const express = require("express");
const router = express.Router();

const dashboardControllers = require("../controllers/dashboard");

router.get("/", (req, res) => {
  res.send("Welcome to dashboard!");
});
router.post("/addCourse", dashboardControllers.addCourse);
router.get("/getCourse", dashboardControllers.getCourse);
router.post("/addAttendance", dashboardControllers.addAttendance);
router.get("/getAttendanceReport", dashboardControllers.getAttendanceReport);

module.exports = router;
