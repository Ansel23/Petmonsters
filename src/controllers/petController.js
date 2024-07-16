const model = require("../models/petModel.js");

//Allow user to see all pets and their info from the Pets table
module.exports.readAllpets = (req, res, next) =>
{

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllpets:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback); 
}
//allows user to view pets by pet_id
module.exports.readpetBypetid = (req, res, next) =>
{
const data ={
pet_id: req.params.pet_id
}
    const callback = (error, results, fields) => {
      
        if (error) {
            console.error("Error readpetById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({message:"pet_id not found"
                    
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectBypetid(data, callback); 
}

 
//Allows user to view pets owned by a specific owner_id
module.exports.readpetByid = (req, res, next) =>
{
const data ={
owner_id: req.params.owner_id
}
    const callback = (error, results, fields) => {
      
        if (error) {
            console.error("Error readpetById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({message:"Please login and claim pet"
                    
                });
            }
            
            else res.status(200).json(results);
        }
    }

    model.selectByid(data, callback); 
}

//Allows user to claim ownership of a pet from the Pets table
module.exports.updatepetownership = (req, res, next) =>
{
    if(req.body.owner_id == undefined ){
        res.status(400).json({
            message: "Error: owner_id is undefined"
        });
        return;
    }

    const data = {
        pet_id: req.params.pet_id,
        owner_id: req.body.owner_id
       
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateownership:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({message:"pet_id cannot be found"
                    
                });
            }
            else next();
        }
    }

    model.updatepet(data, callback);
}




//Allows users to add a pet they may have in real life to the Pets table 
module.exports.createNewpet = (req, res, next) =>
{
    if(req.body.pet_name == undefined|| req.body.type==undefined|| req.body.breed==undefined || req.body.age==undefined || req.body.skills==undefined)
    {
        res.status(400).json({error:"pet_name, type, breed, age or skills is missing"});
        return;
    }

    const data = {
        pet_name: req.body.pet_name,
        type: req.body.type,
        breed: req.body.breed,
        age: req.body.age,
        skills: req.body.skills
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error Addnewpet:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }
    
    model.insertpetSingle(data, callback);

    }



    //Allows owner of a pet to feed their owned pet and update the time their pet was fed
module.exports.feedpet = (req, res, next) =>
{
const data ={
owner_id: req.params.owner_id,
pet_id: req.params.pet_id
}
    const callback = (error, results, fields) => {
      
        if (error) {
            console.error("Error feedpet:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({message:"owner_id not found"
                    
                });
            }
            else next();
        }
    }

    model.feedPet(data, callback); 
}


//allows owner of pet to groom their pet and update the time their pet was groomed
module.exports.groompet = (req, res, next) =>
{
const data ={
owner_id: req.params.owner_id,
pet_id: req.params.pet_id
}
    const callback = (error, results, fields) => {
      
        if (error) {
            console.error("Error groompet:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({message:"owner_id not found"
                    
                });
            }
            else {next()}
        }
    }

    model.groomPet(data, callback); 
}

  //checks if owner and pet to be grommed or fed is correct
module.exports.verifyownership = (req, res, next) =>{
    const data ={
        owner_id: req.params.owner_id,
        pet_id: req.params.pet_id
        }

        const callback = (error, results)=>{


    

            if(error) {
                console.error("Error feedpet or groompet:", error);
                res.status(500).json(error);
            }
                    else{
                         if(results.length == 0){
            
             res.status(409).json({ error:'pet does not belong to user'})
            
                    }

                    else{
                        next();
                    }
                }
                }




    model.checkownership(data, callback); 
}


//updates the Gameuserinfo table by adding pet_happiness pet_hunger and pet_thirst after feeding pet
module.exports.updatefeedpet = (req, res, next) =>
{
    const data ={
        owner_id: req.params.owner_id
        }
    

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateownership:", error);
            res.status(500).json(error);
        } else {
           
             res.status(200).send("updated ownership successfulyy")
        }
    }

    model.updatefeedpet(data, callback);
}


//updates the Gameuserinfo table by adding pet_happiness and pet_comfort
module.exports.updategroompet = (req, res, next) =>
{
    const data ={
        owner_id: req.params.owner_id
        }
    

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateownership:", error);
            res.status(500).json(error);
        } else {
           
             res.status(200).send("updated ownership successfulyy")
        }
    }

    model.updategroompet(data, callback);
}


//This updates the Gameuserinfo table after the change of ownership of a pet
module.exports.updategameuserinfownership = (req, res, next) =>
{
   
    const data = {
        pet_id: req.params.pet_id,
        owner_id: req.body.owner_id
       
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updategameuserinfoownership:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({message:"pet_id cannot be found"
                    
                });
            }
            else next();
        }
    }

    model.updategameuserinfownership(data, callback);
}

//updatesownership for users that is claiming ownership of a new pet
module.exports.updategameuserinfomutiplepet= (req, res, next) =>
{
   
    const data = {
        pet_id: req.params.pet_id,
        owner_id: req.body.owner_id
       
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updategameuserinfoownership:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({message:"owner_id does not exist"
                    
                });
            }
            else res.status(200).send("updated ownership successfuly")
        }
    }

    model.updategameuserinfomutiplepet(data, callback);
}

//verifies if user already have pet befoer claiming ownership of a new pet
module.exports.verifyaddnewpet= (req, res, next) =>
{
   
    const data = {
        pet_id: req.params.pet_id,
        owner_id: req.body.owner_id
       
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updategameuserinfoownership:", error);
            res.status(500).json(error);
        } else {
            if(results.length> 0) 
            {
                res.status(404).json({message:"pet is already owned or user_id does not exist"
                    
                });
            }
            else next();
        }
    }

    model.checknewpet(data, callback);
}

module.exports.subtractpointsforownership = (req, res, next) =>
{
   
    const data = {
        owner_id: req.body.owner_id
       
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updategameuserinfoownership:", error);
            res.status(500).json(error);
        } else {
            if(results.length> 0) 
            {
                res.status(404).json({message:"not enough points to claim pet"
                    
                });
            }
            else next()
        }
    }

    model.subtractpoints(data, callback);
}

module.exports.resetpetstatsafterownership= (req, res, next) =>
{
   
    const data = {
        owner_id: req.body.owner_id
       
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updategameuserinfoownership:", error);
            res.status(500).json(error);
        } else {
            if(results.length> 0) 
            {
                res.status(404).json({message:"not enough points to claim pet"
                    
                });
            }
            else res.status(200).send("updated ownership successfuly")
        }
    }

    model.resetStats(data, callback);
}

module.exports.verifypoints= (req, res, next) =>
{
   
   

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updategameuserinfoownership:", error);
            res.status(500).json(error);
        } else {
            if(results.length=== 0) 
            {
                res.status(404).json({message:"not enough points to claim pet"
                    
                });
            }
            else next()
        }
    }

    model.verifyPoints(callback);
}