const model = require("../models/userModel.js");

//creates a new user
module.exports.createNewUser = (req, res, next) =>
{
    if(req.body.username == undefined)
    {
        res.status(400).send("Error: username is undefined");
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }
    
    model.insertSingle(data, callback);
   
    



    }

    //check if email is already in use
    module.exports.checkingemail=(req, res, next)=>{

        const data =
        {
            email: req.body.email
        }

        const callback = (error, results)=>{


    

            if(error) {
                console.error("Error createNewUser:", error);
                res.status(500).json(error);
            }
                    else{
                         if(results.length > 0){
            
             res.status(409).json({ error:'email already exists'})
            
                    }

                    else{
                        next();
                    }
                }
                }



                model.checkEmail(data, callback)

    }

//view all users in the User table
module.exports.readAllUser = (req, res, next) =>
{

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback); 
}
 
//view a specific user by its Id
module.exports.readUserByid = (req, res, next) =>
{
const data ={
user_id: req.params.id
}
    const callback = (error, results, fields) => {
      
        if (error) {
            console.error("Error readuserById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({message:"User_id not found"
                    
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectByid(data, callback); 
}

//update information of a user in the User table
module.exports.updateuserById = (req, res, next) =>
{
    if(req.body.username == undefined || req.body.email == undefined )
    {
        res.status(400).json({
            message: "Error: username, email or password is undefined"
        });
        return;
    }

    const data = {
        id: req.params.id,
        username: req.body.username,
        email: req.body.email,
       
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateuserById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({message:"user_id cannot be found"
                    
                });
            }
            else res.status(200).send("updated user successfulyy")
        }
    }

    model.updateById(data, callback);
}

//check if username or email is already in use
module.exports.checkingupdate = (req, res, next)=>
{
    const data =
    {
        id: req.params.id,
        username: req.body.username,
        email: req.body.email
       
    }

    const callback = (error, results)=>{




        if(error) {
            console.error("Error UpdateUser:", error);
            res.status(500).json(error);
        }
                else{
                     if(results.length > 0){
        
         res.status(409).json({error: 'username or email already associated with another user'})
        
                }

                else{
                    next();
                }
            }
            }



            model.checkupdate(data, callback)
}

//delete user by id from User table
module.exports.deleteusersByid = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteuserById:", error);
            res.status(500).json(error);
        } else {

            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "user_id not found"
                });
            }
            else {res.status(204).send()}           
        }
    }

    model.deleteById(data, callback);
}


module.exports.checkUsernameOrEmailExist = (req, res, next)=> {
    const data={
        username:req.body.username,
        email:req.body.email,
        
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error register:", error);
            res.status(500).json(error);
        }
     
        if(results.length> 0) 
        {
            res.status(409).json({
                message: "Username or email already exists"
            });
           
        }
        else {
           next();
             }          
        }
    model.checkusernameoremail(data, callback);
}

module.exports.register = (req, res, next)=>{
    const data={
        username:req.body.username,
        email:req.body.email,
        password:res.locals.hash
    }
if(req.body.username== undefined||req.body.email == undefined||req.body.password==undefined){

    res.status(400).json({
        message: "username, email and password is all required"
    });
}
const callback = (error, results, fields) => {
    if (error) {
        console.error("Error register:", error);
        res.status(500).json(error);
    }
    else{
    
    res.locals.message =`User ${req.body.username} created successfully.`
    res.locals.userId = results.insertId
    next();
    }
}
model.registermodel(data, callback);
}


module.exports.login = (req, res, next)=> {
    
    const data={
        username:req.body.username,
        password:req.body.password
    }

    if(req.body.username== undefined||req.body.password==undefined){

        res.status(400).json({
            message: "username and password is all required"
        });
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error login:", error);
            res.status(500).json(error);
        }
    
        if(results.length == 0) 
        {
            res.status(404).json({
                message: "User not found"
            });
             }   
           
        
        else {
            
            res.locals.hash = results[0].password
            res.locals.username = results[0].username
            res.locals.userId= results[0]['user_id']
              res.locals.message = `Login successful for userId: ${results[0]['user_id']}`;
             next();    
        }
   
}
model.loginmodel(data, callback);
}


module.exports.transfergameuserinfo = (req, res, next) =>
{
const data={
    createdUserId:res.locals.userId
}

    
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error transfergameuserinfo:", error);
            res.status(500).json(error);
        } else {
            next();
        }
    }
    
    
    model.insertgameuserinfoSingle(data, callback);

    }
