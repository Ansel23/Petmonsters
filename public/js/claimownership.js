document.addEventListener("DOMContentLoaded", function () {
    


        // Get the pet_id from the URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const petId = urlParams.get('pets_id');
//get the userId from local storage after registering or logging in
        const userId = localStorage.getItem("userId") 
        //data to put into the endpoint
        const data = {
            pet_id: petId,
            owner_id:userId
            
        };


        const callback = (responseStatus, responseData) => {
            console.log("Response Status:", responseStatus);
            console.log("Response Data:", responseData);

            if (responseStatus === 200) {
              //redirect user to home page after updating ownership
                console.log("Ownership updated successfully");
                window.location.href = "index.html";
            } else {
                
                console.error("Failed to update ownership");
               
            }
        };

        // Make the PUT request
        fetchMethod(currentUrl + `/api/pets/${petId}`, callback, "PUT", data);

    });
;