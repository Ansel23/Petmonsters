document.addEventListener("DOMContentLoaded", function () {
  //get token from localstorage
  const token = localStorage.getItem("token") !== null;
    const callback = (responseStatus, responseData) => {
      
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
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
//add code into html page
      const petsList = document.getElementById("petsList");
      responseData.forEach((pets, index) => {
        const displayItem = document.createElement("div");
        displayItem.className =
          "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
          <div class="card">
          <img src="${imagePaths[index]}" class="card-img-top" alt="${pets.pet_name} Image" style="width: 120px; height: 100px">
              <div class="card-body">
                  <h5 class="card-title"> ${pets.pet_id}. ${pets.pet_name}</h5>
                  <p class="card-text">
                      Type: ${pets.type}
                  </p>
                  <a href="petsdetails.html?pets_id=${pets.pet_id}" class="btn btn-primary">View Details</a> 
                  <br>
                  <br>
                  ${token ?  `<a href="claimownership.html?pets_id=${pets.pet_id}" class="btn btn-primary">Claim ownership</a>`: ''} 
              </div>
          </div>
          `;
        petsList.appendChild(displayItem);
      });
    };
  //run the endpoint
    fetchMethod(currentUrl + "/api/pets", callback);
  });