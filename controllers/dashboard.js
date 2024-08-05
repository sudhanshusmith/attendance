const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");
const {
  BadRequestError,
  UnauthenticatedError,
  InternalServerError,
} = require("../errors");

const Course = require("../models/Course");
const Attendance = require("../models/Attendance");

const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new BadRequestError("Validation failed", errors.array());
  }
  const { code, password } = req.body;
  if (password !== process.env.PASSWORD) {
    throw new UnauthenticatedError("Invalid password");
  }

  const courses = await Promise.all(
    code.map(async (item) => {
      const existingCourse = await Course.findOne({ code: item });
      if (!existingCourse) {
        return await Course.create({ code: item });
      }
      return existingCourse;
    })
  );
  res.status(StatusCodes.CREATED).json({ courses });
};

const getCourse = async (req, res) => {
  const courses = await Course.find();
  res.status(StatusCodes.OK).json({ courses });
};

const addAttendance = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new BadRequestError("Validation failed", errors.array());
  }
  const { data, password, date } = req.body;
  if (password !== process.env.PASSWORD) {
    throw new UnauthenticatedError("Invalid password");
  }

  const codes = data.map((item) => item.code);

  // Find courses with the extracted codes
  const foundCourses = await Course.find({ code: { $in: codes } });
  const foundCourseCodes = foundCourses.map((course) => course.code);

  // Identify invalid codes
  const invalidCodes = codes.filter((code) => !foundCourseCodes.includes(code));

  if (invalidCodes.length > 0) {
    throw new BadRequestError(
      `Invalid course codes: ${invalidCodes.join(", ")}`
    );
  }

  const attendanceRecords = data.map((item) => {
    const course = foundCourses.find((course) => course.code === item.code);
    return {
      course,
      date,
      mark: item.mark,
    };
  });

  try {
    await Attendance.insertMany(attendanceRecords);
  } catch (error) {
    throw new InternalServerError(error.message);
  }

  res.status(StatusCodes.CREATED).json({ attendanceRecords });
};

const getAttendanceReport = async (req, res) => {
  try {
    const attendanceReport = await Attendance.aggregate([
      {
        $group: {
          _id: "$course",
          presentCount: {
            $sum: {
              $cond: [{ $eq: ["$mark", "P"] }, 1, 0],
            },
          },
          absentCount: {
            $sum: {
              $cond: [{ $eq: ["$mark", "A"] }, 1, 0],
            },
          },
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      {
        $unwind: "$courseDetails",
      },
      {
        $project: {
          _id: 0,
          courseCode: "$courseDetails.code",
          courseName: "$courseDetails.name",
          presentCount: 1,
          absentCount: 1,
        },
      },
    ]);

    res.render("attendanceReport", { attendanceReport });
    // res.status(200).json(attendanceReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  addCourse,
  getCourse,
  addAttendance,
  getAttendanceReport,
};
