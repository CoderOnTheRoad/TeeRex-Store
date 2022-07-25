const productArray=JSON.parse(localStorage.getItem("productList"));
// const productsContainer=document.getElementById("products-container");
let searchArr;
if(localStorage.getItem("searchArr")==undefined){
 searchArr=productArray;
}else{
    searchArr=JSON.parse(localStorage.getItem("searchArr"));
}

let filters= document.getElementsByClassName("filter");
console.log(filters);

for(let filter of filters){  
    filter.addEventListener("change",(event)=>{
        let filteredArr=[];
        productsContainer.innerHTML="";
        for(let selectedFilter of filters){
            if(selectedFilter.checked){
                let filterType=selectedFilter.getAttribute("data-type");
                if(filterType=="gender"){
                    let filterValue=selectedFilter.getAttribute("value");
                    // console.log(filterValue);
                    for(let product of searchArr){
                        // console.log(product.gender.toLowerCase())
                        if(product.gender.toLowerCase()==filterValue.toLowerCase()){
                            let index=filteredArr.indexOf(product);
                            if(index==-1){
                                filteredArr.push(product);
                            }
                        }
                    }
                }else if(filterType=="color"){
                let filterValue=selectedFilter.getAttribute("value");
                    // console.log(filterValue);
                    for(let product of searchArr){
                        // console.log(product.gender.toLowerCase())
                        if(product.color.toLowerCase()==filterValue.toLowerCase()){
                            let index=filteredArr.indexOf(product);
                            if(index==-1){
                                filteredArr.push(product);
                            }
                        }
                    }
                }else if(filterType=="type"){
                    let filterValue=selectedFilter.getAttribute("value");
                    for(let product of searchArr){
                        // console.log(product.gender.toLowerCase())
                        if(product.type.toLowerCase()==filterValue.toLowerCase()){
                            let index=filteredArr.indexOf(product);
                            if(index==-1){
                                filteredArr.push(product);
                            }
                        }
                    }
                }
            }
        }
        // }else if(){

        // }else{

        // }
        console.log(filteredArr);
        for(let product of filteredArr){
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
    })
    

}


