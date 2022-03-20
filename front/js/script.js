const api = 'http://localhost:3000/api/products';
fetch(api)
  .then((response) => response.json())
  .then((data) => {
    addItems(data);
    console.log(data);
  });

function addItems(data) {
  for (let i = 0; i < data.length; i++) {
    const _id = data[i]._id;
    const imageUrl = data[i].imageUrl;
    const altTxt = data[i].altTxt;
    const name = data[i].name;
    const description = data[i].description;
    const anchor = makeAnchor(_id);
    const article = document.createElement('article');
    const image = makeImageDiv(imageUrl, altTxt);
    const h3 = makeH3(name);
    const p = makeParagraph(description);
    appendElementsToArticle(article, [image, h3, p]);
    appendArticleToAnchor(anchor, article);
  }
}

function appendElementsToArticle(article, array) {
  array.forEach((item) => {
    article.appendChild(item);
  });
}

function makeAnchor(id) {
  const anchor = document.createElement('a');
  anchor.href = './product.html?id=' + id;
  return anchor;
}

function appendArticleToAnchor(anchor, article) {
  const items = document.querySelector('#items');
  if (items != null) {
    items.appendChild(anchor);
    anchor.appendChild(article);
  }
}

function makeImageDiv(imageUrl, altTxt) {
  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}

function makeH3(name) {
  const h3 = document.createElement('h3');
  h3.textContent = name;
  h3.classList.add('productName');
  return h3;
}

function makeParagraph(description) {
  const p = document.createElement('p');
  p.textContent = description;
  p.classList.add('productDescription');
  return p;
}
