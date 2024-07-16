document.addEventListener("DOMContentLoaded", function () {
  //get token from localstorage
  const token = localStorage.getItem("token") !== null;
    const callback = (responseStatus, responseData) => {
      
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  

    
//add data into html page
      const taskList = document.getElementById("taskList");
      responseData.forEach((task) => {
        const displayItem = document.createElement("div");
        displayItem.className =
        "col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3"
        ;
        displayItem.innerHTML = `
          <div class="card "style="height: 350px; width:250px">
              <div class="card-body">
                  <h5 class="card-title"> ${task.task_id}. ${task.title}</h5>
                  <p class="card-text">
                      Description: ${task.description}
                      <br>
                      Points: ${task.points}
                  </p>
                 
                  ${token ?  `<a href="updatetaskprogress.html?task_id=${task.task_id}"   class="btn btn-primary">Complete quest</a>`: ''}
                  <br>
                  <br>
                  ${token ?  `<a href="addquest.html" class="btn btn-primary">Add quest</a>`: ''} 
   
              
          </div>
          </div>
          `;
          //display data
        taskList.appendChild(displayItem);
      });
    };
  //make the request
    fetchMethod(currentUrl + "/api/tasks", callback);
  });
