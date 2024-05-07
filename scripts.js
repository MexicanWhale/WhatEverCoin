function openWindow(windowType) {
    var modal = document.getElementById("modal");
    var titleText = modal.querySelector('.title-bar-text');
    var submitTweetForm = document.getElementById("submitTweetForm");
    var browseTweetsSection = document.getElementById("browseTweetsSection");
    var donateSection = document.getElementById("donateSection");
    var HallofFameSection = document.getElementById("HallofFameSection");

    // Reset and hide the sections by default
    submitTweetForm.style.display = "none";
    browseTweetsSection.style.display = "none";
    donateSection.style.display = "none";
    HallofFameSection.style.display = "none";
    modal.style.display = "block";

    function toggleScanlines() {
        var body = document.body;
        body.classList.toggle('scanlines');
    }
    
    switch(windowType) {
        case 'Submit Tweet':
            titleText.textContent = 'Submit Tweet';
            submitTweetForm.style.display = "block";
            break;
        case 'Browse Tweets':
            titleText.textContent = 'Browse Tweets';
            browseTweetsSection.style.display = "block";
            populateTweets();  // Ensure this is called to populate tweets
            break;
        case 'Donate':
            titleText.textContent = 'Donate';
            donateSection.style.display = "block";
            break;
        case 'Hall of Fame':
            titleText.textContent = 'Hall of Fame';
            HallofFameSection.style.display = "block";
            break;
        default:
            titleText.textContent = 'Window';
    }
}

function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}

function toggleStartMenu() {
    var startMenu = document.getElementById("start-menu");
    startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
}

// Bind event listener to the form for the submit action
document.getElementById('tweetForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission action

    var tweetText = document.getElementById('tweetText').value.trim();
    var tweetImage = document.getElementById('tweetImage').files[0];

    if (!tweetText || !tweetImage || tweetImage.size > 1000000) {
        if (!tweetText) alert('Please enter some text for the tweet.');
        if (!tweetImage) alert('Please select an image for the tweet.');
        if (tweetImage && tweetImage.size > 1000000) alert('Image size should not exceed 1MB.');
        return;
    }

    console.log('Form submitted!');
    clearFormAndCelebrate(); // Clear the form and show fireworks upon successful submission
    closeModal(); // Close the modal only after successful submission and celebration
});

document.getElementById('tweetImage').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var imagePreview = document.getElementById('imagePreview');
    imagePreview.innerHTML = ''; // Clear previous previews

    if (file && file.size <= 1000000) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '200px'; // Set a max width for the preview
            img.style.maxHeight = '200px'; // Set a max height for the preview
            imagePreview.appendChild(img);
        };
        reader.readAsDataURL(file);
    } else {
        alert('File must be an image and less than 1MB.');
        event.target.value = ''; // Reset the file input
    }
});

function clearFormAndCelebrate() {
    document.getElementById('tweetText').value = '';
    document.getElementById('tweetImage').value = '';
    document.getElementById('imagePreview').innerHTML = '';
    showFireworks();
}

function showFireworks() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.setAttribute('id', 'fireworks');
    document.body.appendChild(fireworksContainer);

    for (let i = 0; i < 150; i++) {
        let explosion = document.createElement('div');
        explosion.className = 'particle';
        fireworksContainer.appendChild(explosion);
        explosion.style.left = `${Math.random() * 100}%`;
        explosion.style.top = `${Math.random() * 100}%`;
        explosion.style.animationDuration = `${Math.random() * 2 + 3}s`; // Particles will vary from 3 to 5 seconds
        explosion.style.animationDelay = `${Math.random() * 0.3}s`;
    }

    setTimeout(() => {
        document.body.removeChild(fireworksContainer);
    }, 5000); // Remove fireworks after 5 seconds
}

// Populate tweets for browsing
function populateTweets() {
    var tweetsContainer = document.getElementById('tweetsContainer');
    tweetsContainer.innerHTML = ''; // Clear any existing content

    // Dummy data for display, replace with dynamic data as needed
    var dummyTweets = [
        // ... Other tweet objects ...
        { 
            id: 1, 
            user: "User Mexican Whale",
            time: "1 minute ago",
            text: "🚀 $WEC is the future mate, this is real crypto, with no central party in charge, LFG!",
            image: "images/image1.png", 
            upvotes: 25, 
            downvotes: 3 
        },
        { 
            id: 2, 
            user: "User Anon",
            time: "10 minute ago",
            text: "To the moon an beyond",
            image: "images/image2.png", 
            upvotes: 3, 
            downvotes: 2 
        },
        { 
            id: 3, 
            user: "User Dom",
            time: "1 hour ago",
            text: "I like tutrtles",
            image: "images/image3.png", 
            upvotes: 13, 
            downvotes: 12 
        },
        { 
            id: 2, 
            user: "User Nakamoto",
            time: "2 Hours ago",
            text: "I need to go to bed now, but I love making these types of crazy projects",
            image: "images/image4.png", 
            upvotes: 3, 
            downvotes: 2 
        },
        // ... Other tweet objects ...
    ];

    // Populate the container
    dummyTweets.forEach(tweet => {
        var tweetElement = document.createElement('div');
        tweetElement.className = 'tweet';
        tweetElement.innerHTML = `
            <div class="tweet-header">
                <span class="tweet-user">${tweet.user}</span><br>
                <span class="tweet-time">${tweet.time}</span>
            </div>
            <img src="${tweet.image}" alt="Tweet Image" class="tweet-image">
            <p class="tweet-text">${tweet.text}</p>
            <div class="tweet-votes">
                <button class="vote-button upvote" onclick="vote(${tweet.id}, 'up')">👍</button>
                <span class="vote-count">${tweet.upvotes}</span>
                <button class="vote-button downvote" onclick="vote(${tweet.id}, 'down')">👎</button>
                <span class="vote-count">${tweet.downvotes}</span>
            </div>
        `;
        tweetsContainer.appendChild(tweetElement);
    });
}


