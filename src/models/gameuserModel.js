const pool = require('../services/db');


//allows user to view all created accounts //
module.exports.selectAll =(callback)=>
{

    const SQLSTATMENT = `
    SELECT * FROM Gameuser;
    `;

pool.query(SQLSTATMENT, callback);
}

//allows user to create an account
module.exports.insertgameuserSingle= (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Gameuser (username, email)
    VALUES (?, ?);
    SET @created_user_id := LAST_INSERT_ID();
    `;
const VALUES = [data.username, data.email];

pool.query(SQLSTATMENT, VALUES, callback);

//store created id into a variable: @created_user_id
}

//transfer newly created account to Gameuserinfo table
module.exports.insertgameuserinfoSingle= ( callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Gameuserinfo (owner_id)
    VALUES (@created_user_id )
     
    `;


pool.query(SQLSTATMENT, callback);
}


 //allows user to update account by user_id
module.exports.updategameuserById= (data, callback)=>{
    const SQLSTATMENT = `
    UPDATE Gameuser 
    SET username = ?, email = ?
    WHERE user_id =?;
   
    `;
    const VALUES = [data.username, data.email, data.gameuser_id];

pool.query(SQLSTATMENT, VALUES, callback);
}


//delete account from Gameuser table
module.exports.deletegameuserById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Gameuser 
    WHERE user_id = ?;

    ALTER TABLE Gameuser AUTO_INCREMENT = 1;
    `;
const VALUES = [data.gameuser_id];

pool.query(SQLSTATMENT, VALUES, callback);
}


//check if email is already in use when creating account
module.exports.checkEmail = (data, callback)=>
{
    const SQLSTATEMENT = `
     SELECT * FROM Gameuser
     WHERE email = ? OR username =? ;
     `

    const VALUES = [data.email, data.username];

   
    pool.query(SQLSTATEMENT, VALUES, callback)
       
    }

    
//delete account from Gameuserinfo table
module.exports.deletegameuserinfoById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Gameuserinfo 
    WHERE owner_id = ?;

    ALTER TABLE Gameuserinfo AUTO_INCREMENT = 1;
    `;
const VALUES = [data.owner_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.readgameuserId= (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT FROM Gameuserinfo 
    WHERE owner_id = ?;
    `;
const VALUES = [data.owner_id];

pool.query(SQLSTATMENT, VALUES, callback);
}