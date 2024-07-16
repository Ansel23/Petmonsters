const model = require("../models/gameuserinfoModel.js");


//allow user to view all additional info about users and their pets
module.exports.readAllgameusersinfo = (req, res, next) =>
{

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllgameUserinfo:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.getallgameuserinfo(callback); 
}
 

module.exports.readgameusersinfobyid = (req, res, next) =>
{

    const data={
        owner_id:req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllgameUserinfo:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.getgameuserinfo(data, callback); 
}
 