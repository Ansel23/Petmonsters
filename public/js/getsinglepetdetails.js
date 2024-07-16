document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const petsId = urlParams.get("pets_id");
  
    const callbackForpetsInfo = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  //put html code from this file to html file
      const petsInfo = document.getElementById("petsInfo");
  //error handling
      if (responseStatus == 404) {
        petsInfo.innerHTML = `${responseData.message}`;
        return;
      }
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
      petsInfo.innerHTML = `
          <div class="card">
          <center>
          <img src="${imagePaths[petsId-1]}" class="card-img-top" alt="${responseData.pet_name} Image" style="width: 350px; height: 300px">
          </center>
              <div class="card-body">
                  <p class="card-text">
                  Pet ID: ${responseData.pet_id} <br>
                       Name: ${responseData.pet_name} <br>
                       Owner_id: ${responseData.owner_id} <br>
                       Type: ${responseData.type}<br>
                       Breed: ${responseData.breed}<br>
                       Age:${responseData.age}<br>
                       Skill:${responseData.skills}<br>
                    
                  </p>
              </div>
          </div>
      `;
    };
  //run the endpoint
    fetchMethod(currentUrl + `/api/pets/${petsId}`, callbackForpetsInfo);
  });