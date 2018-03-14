// BUDGET CONTROLLER
var budgetController = (function () {


})();


// UI CONTROLLER
var UIController = (function () {

    // list of all dom elements
    var DOM = {
        addBtn: document.querySelector(".add__btn"),
        inputType: document.querySelector(".add__type"),
        inputDesc: document.querySelector(".add__description"),
        inputValue: document.querySelector(".add__value"),
    };

    // return to the public
    return {
        // return list of dom elements
        getDOM: function () { return DOM; },
        // return data from the input
        getInput: function () {
            return {
                type: DOM.inputType.value,
                description: DOM.inputDesc.value,
                value: DOM.inputValue.value,
            };
        },
    };
})();


// APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    // get the list of all dom elements
    var DOM = UICtrl.getDOM();

    var ctrlAddItem = function () {
        // get the input
        var input = UICtrl.getInput();
        console.log(input);

        // add the item to the budget controller

        // update the ui

        // calculate budget

        // display budget on the ui

        console.log("test");
    };

    // event listeners for adding new item
    DOM.addBtn.addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function (event) {
        // check for enter keypress
        if (event.keyCode === 13) {
            ctrlAddItem();
        }
    });


})(budgetController, UIController);