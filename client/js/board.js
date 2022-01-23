var board = {
  name: "Tablica Kanban",
  addColumn: function (column) {
    this.element.appendChild(column.element);
    initSortable(column.id);
  },
  element: document.querySelector("#board .column-container")
};

document.querySelector("#board .create-column").addEventListener("click", () => {
  var name = prompt("Enter a column name");
  if (name === null) {
    return;
  } else {
    var data = {
      name: name
    };

    fetch(baseUrl + "/column", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data)
    })
      .then((resp) => resp.json())
      .then((resp) => {
        var column = new Column(resp._id, name);
        console.log(`XXX: ${column}`)
        board.addColumn(column);
      })
      .catch((error) => console.log(error))
  }
});
var targetColId;
var colId;
var oldIndex;
var newIndex;
function initSortable(id) {
  var el = document.getElementById(id);
  var sortable = Sortable.create(el, {
    group: "kanban",
    sort: true,
    handle: ".handle",
    animation: 150,
    onEnd: function (evt) {
      oldIndex = evt.oldIndex;
      newIndex = evt.newIndex;
      console.log(oldIndex +" >> " + newIndex);
    },
    onAdd: function (evt) {
      targetColId = evt.to.id;
      colId = evt.from.id;
      oldIndex = evt.oldIndex;
      newIndex = evt.newIndex;
      console.log(oldIndex +" >> " + newIndex);
    }

  });
}
