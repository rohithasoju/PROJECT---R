function performsearch()
{
    let query=document.getElementById("searchinput").value;
    let titleElement=document.getElementById("search-title");

    if(query.trim() === "") {
        document.getElementById("Result").innerText="Please enter a search term";
        titleElement.style.display="none";

    } else {
        document.getElementById("Result").innerText='Results for: "${query}" (feature coming soon)';
        titleElement.innerText='showing results for: "${query}"';
        titleElement.style.display="block";

    }
}

// function performsearch() {
    // Get the search query from the input field
  //  var searchQuery = document.getElementById('searchinput').value.toLowerCase();
    
    // Get the search result element
   // var resultElement = document.getElementById('result');
    
    // Check for specific fruit searches and change the result color accordingly
   // if (searchQuery === 'apple') {
    //    resultElement.innerHTML = 'RED';
     //   resultElement.style.color = 'red';
   // } else if (searchQuery === 'banana') {
    //    resultElement.innerHTML = 'YELLOW';
    //    resultElement.style.color = 'RED';
    //} else if (searchQuery === 'orange') {
      //  resultElement.innerHTML = 'ORANGE';
        //resultElement.style.color = 'orange';
   // } else {
        // Display a message if no match was found
     //   resultElement.innerHTML = 'No results found for "' + searchQuery + '"';
      //  resultElement.style.color = 'black'; // Default color for no results
    //}
//}
function openModal() {
    document.getElementById("authModal").style.display = "block";
}

function closeModal() {
    document.getElementById("authModal").style.display = "none";
}

function showSignup() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
}

function showLogin() {
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

function signup() {
    let user = document.getElementById("signupUser").value;
    let password = document.getElementById("signupPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Store user details in localStorage
    localStorage.setItem("userID", user);
    localStorage.setItem("password", password);
    alert("Signup successful! Please login.");
    showLogin();
}

function login() {
    let user = document.getElementById("loginUser").value;
    let password = document.getElementById("loginPassword").value;

    let savedUser = localStorage.getItem("userID");
    let savedPassword = localStorage.getItem("password");

    if (user === savedUser && password === savedPassword) {
        alert("Login successful!");
        closeModal();
        window.location.href = "search.html"; // Redirect to Read Reviews page
    } else {
        alert("Invalid credentials!");
    }
}
   // Check if user is logged in
   let loggedInUser = localStorage.getItem("userID");

   if (!loggedInUser) {
       // Redirect to home page if not logged in
       window.location.href = "index.html";
   } else {
       // Display the username
       document.getElementById("usernameDisplay").textContent = "Logged in as: " + loggedInUser;
   }

   function loadReviews(product) {
    let reviewList = document.getElementById("reviewsList");
    reviewList.innerHTML = ""; 

    let reviews = JSON.parse(localStorage.getItem("reviews")) || {};
    if (reviews[product]) {
        reviews[product].forEach(review => {
            let reviewItem = document.createElement("div");
            reviewItem.classList.add("review-item");
            reviewItem.innerHTML = `<strong>${review.user}:</strong> ${review.text}`;
            reviewList.appendChild(reviewItem);
        });
    }
}
   // Logout function
   function logout() {
       localStorage.removeItem("userID");
       localStorage.removeItem("password");
       alert("Logged out successfully!");
       window.location.href = "index.html";
   }

   function searchProduct() {
    let searchValue = document.getElementById("searchInput").value.trim();
    if (searchValue !== "") {
        document.getElementById("reviewBox").style.display = "block"; // Show review input box
    } else {
        alert("Please enter a product name to search.");
    }
}

function postReview() {
    let reviewText = document.getElementById("reviewText").value.trim();
    if (reviewText === "") {
        alert("Please write something before posting!");
        return;
    }

    let reviewList = document.getElementById("reviewsList");
    let newReview = document.createElement("div");
    newReview.classList.add("review-item");
    newReview.innerHTML = `<strong>${loggedInUser}:</strong> ${reviewText}`;
    reviewList.prepend(newReview); // Add review to top
    
    // Save to local storage
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push({ user: loggedInUser, text: reviewText });    
    reviews[currentProduct].push({ user: loggedInUser, text: reviewText });
    localStorage.setItem("reviews", JSON.stringify(reviews));


    document.getElementById("reviewText").value = ""; // Clear text area
    loadReviews(currentProduct);
}

// Load reviews from local storage
function loadReviews(product) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    let reviewList = document.getElementById("reviewsList");
    reviews.forEach(review => {
        let reviewItem = document.createElement("div");
        reviewItem.classList.add("review-item");
        reviewItem.innerHTML = `<strong>${review.user}:</strong> ${review.text}`;
        reviewList.appendChild(reviewItem);
    });
}

// loadReviews(); // Load existing reviews on page load
