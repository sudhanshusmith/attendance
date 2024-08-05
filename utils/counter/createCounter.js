const Counter = require('../../models/counter')
const Grade = require('../../models/grades')

async function createCounterIfNotExists() {
  // Check the length of counter collection
  const counterCount = await Counter.countDocuments();
  if (counterCount === 0) {
      // Create a new counter
      const counter = new Counter({
          id : 1,
          counterHours : 0,
          counterEvent : 0
      });
      await counter.save();
  }
}



async function createGradeIfNotExists() {
  // Check the length of grade collection
  const gradeCount = await Grade.countDocuments();
  if (gradeCount === 0) {
      // Create a new grade
      const grade = new Grade({
          id : 1,
          history : []
      });
      await grade.save();
  }
}



module.exports.createCounterIfNotExists = createCounterIfNotExists;
module.exports.createGradeIfNotExists = createGradeIfNotExists;