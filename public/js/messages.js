document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token") !== null;
   const userId= localStorage.getItem("userId") 
    const showPostPrompt = () => {
        const userMessage = window.prompt("Type your message to post:");
        if (userMessage !== null) {
         // Send the user's message to the server
            const postData = {
                message_text: userMessage,
                user_id:userId,
               
            };
//run the endpoint
            fetchMethod(currentUrl + "/api/message", callback, "POST", postData);
        } else {
            // User clicked "Cancel" in the prompt
            console.log("User canceled the post.");
        }
    };

   
    const callback = (responseStatus, responseData) => {
        
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
//add to html file and display data
        const messagesList = document.getElementById("messagesList");
        responseData.forEach((messages) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
            displayItem.innerHTML = `
                </div>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Message: ${messages.message_text}</h5>
                        <p class="card-text">
                            User_id: ${messages.user_id}<br>
                            Time of post: ${messages.created_at}
                        </p>
                        ${(token && localStorage.getItem("userId") == messages.user_id) ? `<a href="messages.html" class="editbtn btn btn-primary">Edit</a>` : ''} 
                        <br>
                        <br>
                        ${(token && localStorage.getItem("userId") == messages.user_id) ? `<a href="messages.html" class="deletebtn btn btn-primary">Delete</a>` : ''} 
                    </div>
                </div>
            `;
            messagesList.appendChild(displayItem);
        
           
         // Check if the delete button element exists in the displayItem
    const deletebtn = displayItem.querySelector(".deletebtn");

    // Check if the edit button element exists in the displayItem
    const editbtn = displayItem.querySelector(".editbtn");

    // Add event listener for the delete button if it exists
    if (deletebtn) {
        deletebtn.addEventListener("click", function () {
            // Call the deleteMessage function when the delete button is clicked
            deleteMessage(messages.id);
        });
    }

    // Add event listener for the edit button if it exists
    if (editbtn) {
        editbtn.addEventListener("click", function () {
            // Call the showEditPrompt function when the edit button is clicked
            showEditPrompt(messages.id);
        });
    }
});
    }
 


    // Add event listener for the "Posts" button
    const postsButton = document.getElementById("postsButton");
    postsButton.addEventListener("click", function () {
        // Show a prompt for the user to enter a message
        if(token){
        showPostPrompt();
        }
        else alert("Please log in to post a message")
    });

    fetchMethod(currentUrl + "/api/message", callback);
});

//edit prompt
const showEditPrompt=(messageId) => {
    console.log("showEditPrompt called");
    const userMessage = window.prompt("Edit your message:");
    if (userMessage !== null) {
        const userId= localStorage.getItem("userId")
      
        //define data to put into the endpoint
        const updatedData = {
            user_id: userId,
            message_text: userMessage,
        };
//run the endpoint
        fetchMethod(currentUrl + `/api/message/${messageId}`, editCallback, "PUT", updatedData);
    } else {
        // User clicked "Cancel" in the prompt
        console.log("User canceled the edit.");
    }
};

const editCallback = (responseStatus, responseData) => {
    console.log("Edit responseStatus:", responseStatus);
    console.log("Edit responseData:", responseData);
}

const deleteMessage=(messageId) => {
    alert("Message has been deleted")

        fetchMethod(currentUrl + `/api/message/${messageId}`, deleteCallback, "DELETE");
    
        
        
    }


const deleteCallback = (responseStatus, responseData) => {
    console.log("Edit responseStatus:", responseStatus);
    console.log("Edit responseData:", responseData);
    
};