const pool = require('../services/db');



//allow user to view all additional info about users and their pets
module.exports.getallgameuserinfo= ( callback) =>
{

const SQLSTATMENT = `

    SELECT *
    FROM Gameuserinfo
    

  `;

  

pool.query(SQLSTATMENT, callback);

 
}

module.exports.getgameuserinfo= ( data, callback) =>
{

const SQLSTATMENT = `

    SELECT * FROM Gameuserinfo
    WHERE owner_id = ?
    

  `;

  const VALUES=[data.owner_id]

pool.query(SQLSTATMENT,VALUES,callback);


}