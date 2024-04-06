let cardData = [];
fetch("https://dog.ceo/api/breed/hound/images")
            .then(response => {
                if (!response.ok) {
                    console.log ("Fetching Failed");
                }
                return response.json();
            })
            .then(response_j => {
                cardData = response_j.message;
                console.log(cardData);
                createCards(cardData);
            })
            .catch(error => {
                console.error(error);
            })

function createCards(data) {
    const container = document.getElementById('card-container');
    let doggy = 0;
    data.forEach(card => {
        doggy += 1;
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.style.backgroundImage = "url("+card+")";

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const titleElement = document.createElement('h2');
        titleElement.classList.add('poppins-bold');
        titleElement.textContent = "Doggy #" + doggy;

        const contentElement = document.createElement('p');
        contentElement.classList.add('poppins-medium');
        contentElement.textContent = card;

        cardElement.appendChild(cardContent);
        cardContent.appendChild(titleElement);
        cardContent.appendChild(contentElement);

        container.appendChild(cardElement);
    });
}

