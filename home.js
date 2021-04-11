// console.log('this is connected')

// load the Airtable library, call it "Airtable";
var Airtable = require("airtable");
// console.log(Airtable)

// use Airtable library, connect to the base using API key
var base = new Airtable({ apiKey: "keyXBnZCAeWTlNBhM" }).base("appx84w4NobmIjOH6");

// const pokelist = document.getElementById('pokemon-list');

// get our collection base, select all the records 
// specify functions that will receive the data 
base("apples").select({maxRecords:100}).eachPage(gotPageOfApples, gotAllApples);

// an empty array to hold our data 
const apples = [];

// callback function that receives our data 
function gotPageOfApples(records, fetchNextPage) {
    console.log("gotPageOfApples()");
    // add the records from this page to our array
    apples.push(...records);
    // request more pages
    fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllApples(err) {
    console.log("gotAllApples()");
  
    // report an error, you'd want to do something better than this in production
    if (err) {
      console.log("error loading apples data");
      console.error(err);
      return;
    }
  
    // call functions to log and show the apples
    consoleLogApples();
    showApples();
}

// just loop through the apples and console.log them
function consoleLogApples() {
    console.log("consoleLogApples()");
    apples.forEach((apple) => {
      console.log("Apple:", apple);
    });
}

// loop through the data, create elements, and add to the page - gallery page
function showApples() {
    console.log("showApples()");
    apples.forEach((apple) => {


        // creating a new div container
        var artContainer = document.createElement("li");
        artContainer.classList.add("art-container");
        artContainer.classList.add("glide__slide");
        document.querySelector(".glide__slides").append(artContainer);
        console.log('made container');

        var artworkImage = document.createElement("img");
        artworkImage.classList.add("artwork");
        artworkImage.src = apple.fields.artwork[0].url;

        artContainer.append(artworkImage);
        

       

        new Glide('.glide', {
                // type: 'carousel', 
                startAt: 0, 
                perView: 7,
                perTouch: 1,
                gap: 100,
                autoplay: 2000,
                breakpoints: {
                    1400: {
                        perView: 5,
                    },
                    1024: {
                        perView: 3,
                        gap: 200,
                    },
                    600: {
                        perView: 1,
                    }
                }

            }).mount();
            
              
    });
}
