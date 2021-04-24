// document.ready
$(() => {

    // onclick function for submit
    $("form").on("submit", (event) => {

        // prevent page refresh after submitting
        event.preventDefault();

        // set var for user input
        const inputString = $('input[type="text"]').val(); 

        // pokeAPI uses only lowercase names
        const userInput = inputString.toLowerCase();

        getPokeData(userInput);
        getPokeFlavorText(userInput);
    });

    // async function to fetch API data
    const getPokeData = async (input) => {

        // try this code and see if it breaks
        try {
            // await synchronously to get data
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    
            // change response object to json format
            const data = await res.json();

            $("#pokeName").html(data.forms[0].name);
            $("#pokeNo").html(data.id);

            // add image to sprite container
            const sprite = data.sprites.other["official-artwork"].front_default;

            // remove element with class pokeImages and add back
            // to not have next image stacked on top of previous image
            $(".pokeImages").remove();
            $(".sprites").append(`<img src=${sprite} class="pokeImages">`);

            // remove classes from bottomright and topleft and replace with original class
            $(".triangle-topleft").attr("class", "triangle-topleft");
            $(".triangle-bottomright").attr("class", "triangle-bottomright");

            // clear text inside pokeType
            $("#pokeType").html("");

            // get list of types for the focused pokemon
            const dataTypes = [];

            for (let index = 0; index < data.types.length; index++){
                dataTypes.push(data.types[index].type.name);
            }

            // add types to text and container. manipulate if more than 1 type
            for (let index = 0; index < dataTypes.length; index++){
                // add text here
                $("#pokeType").append(dataTypes[index] + " ");

                // for first type, add to both top left and bottom right triangles
                if (index === 0){
                    $(".triangle-topleft").addClass(`${dataTypes[index]}`);
                    $(".triangle-bottomright").addClass(`${dataTypes[index]}`);
                }

                // if second type, remove class from bottom right and add new class
                if (index === 1){
                    $(".right-corner").children().attr("class", `triangle-bottomright ${dataTypes[index]}`);
                }
            }
        }

        catch (error) {
            console.log(error);
        }
    }

    // run this code async with getPokeData
    const getPokeFlavorText = async (input) => {

        try{
            const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${input}/`);
            const data1 = await res1.json();
            console.log(data1);

            // find flavor text in english
            englishFlavorText = findEnglishFlavorText(data1);

            // add flavor text. remove weird chars and format
            const flavorText = englishFlavorText.split("").join(" ").toLowerCase();
            $("#pokeFlavorText").html(flavorText);
        }

        catch (error) {
            console.log(error);
        }
    }
});

const findEnglishFlavorText = (data) => {

    const flavorTextEntries = data.flavor_text_entries;

    for (let index = 0; index < flavorTextEntries.length; index++){
        if (flavorTextEntries[index].language.name === "en"){
            return flavorTextEntries[index].flavor_text;
        }
    }
}