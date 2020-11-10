const container = document.querySelector('#container');
const button = document.querySelector('button');

button.addEventListener('click', addBookToLibrary);

let myLibrary = [];

function Book(title, author, pages, isRead){
    this.title=title 
    this.author=author 
    this.pages=pages
    this.isRead= isRead
}

Book.prototype.toggleStatus = function(status) {
    status = this.isRead;
    if (status==="yes"){
        status = "no";
    } else if (status==="no"){
        status = "yes";
    }
    return status;
}

//object literals won't work here. can't call prototype function toggleStatus in statusBtn event listener because of them. that's why used object instantiation.
let buk1 = new Book("RONALISE", "james smith", 149, "yes"); 
let buk2 = new Book("TREPTOPH", "camisela wo", 678, "no");
let buk3 = new Book("SILVOPLAY", "pas que toi", 341, "yes");

myLibrary.push(buk1, buk2, buk3);
displayCards();

function addBookToLibrary() {
        alert(`Input the book details as follows`);
        let buk_title= prompt(`Enter title`);
        let buk_author= prompt(`Enter author`);
        let buk_pages= Number(prompt(`Enter pages`));
        let buk_isRead= prompt(`Have you read the book?-enter yes OR no`);
        let buk = new Book(buk_title.toUpperCase(), buk_author, buk_pages, buk_isRead);
        myLibrary.push(buk);
        displayCards();
    }

function displayCards() {
    container.innerHTML='';
    myLibrary.map((book)=> {
        let card = document.createElement('div');
        let content =`
        <b> ${book.title} </b> <br>
        Author: ${book.author} <br>
        Pages: ${book.pages} <br>
        Read/Not:`
        card.innerHTML= content;
        let readStatus = document.createElement('p');
        readStatus.innerHTML=book.isRead;
        card.appendChild(readStatus);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent=`Remove`;
        deleteBtn.setAttribute('class', 'cardbtn');
        card.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', (e)=>{
            const index= myLibrary.indexOf(book); 
            if (index > -1) {
                myLibrary.splice(index, 1);   //remove from array
                }
            container.removeChild(card); //remove from DOM

        });

        const statusBtn = document.createElement('button');
        statusBtn.textContent=`Toggle Read`;
        statusBtn.setAttribute('class', 'cardbtn');
        card.appendChild(statusBtn);
        statusBtn.addEventListener('click', function() {
            book.isRead = book.toggleStatus();
            readStatus.innerHTML=book.isRead;

        });

        card.setAttribute('class', 'card');
        container.appendChild(card);
    })
}
