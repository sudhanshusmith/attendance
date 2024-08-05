const Student = require('../../models/studentModel')
const Hours = require('../../models/hoursModel')
const DeletedHours = require('../../models/deletedHoursModel')
const Counter = require('../../models/counter')
const Event = require('../../models/event')
const Grade = require('../../models/grades')



// Function To Add Hours
async function addHoursToStudentAndCollection(data) {

  try { 

      const counter = await Counter.findOne({ id: 1 });
      if (!counter) {
          return res.status(404).json({ error: 'Counter not found' });
      }

      const hours = new Hours({
          hoursId: counter.counterHours,
          entry: data.entry,
          eventId: data.eventId,
          eventHours: data.eventHours,
          addedBy: 'Admin1',
          eventType: data.eventType
      });

      // Add hours in hours collection
      const newHours = await hours.save();

      console.log('Hours added to the collection:', newHours);

      // Now add the hours to the student collection

      const student = await Student.findOne({ entry: data.entry });

      if (!student) {
          console.log('Student not found');
          return;
      }

      student.hours += data.eventHours;

      student.history.push({
          hoursId : counter.counterHours,
          eventId: data.eventId,
          eventHours: data.eventHours,
          addedBy: data.addedBy,
          eventType: data.eventType,
      });

      await student.save();
      console.log('Hours added to the student collection:', student);

      counter.counterHours += 1;
      await counter.save();

  } catch(error) {
      console.error('Error', error);
  }
}

async function processMultipleHoursData(dataArray) {
  const results = [];
  for (const data of dataArray) {
      try {
          await addHoursToStudentAndCollection(data);
          results.push({ success: true, data });
      } catch (error) {
          results.push({ success: false, data, error: error.message });
      }
  }
  return results;
}


module.exports.addHoursToStudentAndCollection = addHoursToStudentAndCollection;
module.exports.processMultipleHoursData = processMultipleHoursData;