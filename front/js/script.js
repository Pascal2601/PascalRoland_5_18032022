const api = 'http://localhost:3000/api/products';

fetch(api)
  .then((response) => response.json())
  .then((data) => {
    addItems(data);
    console.log(data);
  });

function addItems(data) {
  for (item of data) {
    const cameras = document.getElementById('items');
    cameras.innerHTML += `
            <a href="./product.html?id=${item._id}">
                <article>
                  <img src="${item.imageUrl}" alt="${item.altTxt}">
                  <h3 class="productName">${item.name}</h3>
                  <p class="productDescription">${item.description}</p>
                </article>
              </a>`;
  }
}
