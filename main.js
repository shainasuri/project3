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

        var artDescription = document.createElement("div");
        artDescription.classList.add("description");

        var artistName = document.createElement("p");
        var artworkTitle = document.createElement("p");
        var timePeriod = document.createElement("p");

        artistName.innerText = apple.fields.artist;
        artworkTitle.innerText = apple.fields.title;
        timePeriod.innerText = apple.fields.time;

        artContainer.append(artworkImage, artDescription);
        artDescription.append(artistName, artworkTitle, timePeriod);

        // var artistName = document.createElement("h1");
        // artistName.innerText = apple.fields.artist;
        // document.querySelector(".glide__slides").append(artistName);

        // new Glide('.glide').mount();

        // const config = {
        //     type: 'carousel',
        // }
        // new Glide('.glide', config).mount();

        new Glide('.glide', {
                // type: 'carousel', 
                startAt: 1, 
                perView: 7,
                perTouch: 1,
                gap: 100,

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

// $(document).mousemove(function(e){
//     var X = e.pageX;
//     var Y = e.pageY;
//     $('.focus').css('background','radial-gradient(circle at '+X+'px '+Y+'px, transparent, #000 30%)')
// })



// // loop through the data, create elements, and add to the page - details page
// function showApples() {
//     console.log("showApples()");
//     apples.forEach((apple) => {


//         // creating a new div container
//         var artContainerDetails = document.createElement("li");
//         artContainer.classList.add("art-container-details");
//         artContainer.classList.add("glide__slide");
//         document.querySelector(".glide__slides").append(artContainer);
//         console.log('made container');

//         var artworkImage = document.createElement("img");
//         artworkImage.classList.add("artwork-details");
//         artworkImage.src = apple.fields.artwork[0].url;

//         var artDescription = document.createElement("div");
//         artDescription.classList.add("description-details");

//         var artistName = document.createElement("p");
//         var artworkTitle = document.createElement("p");
//         var timePeriod = document.createElement("p");

//         artistName.innerText = apple.fields.artist;
//         artworkTitle.innerText = apple.fields.title;
//         timePeriod.innerText = apple.fields.time;

//         artContainer.append(artworkImage, artDescription);
//         artDescription.append(artistName, artworkTitle, timePeriod);

//         // var artistName = document.createElement("h1");
//         // artistName.innerText = apple.fields.artist;
//         // document.querySelector(".glide__slides").append(artistName);

//         new Glide('.glide').mount();

//         // const config = {
//         //     type: 'carousel',
//         // }
//         // new Glide('.glide', config).mount();


//     });
// }
