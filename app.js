// document.ready
$(() => {

    // onclick functionf or submit
    $("form").on("submit", (event) => {

        // prevent page refresh after submitting
        event.preventDefault();

        // set var for user input
        inputString = $('input[type="text"]').val(); 

        // pokeAPI uses only lowercase names
        userInput = inputString.toLowerCase();

        getPokeData(userInput);
    });

    const getPokeData = async (input) => {

        
        try {
            // async await to get data
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    
            // change response object to json format
            const data = await res.json();
            // console.log(data);

            $("#pokeName").html(data.forms[0].name);
            $("#pokeNo").html(data.id);

            // add image to sprite container
            const sprite = data.sprites.other["official-artwork"].front_default;

            // remove element with class pokeImages and add back
            $(".pokeImages").remove();
            $(".sprites").append(`<img src=${sprite} class="pokeImages">`);

            // remove classes from bottomright and topleft and replace with original class
            $(".triangle-topleft").attr("class", "triangle-topleft");
            $(".triangle-bottomright").attr("class", "triangle-bottomright");


            // clear text inside pokeType
            $("#pokeType").html("");

            // get list of types for the pokemon
            const dataTypes = []
            for (index = 0; index < data.types.length; index++){
                dataTypes.push(data.types[index].type.name)
            }

            for (index = 0; index < dataTypes.length; index++){
                // add text
                $("#pokeType").append(dataTypes[index] + " ");

                // if pokemon has more than 1 type, add second class to right corner
                // if (index % data.types.length === 0){
                    $(".left-corner").children().addClass(`${dataTypes[index]}`);
                    $(".right-corner").children().addClass(`${dataTypes[index]}`);
                // }

                if (index === 1){
                    $(".right-corner").children().attr("class", `triangle-bottomright ${dataTypes[index]}`);
                }
              
            }
         
        }

        catch (error) {
            console.log(error);
        }
    }
})