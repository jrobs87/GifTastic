// [========== GIPHY API KEY > teJ9nr36fk7rqyaRZv2EZcC32RyTeSRc ==========]

$(document).ready(function () { // BEGIN DOCUMENT READY BLOCK

    // topics array for buttons and animal search variable (grabs previous search/API call 
    // 'more' button grabs this to continue loading more of the same gifs from the last search
    var topics = ['Dog', 'Cat', 'Hamster', 'Lion', 'Bird', 'Fish', 'Giraffe', 'Penguin', 'Elephant', 'Kangaroo'];
    var searchAnimal = 'Dog';

    // < =============== BEGIN RENDERING NAV ITEM FROM TOPIC ARRAY =============== >
    // looping through topics array and rendering buttons to html/DOM
    topicsArray = function () {
        $('#topics').empty();
        for (i = 0; i < topics.length; i++) {
            var b = $('<button>').addClass('nav-item');
            // var fa = $('<i>').addClass(topics[i].fontAwesomeClass);
            b.text(topics[i]);
            // b.append(fa);
            $('#topics').append(b);
            // console.log('Added ' + topics[i] + ' button.')
        };
    }

    // < =============== END RENDERING NAV ITEM FROM TOPIC ARRAY =============== >

    // < =============== BEGIN GIF SEARCH, API CALL, AND RENDERING GIFS =============== >
    gifSearch = function (searchAnimal) {
        for (a = 0; a < 4; a++) {
            var row = $('<div>').addClass('row');

            for (i = 0; i < 3; i++) {
                // < =============== BEGIN GIPHY AJAX CALL =============== >
                // this method works but can result in a 429 error (server denies request) due to too many requests
                var apiKey = 'dc6zaTOxFJmzC';
                // below returns one gif at a time - q would be more efficient (less API calls) but we are already rolling with this....
                var queryURL = "https://api.giphy.com/v1/gifs/random?&rating=g&api_key=" + apiKey + '&tag=' + searchAnimal + '&limit=10';
                // below uses the q param and will bring back a batch of gifs - opted not to use as i went with searching by tag and filtered to show only g
                // var queryURL = "https://api.giphy.com/v1/gifs/trending?q=" + searchAnimal + "&rating=g&api_key=" + apiKey + '&limit=10'; 

                $.ajax({
                    url: queryURL,
                    method: "GET",
                }).then(function (response) {
                    console.log(response); // preserved this just in case i need to quickly console this json data out 

                    var col = $('<div>').addClass('col-md');
                    var img = $(`<img data-src-still="${response.data.images.original_still.url}" data-src="${response.data.images.original.url}"/>`);
                    var rating = '';
                    var srcStill = img.attr('data-src-still').toString(); // storing still image to use for default on load

                    img.attr('src', srcStill); // sets default to still img

                    img.addClass('gif img-responsive'); // adding gif class - used for clicking mostly but aslo styling
                    img.css('opacity', '0'); // setting initial opacity to 0 for load animation (toggling visibility doesn't work - keep forgetting this...)
                    //    $(row).append(img);
                    $(col).append(img);
                    $(row).append(col);

                    setTimeout(function () {
                        img.css('opacity', '1');
                    }, 500);

                });
                //     }
                $('#grid').append(row);
            }

        }
    }
    // < =============== END GIPHY AJAX CALL =============== >
    // < =============== END GIF SEARCH, API CALL, AND RENDERING GIFS =============== >

    topicsArray();
    // < =============== BEGIN EVENT LISTENERS =============== >
   

$('#add').on('click', function() {
    $('#search-modal').css("visibility", "visible");
    $('#search-modal').css( "opacity", "1");  
})    

// validate = function(a) {
//     if (a === '') {
//         alert('Cannot search for blanks');

//     } 
// }

$('#search').on('click', function() {
    var newTopic = $('#form-input').val();
    // newTopic = newTopic.charAt(0).toUpperCase() + newTopic.slice(1);
    if (newTopic === '') {
        $('#form-input').attr('placeholder', 'What is your favorite animal?');
        console.log('Cannot search for undefined');
    } else {
    gifSearch(newTopic);
    $('#search-modal').css("visibility", "hidden");
    $('#search-modal').css( "opacity", "0"); 
    searchAnimal = newTopic;
    $('#form-input').val('');
}
})

$('#addTopic').on('click', function() {
    var newTopic = $('#form-input').val();
    newTopic = newTopic.charAt(0).toUpperCase() + newTopic.slice(1);
    if (newTopic === '') {
        $('#form-input').attr('placeholder', 'What is your favorite animal?');
        console.log('Cannot search for undefined');
    } else {
    topics.push(newTopic);
    topicsArray();
    gifSearch(newTopic);
    $('#search-modal').css("visibility", "hidden");
    $('#search-modal').css( "opacity", "0"); 
    searchAnimal = newTopic;
    $('#form-input').val('');
    }
})

$('#close').on('click', function() {
    $('#search-modal').css("visibility", "hidden");
    $('#search-modal').css( "opacity", "0"); 
})

    $('#more').on('click', function () {
        console.log('Previous search was ' + searchAnimal);
        gifSearch(searchAnimal);
    });

    $('#clear').on('click', function () {
        $('#grid').empty();
    })

    $(document).on("click", '.nav-item', function () { // had to add event listner to document because the new 'nav-item' is dynamically rendered - tricky tricky...
        searchAnimal = $(this).text();
        gifSearch(searchAnimal);
    });

    $('#form-input').on('submit', function() {
        event.preventDefault();
        console.log('reigsterd');
    })

    

    

    // < =============== BEGIN GIF PLAYBACK TOGGLE =============== >
    $(function () {
        $(document).on("click", '.gif', function () {
            var still = $(this).attr('data-src-still').toString();
            console.log('toggle play');
            var play = $(this).attr('data-src').toString();
            if ($(this).attr('src') === still) {
                $(this).attr('src', play);
            } else {
                $(this).attr('src', still);
            };
            document.body.style.cursor = "default"; //resets cursor to default (was changing to horizontal arrow after clicking img)
        });

    });
    // < =============== END GIF PLAYBACK TOGGLE =============== >
    // < =============== END FOOTER MENU EVENT LISTENERS =============== >

    
}); // END DOCUMENT READY BLOCK

