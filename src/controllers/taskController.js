const model = require("../models/taskModel.js");

//create a new task
module.exports.createNewTask = (req, res, next) =>
{
    if(req.body.title == undefined|| req.body.description==undefined|| req.body.points==undefined)
    {
        res.status(400).json({error:"title, description or points is undefined"});
        return;
    }

    const data = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTask:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }
    
    model.insertTaskSingle(data, callback);

    }

    //view all tasks
module.exports.readAlltasks = (req, res, next) =>
{

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAlltasks:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAlltasks(callback); 
}
 

//view task by id
module.exports.readTaskByid = (req, res, next) =>
{
const data ={
task_id: req.params.id
}
    const callback = (error, results, fields) => {
      
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({ message: "task_id not found"
                    
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectTaskByid(data, callback); 
}

//update a task by id
module.exports.updateTaskById = (req, res, next) =>
{
    if(req.body.title == undefined || req.body.description == undefined || req.body.points==undefined )
    {
        res.status(400).json({
             error: " title, description or points is undefined"
        });
        return;
    }

    const data = {
        id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
       
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({message:"Task_id cannot be found"
                    
                });
            }
            else res.status(200).send("updated task successfulyy")
        }
    }

    model.updateTaskById(data, callback);
}

//delete a task by id
module.exports.deleteTaskByid = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTaskById:", error);
            res.status(500).json(error);
        } else {

            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Task_id not found"
                });
            }
            else {res.status(204).send()}           
        }
    }

    model.deleteTaskById(data, callback);
}

module.exports.addpointsaftertask= (req, res, next) =>
{
    const data ={
        task_id: req.params.id,
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

    model.updatepointsaftertask(data, callback);
}

module.exports.updatetaskprogress = (req, res, next) =>
{
    const data ={
        task_id: req.body.task_id,
        owner_id: req.body.owner_id,
        completion_date:req.body.completion_date,
        notes:req.body.notes
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

    model.updatetaskprogress(data, callback);
}