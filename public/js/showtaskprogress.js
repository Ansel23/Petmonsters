document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const  userId = localStorage.getItem("userId");
    console.log(token)

    // Continue with your logic for fetching data or rendering the HTML page based on the user ID
    const callbackFortaskprogress = (responseStatus, responseData) => {
        console.log("Response Status:", responseStatus);
        console.log("Response Data:", responseData);

        const taskprogresslist = document.getElementById("showtaskprogress");

        // Clear previous content in case of multiple fetch calls
        taskprogresslist.innerHTML = "";

        responseData.forEach((taskprogress) => {
            // Check for a specific field or value in the response indicating the user's login status
            if (token) {
                const displayItem = document.createElement("div");
                displayItem.className = "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
                displayItem.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <p class="card-text">
                                User_id: ${taskprogress.user_id} <br>
                                Task_id: ${taskprogress.task_id} <br>
                                Completion_date: ${taskprogress.completion_date} <br>
                                 Notes: ${taskprogress.notes} <br>
                            </p>
                        </div>
                    </div>
                `;
                taskprogresslist.appendChild(displayItem);
            } else {
                // Handle errors or unauthorized access
                console.error("Please log in", responseStatus, responseData);
                // Update the UI or redirect to login page based on your application logic
                taskprogresslist.innerHTML = `<h2>Please log in</h2>`;
            }
        });
    };

    fetchMethod(currentUrl + `/api/task_progress/${userId}/history`, callbackFortaskprogress);
});
