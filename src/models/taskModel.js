const pool = require('../services/db');

//create a new task
module.exports.insertTaskSingle= (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Task (title, description, points)
    VALUES (?, ?, ?);
    `;
const VALUES = [data.title, data.description, data.points];

pool.query(SQLSTATMENT, VALUES, callback);


}

//view all tasks
module.exports.selectAlltasks =(callback)=>
{

    const SQLSTATMENT = `
    SELECT * FROM Task;
    `;

pool.query(SQLSTATMENT, callback);
}


//view task by id
module.exports.selectTaskByid = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Task
    WHERE task_id =?
    `;
const VALUES = [ data.task_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

       //update task by id
module.exports.updateTaskById= (data, callback)=>{
    const SQLSTATMENT = `
    UPDATE Task 
    SET title = ?, description = ?, points =?
    WHERE task_id =?;
   
    `;
    const VALUES = [data.title, data.description, data.points, data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}


//delete a task by id
module.exports.deleteTaskById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Task 
    WHERE task_id = ?;

    ALTER TABLE Task AUTO_INCREMENT = 1;
    `;
const VALUES = [data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updatepointsaftertask= (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Gameuserinfo
   SET 
  points = points +(SELECT points FROM Task WHERE task_id=? )
   WHERE owner_id =?;
  

   
    `;
    const VALUES = [data.task_id, data.owner_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updatetaskprogress= (data, callback) =>
{
    const SQLSTATMENT = `
  INSERT INTO Taskprogress (user_id, task_id, completion_date, notes)
    VALUES (?, ?, ?, ?);
   
  

   
    `;
    const VALUES = [data.owner_id, data.task_id, data.completion_date, data.notes ];

pool.query(SQLSTATMENT, VALUES, callback);
}

