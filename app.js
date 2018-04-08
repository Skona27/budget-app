// BUDGET CONTROLLER
var budgetController = (function () {

    // function constructor to create expenses
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
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
        },
        budget: 0,
        percentage: -1
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function(item) {
            sum += item.value;
        });

        data.totals[type] = sum;
    }

    return {
        addItem: function (type, description, value) {
            var newItem;
            var ID;

            // generate unique id
            if (data.allItems[type].length > 0) {
                // check the last id and increment
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 1;
            }

            // create exp or inc objects
            if (type === 'exp') {
                newItem = new Expense(ID, description, value);
            } else if (type === 'inc') {
                newItem = new Income(ID, description, value);
            }

            // add new item to data array, return it
            data.allItems[type].push(newItem);
            return newItem;
        },
        test: function () {
            console.log(data.allItems);
        },

        calculateBudget: function () {
            // calculate totals
            calculateTotal("exp");
            calculateTotal("inc");

            // calculate the budget
            data.budget = data.totals.inc - data.totals.exp;

            // calculate percentage
            data.percentage = Math.round(100 * data.totals.exp / data.totals.inc);
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
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
        incomeList: document.querySelector(".income__list"),
        expenseList: document.querySelector(".expenses__list"),
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
                value: parseFloat(DOM.inputValue.value),
            };
        },

        addListItem: function (obj, type) {
            var html, id, description, value;
            var element;

            // assign object properties to the variables
            id = obj.id;
            description = obj.description;
            value = obj.value;

            // define html structure with item data
            if (type === 'inc') {
                // choose element list
                element = DOM.incomeList;

                // html income string
                html = '<div class="item clearfix" id="income-' + id + '"><div class="item__description">' + description + '</div><div class="right clearfix"><div class="item__value">+ ' + value + '</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOM.expenseList;

                // html exp string
                html = '<div class="item clearfix" id="expense-' + id + '"><div class="item__description">' + description + '</div><div class="right clearfix"><div class="item__value">- ' + value + '</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // update the UI
            element.insertAdjacentHTML('beforeend', html);
        },

        clearInputs: function () {
            // clear input values
            DOM.inputDesc.value = "";
            DOM.inputValue.value = "";

            // focus first input
            DOM.inputDesc.focus();
        }
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

    var updateBudget = function () {
        // calculate budget
        budgetCtrl.calculateBudget();

        // return the budget
        var budget = budgetCtrl.getBudget();

        // display budget on the ui
        console.log(budget);
    };

    var ctrlAddItem = function () {
        // get the input
        var input = UICtrl.getInput();

        // check if empty
        if (input.description !== "" && !isNaN(input.value) && parseFloat(input.value) > 0) {

            // add the item to the budget controller
            var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // update the ui
            UICtrl.addListItem(newItem, input.type);

            // clear inputs
            UICtrl.clearInputs();

            // calculate, update budget
            updateBudget();
        }
    };

    return {
        // public initialization function
        init: function () { setupListeners(); },
    };

})(budgetController, UIController);


// init
controller.init();