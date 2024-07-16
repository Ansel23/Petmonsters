const pool = require('../services/db');


//Allow user to see all pets and their info from the Pets table
module.exports.selectAll =(callback)=>
{

    const SQLSTATMENT = `
    SELECT * FROM Pets;
    `;

pool.query(SQLSTATMENT, callback);
}

//Allows user to view pets by pet_id
module.exports.selectBypetid = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Pets
    WHERE pet_id =?
    `;
const VALUES = [ data.pet_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

//Allows user to view pets owned by a specific owner_id
module.exports.selectByid = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Pets WHERE owner_id =?
    `;
const VALUES = [ data.owner_id];

pool.query(SQLSTATMENT, VALUES, callback);
}
            
//Allows user to claim ownership of a pet from the Pets table
module.exports.updatepet= (data, callback)=>{
    const SQLSTATMENT = `
    UPDATE Pets 
    SET owner_id = ?
    WHERE pet_id =?;
   
    `;
    const VALUES = [data.owner_id, data.pet_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

//Allows users to add a pet they may have in real life to the Pets table 
module.exports.insertpetSingle= (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Pets (pet_name, type, breed, age, skills)
    VALUES (?, ?, ?, ?, ?);
    `;
const VALUES = [data.pet_name, data.type, data.breed, data.age, data.skills];

pool.query(SQLSTATMENT, VALUES, callback);


}

//Allows owner of a pet to feed their owned pet and update the time their pet was fed
module.exports.feedPet= (data, callback)=>{
    const SQLSTATMENT = `
    UPDATE Pets 
    SET feed_time = current_timestamp
    WHERE owner_id =?;
   
    `;
    const VALUES = [data.owner_id];

pool.query(SQLSTATMENT, VALUES, callback);

}


//allows owner of pet to groom their pet and update the time their pet was groomed
module.exports.groomPet= (data, callback)=>{
    const SQLSTATMENT = `
    UPDATE Pets 
    SET groom_time = current_timestamp
    WHERE owner_id =? ;
   
    `;
    const VALUES = [data.owner_id];

pool.query(SQLSTATMENT, VALUES, callback);

}

//checks if owner and pet to be grommed or fed is correct
module.exports.checkownership= (data, callback)=>{



    const SQLSTATMENT = `
     SELECT* FROM Pets     
    WHERE owner_id =? AND pet_id=?;
   
    `;
    const VALUES = [data.owner_id, data.pet_id];





pool.query(SQLSTATMENT, VALUES, callback);
}

        //updates the Gameuserinfo table by adding pet_happiness pet_hunger and pet_thirst after feeding pet
module.exports.updatefeedpet= (data, callback)=>{
    const SQLSTATMENT = `
    UPDATE Gameuserinfo
   SET 
  pet_happiness = pet_happiness + 5,
  pet_hunger = pet_hunger + 10,
  pet_thirst = pet_thirst + 10
  WHERE owner_id=?;
  

   
    `;
    
    const VALUES = [data.owner_id];
pool.query(SQLSTATMENT, VALUES,callback);
}


//updates the Gameuserinfo table by adding pet_happiness and pet_comfort
module.exports.updategroompet= (data, callback)=>{
    const SQLSTATMENT = `
    UPDATE Gameuserinfo
   SET 
  pet_happiness = pet_happiness + 10,
  pet_comfort = pet_comfort + 10
   WHERE owner_id =?;
  

   
    `;
    const VALUES = [data.owner_id];
pool.query(SQLSTATMENT, VALUES,callback);
}




 //This updates the Gameuserinfo table after the change of ownership of a pet
module.exports.updategameuserinfownership= (data, callback)=>{
    const SQLSTATMENT = `
    UPDATE Gameuserinfo 
    SET pet_id = ?
    WHERE owner_id =? 
   
    `;
    const VALUES =  [data.pet_id, data.owner_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

//updatesownership for users that is claiming ownership of a new pet
module.exports.updategameuserinfomutiplepet= (data, callback)=>{
    const SQLSTATMENT = `
    INSERT INTO Gameuserinfo (owner_id, pet_id)
    VALUES(?,?);
    
    
   
    `;
    const VALUES =  [data.owner_id, data.pet_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

//verifies if user already have pet befoer claiming ownership of a new pet
module.exports.checknewpet= (data, callback)=>{
    const SQLSTATMENT = `
    SELECT*FROM Gameuserinfo
    WHERE pet_id=?;
    
   
    `;
    const VALUES =  [ data.pet_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.subtractpoints= (data, callback)=>{
    const SQLSTATMENT = `
    UPDATE Gameuserinfo
    SET 
   points = points - 50
   WHERE owner_id=? AND points > 0
    
    
   
    `;
    const VALUES =  [ data.owner_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.resetStats= (data, callback)=>{
    const SQLSTATMENT = `
    UPDATE Gameuserinfo
    SET pet_happiness =0,
    pet_hunger =0,
    pet_thirst=0,
    pet_comfort =0
   
   WHERE owner_id=? 
    
    
   
    `;
    const VALUES =  [ data.owner_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.verifyPoints= ( callback)=>{
    const SQLSTATMENT = `
   Select * FROM Gameuserinfo
   
   WHERE points>= 50 
    
    
   
    `;
    

pool.query(SQLSTATMENT,  callback);
}