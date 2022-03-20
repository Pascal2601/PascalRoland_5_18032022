//définition de la nouvelle API, reccuperer l'ID du produit dans URL
const searchParams = new URLSearchParams(location.search);
const idItem = searchParams.get('id');
const item = JSON.parse(localStorage.getItem('item')) || [];
const newApi = `http://localhost:3000/api/products/${idItem}`;

//fetch la nouvelle API
fetch(newApi)
  .then((reponse) => reponse.json())
  .then((data) => {
    showItem(data);
    console.log(data);

    function showItem(data) {
      const itemImage = document.getElementsByClassName('item__img')[0];
      itemImage.innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}">`;

      const itemName = document.getElementById('title');
      itemName.innerHTML += `<h1 id="title">${data.name}</h1>`;

      const itemPrice = document.getElementById('price');
      itemPrice.innerHTML += `<span id="price">${data.price}</span>`;

      const itemDescription = document.getElementById('description');
      itemDescription.innerHTML += `<p id="description">${data.description}</p>`;

      const itemOption = document.getElementById('colors');
      for (let colors of data.colors) {
        itemOption.innerHTML += `<option value="${colors}">${colors}</option>`;
      }

      const itemQuantity = document.getElementById('quantity');
      console.log(itemQuantity);

      // créer un nouveau produit

      const addToCart = document.getElementById('addToCart');
      addToCart.addEventListener('click', (e) => {
        e.preventDefault();
        let newSaveItemCart = {
          _id: idItem,
          imageUrl: data.imageUrl,
          name: data.name,
          price: data.price,
          selectColors: itemOption.value,
          quantity: Number(itemQuantity.value),
        };

        let option = colors;
        let saveItemCart = {
          _id: data._id,
          imageUrl: data.imageUrl,
          name: data.name,
          price: data.price,
          selectColors: option.value,
          quantity: Number(quantity.value),
        };
        console.log(saveItemCart);

        let index = item.findIndex(
          (saveItemCart) => saveItemCart['_id'] == idItem
        );
        let indexOption = item.findIndex(
          (newSaveItemCart) =>
            newSaveItemCart['selectColors'] == itemOption.value
        );
        console.log(itemOption.value);
        console.log(indexOption);
        console.log(index);

        if (index === -1) {
          item.push(saveItemCart);
        } else if (indexOption === -1) {
          item.push(newSaveItemCart);
        } else {
          item[index].quantity =
            item[index].quantity + Number(itemQuantity.value);
        }
        localStorage.setItem('item', JSON.stringify(item));
        document.location.href = 'cart.html';
      });
    }
  });
