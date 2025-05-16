const addButton = document.getElementById("addButton");
const windowsNotes = document.getElementById("windowsNotes");
const saveButton = document.getElementById("saveButton");
const closeButton = document.getElementById("closeButton");
const notesCotainer = document.getElementById("notesCotainer");
const editNoteButton = document.getElementById("editNoteButton");
const clearButton = document.getElementById("clearButton");
const MYNOTES = "MyNotes";

var notes = JSON.parse(localStorage.getItem(MYNOTES)) || [];
drawingNotes(notes);

//Evento click del boton de agregar del header
addButton.addEventListener("click", function () {
  windowsNotes.classList.toggle("hidden");
  addButton.classList.toggle("hidden");

  //limpiar el text area
  const inputNotes = document.getElementById("inputNotes");
  inputNotes.value = "";
  inputNotes.focus();

  saveButton.classList.remove("hidden");
  saveButton.classList.add("flex");

  editNoteButton.classList.add("hidden");
  editNoteButton.classList.remove("flex");
});

//Evento click del boton de limpiar del header
clearButton.addEventListener("click", function () {
  notes = [];
  drawingNotes(notes);
});

//Evento click del boton de cerrar section windowsNotes
closeButton.addEventListener("click", function () {
  windowsNotes.classList.toggle("hidden");
  addButton.classList.toggle("hidden");
});

//Evento click del boton de guardar section windowsNotes
saveButton.addEventListener("click", function () {
  const inputNotes = document.getElementById("inputNotes");
  if (inputNotes.value.length != 0) {
    //creacion de Id unico con fecha (tutorial)
    const dateId = new Date();

    const newNotes = {
      id: dateId.getTime(),
      text: inputNotes.value,
      checked: false,
    };
    notes.push(newNotes);
    inputNotes.value = "";
    drawingNotes(notes);
  }

  windowsNotes.classList.toggle("hidden");
  addButton.classList.toggle("hidden");
});

//Evento click del boton de editar section windowsNotes
editNoteButton.addEventListener("click", function () {
  const inputNotes = document.getElementById("inputNotes");
  const inputId = document.getElementById("inputId");

  notes.forEach((note) => {
    if (inputId.value == note.id) {
      note.text = inputNotes.value;
    }
  });

  windowsNotes.classList.toggle("hidden");
  addButton.classList.toggle("hidden");

  drawingNotes(notes);
});

//Funcion para dibujar notas
function drawingNotes(notes) {
  //limpiar el contenedor de notas
  notesCotainer.innerHTML = "";

  //forEach para dibujar cada una de las notas en el contenedor
  notes.forEach((note) => {
    notesCotainer.innerHTML += `<div class="flex justify-between items-center">
            <div class="flex w-full gap-2">
              <input id="checkedId${note.id}" type="checkbox" ${
      note.checked ? "checked" : ""
    } class="accent-lime-600 size-4" />
              <div class="border-b-1 border-b-gray-700 w-11/12">${
                note.text
              }</div>
            </div>
            <div class="flex">
              <button id="editButton${
                note.id
              }" class="p-2 cursor-pointer group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="stroke-lime-700 group-hover:stroke-lime-600 group-hover:scale-150 transition-transform"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"
                  />
                  <path d="M13.5 6.5l4 4" />
                </svg>
              </button>
              <button id="deleteButton${
                note.id
              }" class="p-2 cursor-pointer group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="stroke-red-800 group-hover:stroke-red-700 group-hover:scale-150 transition-transform"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
            </div>
          </div>`;
  });

  //los eventos de los botones internos Edit, Delete y el checkbox
  notes.forEach((note) => {
    const editButton = document.getElementById("editButton" + note.id);
    editButton.addEventListener("click", function () {
      editNote(note);
    });

    const deleteButton = document.getElementById("deleteButton" + note.id);
    deleteButton.addEventListener("click", function () {
      deleteNote(note);
    });

    const checkedId = document.getElementById("checkedId" + note.id);
    checkedId.addEventListener("change", function (event) {
      note.checked = event.currentTarget.checked;
      localStorage.setItem(MYNOTES, JSON.stringify(notes));
    });
  });

  localStorage.setItem(MYNOTES, JSON.stringify(notes));
}

//Funcion para eliminar una nota
function deleteNote(note) {
  //buscar el indice del id de la nota en el array de notas
  const index = notes.findIndex((noteArray) => {
    return noteArray.id == note.id;
  });
  //eliminar la nota segun el indice
  notes.splice(index, 1);
  //volver a dibujar las notas
  drawingNotes(notes);
}

//Funcion para editar una nota
function editNote(note) {
  windowsNotes.classList.toggle("hidden");
  addButton.classList.toggle("hidden");

  const inputNotes = document.getElementById("inputNotes");
  inputNotes.value = note.text;

  const inputId = document.getElementById("inputId");
  inputId.value = note.id;

  saveButton.classList.add("hidden");
  saveButton.classList.remove("flex");
  editNoteButton.classList.remove("hidden");
  editNoteButton.classList.add("flex");
}
