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

        // async await to get data
        const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        const res2 = await fetch("https://pokeapi.co/api/v2/type");

        // change response object to json format
        const data = await res1.json();
        const typesInfo = await res2.json();

        try {
            // console.log(data);
            // console.log(typesInfo);

            $("#pokeName").html(data.forms[0].name);

            const dataType = data.types[0].type.name;
            $("#pokeType").html(dataType);

            $("#pokeNo").html(data.id);

            const sprite = data.sprites.other["official-artwork"].front_default;

            // add image to sprite container
            $(".sprites").html(`<img src=${sprite} class="pokeImages">`);

            // remove all classes in children
            $(".sprites").children().removeClass();

            // add classes to image based on type
            $(".sprites").children().addClass(`pokeImages ${dataType}`);

        }
        catch {
            console.log("404 error");
        }
    }


})