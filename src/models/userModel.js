const pool = require('../services/db');

//creates a new user
module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO User (username, email)
    VALUES (?, ?);
    `;
const VALUES = [data.username, data.email];

pool.query(SQLSTATMENT, VALUES, callback);


}


//view all users in the User table
module.exports.selectAll =(callback)=>
{

    const SQLSTATMENT = `
    SELECT * FROM User;
    `;

pool.query(SQLSTATMENT, callback);
}

//view a specific user by its Id
module.exports.selectByid = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id =?
    `;
const VALUES = [ data.user_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

//check if email is already in use
module.exports.checkEmail = (data, callback)=>
{
    const SQLSTATEMENT = `
     SELECT * FROM User
     WHERE email = ?;`

    const VALUES = [data.email];

   
    pool.query(SQLSTATEMENT, VALUES, callback)
       
    }
            
    
//update information of a user in the User table
module.exports.updateById= (data, callback)=>{
    const SQLSTATMENT = `
    UPDATE User 
    SET username = ?, email = ?
    WHERE user_id =?;
   
    `;
    const VALUES = [data.username, data.email, data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}

//check if username or email is already in use
module.exports.checkupdate =(data, callback)=>
{
const SQLSTATEMENT= `
SELECT * FROM User
     WHERE user_id = ? AND (username =? OR email =?);

`



    const VALUES = [ data.id, data.username, data.email];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

//delete user by id from User table
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM User 
    WHERE user_id = ?;

    ALTER TABLE User AUTO_INCREMENT = 1;
    `;
const VALUES = [data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.checkusernameoremail = (data, callback)=>{

    const SQLSTATMENT =`
    SELECT * FROM User
    WHERE Username =? OR Email =?
    `;
    const VALUES = [data.username, data.email];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.registermodel = (data, callback)=>{
    const SQLSTATMENT =`
    INSERT INTO User (username, email, password)
    VALUES (?, ?, ?);
    `
    const VALUES = [data.username, data.email, data.password];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.loginmodel = (data, callback)=>{
    const SQLSTATMENT =`
    SELECT * FROM User
    WHERE Username =? 
    
    `
    const VALUES = [data.username];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.insertgameuserinfoSingle= (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Gameuserinfo (owner_id)
    VALUES (?)
     
    `;
    const VALUES = [data.createdUserId];

pool.query(SQLSTATMENT,VALUES, callback);
}
