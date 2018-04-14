var config = {
    apiKey: "AIzaSyCwDbNkPSJohyGHoqunAj_scT8XRK0kvgk",
    authDomain: "startmyday-58618.firebaseapp.com",
    databaseURL: "https://startmyday-58618.firebaseio.com",
    projectId: "startmyday-58618",
    storageBucket: "startmyday-58618.appspot.com",
    messagingSenderId: "1033136648561"
};
firebase.initializeApp(config);

let db = firebase.database();

$("#submit").on("click", function (event) {
    event.preventDefault();
    username = $("#username").val().trim();
    // console.log(username);

    db.ref("users")
        .orderByChild("userName")
        .equalTo(username)
        .once("value", function (data) {
            var user = data.val();
            console.log(user);
            if (user) {
                console.log("user");
                localStorage.setItem('localUser',username)
                window.location.href = "main.html";
            } else {
                console.log("not a user");
                M.toast({
                    html: 'User Not Found. Please create an account.'
                });
            }

        });

});