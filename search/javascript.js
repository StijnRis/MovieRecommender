function updateSearch(event) {
    event.preventDefault();

    const name = event.target[0].value;

    const url = "http://www.omdbapi.com/?apikey=eafa8f62&s=" + name;

    // Using Fetch API
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((result) => {
            generateResult(result);
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        });
}

function generateResult(movies) {
    console.log(movies);
    const result = document.getElementById("result");
    result.innerHTML = "";

    if (movies["Response"] == "False") {
        const text = document.createElement("p");
        text.append("No result, look a better movie up next time ;)");
        result.appendChild(text);
    } else {
        movies["Search"].forEach((item) => {
            const card = generateMovieCard(item);
            result.appendChild(card);
        });
    }
}

function generateMovieCard(movie) {
    const container = document.createElement("div");
    container.classList.add("movie");

    const image = document.createElement("img");
    image.src = movie["Poster"];
    image.alt = movie["Title"] + " poster";
    container.appendChild(image);

    const header = document.createElement("h2");
    header.append(movie["Title"]);
    container.appendChild(header);

    const options = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et lorem tincidunt, varius diam quis, venenatie augue. Nam facilisis vehicula nisi et ultrices.",
        "Fusce consectetur nisi id maximus lacinia. Nulla facilisi. Morbi dolor nulla, blandit ut convallis pharetra, fermentum nec neque. ",
        "Maecenas hendrerit, nisl vehicula posuere condimentum, leo sapien euismod tortor, dignissim commodo nibh nunc quis nunc. Etiam varius imperdiet mauris et blandit. ",
        "Estibulum semper justo egestas accumsan varius. Sed blandit purus ante, malesuada suscipit leo pharetra sed",
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer feugiat, est id suscipit ornare, lectus odio maximus massa",
    ];
    const content = options[Math.floor(Math.random() * options.length)];
    const text = document.createElement("p");
    text.append(content);
    text.classList.add("description");
    container.appendChild(text);
    
    return container;
}
