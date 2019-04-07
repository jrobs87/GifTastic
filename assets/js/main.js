// [========== GIPHY API KEY > teJ9nr36fk7rqyaRZv2EZcC32RyTeSRc ==========]

// A $( document ).ready() block.
$(document).ready(function () {

    // topics array for buttons
    var topics = ['Dog', 'Cats', 'Hamster', 'Hippo', 'Bird', 'Fish', 'Giraffe', 'Penguin', 'Elephant', 'Kangaroo'];
var searchAnimal = '';
    // < =============== BEGIN RENDERING NAV ITEM =============== >
    // looping through topics array and rendering buttons to html/DOM
    for (i = 0; i < topics.length; i++) {
        var b = $('<button>').addClass('nav-item');
        // var fa = $('<i>').addClass(topics[i].fontAwesomeClass);
        b.text(topics[i]);
        // b.append(fa);
        $('#topics').append(b);
        // console.log('Added ' + topics[i] + ' button.')
    }
    // < =============== END RENDERING NAV ITEM =============== >

    gifSearch = function (searchAnimal) {
        for (a = 0; a < 4; a++) {
            var row = $('<div>').addClass('row');
            for (i = 0; i < 3; i++) {
                // < =============== BEGIN GIPHY AJAX CALL =============== >
                // this method works but can result in a 429 error (server denies request) due to too many requests
                var apiKey = 'dc6zaTOxFJmzC';
                var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=" + apiKey + '&tag=' + searchAnimal + '&limit=10';

                $.ajax({
                    url: queryURL,
                    method: "GET",
                }).then(function (response) {
                    // console.log(response); // preserved this just in case i need to quickly console this json data out 

                    var col = $('<div>').addClass('col');
                    var img = $(`<img data-src-still="${response.data.images.original_still.url}" data-src="${response.data.images.original.url}"/>`);
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


    $('.nav-item').on('click', function () {
        searchAnimal = $(this).text();
        gifSearch(searchAnimal);
        
    });
    
    $('#more').on('click', gifSearch());


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

    $('#clear').on('click', function () {
        $('#grid').empty();
    })


});



ScrollReveal().reveal('.navbar');

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

3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

DONE 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

5. Under every gif, display its rating (PG, G, so on).
   * This data is provided by the GIPHY API.
   * Only once you get images displaying with button presses should you move on to the next step.

6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

7. Deploy your assignment to Github Pages.

8. **Rejoice**! You just made something really cool.

- - -

### Minimum Requirements

Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Adding a README.md as well as adding this homework to your portfolio are required as well and more information can be found below.

- - -

### Bonus Goals

1. Ensure your app is fully mobile responsive.

2. Allow users to request additional gifs to be added to the page.
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