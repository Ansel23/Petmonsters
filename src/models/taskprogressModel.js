const pool = require('../services/db');


//create a new task progress
module.exports.insertTaskprogress= (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
    VALUES (?, ?, ?, ?)
   
    `;
const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];

pool.query(SQLSTATMENT, VALUES, callback);


}

 //check if taskId is correct
module.exports.checkTaskId= (data, callback)=>
{
    const SQLSTATEMENT = `
     SELECT * FROM Task
     WHERE task_id = ?;`

    const VALUES = [data.task_id];

   
    pool.query(SQLSTATEMENT, VALUES, callback)
       
    }
    
//check if user id is correct
module.exports.checkUserId= (data, callback)=>
{
    const SQLSTATEMENT = `
     SELECT * FROM User
     WHERE user_id = ?;`

    const VALUES = [data.user_id];

   
    pool.query(SQLSTATEMENT, VALUES, callback)
       
    }

    //view taskprogress by Id
module.exports.selectTaskprogressByid = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM TaskProgress
    WHERE progress_id =?
    `;
const VALUES = [ data.progress_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectTaskprogressByid = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM TaskProgress
    WHERE user_id =?
    `;
const VALUES = [ data.progress_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

        //update taskprogress by Id
module.exports.updateTaskprogressById= (data, callback)=>{
    const SQLSTATMENT = `
    UPDATE TaskProgress 
    SET  notes =?
    WHERE task_id =?;
   
    `;
    const VALUES = [ data.notes, data.progress_id];

pool.query(SQLSTATMENT, VALUES, callback);
}


//delete Taskprogress by id
module.exports.deleteTaskprogressById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM TaskProgress 
    WHERE  progress_id = ?;

    ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
    `;
const VALUES = [data.progress_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.readtaskprogressbyuser = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM TaskProgress 
    WHERE  user_id = ?;

    
    `;
const VALUES = [data.user_id];

pool.query(SQLSTATMENT, VALUES, callback);
}
