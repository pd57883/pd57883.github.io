class Todo {
  constructor() {
    this.tasks = [];
    this.searchText = "";

    let tasksInStorage = localStorage.getItem("tasks");

    if (tasksInStorage !== null) {
      this.tasks = JSON.parse(tasksInStorage);
    }
  }

  saveToStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  getFilteredTasks() {
    if (this.searchText.length >= 2) {
      return this.tasks.filter((task) => {
        let name = task.name.toLowerCase();
        let searchText = this.searchText.toLowerCase();
        return name.includes(searchText);
      });
    } else {
      return this.tasks;
    }
  }

  draw() {
    let listContainer = document.querySelector(".list-container");
    listContainer.innerHTML = "";

    let filteredTasks = this.getFilteredTasks();

    for (let i = 0; i < filteredTasks.length; i++) {
      let task = filteredTasks[i];

      let listItem = document.createElement("div");
      listItem.className = "list-item";

      let listItemCheckboxName = document.createElement("div");
      listItemCheckboxName.className = "list-item-checkbox-name";

      let listItemCheckbox = document.createElement("input");
      listItemCheckbox.type = "checkbox";
      listItemCheckbox.className = "list-item-checkbox";

      let listItemName = document.createElement("span");
      listItemName.className = "list-item-name";

      if (this.searchText.length >= 2) {
        let splitText = task.name.split(this.searchText);
        listItemName.innerHTML = splitText.join("<mark>" + this.searchText + "</mark>");
      } else {
        listItemName.innerHTML = task.name;
      }

      listItemCheckboxName.appendChild(listItemCheckbox);
      listItemCheckboxName.appendChild(listItemName);

      let listItemDate = document.createElement("span");
      listItemDate.className = "list-item-date";
      listItemDate.innerText = task.date;

      let listItemDelete = document.createElement("button");
      listItemDelete.className = "list-item-delete";
      listItemDelete.innerText = "Usuń";

      listItemDelete.onclick = () => {
        this.remove(task.id);
      };

      listItem.appendChild(listItemCheckboxName);
      listItem.appendChild(listItemDate);
      listItem.appendChild(listItemDelete);

      listContainer.appendChild(listItem);
    }
  }

  add(name, date) {
    if (name.length < 3) {
      alert("Błąd: Nazwa zadania musi mieć nie mniej niż 3 znaki!");
      return;
    }

    if (name.length > 255) {
      alert("Błąd: Nazwa zadania musi mieć nie więcej niż 255 znaków!");
      return;
    }

    if (date !== "") {
      let inputDate = new Date(date);

      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if (inputDate < currentDate) {
        alert("Błąd: Data nie może być z przeszłośći!");
        return;
      }
    }

    this.tasks.push({
      id: Date.now(),
      name: name,
      date: date
    });

    this.saveToStorage();
    this.draw();
  }

  remove(id) {
    let newTasks = [];

    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id !== id) {
        newTasks.push(this.tasks[i]);
      }
    }

    this.tasks = newTasks;

    this.saveToStorage();
    this.draw();
  }

  edit(id, name, date) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        this.tasks[i].name = name;
        this.tasks[i].date = date;
      }
    }

    this.saveToStorage();
    this.draw();
  }
}

document.todo = new Todo();

window.onload = () => {
  document.todo.draw();

  let newItemName = document.getElementById("new-item-name");
  let newItemDate = document.getElementById("new-item-date");
  let newItemSave = document.getElementById("new-item-save");

  newItemSave.onclick = () => {
    document.todo.add(newItemName.value, newItemDate.value);
    newItemName.value = "";
    newItemDate.value = "";
  };

  let searchBar = document.getElementById("search-bar");

  searchBar.onkeyup = () => {
    document.todo.searchText = searchBar.value;
    document.todo.draw();
  };
};
