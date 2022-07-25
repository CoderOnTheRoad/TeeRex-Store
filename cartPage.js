const cartProductContainer=document.getElementById("cart-products-container");
let cartItems= JSON.parse(localStorage.getItem("cartList"));
let totalCartItems=document.getElementById("total-cart-items");
window.onload=function(){
    let totalCartItems=document.getElementById("total-cart-items");
    totalCartItems.innerHTML=`<p class="mb-0">${JSON.parse(localStorage.getItem("totalItems"))}</p>`; 
}
function showCartItems(){
    cartProductContainer.innerHTML="";
    
    //console.log(cartItems);
    
    for(let index=0;index<cartItems.length;index++){
     let element= document.createElement("div");
     element.classList.add("card");
     element.classList.add("mb-3");
     element.style.maxWidth="540px";
     element.innerHTML=     
     `<div class="row g-0">
        <div class="col-md-4">
            <img src="${cartItems[index].imageURL}" class="img-fluid rounded-start" alt="..." style="height:150px;width:150px;object-fit:cover;">
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${cartItems[index].name}</h5>
            <div style="width:300px;display:flex;flex-direction:row;justify-content:space-around;align-items:center;">
                <button type="button" class="btn" data-index=${index} onClick="decreaseCartQty(this)" id="decrease-button-${index}"><i class="fa-solid fa-minus"></i></button>
                <div style="display:inline-block;border:1px solid black;width:35px;height:35px;text-align:center;padding-top:5px;" id="displayCartQty-${index}">${cartItems[index].cartQty}</div>
                <button type="button" class="btn" data-index=${index} onClick="increaseCartQty(this)" id="increase-button-${index}"><i class="fa-solid fa-plus"></i></button>
                <button type="button" class="btn btn-danger" style="margin-left:50px" data-index=${index} onClick="deleteCartItem(this)"><i class="fa-solid fa-trash"></i></button>
            </div>
            <p class="card-text">Price: ${cartItems[index].price}</p>
            <h5 class="card-text" style="margin-left:60%" id="totalPriceDisplay-${index}">Total: ${cartItems[index].price*cartItems[index].cartQty}</h5>
            </div>
        </div>
     </div>`
     cartProductContainer.appendChild(element);
     let increaseButton=document.getElementById(`increase-button-${index}`);
     let decreaseButton=document.getElementById(`decrease-button-${index}`);
     if(cartItems[index].cartQty==0){
        decreaseButton.classList.remove("btn-danger");
        decreaseButton.classList.add("btn-secondary");
     }else{
        decreaseButton.classList.remove("btn-secondary");
        decreaseButton.classList.add("btn-danger");
     }
     if(cartItems[index].quantity>cartItems[index].cartQty){
        increaseButton.classList.remove("btn-secondary");
        increaseButton.classList.add("btn-success");
     }else{
        increaseButton.classList.remove("btn-success");
        increaseButton.classList.add("btn-secondary");
     }
        
    }
}
showCartItems();
function increaseCartQty(element){
    let index=element.getAttribute("data-index");
    if(cartItems[index].cartQty<cartItems[index].quantity){
        let cartQtyDisplay=document.getElementById(`displayCartQty-${index}`);
        let totalPriceDisplay=document.getElementById(`totalPriceDisplay-${index}`)
        cartItems[index].cartQty+=1;
        cartQtyDisplay.innerText=cartItems[index].cartQty;
        localStorage.setItem("totalItems",JSON.stringify(JSON.parse(localStorage.getItem("totalItems"))+1));
        totalCartItems.innerHTML=`<p class="mb-0">${JSON.parse(localStorage.getItem("totalItems"))}</p>`;
        totalPriceDisplay.innerText="Total: "+cartItems[index].cartQty*cartItems[index].price;
        localStorage.setItem("cartList",JSON.stringify(cartItems));
        let increaseButton=document.getElementById(`increase-button-${index}`);
        let decreaseButton=document.getElementById(`decrease-button-${index}`);
        if(cartItems[index].cartQty>0){
            decreaseButton.classList.remove("btn-secondary");
            decreaseButton.classList.add("btn-danger");
        }
        if(cartItems[index].cartQty>=cartItems[index].quantity){
            increaseButton.classList.remove("btn-success");
            increaseButton.classList.add("btn-secondary");
        }

    }else{
        window.alert("can not add more items");
        console.log("can not add more items");
    }

}
function decreaseCartQty(element){
    let index=element.getAttribute("data-index");
    if(cartItems[index].cartQty>0){
        let cartQtyDisplay=document.getElementById(`displayCartQty-${index}`);
        let totalPriceDisplay=document.getElementById(`totalPriceDisplay-${index}`)
        cartItems[index].cartQty-=1;
        cartQtyDisplay.innerText=cartItems[index].cartQty;
        localStorage.setItem("totalItems",JSON.stringify(JSON.parse(localStorage.getItem("totalItems"))-1));
        totalCartItems.innerHTML=`<p class="mb-0">${JSON.parse(localStorage.getItem("totalItems"))}</p>`;
        totalPriceDisplay.innerText="Total: "+cartItems[index].cartQty*cartItems[index].price;
        localStorage.setItem("cartList",JSON.stringify(cartItems));
        let increaseButton=document.getElementById(`increase-button-${index}`);
        let decreaseButton=document.getElementById(`decrease-button-${index}`);
        if(cartItems[index].cartQty==0){
            decreaseButton.classList.remove("btn-danger");
            decreaseButton.classList.add("btn-secondary");
        }
        if(cartItems[index].cartQty<cartItems[index].quantity){
            increaseButton.classList.remove("btn-secondary");
            increaseButton.classList.add("btn-success");
        }

    }
}

function deleteCartItem(element){
    let index=element.getAttribute("data-index");
    localStorage.setItem("totalItems",JSON.stringify(JSON.parse(localStorage.getItem("totalItems"))-cartItems[index].cartQty));
    totalCartItems.innerHTML=`<p class="mb-0">${JSON.parse(localStorage.getItem("totalItems"))}</p>`;
    cartItems.splice(index,1);
    localStorage.setItem("cartList",JSON.stringify(cartItems));
    document.location.reload();
}



