const model = require("../models/taskprogressModel.js");


//create a new task progress
module.exports.createNewTaskprogress = (req, res, next) =>
{
    if(req.body.completion_date == undefined)
    {
        res.status(400).json({error:"completion_date is missing"});
        return;
    }

    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTaskprogress:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }
    
    model.insertTaskprogress(data, callback);

    }

    //check if taskId is correct
    module.exports.checktaskId=(req, res, next)=>{

        const data =
        {
            task_id: req.body.task_id
        }

        const callback = (error, results)=>{


    

            if(error) {
                console.error("Error createNewtaskprogress:", error);
                res.status(500).json(error);
            }
                    else{
                         if(results.length == 0){
            
             res.status(404).json({ error:'task_id does not exists'})
            
                    }

                    else{
                        next();
                    }
                }
                }



                model.checkTaskId(data, callback)

    }

//check if user id is correct
    module.exports.checkuserId=(req, res, next)=>{

        const data =
        {
            user_id: req.body.user_id
        }

        const callback = (error, results)=>{


    

            if(error) {
                console.error("Error createNewtaskprogress:", error);
                res.status(500).json(error);
            }
                    else{
                         if(results.length == 0){
            
             res.status(404).json({ error:'user_id does not exist'})
            
                    }

                    else{
                        next();
                    }
                }
                }



                model.checkUserId(data, callback)

    }

 //view taskprogress by Id
    module.exports.readTaskprogressByid = (req, res, next) =>
    {
    const data ={
    progress_id: req.params.id
    }
        const callback = (error, results, fields) => {
          
            if (error) {
                console.error("Error readTaskprogressById:", error);
                res.status(500).json(error);
            } else {
                if(results.length == 0) 
                {
                    res.status(404).json({ message: "progress_id does not exist"
                        
                    });
                }
                else res.status(200).json(results[0]);
            }
        }
    
        model.selectTaskprogressByid(data, callback); 
    }

    
    //update taskprogress by Id
module.exports.updateTaskprogressById = (req, res, next) =>
{
    if(req.body.notes == undefined )
    {
        res.status(400).json({
             error: " notes is missing"
        });
        return;
    }

    const data = {
        progress_id: req.params.id,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskprogressById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({message:"progress_id cannot be found"
                    
                });
            }
            else res.status(200).send("updated task_progress successfulyy")
        }
    }

    model.updateTaskprogressById(data, callback);
}

//delete Taskprogress by id
module.exports.deleteTaskprogressByid = (req, res, next) =>
{
    const data = {
        progress_id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTaskprogressById:", error);
            res.status(500).json(error);
        } else {

            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "progress_id not found"
                });
            }
            else {res.status(204).send()}           
        }
    }

    model.deleteTaskprogressById(data, callback);
}

module.exports.readtaskprogressbyuser= (req, res, next) =>
{
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTaskprogressById:", error);
            res.status(500).json(error);
        } else {

            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "progress_id not found"
                });
            }
            else {res.status(200).json(results)}           
        }
    }

    model.readtaskprogressbyuser(data, callback);
}
