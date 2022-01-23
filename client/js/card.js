// KLASA KANBAN CARD
function Card(_id, name, id, order) {

  this.id = _id;
  this.name = name || "No card name given";
  this.colId = id;
  this.order = order;
  this.element = generateTemplate("card-template", { description: this.name }, "li");

console.log("OLD:" + oldIndex);
  //console.log(column_id)


  this.element.querySelector(".card").addEventListener("click", event => {
    event.stopPropagation();

    if (event.target.classList.contains("btn-delete")) {
      this.removeCard();
    }
  });
  //Rename card
  this.element.querySelector(".card-description").addEventListener("keydown", event => {
    var esc = event.which == 27,
      nl = event.which == 13,
      el = event.target,
      input = el.nodeName != "INPUT" && el.nodeName != "TEXTAREA",
      newText = el.innerHTML;
    var colId = this.element.parentElement.id;
    data = {
      name: newText,
      colId: colId
    };

    if (input) {
      if (esc) {
        document.execCommand("undo");
        el.blur();
      } else if (nl) {
        this.modifyCard(data);
        el.blur();
        event.preventDefault();
      }
    }
  });
  //Move card
  this.element.ondragend = () => {
    data = {
      cards: {
        name: this.name,
        _id: this.id,
        order: this.order
      },
      colId: colId,
      targetColId: targetColId,
      col_id: this.col_id,
      oldIndex: oldIndex,
      newIndex: newIndex
    };

    this.modifyCard(data);
  };
  console.log("I: " + oldIndex);
}

Card.prototype = {
  removeCard: function () {
    const data = {
      colId: this.colId
    }
    fetch(baseUrl + "/card/" + this.id, { method: "DELETE", headers: myHeaders, body: JSON.stringify(data) })
      .then(resp => resp.json())
      .then(resp => this.element.parentNode.removeChild(this.element))
      .catch(error => console.log("Błąd: " + error));
  },
  modifyCard: function (data) {
    fetch(baseUrl + "/card/" + this.id, { method: "PATCH", headers: myHeaders, body: JSON.stringify(data) })
      .then(resp => resp.json())
      .catch(error => console.log(error));
  }
};
