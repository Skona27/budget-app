// BUDGET CONTROLLER
var budgetController = (function () {

    // function constructor to create expenses
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

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

    // setting up event listeners
    var setupListeners = function () {

        // get the list of all dom elements
        var DOM = UICtrl.getDOM();

        // event listeners for adding new item
        DOM.addBtn.addEventListener("click", ctrlAddItem);

        document.addEventListener("keypress", function (event) {
            // check for enter keypress
            if (event.keyCode === 13) {
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function () {
        // get the input
        var input = UICtrl.getInput();
        console.log(input);

        // add the item to the budget controller

        // update the ui

        // calculate budget

        // display budget on the ui
    };

    return {
        // public initialization function
        init: function() { setupListeners(); },
    };

})(budgetController, UIController);


// init
controller.init();