const pool = require('../services/db');


//allow user to view all quests
module.exports.selectAll =(callback)=>
{

    const SQLSTATMENT = `
    SELECT * FROM Quest;
    `;

pool.query(SQLSTATMENT, callback);
}


//allow user to view all quest by quest_id
module.exports.selectquestByid = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Quest
    WHERE quest_id =?
    `;
const VALUES = [ data.quest_id];

pool.query(SQLSTATMENT, VALUES, callback);
}


//allow user to delete a quest upon completion
module.exports.deletecompletedquestrById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Quest 
    WHERE quest_id = ?;

    ALTER TABLE Quest AUTO_INCREMENT = 1;
    `;
const VALUES = [data.quest_id];

pool.query(SQLSTATMENT, VALUES, callback);
}



//updates the point system upon deleting a quest in the Gameuserinfo table
module.exports.updatepoints= (data, callback)=>{
    const SQLSTATMENT = `
    UPDATE Gameuserinfo
   SET 
  points = points +(SELECT SUM(main_quest_points + sub_quest_points)  FROM Quest WHERE quest_id=? )
   WHERE owner_id =?;
  

   
    `;
    const VALUES = [data.quest_id, data.owner_id];
pool.query(SQLSTATMENT, VALUES,callback);
}


