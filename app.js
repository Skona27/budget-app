// BUDGET CONTROLLER
var budgetController = (function() {


})();


// UI CONTROLLER
var UIController = (function() {


})();


// APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var ctrlAddItem = function() {
        // get the input

        // add the item to the budget controller

        // update the ui

        // calculate budget

        // display budget on the ui

        console.log("test");
    };

    // event listeners for adding new item
    document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function(event) {
        // check for enter keypress
        if(event.keyCode === 13) {
           ctrlAddItem();
        }
    });


})(budgetController, UIController);