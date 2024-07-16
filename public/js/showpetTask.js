
document.addEventListener("DOMContentLoaded", function () {
    //get token from localstorage
    const token = localStorage.getItem("token") !== null;
    
    // Log the token status to the console for debugging
    console.log(token);

   
    const callback = (responseStatus, responseData) => {
        
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

      
        const questsList = document.getElementById("questsList");

        // Create a new display item for each quest
        responseData.forEach((quests) => {
           
            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
            displayItem.innerHTML = `
                <div class="card" style="height: 300px; width:250px">
                    <p class="card-text">
                        <Main>${quests.quest_id}. Main quest:</h5><br> ${quests.main_quest}<br>
                        Sub quest:  ${quests.sub_quest}<br>
                        Points: <br>Main quest: (${quests.main_quest_points})<br> Sub quest: (${quests.sub_quest_points})<br>
                    </p>
                    ${token ? `<a href="#" onclick="completequest(${quests.quest_id})" class="btn btn-primary">Complete task</a>` : ''}
                </div>
            `;
            
            // Append the display item to the questsList container
            questsList.appendChild(displayItem);
        });
    };

    //run the endpoint
    fetchMethod(currentUrl + "/api/quests", callback);
});


const callbackforquest = (responseStatus, responseData) => {
    g
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
};

// Function to handle completing a quest
function completequest(questId) {
    // Get the user ID from local storage
    const userId = localStorage.getItem("userId");
    
    // Create data object with quest and user ID information
    const data = {
        quest_id: questId,
        owner_id: userId,
    };

    // Prevent the default event behavior
    event.preventDefault();

    // Send a DELETE request 
    fetchMethod(currentUrl + "/api/quests/" + questId, callbackforquest, "DELETE", data);

    // Redirect to the "quests.html" page after completing the quest
    window.location.href = "quests.html";
}
