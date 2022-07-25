


//loading filters 
// localStorage.clear();
let filters= document.getElementsByClassName("filter");
if(localStorage.getItem("keepTrack")==undefined){
    localStorage.setItem("keepTrack",JSON.stringify([]));
}
let arrayToKeepTrackOfFilters=localStorage.getItem("keepTrack");
for(let filter of filters){
    const productArray=JSON.parse(localStorage.getItem("productList"));
    let filterType=filter.getAttribute("data-type").toLowerCase();
    let filterVal=filter.getAttribute("value").toLocaleLowerCase();
    filter.addEventListener("change",()=>{
            // const productsContainer=document.getElementById("products-container");
        
        let searchArr;
        if(localStorage.getItem("searchArr")==undefined){
        searchArr=productArray;
        }else{
            searchArr=JSON.parse(localStorage.getItem("searchArr"));
            //console.log("searchArr",searchArr);
        }
        //how many checked filters are there 
        if(filter.checked){
            //add the filter in keepTrackList
            addFilterToKeepTrack(filterType,filterVal);
            
        }else{
            //add the filter in keepTrackList
            removeFilterToKeepTrack(filterType,filterVal);
        }
        //run the common code 
        let arr=JSON.parse(localStorage.getItem("keepTrack"));
        let productSearchArr=searchArr;
        for(let item of arr ){
            if(localStorage.getItem("filteredArr")==undefined){
                localStorage.setItem("filteredArr",JSON.stringify([]));
            }
            let filteredArr=[];
            let type=item.type;
            let valArr=item.valueArr;
            for(let value of valArr){
                for(let product of productSearchArr){
                    if(type=="price"){
                        let priceArr=value.split("-");
                        let min=priceArr[0];
                        let max=priceArr[1];
                        if(product[type]>=min && product[type]<max){
                            filteredArr.push(product);
                        }
                    }else{
                        if(product[type].toLowerCase()==value.toLowerCase()){
                            filteredArr.push(product);
                        }
                    }
                }
            }
            productSearchArr=filteredArr;
            // console.log(filteredArr)
            localStorage.setItem("filteredArr",JSON.stringify(filteredArr));
        }
        if(arr.length==0){
            localStorage.setItem("filteredArr",JSON.stringify(searchArr));
        }
        let Arr=JSON.parse(localStorage.getItem("filteredArr"));
        console.log(Arr);
        productsContainer.innerHTML="";
        for(let product of Arr){
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

function addFilterToKeepTrack(filterType,filterValue){
    let arr=JSON.parse(localStorage.getItem("keepTrack"));
    let isSameTypeExists=-1;
    for(let filter of arr){
        if(filter.type==filterType){
            isSameTypeExists=0;
            //check if the value already exists or not
            //if the value doesnt exist then only push the value in the arrayof values
            let index=filter.valueArr.indexOf(filterValue);
            if(index==-1){
                filter.valueArr.push(filterValue);
            }
            // break;
        }
    }
    if(isSameTypeExists==-1){
        arr.push({type:filterType,valueArr:[filterValue]});
    }
    localStorage.setItem("keepTrack",JSON.stringify(arr));
    arr=JSON.parse(localStorage.getItem("keepTrack"));
    console.log(arr);
}
function removeFilterToKeepTrack(filterType,filterValue){
    let arr=JSON.parse(localStorage.getItem("keepTrack"));
    if(arr.length==0){
        localStorage.setItem("filteredArr",JSON.stringify(searchArr));
    }
    // let isSameTypeExists=-1;
    for(let filter of arr){
        if(filter.type==filterType){
            let index=filter.valueArr.indexOf(filterValue);
            if(index!=-1){
                filter.valueArr.splice(index,1);
            }
            if(filter.valueArr.length==0){
                let index=arr.indexOf(filter);
                arr.splice(index,1);
            }
        }
    }
    localStorage.setItem("keepTrack",JSON.stringify(arr));

    arr=JSON.parse(localStorage.getItem("keepTrack"));
    console.log(arr);
}