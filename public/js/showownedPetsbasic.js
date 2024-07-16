document.addEventListener("DOMContentLoaded", function () {
//get data from localstorage
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const callbackForOwnedPetsInfo = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const ownedPetsInfo = document.getElementById("ownedpetsInfo");

        if (responseStatus == 404) {
            ownedPetsInfo.innerHTML = `${ownpet.message}`;
            return;
        }
//verify if user is logged in
        if (token) {
            //images
            const imagePaths = [
                'images/golden retriever pic-fotor-bg-remover-20240124183033.png',
                'images/siamese cat pic-fotor-bg-remover-2024012418357.png',
                'images/africangreypic-fotor-bg-remover-20240124183745.png',
                'images/png-transparent-californian-rabbit-holland-lop-flemish-giant-rabbit-domestic-rabbit-dog-rabbit-mammal-animals-pet-thumbnail-fotor-bg-remover-20240124183432.png',
                'images/hamsterpic-fotor-bg-remover-20240124183110.png',
                'images/turtlepic-fotor-bg-remover-20240124183617.png',
                'images/fishpic-fotor-bg-remover-20240124183013.png',
                'images/guineapig-fotor-bg-remover-20240124183050.png',
                'images/horsepic-fotor-bg-remover-20240124183147.png',
                'images/kisspng-cockatiel-bird-budgerigar-cockatoo-pet-5ae1cd416c2411.670757471524747585443-fotor-bg-remover-2024012418329.png',
                'images/mixed-resting-brown-dachshund-puppy-png-clipart-fotor-bg-remover-2024012418331.png',
                'images/persian-cat-maine-coon-birman-kitten-pet-persian-fotor-bg-remover-20240124183351.png',
                'images/birdpic-fotor-bg-remover-20240124182845.png',
                'images/lastdogpic-fotor-bg-remover-20240124183238.png',
                'images/hollandloprabbitpic-fotor-bg-remover-20240124183126.png'
            ];
            //display data
            responseData.forEach((ownpet, index) => {
                const displayItem = document.createElement("div");
                displayItem.className =
                  "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
           displayItem.innerHTML = `
                <div class="card">
                    <center>
                        <img src="${imagePaths[ownpet.pet_id - 1]}" class="card-img-top" alt="${ownpet.pet_name} Image" style="width: 120px; height: 150px">
                    </center>
                    <div class="card-body">
                        <p class="card-text">
                            Pet ID: ${ownpet.pet_id} <br>
                            Name: ${ownpet.pet_name} <br>
                            Owner_id: ${ownpet.owner_id} <br>
                            Type: ${ownpet.type}<br>
                            Breed: ${ownpet.breed}<br>
                            Age:${ownpet.age}<br>
                            Skill:${ownpet.skills}<br>
                        </p>
                        <a href="#" class="btn btn-primary" onclick="feedPet(${ownpet.pet_id})">🦴Feed pet🍖</a>
                        <br>
                        <br>
                        <a href="#" class="btn btn-primary" onclick="groomPet(${ownpet.pet_id})">🪮Groom pet💈</a>
                    </div>
                </div>
            `;
            ownedPetsInfo.appendChild(displayItem);
      });
            
        } else {
            // Handle errors or unauthorized access
            console.error("Please log in", responseStatus, responseData);
            // Update the UI 
            ownedPetsInfo.innerHTML = `<h2>Please log in</h2>`;
        }
    };

//run the endpoint
    fetchMethod(currentUrl + `/api/pets/${userId}/owned`, callbackForOwnedPetsInfo, "GET");
});

// FEED PET CALLBACK
const callbackForFeedPet = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

}
//GROOM PET CALLBACK
    const callbackForGroomPet = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    
      
    }
// Function to handle the feed pet action
window.feedPet = function (petId) {
    const userId = localStorage.getItem("userId");
    fetchMethod(currentUrl + `/api/pets/${userId}/${petId}/feed`, callbackForFeedPet, "PUT");
    alert("Pet fed successfully!")
};

// Function to handle the groom pet action
window.groomPet = function (petId) {
    const userId = localStorage.getItem("userId");
   
    fetchMethod(currentUrl + `/api/pets/${userId}/${petId}/groom`, callbackForGroomPet, "PUT");
    alert("Pet groomed successfully!")
};
