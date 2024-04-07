let title = document.querySelector(`.title`);
let price = document.querySelector(`.price`);
let taxes = document.querySelector(`.taxes`);
let discount = document.querySelector(`.discount`);
let total = document.querySelector(`.total`);
let count = document.querySelector(`.count`);
let category = document.querySelector(`.category`);
let create = document.querySelector(`.create`);
let search = document.querySelector(`.search`);
let deleteAllBtn = document.querySelector(`.delete-all`);
let buttons = document.querySelectorAll(`button`);

buttons.forEach((btn) => {
  btn.addEventListener(`click`, (event) => {
    event.preventDefault();
  });
});

function getTotal() {
  if (price.value != ``) {
    // console.log(typeof price.value); //// String
    let result = +price.value + +taxes.value - discount.value;
    total.innerHTML = result;
    total.classList.remove("bg-danger");
    total.style.backgroundColor = `green`;
  } else {
    total.innerHTML = ``;
    total.classList.add("bg-danger");
  }
}

let dataProducts;
if (localStorage.getItem(`dataProducts`) != null) {
  dataProducts = JSON.parse(localStorage.getItem(`dataProducts`));
} else {
  dataProducts = [];
}

/*Create Product*/
let mood = `create`;
let tmp;
create.addEventListener(`click`, () => {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (newProduct.price !== `` && newProduct.title !== ``) {
    if (mood === `create`) {
      if (count.value > 1) {
        for (let i = 0; i < count.value; i++) {
          dataProducts.push(newProduct);
        }
      } else {
        dataProducts.push(newProduct);
      }
    } else {
      // Update mood
      dataProducts[tmp] = newProduct;
      count.style.display = `block`;
      mood = `create`;
      create.innerHTML = `create`;
    }
  }

  localStorage.setItem(`dataProducts`, JSON.stringify(dataProducts));
  showProducts();

  // clear values of all inputs and total
  document.querySelectorAll(`input`).forEach((inp) => {
    inp.value = ``;
  });
  getTotal();
});

/*Show Product*/

function showProducts() {
  let rows = ``;
  for (let i = 0; i < dataProducts.length; i++) {
    rows += `
    <tr class = "text-white">
          <td class = "text-center">${i + 1}</td>
          <td class = "text-center">${dataProducts[i].title}</td>
          <td class = "text-center">${dataProducts[i].price}</td>
          <td class = "text-center">${dataProducts[i].taxes}</td>
          <td class = "text-center">${dataProducts[i].discount}</td>
          <td class = "text-center">${dataProducts[i].total}</td>
          <td class = "text-center">${dataProducts[i].category}</td>
          <td class = "text-center ms-1"><button class = "rounded text-light w-75 text-capitalize border-0 " onclick = "UpdateProduct(${i})">Update</button></td>
          <td class = "text-center ms-1"><button class = "rounded text-light w-75 text-capitalize border-0 mt-1" onclick = "DeleteProduct(${i})">Delete</button></td>
        </tr>
    `;
  }
  document.querySelector(`tbody`).innerHTML = rows;
  if (dataProducts.length > 0) {
    // document.querySelector(`.delete-all`).style.display = `block`;
    document.querySelector(`.delete-all`).classList.remove(`d-none`);
    document.querySelector(`.delete-all`).classList.add(`d-block`);
  }
}
showProducts();

/*Delete All Product*/

function DeleteAllProducts() {
  document.querySelector(`.delete-all`).onclick = () => {
    localStorage.clear();
    location.reload();
  };
}
DeleteAllProducts();

/*Delete A Product*/
function DeleteProduct(index) {
  dataProducts.splice(index, 1);
  localStorage.setItem(`dataProducts`, JSON.stringify(dataProducts));
  showProducts();
}

/*Update A Product*/
function UpdateProduct(index) {
  title.value = dataProducts[index].title;
  price.value = dataProducts[index].price;
  taxes.value = dataProducts[index].taxes;
  discount.value = dataProducts[index].discount;
  total.innerHTML = dataProducts[index].total;
  category.value = dataProducts[index].category;
  getTotal();
  count.style.display = `none`;
  mood = `update`;
  create.innerHTML = `Update`;
  tmp = index;
  window.scroll({
    top: 0,
    behavior: `smooth`,
  });
}

/*Search For A Product*/
////Get Search Mood
let searchMood = `title`;
function getSearchMood(btn_val) {
  if (btn_val === `search by title`) {
    searchMood = `title`;
  } else {
    searchMood = `category`;
  }
  search.focus();
  search.placeholder = btn_val;
}

// Get result of Search
function getResultSearch(value) {
  let rows = ``;
  for (let i = 0; i < dataProducts.length; i++) {
    if (searchMood === `title`) {
      if (dataProducts[i].title.includes(value)) {
        rows += `
    <tr>
          <td>${i + 1}</td>
          <td>${dataProducts[i].title}</td>
          <td>${dataProducts[i].price}</td>
          <td>${dataProducts[i].taxes}</td>
          <td>${dataProducts[i].discount}</td>
          <td>${dataProducts[i].total}</td>
          <td>${dataProducts[i].category}</td>
          <td><button class = "rounded text-light w-75 text-capitalize border-0" onclick = "UpdateProduct(${i})">Update</button></td>
          <td><button class = "rounded text-light w-75 text-capitalize border-0 mt-1" onclick = "DeleteProduct(${i})">Delete</button></td>
        </tr>
    `;
      }
    } else {
      if (dataProducts[i].category.includes(value)) {
        rows += `
    <tr>
          <td>${i + 1}</td>
          <td>${dataProducts[i].title}</td>
          <td>${dataProducts[i].price}</td>
          <td>${dataProducts[i].taxes}</td>
          <td>${dataProducts[i].discount}</td>
          <td>${dataProducts[i].total}</td>
          <td>${dataProducts[i].category}</td>
          <td><button class = "rounded text-light w-75 text-capitalize border-0" onclick = "UpdateProduct(${i})">Update</button></td>
          <td><button class = "rounded text-light w-75 text-capitalize border-0 mt-1" onclick = "DeleteProduct(${i})">Delete</button></td>
        </tr>
    `;
      }
    }
  }
  document.querySelector(`tbody`).innerHTML = rows;
}

/*Scroll To Top*/

let toTopBtn = document.querySelector(`.to-top`);
window.onscroll = function () {
  if (window.scrollY >= 400) {
    toTopBtn.style.right = `20px`;
  } else {
    toTopBtn.style.right = `-40px`;
  }
};
toTopBtn.onclick = (_) => {
  window.scroll({
    top: 0,
    behavior: `smooth`,
  });
};
