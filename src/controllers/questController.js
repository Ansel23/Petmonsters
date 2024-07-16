const model = require("../models/questModel.js");


//allow user to view all quests
module.exports.readAllquests = (req, res, next) =>
{

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllquests:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback); 
}


//allow user to view all quest by quest_id
module.exports.readquestbyid = (req, res, next) =>
{
const data ={
quest_id: req.params.quest_id
}
    const callback = (error, results, fields) => {
      
        if (error) {
            console.error("Error readquestById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({message:"quest_id not found"
                    
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectquestByid(data, callback); 
}


//allow user to delete a quest upon completion
module.exports.deleteCompletedquestByid = (req, res, next) =>
{
    const data = {
        quest_id: req.params.quest_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteCompletedquestById:", error);
            res.status(500).json(error);
        } else {

            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "quest_id not found"
                });
            }
            else {res.status(204).send()}           
        }
    }

    model.deletecompletedquestrById(data, callback);
}


//updates the point system upon deleting a quest in the Gameuserinfo table
module.exports.updategameuserpoints = (req, res, next) =>
{
    const data ={
        quest_id: req.params.quest_id,
        owner_id: req.body.owner_id
        }
    
        if(req.body.owner_id == undefined)
        {
            res.status(400).json({error:"owner_id is required"});
            return;
        }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updategameuserpoints:", error);
            res.status(500).json(error);
        } else {
           
             next();
        }
    }

    model.updatepoints(data, callback);
}
