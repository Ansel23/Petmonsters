document.addEventListener("DOMContentLoaded", function () {
    //get token and userId from localstorage
    const token = localStorage.getItem("token");
    console.log(token)
    const userId = localStorage.getItem("userId")

    
    const callbackForgameInfo = (responseStatus, responseData) => {
        console.log("Response Status:", responseStatus);
        console.log("Response Data:", responseData);

        const gameInfo = document.getElementById("gameInfo");

        // Clear previous content in case of multiple fetch calls
        gameInfo.innerHTML = "";

        responseData.forEach((gameinfo) => {
           //verify that user is logged in
            if (token) {
                const displayItem = document.createElement("div");
                displayItem.className = "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
                displayItem.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <p class="card-text">
                                Owner_id: ${gameinfo.owner_id} <br>
                                Pet_id: ${gameinfo.pet_id} <br>
                                Pet happiness: ${gameinfo.pet_happiness} <br>
                                Pet hunger: ${gameinfo.pet_hunger} <br>
                                Pet thirst: ${gameinfo.pet_thirst} <br>
                                Pet comfort: ${gameinfo.pet_comfort} <br>
                                Points: ${gameinfo.points} <br>
                            </p>
                        </div>
                    </div>
                `;
                gameInfo.appendChild(displayItem);
            } else {
                // Handle errors or unauthorized access
                console.error("Please log in", responseStatus, responseData);
                // Update the UI 
                gameInfo.innerHTML = `<h2>Please log in</h2>`;
            }
        }); 
    };

    // Make the fetch call using the user ID directly
    fetchMethod(currentUrl + "/api/gameuserinfo/"+userId, callbackForgameInfo,"GET");
});
