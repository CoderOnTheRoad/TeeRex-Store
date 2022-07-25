
async function loadData(){
    let result= await fetch("https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json")
    let data= await result.json();
    return data;
}

async function main() {
    //OPTION 2
    const productArr = await loadData();
    localStorage.setItem("productList",JSON.stringify(productArr));
    console.log(productArr);
    //initial view of page*************************************************************
    const productsContainer= document.getElementById("products-container");
    for(let product of productArr){
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
    // localStorage.setItem("productList",JSON.stringify(productArr));

}
////////////////////////////
//add to cart           ///
//////////////////////////
function initializeCartlistInLocalStorage(){
    if(localStorage.getItem("cartList")==undefined){
        localStorage.setItem("cartList",JSON.stringify([]));
        localStorage.setItem("totalItems",JSON.stringify(0));
    }
}

function findTheItemInCartListAndReturnTheIndexOfItem(id){
    let cartList=JSON.parse(localStorage.getItem("cartList"));
    let res=null;
    for(let i=0;i<cartList.length;i++){
        if(cartList[i].id==id){
            res=i;
            break;
        }
    }
    return res;
}
function findTheItemInProductArrAndReturnTheItem(id){
    let res;
    for(let product of productArr){
        if(product.id==id){
            res=product;
            break;
        }
    }
    return res;
}

function addToCart(element,productArr){
    let totalCartItems=document.getElementById("total-cart-items");
    let idOfProduct=element.getAttribute("data-id");
    initializeCartlistInLocalStorage();
    let cartList=JSON.parse(localStorage.getItem("cartList"));
    let index=findTheItemInCartListAndReturnTheIndexOfItem(idOfProduct);  
    if(index!=null){
        let product = cartList[index];
        if(product.quantity>product.cartQty){
            product.cartQty+=1;
            localStorage.setItem("cartList",JSON.stringify(cartList));
            localStorage.setItem("totalItems",JSON.stringify(JSON.parse(localStorage.getItem("totalItems"))+1));
            totalCartItems.innerHTML=`<p class="mb-0">${JSON.parse(localStorage.getItem("totalItems"))}</p>`;
        }else{
            window.alert("can not add more of this item");
            console.log("can not add more of this item");
        }
    }else{
        let product = findTheItemInProductArrAndReturnTheItem(idOfProduct);
        if(product.quantity>0){
            product.cartQty=1;
            cartList.push(product);
            localStorage.setItem("cartList",JSON.stringify(cartList));
            localStorage.setItem("totalItems",JSON.stringify(JSON.parse(localStorage.getItem("totalItems"))+1));
            totalCartItems.innerHTML=`<p class="mb-0">${JSON.parse(localStorage.getItem("totalItems"))}</p>`;
        }
    }
    console.log(localStorage.getItem("totalItems"));
}
window.onload=function(){
    let totalCartItems=document.getElementById("total-cart-items");
    let totalItems=JSON.parse(localStorage.getItem("totalItems"));
    if(totalItems==null){
        totalItems=0;
    }
    totalCartItems.innerHTML=`<p class="mb-0">${totalItems}</p>`;
    localStorage.removeItem("searchArr"); 
    main();
}






