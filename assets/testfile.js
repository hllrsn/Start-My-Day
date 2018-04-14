let foobar = 0;


function addFormRow(iter) {
    iter++;
    let rowID = "eventRow" + iter;
    let eventID = "event" + iter;
    let addressID = "address" + iter;
    let arrivalID = "arrivalTime" + iter;
    let addButtonID = "addButton" + iter;

    let newRow = '<div class="input-field col s4">    <input placeholder="Event" id="' + rowID + '" type="text" class="validate">    <label for="event">Where are you going today?</label></div>'

    $("#events").append(newRow);

    //click listener for the new button
    let addButtonID = "#" + addButtonID;
    $(addButtonID).on("click", function () {
        addFormRow(foobar);
    })

}