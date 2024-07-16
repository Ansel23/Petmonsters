document.addEventListener("DOMContentLoaded", function () {
    const addquestForm = document.getElementById("addquestForm");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
//getdata from the form and input into endpoint
    addquestForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const points = document.getElementById("points").value;

        console.log("Quest added successfully");
        console.log("Title:", title);
        console.log("Description:", description);
        console.log("Points:", points);
        warningCard.classList.add("d-none");

        const data = {
            title: title,
            description: description,
            points: points,
        };

        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);

            if (responseStatus === 201) {
                //bring user back to task page when successfull
                window.location.href = "task.html";
            } else {
                warningCard.classList.remove("d-none");
                warningText.innerText = responseData.message;
            }
        };

        // Perform the request
        fetchMethod(currentUrl + "/api/tasks", callback, "POST", data);

        // Reset the form fields
        addquestForm.reset();
    });
});
