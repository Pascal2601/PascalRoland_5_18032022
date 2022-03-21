const item = JSON.parse(localStorage.getItem('item')) || [];

//insertion HTML: affichage des items ajoutés au panier
function displayItems(items) {
  const cartItems = document.getElementById('cart__items');
  cartItems.innerHTML += `
    <article class="cart__item" data-id="${items._id}">
                <div class="cart__item__img">
                  <img src="${items.imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${items.name}</h2>
                    <p>${items.price} €</p>
                    <p>${items.selectColors}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${items.quantity}">
                      </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
}

//affichage des produits avec displayItems qui affiche aussi les données de chaque produit
for (items of item) {
  displayItems(items);
  console.log(items);
}

let quantityItem = [];
console.log(quantityItem);
const reducer = (accumulator, curr) => accumulator + curr;

//quantité total des produits dans le panier
function quantityItemsSelected() {
  for (items of item) {
    let quantityCart = [items.quantity];
    quantityItem.push(Number(quantityCart));
  }
}
quantityItemsSelected();

//affichage HTML du total : quantité des articles
const totalQuantity = document.getElementById('totalQuantity');
totalQuantity.innerHTML += `<span id="totalQuantity">${Number(
  quantityItem.reduce(reducer)
)}</span>`;

//prix total des produits
function displayTotalCart() {
  let totalCart = 0;
  item.forEach((items) => {
    totalCart = totalCart + items.price * items.quantity;
  });
  console.log(totalCart);
  return totalCart;
}
//affichage HTML du total : prix total des articles
const totalPrice = document.getElementById('totalPrice');
totalPrice.innerHTML += `<span id="totalQuantity">${displayTotalCart()}</span>`;

//supprimer un produit
function deleteOneItem() {
  const deleteBtn = document.getElementsByClassName('deleteItem');
  console.log(deleteBtn);

  for (let i = 0; i < deleteBtn.length; i++) {
    const del = deleteBtn[i];
    del.addEventListener('click', () => {
      item.splice(i, 1);
      localStorage.setItem('item', JSON.stringify(item));
      location.reload();
    });
  }
}

deleteOneItem();

//modifier quantité d'un produit
function changeQuantityItem() {
  const result = document.getElementsByClassName('itemQuantity');
  console.log(result);

  for (let i = 0; i < result.length; i++) {
    const changeQty = result[i];
    changeQty.addEventListener('change', (event) => {
      result.innerHTML += `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" 
    value="${event.target.value}">`;

      item[i].quantity = Number(changeQty.value);
      localStorage.setItem('item', JSON.stringify(item));
      location.reload();
    });
  }
}

changeQuantityItem();

//CONTACT FORMULAIRE

//validation du formulaire et envoie en POST
//regex pour interdiction de certains caractères

const order = document.getElementById('order');
const regexName =
  /^(([a-zA-ZÀ-ÿ]+[\s\-\,\']{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
const regexCity =
  /^(([a-zA-ZÀ-ÿ]+[\s\-\']{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
// creer une regex address
const regexAddress =
  /^(([0-9a-zA-ZÀ-ÿ]+[\s\-\'\,]{1,2}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

order.addEventListener('click', (event) => {
  // on prépare les infos pour l'envoie en POST
  let contact = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    email: document.getElementById('email').value,
  };

  let products = [];
  for (items of item) {
    products.push(items._id);
  }

  // vérification du formulaire: correctement rempli
  if (
    regexMail.test(contact.email) &&
    regexName.test(contact.firstName) &&
    regexName.test(contact.lastName) &&
    regexCity.test(contact.city) &&
    regexAddress.test(contact.address)
  ) {
    event.preventDefault();
    // on envoie en POST
    fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contact, products }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data.orderId);
        localStorage.setItem('order', JSON.stringify(contact));
        document.location.href = `confirmation.html?orderId=${data.orderId}`;
      });
  }
  const errorFirstName = document.getElementById('firstNameErrorMsg');
  if (regexName.test(contact.firstName)) {
    errorFirstName.innerHTML = '';
  } else {
    errorFirstName.innerHTML = `Veuillez correctement renseigner votre prénom.`;
  }

  const errorLastName = document.getElementById('lastNameErrorMsg');
  if (regexName.test(contact.lastName)) {
    errorLastName.innerHTML = '';
  } else {
    errorLastName.innerHTML = `Veuillez correctement renseigner votre nom.`;
  }

  const errorAdress = document.getElementById('addressErrorMsg');
  if (regexAddress.test(contact.address)) {
    errorAdress.innerHTML = '';
  } else {
    errorAdress.innerHTML = `Veuillez correctement renseigner votre adresse.`;
  }

  const errorCity = document.getElementById('cityErrorMsg');
  if (regexCity.test(contact.city)) {
    errorCity.innerHTML = '';
  } else {
    errorCity.innerHTML = `Veuillez correctement renseigner votre ville.`;
  }

  const errorEmail = document.getElementById('emailErrorMsg');
  if (regexMail.test(contact.email)) {
    errorEmail.innerHTML = '';
  } else {
    errorEmail.innerHTML = `Veuillez correctement renseigner votre email.`;
  }
});