ScrollReveal().reveal('.navbar'); // initialize scroll reveal animations (header and footer)

// ScrollReveal().reveal('.gif');

/*
# GifTastic

### Overview

In this assignment, you'll use the GIPHY API to make a dynamic web page that populates with gifs of your choice. To finish this task, you must call the GIPHY API and use JavaScript and jQuery to change the HTML of your site.

![GIPHY](Images/1-giphy.jpg)

### Before You Begin

1. **Hit the GIPHY API**.
   * Fool around with the GIPHY API. [Giphy API](https://developers.giphy.com/docs/).
   * Be sure to read about these GIPHY parameters (hint, hint):
     * `q`
     * `limit`
     * `rating`
   * Like many APIs, GIPHY requires developers to use a key to access their API data. To use the GIPHY API, you'll need a GIPHY account (don't worry, it's free!) and then obtain an API Key by [creating an app](https://developers.giphy.com/dashboard/?create=true).
   * Make sure you switch the protocol in the query URL from **`http to https`**, or the app may not work properly when deployed to Github Pages.

2. **[Watch the demo video](https://youtu.be/BqreERTLjgQ)**

   * You should have a high-level understanding of how this assignment works before attempting to code it.

### Submission on BCS

* Please submit both the deployed Github.io link to your homework AND the link to the Github Repository!

### Instructions

DONE 1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
   * We chose animals for our theme, but you can make a list to your own liking.

DONE 2. Your app should take the topics in this array and create buttons in your HTML.
   * Try using a loop that appends a button for each string in the array.

DONE 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

DONE 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

5. Under every gif, display its rating (PG, G, so on).
   * This data is provided by the GIPHY API.
   * Only once you get images displaying with button presses should you move on to the next step.

DONE 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

7. Deploy your assignment to Github Pages.

8. **Rejoice**! You just made something really cool.

- - -

### Minimum Requirements

Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Adding a README.md as well as adding this homework to your portfolio are required as well and more information can be found below.

- - -

### Bonus Goals

1. Ensure your app is fully mobile responsive.

DONE 2. Allow users to request additional gifs to be added to the page.
   * Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.

3. List additional metadata (title, tags, etc) for each gif in a clean and readable format.

4. Include a 1-click download button for each gif, this should work across device types.

5. Integrate this search with additional APIs such as OMDB, or Bands in Town. Be creative and build something you are proud to showcase in your portfolio

6. Allow users to add their favorite gifs to a `favorites` section.
   * This should persist even when they select or add a new topic.
   * If you are looking for a major challenge, look into making this section persist even when the page is reloaded(via localStorage or cookies).

### Reminder: Submission on BCS

* Please submit both the deployed Github.io link to your homework AND the link to the Github Repository!

- - -

### Create a README.md

Add a `README.md` to your repository describing the project. Here are some resources for creating your `README.md`. Here are some resources to help you along the way:

* [About READMEs](https://help.github.com/articles/about-readmes/)

* [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)

- - -

### Add To Your Portfolio

After completing the homework please add the piece to your portfolio. Make sure to add a link to your updated portfolio in the comments section of your homework so the TAs can easily ensure you completed this step when they are grading the assignment. To receive an 'A' on any assignment, you must link to it from your portfolio.

- - -

### One More Thing

If you have any questions about this project or the material we have covered, please post them in the community channels in slack so that your fellow developers can help you! If you're still having trouble, you can come to office hours for assistance from your instructor and TAs.

**Good Luck!**
*/