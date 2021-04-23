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
            console.log(data);
            console.log(typesInfo);

            const dataName = data.forms[0].name;
            $("#pokeName").html(dataName);

            const dataType = data.types[0].type.name;
            $("#pokeType").html(dataType);

            const dataNo = data.id;
            $("#pokeNo").html(dataNo);


            // get an array of types
            pokeTypes = typesInfo.results.map((type) => {
                return type.name;
            })

            console.log(pokeTypes)

            // change headerContainer based on type
            if (pokeTypes.includes(dataType)){
                console.log("match")
            }
    
        }
        catch {
            console.log("404 error");
        }
    }


})