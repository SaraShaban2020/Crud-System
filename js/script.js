// ===============GlOPAL================
let siteName= document.getElementById("siteName");
let siteUrl= document.getElementById("siteUrl");
let btnAdd=document.getElementById("add");
let btnUpdate =document.getElementById("update");
let searchInput=document.getElementById("search");
let booksContainer ;
let index=0;
if(localStorage.getItem("books") ==null){
  booksContainer=[];
}else{
  booksContainer =JSON.parse(localStorage.getItem("books"));
    display()
}

// =================events===========
siteName.addEventListener("keyup",function(){
    validationName()
})
siteUrl.addEventListener("keyup",function(){ 
    validationUrl()
})
searchInput.addEventListener("keyup",function(){
   search()
})
btnAdd.addEventListener("click",function(){
   addBook()
})
// =====================function=======
// json javascript object notation (text formatting )
function addBook(){
 let book={
   name:siteName.value,
   url:siteUrl.value
 }
booksContainer.push(book)
console.log(booksContainer)
 localStorage.setItem("books",JSON.stringify(booksContainer));
 display()
 rest()
}
function deleteItem(id)
{
  booksContainer.splice(id,1);
  console.log(booksContainer)
  localStorage.setItem("books",JSON.stringify(booksContainer))
 display()
}
function search(){
    let book =``;
   for (let i = 0; i < booksContainer.length; i++) {
  
      if(booksContainer[i].name.toLowerCase().includes(searchInput.value)){
        book+=`
        <tr>
        <td>${booksContainer[i].name.toLowerCase().replaceAll(searchInput.value,`<span class="bg-warning">${searchInput.value}</span>`)}</td>
        <td><p class="small text-truncate" style="max-width: 300px;">${booksContainer[i].url}</p></td>
        <td>
            <div><span><i class="fa-solid fa-trash text-danger outline-danger" onclick="deleteItem(${i})"></i></span>
                <span><i class="fa-regular fa-pen-to-square text-warning outline-warning"></i></span>
            </div>
        </td>
      </tr>`
      }
     
   }
   document.getElementById("data").innerHTML=book;
}
function display(){
   let book =``;
   for(let i=0;i<booksContainer.length;i++){
    book +=`
    <tr>
    <td>${booksContainer[i].name}</td>
    <td><p class="small text-truncate" style="max-width: 300px;">${booksContainer[i].url}</p></td>
    <td>
        <div><span><i class="fa-solid fa-trash text-danger outline-danger" onclick="deleteItem(${i})"></i></span>
            <span><i class="fa-regular fa-pen-to-square text-warning outline-warning" onclick="setItem(${i})"></i></span>
        </div>
    </td>
  </tr>
    `
   }
   document.getElementById("data").innerHTML=book;
}
function rest(){
    siteName.value='';
    siteUrl.value=''
}
function setItem(id){
   siteName.value=booksContainer.at(id).name
   siteUrl.value=booksContainer.at(id).url
   btnAdd.classList.add("d-none");
   btnUpdate.classList.remove("d-none")
   index=id;

} 
function updateData(){
    let book={
        name:siteName.value,
        url:siteUrl.value
      }
    
    booksContainer.splice(index,1,book);  
    localStorage.setItem("books",JSON.stringify(booksContainer))
}
btnUpdate.addEventListener("click",function(){
    updateData() 
})
// ==============validation===========
function validationName(){
   let styleRegex=/^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/
   if(styleRegex.test(siteName.value)){
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid")
   }else{
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
   }
}
function validationUrl(){
    let styleRegex= /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
   if(styleRegex.test(siteUrl.value)){
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid")
   }else{
    siteUrl.classList.add("is-invalid");
    siteUrl.classList.remove("is-valid");
   }
}


