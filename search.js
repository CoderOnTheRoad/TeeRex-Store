const searchButton=document.getElementById("search-button");
const searchInput= document.getElementById("search-input");
const productsContainer=document.getElementById("products-container");

const  productArr =JSON.parse(localStorage.getItem("productList"));


function showSearchResults(){
    let keyword=searchInput.value.toLowerCase();
    // console.log(cartList);
    localStorage.setItem("searchArr",JSON.stringify([]));
    if(keyword!=""){
        let searchArr=[];
        for(let item of productArr){
            let itemName=item.name.toLowerCase();
            let itemType=item.type.toLowerCase();
            let itemColor=item.color.toLowerCase();
            // console.log(itemName,itemType,itemColor);
            if(itemName.includes(keyword)||itemType.includes(keyword)|| itemColor.includes(keyword)){
                searchArr.push(item);
            }
        }
        localStorage.setItem("searchArr",JSON.stringify(searchArr));
        console.log(searchArr);
        productsContainer.innerHTML="";
        for(let product of searchArr){
            let divCard= document.createElement("div");
            divCard.classList.add("card");
            divCard.classList.add("card-product");
            divCard.innerHTML=`
                <img src=${product.imageURL} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.price}</p>
                    <a href="#" class="btn btn-primary" onClick="addToCart(this,productArr)" data-id="${product.id}">Add To Cart</a>
                </div>
            `
            productsContainer.appendChild(divCard);
        }

    }

}