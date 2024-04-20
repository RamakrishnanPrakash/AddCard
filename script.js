document.addEventListener("DOMContentLoaded", async () => {
  await productLoad(); //step 1= all the product load in webpage
  addBtnClick(); //step 2= add click event every add card button and it is return parent element
});

async function fetchData() {
  try {
    const responce = await fetch("./product.json");
    const product = await responce.json();
    return product;
  } catch {
    window.alert("Fetching failed...");
  }
}

async function productLoad() {
  const productDocument = document.getElementById("product");
  const products = await fetchData();
  let template = "";

  products.Electronics.forEach((ele) => {
    template += `
   <div class="col-md-6 col-lg-4 col-xl-3 my-3">
                <div class="card text-center p-3 shadow">
                    <img src="${ele.image}" id="img"
                        class="img-thumbnail  w-50 h-60 mx-auto">
                    <div class="card-body">
                        <h5 class="card-title" id="brand">${ele.brand}</h5>
                        <h6 class="card-title" id="product" >${ele.product}</h6>
                        <p>MEMORY:${ele.memory}</p>
                        <p> MRP:<strike> ₹${ele.mrb}</strike><span id="price"> Rs:₹${ele.price}</span></p>
                        <button class="btn btn-success"><i class="bi bi-star"></i> ${ele.rating}</button>
                        <button class="btn btn-outline-primary addBtn">Add Card</button>
                    </div>
                </div>
            </div>
   `;
  });
  productDocument.innerHTML = template;
}
function addBtnClick() {
  let addbtn = document.querySelectorAll(".addBtn");
  addbtn.forEach((ele) => {
    ele.addEventListener("click", findParentElement);
  });
}

function findParentElement() {
  const child = this.parentElement;
  const parent = child.parentElement;
  const brand = parent.querySelector("#brand").innerHTML;
  const img = parent.querySelector("#img").src;
  const product = parent.querySelector("#product").innerHTML;
  const price = parent.querySelector("#price").innerHTML;
  const btn = parent.querySelector(".addBtn");
  btn.disabled = true;
  //   console.log(brand, img);
  loadAddCard(brand, img, product, price);
}

function loadAddCard(brand, img, product, price) {
  console.log(brand);
  console.log(img);
  console.log(product);
  console.log(price);

  // alert("content was added");
  let template = "";
  const cardItem = document.querySelector(".card-items");

  template += ` <tr>
  <td class="py-3"><img
          src="${img}"
          class="img-thumbnail" width="150px" height="150px"></td>
  <td class="price-container">
      <p>${product}</p>
      <p><a id="price">${price}</a> <span></span></p>

      <input type="number" value="1" class="incrementBtn" id="incrementBtn">
  </td>
  <td class="py-5">
      <h5> <span></span><span class="total-amount">${price}</span></h5>
  </td>
  <td class="py-5">
      <h5 class="text-danger trashbin"><i class="bi bi-trash"></i></h5>
  </td>
</tr>
`;
  cardItem.innerHTML += template;
  cart();

  const countItem = document.querySelector(".card-items");
  document.querySelector(".count").innerHTML = countItem.rows.length;
}

//this part add and close Add card container

const clsBtn = document.querySelector("#clsBtn");

clsBtn.addEventListener("click", removeCard);

function removeCard() {
  const cardContainer = document.querySelector(".fixed");
  cardContainer.classList.remove("visible-card");
}

const addCardBtn = document.querySelector(".addCardBtn");

addCardBtn.addEventListener("click", addCard);

function addCard() {
  const cardContainer = document.querySelector(".fixed");
  cardContainer.classList.add("visible-card");
}

//convert

function cart() {
  totalAmount();
  const incrementBtn = document.querySelectorAll(".incrementBtn");
  // console.log(incrementBtn);

  incrementBtn.forEach((ele) => {
    ele.addEventListener("change", () => {
      if (parseInt(ele.value) <= 0) {
        ele.value = 1;
      }
      let parent = ele.parentElement;
      parent = parent.parentElement;
      console.log(parent);
      let price = parent.querySelector("#price").innerHTML;
      console.log("This", price);
      price = price.slice(5).split(",");
      price = price.join("");
      // console.log("de", price);
      // console.log(ele.value);
      parent.querySelector(".total-amount").innerHTML =
        "Rs:₹" + parseInt(price) * parseInt(ele.value);
      totalAmount();
    });
  });

  function totalAmount() {
    let amount = 0;
    const amount1 = document.querySelector(".total");
    let totalAmount = document.querySelectorAll(".total-amount");
    totalAmount.forEach((ele) => {
      let s = ele.innerHTML.slice(5).split(",");
      s = s.join("");
      // console.log("s:", s);
      console.log(parseInt("parse:", s));
      amount += parseInt(s);
    });
    amount1.innerHTML = "Rs: ₹" + amount;
  }

  totalAmount();

  const trashBin = document.querySelectorAll(".trashbin");

  trashBin.forEach((ele) => {
    ele.addEventListener("click", () => {
      let parent = ele.parentElement;
      parent = parent.parentElement;
      console.log(parent);
      parent.remove();
      parent.innerHTML = "";
      const countItem = document.querySelector(".card-items");
      document.querySelector(".count").innerHTML = countItem.rows.length;
      totalAmount();
    });
  });
}
