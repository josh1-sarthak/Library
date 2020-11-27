const shelf = document.querySelector('#shelf');
const button = document.querySelector('button');

button.addEventListener('click', addBookToLibrary);

let myLibrary = [];

class Book {
    constructor(title, author, pages, isRead){
        this.title=title; 
        this.author=author; 
        this.pages=pages;
        this.isRead= isRead;
    }

    toggleStatus(status){
        status = this.isRead;
        if (status==="yes"){
            status = "no";
        } else if (status==="no"){
            status = "yes";
        }
        return status;
    }
}

//object literals won't work here. can't call prototype function toggleStatus in statusBtn event listener because of them. that's why used object instantiation.
let buk1 = new Book("RONALISE", "james smith", 149, "yes"); 
let buk2 = new Book("TREPTOPH", "camisela wo", 678, "no");

myLibrary.push(buk1, buk2);
displayCards();

function addBookToLibrary() {
        const form = document.querySelector('form');
        let buk_title= form.querySelector('#title').value;
        let buk_author= form.querySelector('#author').value;
        let buk_pages= form.querySelector('#pages').value;
        let buk_isRead= form.querySelector('input[name="stat"]:checked').value;
        let buk = new Book(buk_title.toUpperCase(), buk_author, buk_pages, buk_isRead);
        myLibrary.push(buk);
        form.reset();
        displayCards();
    }

function displayCards() {
    shelf.innerHTML='';
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
            shelf.removeChild(card); //remove from DOM

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
        shelf.appendChild(card);
    })
}
