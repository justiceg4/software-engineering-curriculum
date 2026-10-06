const form = document.querySelector("#pokeForm");
const result = document.querySelector("#resultContainer");

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = form.elements.pokemon.value;

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);

        result.innerHTML = '';

        const displayName = document.createElement('h2');
        const displayPic = document.createElement('img');
        const displayInfo = document.createElement('p');

        displayName.innerText = response.data.name;
        displayPic.src = response.data.sprites.front_default;
        displayInfo.innerText = "Type: " + response.data.types[0].type.name;

        result.append(displayName);
        result.append(displayPic);
        result.append(displayInfo);

    }
    catch (err) {
        alert("Pokemon wasn't found!");
        console.log("Error!!", err);
    }


    form.elements.pokemon.value = '';
});