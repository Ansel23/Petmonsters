const model = require("../models/gameuserModel.js");

//allows user to view all created accounts 
module.exports.readAllgameusers = (req, res, next) =>
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
 
//allows user to create an account
module.exports.createNewgameuser = (req, res, next) =>
{
    if(req.body.username == undefined|| req.body.email==undefined)
    {
        res.status(400).json({error:"username or email is missing"});
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewgameuser:", error);
            res.status(500).json(error);
        } else {
            next();
        }
    }
    
    
    model.insertgameuserSingle(data, callback);

    }

//transfer newly created account to Gameuserinfo table
    module.exports.transfergameuserinfo = (req, res, next) =>
    {
       
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error transfergameuserinfo:", error);
                res.status(500).json(error);
            } else {
                res.status(201).json(results);
            }
        }
        
        
        model.insertgameuserinfoSingle(callback);
    
        }
    

    
//allows user to update account by user_id
module.exports.updategameuserById = (req, res, next) =>
{
    if(req.body.title == undefined || req.body.description == undefined || req.body.points==undefined )
    {
        res.status(400).json({
             error: " title, description or points is undefined"
        });
        return;
    }

    const data = {
        gameuser_id: req.params.gameuser_id,
        username: req.body.username,
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updategameuserById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({message:"gameuser_id cannot be found"
                    
                });
            }
            else res.status(200).send("updated gameuser successfulyy")
        }
    }

    model.updategameuserById(data, callback);
}


//delete account from Gameuser table
module.exports.deletegameuserByid = (req, res, next) =>
{
    const data = {
        gameuser_id: req.params.gameuser_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletegameuserById:", error);
            res.status(500).json(error);
        } else {

            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "gameuser_id not found"
                });
            }
            else next();          
        }
    }

    model.deletegameuserById(data, callback);
}

//check if email is already in use when creating account
module.exports.checkingemail=(req, res, next)=>{

    const data =
    {
        email: req.body.email,
        username: req.body.username
    }

    const callback = (error, results)=>{




        if(error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error);
        }
                else{
                     if(results.length > 0){
        
         res.status(409).json({ error:'email or username already exists'})
        
                }

                else{
                    next();
                }
            }
            }



            model.checkEmail(data, callback)

}



//delete account from Gameuserinfo table
module.exports.deletegameuserinfoByid = (req, res, next) =>
{
    const data = {
        owner_id: req.params.gameuser_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletegameuserById:", error);
            res.status(500).json(error);
        } else {

            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "owner_id not found"
                });
            }
            else {res.status(204).send()}           
        }
    }

    model.deletegameuserinfoById(data, callback);
}

module.exports.readgameuserbyid= (req, res, next) =>
{
    const data = {
        owner_id: req.params.gameuser_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletegameuserById:", error);
            res.status(500).json(error);
        } else {

            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "owner_id not found"
                });
            }
            else {res.status(204).send()}           
        }
    }

    model.readgameuserId(data, callback);
}
