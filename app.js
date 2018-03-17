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

    return {
        addItem: function(type, description, value) {
            var newItem;
            var ID;

            // generate unique id
            if(data.allItems[type].length > 0) {
                // check the last id and increment
               ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 1;
            }

            // create exp or inc objects
            if(type === 'exp') {
                newItem = new Expense(ID, description, value);
            } else if(type === 'inc') {
                newItem = new Income(ID, description, value);
            }

            // add new item to data array, return it
            data.allItems[type].push(newItem);
            return newItem;
        },
        test: function() {
            console.log(data.allItems);
        }
    }

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

        // add the item to the budget controller
        budgetCtrl.addItem(input.type, input.description, input.value);

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