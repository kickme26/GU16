const getDataDef = (event) => {
    event.preventDefault();
    var wordTosearch = document.getElementById('search').value;
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + wordTosearch;
    fetchPromise(url);
}

const fetchPromise = (url) => {
    fetch(url)
        .then(response => response.json())
        .then((meanings) => {

            displayMeanings(meanings[0].meanings[0].definitions);
        })
        .catch(error => {
            console.error('Error:', error);
            displayNoMeaning();
        });
};

const displayMeanings = (definitions) => {
    var meaningDiv = document.getElementById('Meaning');
    meaningDiv.innerHTML = '';

    if (definitions && definitions.length > 0) {

        var Keyword = document.createElement('h4');
        Keyword.innerHTML = document.getElementById('search').value;
        var ulElement = document.createElement('ul');
        meaningDiv.appendChild(Keyword);

        definitions.forEach((definition) => {
            var liElement = document.createElement('li');
            liElement.textContent = definition.definition;
            ulElement.appendChild(liElement);
        });


        meaningDiv.appendChild(ulElement);
    } else {
        meaningDiv.textContent = 'No definitions found.';
    }
};

const displayNoMeaning = () => {
    var meaningDiv = document.getElementById('Meaning');
    meaningDiv.innerHTML = '';
    var Keyword = document.createElement('h4');
    Keyword.innerHTML = document.getElementById('search').value;
    meaningDiv.appendChild(Keyword);
    var noMeaningElement = document.createElement('p');
    noMeaningElement.textContent = 'No definitions found.';
    meaningDiv.appendChild(noMeaningElement);
};