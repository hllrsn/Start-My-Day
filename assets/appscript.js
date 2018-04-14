$(document).ready(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCwDbNkPSJohyGHoqunAj_scT8XRK0kvgk",
    authDomain: "startmyday-58618.firebaseapp.com",
    databaseURL: "https://startmyday-58618.firebaseio.com",
    projectId: "startmyday-58618",
    storageBucket: "startmyday-58618.appspot.com",
    messagingSenderId: "1033136648561"
  };
  firebase.initializeApp(config);

  let database = firebase.database();
  let PlusButton = 0;

  database.ref().on("value",function (snapshot){
    let localUserFound = localStorage.getItem("localUser")
    if (localUserFound === snapshot.val().users[localUserFound].userName){
      // console.log("user is "+localUserFound)
      let userData = snapshot.val().users[localUserFound]
      $("label").addClass("active")
      $("#userName").val(localUserFound)
      $("#name").val(userData.fullName)
      
      $("#home").val(userData.userAddress)
      $("#event0").val(userData.event[0])
      $("#address0").val(userData.event[1])
      $("#arrivalTime").val(userData.event[2])
    }
  })
  

  // $("#addButton0").on("click", function (e) {
  //   e.preventDefault();
  //   addFormRow(PlusButton);
  // });

  // function addFormRow(iter) {
  //   iter++;
  //   let rowID = "eventRow" + iter;
  //   let eventID = "event" + iter;
  //   let addressID = "address" + iter;
  //   let arrivalID = "arrivalTime" + iter;
  //   let addButtonID = "addButton" + iter;

  //   let newRow = '<div class="input-field col s4"id= ""' + rowID + '> <input placeholder="Event" id=""' + eventID + ' type="text" class="validate"> <label for="event">Where are you going today?</label> </div> <div class="input-field col s4"> <input id=""' + addressID + ' type="text" class="validate"> <label for="address">Address</label> </div> <div class="col s2"> <input id=""' + arrivalID + ' class="timepicker"><i class="material-icons">access_time</i> <label for="arrivalTime">Arrival Time</label> </div> <a class="btn-floating btn-medium waves-effect waves-light blue" id="addButton0"><i class="material-icons">add</i></a> <a class="btn-floating btn-medium waves-effect waves-light blue" id="removeButton0"><i class="material-icons">remove</i></a>'
  //   console.log(newRow)
  //   $("#events").append(newRow);

  //   //click listener for the new button
  //   let addButtonID = "#" + addButtonID;
  //   $(addButtonID).on("click", function () {
  //     addFormRow(i);
  //   })

  // }

  // Click Listener for adding users
  $("#submit").on("click", function (e) {
    e.preventDefault();
    let username = ""
    let name = ""
    let homeAddress = ""
    let eventTitle = ""
    let eventAddress = ""
    let eventTime = ""
    let eventArr = []

    // Grabs user input
    username = $("#userName").val().trim();
    name = $("#name").val().trim();
    // let randomFun = $("#giphy").val().trim();
    homeAddress = $("#home").val().trim();
    eventTitle = $("#event0").val().trim();
    eventAddress = $("#address0").val().trim();
    eventTime = $("#arrivalTime").val().trim();
    eventArr = [eventTitle, eventAddress, eventTime]
    console.log(username);

    // let username = "jimbob"
    // let name = "jim"
    // let randomFun = "cats"
    // let homeAddress = "1845 Aglen St"
    // let eventTitle = "work"
    // let eventAddress = "550 s 4th st"
    // let eventTime = "7:00"
    // let eventArr = [eventTitle, eventAddress, eventTime]

    // function redirect()
    // {
    // var url = "main.html";
    // window.location(url);

    database.ref('users/'+username).set({
      userName: username,
      fullName: name,
      event: eventArr,
      userAddress: homeAddress
    })
    localStorage.setItem('localUser',username)


    window.location.href = "main.html";



    // Creates local "temporary" object for holding user data
    // let newUser = {
    //   userName: userName,
    //   name: name,
    //   event0: event0,
    //   address0: address0,
    //   arrivalTime: arrivalTime,
    //   dateAdded: firebase.database.ServerValue.TIMESTAMP
    // };

    // console.log(newUser)

    // // Uploads user data to the database
    // database.ref().push(newUser);


    // Push to Firebase
    // db.ref('users').push(newUser);

    // Logs everything to console
    // console.log(newUser.userName);
    // console.log(newUser.name);
    // console.log(newUser.event0);
    // console.log(newUser.address0);
    // console.log(arrivalTime);
    // console.log(newUser.dateAdded);

    // Alert
    // M.toast({
    //                 html: 'User successfully added'
    //             })

  })
  // Create Firebase event for adding users to the database 
  // db.ref().on("child_added", function (childSnapshot, prevChildKey) {

  //   console.log(childSnapshot.val());

  //   // Store everything into a variable.
  //   let userName = childSnapshot.val().userName;
  //   let name = childSnapshot.val().name;
  //   let event = childSnapshot.val().event0;
  //   let address = childSnapshot.val().address0;
  //   let dateAdded = childSnapshot.val().dateAdded;

  //   // User Info
  //   console.log(userName);
  //   console.log(name);
  //   console.log(event);
  //   console.log(address);
  //   console.log(dateAdded);
  // });

  function save(user) {
    var isAlreadyInserted = false;
    //loop through your username array to check
    for (var i = 0; i < username.length; i++) {
      if (userName[i] === currentUserName) {
        isAlreadyInserted = true;
      }
    }
    // Get the username array from localStorage if available, or create an empty array
    if (username.indexOf(user.value) === -1) {
      username.push(user.value);
    }

    // Convert the array into string and then store in the localStorage
    localStorage.setItem('userName', userName.toString());
  }
  // console.log("saving stuff to local storage")

})