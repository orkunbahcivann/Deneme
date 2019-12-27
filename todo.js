// Tüm Elementleri Seçme
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const cardBody = document.querySelectorAll(".card-body")[0];
const cardBody2 = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();
function eventListeners(){  // Tüm event listenerlar
    
    form.addEventListener('submit', addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    cardBody2.addEventListener("click",Deletetodo);
};
    function Deletetodo(e){
        if(e.target.className === "fa fa-remove"){
            e.target.parentElement.parentElement.remove(); 
            deleteTodoStorage(e.target.parentElement.parentElement.textContent); 
            showAlert("success","Silme işlemi Başarılı.")    ;
        }
        
    }
    function deleteTodoStorage(deletetodo) {
        let todos = getTodoStorage();
        todos.forEach(function(todo,index){
            if(todo === deletetodo){
                todos.splice(index,1); // Arrayden değeri silebiliriz.
            }
        });
        localStorage.setItem("todos",JSON.stringify(todos));
    }
    function loadAllTodosToUI() {
        let todos = getTodoStorage();
        todos.forEach(function(todo){
            addTodoToUI(todo);
        });
    }
    function addTodo(e){

        const newTodo = input.value.trim();
        if(newTodo === ""){
           
            showAlert("danger","Lütfen bir TODO giriniz.");     //FONKSYİONUN PARAMETRELERİ
        }
        else{
            addTodoStorage(newTodo);   
            addTodoToUI(newTodo);
            showAlert("success","TODO başarıyla eklendi...")
            }
        e.preventDefault();
    }
    
    function getTodoStorage(){  // Storagedan bütün todoları alma
         
        let todos;

        if(localStorage.getItem("todos") === null){
            todos = [];   //Localstoreg key de todos değeri yok ise boş bir array oluştur.
        }
        else{
            todos = JSON.parse(localStorage.getItem("todos")); //Array'e çevirerek alınır.
        }
        return todos; // todos değerini döndürdü
        };
    

    function addTodoStorage(newTodo){
        let todos = getTodoStorage();  // foksiyonda dönen todos değerini alır.
        todos.push(newTodo);  // todos arrayine yeni todo ekler.sonuna
        localStorage.setItem("todos",JSON.stringify(todos));// Arrayi de localstorage'a ekler.
    }
    function showAlert(type,message){
        const alert = document.createElement("div");
        alert.className = `alert alert-${type}`;  //template literal
        alert.textContent = message;
        cardBody.appendChild(alert);

        //setTimeout

        setTimeout(function(){
            alert.remove();
        },1000);

    };
    function addTodoToUI(newTodo){  // String değerini list item olarak UI'ye ekleyecek.Ekleme en son childden başlayarak parenta doğru olmalı.
        //Link Oluşturma
        const Link = document.createElement("a");
        Link.href = "#";
        Link.className  ="delete-item";
        Link.innerHTML = "<i class = 'fa fa-remove'></i>"

        // ListItem Oluşturma 
        const newListItem = document.createElement("li");
        newListItem.className ="list-group-item d-flex justify-content-between";
        //Text Node ekleme 
        newListItem.appendChild(document.createTextNode(newTodo)); // newtodo yerine input.value.trim() yazılabilir.
        newListItem.appendChild(Link);
        

        // TodolİSTE LİST İTEM EKLEME
        todoList.appendChild(newListItem);
        input.value = "";

    };



