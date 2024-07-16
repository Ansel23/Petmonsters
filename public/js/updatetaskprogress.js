document.addEventListener("DOMContentLoaded", function () {
    //get form
    const completequestForm = document.getElementById("completequestForm");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");

    completequestForm.addEventListener("submit", function (event) {
        event.preventDefault();
         // Extract task_id parameter from the URL
        url = new URL(document.URL);
    const urlParams = url.searchParams;
    const taskId = urlParams.get("task_id");
   //get userId from local storage
        const userId = localStorage.getItem("userId") 
  // Get values from form inputs
        const completion_date = document.getElementById("completion_date").value;
        const notes = document.getElementById("notes").value;
//console.log data for debugging
        console.log("Quest added successfully");
        console.log("user_id:", userId)
        console.log("task_id:", taskId);
        console.log("completion_date:", completion_date);
        console.log("notes:", notes);
        // Hide the warning card initially
        warningCard.classList.add("d-none");
//declare the data with form data
        const data = {
            owner_id:userId,
            task_id:taskId,
            completion_date: completion_date,
            notes: notes,
        };

        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
            if (responseStatus === 204) {
               //redirect user to task.html page after successfull update
                window.location.href = "task.html";
            } else {
                warningCard.classList.remove("d-none");
                warningText.innerText = responseData.message;
            }
        };

       //perform the delete request
        fetchMethod(currentUrl + "/api/tasks/"+taskId, callback, "DELETE", data);

        // Reset the form fields
        completequestForm.reset();
    });
});


  

