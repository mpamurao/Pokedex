// document.ready
$(() => {

    // pokeName
    // pokeType
    // pokeNo
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
        const types = await res2.json();

        try {
            console.log(data);
            console.log(types);

            const pokeName = $("#pokeName").html(data.forms[0].name);

            const dataType = data.types[0].type.name
            const pokeType = $("#pokeType").html(dataType);
            const pokeNo = $("#pokeNo").html(data.id);

            // get an array of types
            typesArray = types.results.map((index) => {
                return index.name;
            })
            console.log(typesArray)

            // change headerContainer based on type
            if (typesArray.includes(dataType)){
                console.log("match")
            }
    
        }
        catch {
            console.log("404 error");
        }
    }


})