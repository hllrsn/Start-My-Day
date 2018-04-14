$(document).ready(function () {

    const config = {
        apiKey: "AIzaSyDKxbhfLyIhZDvq7CpT7Ate8pLAyrSjFM8",
        authDomain: "startmyday-58618.firebaseapp.com",
        databaseURL: "https://startmyday-58618.firebaseio.com",
        projectId: "startmyday-58618",
        storageBucket: "startmyday-58618.appspot.com",
        messagingSenderId: "1033136648561"
    };
    firebase.initializeApp(config);

    const database = firebase.database();
    const localUser = localStorage.getItem('localUser')
    console.log(localUser)

   

    let hasConfiguration = 1;
    let userName = "user";
    let fullName = "user"
    let events = ["work", "550 S 4th St Minneapolis", "07:55"];
    let destinationTitle = events[0];
    let destinationAddress = events[1];
    let arrivalTime = events[2];
    let homeBase = "1845 Aglen St Roseville";
    let queryURL = "https://maps.googleapis.com/maps/api/directions/json?";
    let embedKey = "AIzaSyDSCagDC4_ojyUv1k-8GuSelE_67iLSj3w"
    const geoKey = "AIzaSyCB5tndG-nx3Z8RR-fnmeyXrEgkTRhYqSs"
    // var directionsService = new google.maps.DirectionsService();

    function welcome(name) {
            $("#welcome").text("Welcome " + name + ",")
        }
    console.log(name);
    


    database.ref().on("value", function (snapshot) {
        console.log(snapshot.val().users)
        // let appUsers = snapshot.val().users;
        let userIsFound = "false"
        let userToCheck = localUser
        userIsFound = snapshot.val().users;

        fullName = userIsFound[userToCheck].fullName;
        welcome(fullName);

        userName = userIsFound[localUser].userName;
        destinationTitle = userIsFound[localUser].event[0];
        destinationAddress = userIsFound[localUser].event[1];
        $("#arrivalLocation").text(destinationAddress)
        let destinationPlus = destinationAddress.split(" ").join("+");
        homeBase = userIsFound[localUser].userAddress;
        let homeBasePlus = homeBase.split(" ").join("+")
        addressTransform(homeBasePlus)

        mapInjector(embedKey, homeBasePlus, destinationPlus)
    })
    
    

    


    // snapshot.forEach(function(childSnap){
    // console.log(childSnap.val().users.val());

    // })

    $("#logoutButton").on("click", function(){
        localStorage.setItem('localUser',undefined)
        window.location.href = "index.html"
    })


    function mapInjector(key, origin, destination){
        let injectMap = '<iframe  width="100%"  height="100%"  frameborder="0" style="border:0"  src="https://www.google.com/maps/embed/v1/directions?key=' + key + '&origin=' + origin + '&destination=' + destination + '" allowfullscreen></iframe>'
        $("#map").html(injectMap)
    }

    
    // let arrivalArray = arrivalTime.split(":");
    // let nowTime = moment().format("HH:mm");

    // let nowUnix = moment().unix();
    // let nowTimeArray = nowTime.split(":");

    // let n = parseInt(nowTimeArray[0]);
    // let a = parseInt(arrivalArray[0]);





    // if (n<a){
    //    doTodayMathThenCall();


    // } else {
    //     if (n===a) {

    //         let nm = parseInt(nowTimeArray[1])
    //         let am = parseInt(arrivalArray[1])
    //         if (nm<am) {
    //             doTodayMathThenCall();
    //         } else {
    //             doTomorrowMathThenCall();
    //         }
    //     }   
    //     doTomorrowMathThenCall();
    // }

    // function doTodayMathThenCall(){

    //     let nh = parseInt(nowTimeArray[0]);
    //     let nm = parseInt(nowTimeArray[1]);
    //     let ah = parseInt(arrivalArray[0]);
    //     let am = parseInt(arrivalArray[1]);
    //     console.log(nh,nm,ah,am)
    //     let arrivalUnix = nowUnix;

    //     let hDiff = ah-nh;
    //     arrivalUnix = arrivalUnix + (60*hDiff);

    //     while (nm < 59) {
    //         arrivalUnix = arrivalUnix + 60;
    //         nm++;

    //     }
    //     let x = 0;
    //     while (x<=am) {
    //         arrivalUnix = arrivalUnix + 60;
    //         x++;

    //     }
    //     doCallNow(arrivalUnix);

    // }

    // function doTomorrowMathThenCall(){

    //     let nh = parseInt(nowTimeArray[0]);
    //     let nm = parseInt(nowTimeArray[1]);
    //     let ah = parseInt(arrivalArray[0]);
    //     let am = parseInt(arrivalArray[1]);

    //     let arrivalUnix = nowUnix;

    //     while (nh < 23) {
    //         arrivalUnix = arrivalUnix + 3600;
    //         nh++;


    //     }

    //     while (nm < 59) {
    //         arrivalUnix = arrivalUnix + 60;
    //         nm++;

    //     }
    //     let i = 0;
    //     while (i<ah) {
    //         arrivalUnix = arrivalUnix + 3600;
    //         i++;            

    //     }
    //     let x = 0;
    //     while (x<=am) {
    //         arrivalUnix = arrivalUnix + 60;
    //         x++;

    //     }

    //     doCallNow(arrivalUnix);
    // }

    // function doCallNow(arrive) {
    //     let originString = "origin="+homeBasePlus;
    //     let destinationString = "destination="+destinationPlus;
    //     let arrivalString = "arrival_time="+arrive;
    //     let apiKey = "key=AIzaSyCzwsje2Kj1pj97lj81UmrEOmPci7988XU";

    //     queryURL = queryURL.concat(originString);
    //     queryURL = queryURL.concat("&"+destinationString);
    //     queryURL = queryURL.concat("&"+arrivalString);
    //     queryURL = queryURL.concat("&"+apiKey);
    //     console.log(queryURL)




    // var xhttp = new XMLHttpRequest();
    // xhttp.open("POST", queryURL, true);
    // xhttp.setRequestHeader("Content-Type","application/json");
    // xhttp.send();
    // var response = JSON.parse(xhttp.responseText);
    //***************************************************************************** */
    // let request = {
    //     origin: homeBasePlus,
    //     destination: destinationPlus,
    //     // arrival_time: arrive
    //     travelMode: 'DRIVING'
    // }

    // directionsService.route(request, function(response, status) {
    //     if (status == 'OK') {
    //       console.log(response);
    //     }
    //   });

    //****************************************************************************** */



    // fetch(queryURL, {method: 'GET', mode: 'no-cors'}).then(function(response){
    //     console.log('status',response.status)
    //     console.log(response);

    // })





    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', queryURL);

    // console.log(xhr)


    // $.getJSON(queryURL, function() {
    //     console.log(data)
    // })



    //     $.ajax({
    //         url: queryURL,
    //         method: "GET",
    //         dataType: 'json'
    //     }).then(function(response) {
    //         console.log(this)
    //     })
    // }
    function addressTransform(address){
        $.ajax({
            url: "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key="+geoKey,
            method: "GET"
    
        }).then(function(response){
            console.log(response)
            console.log(response.results[0].address_components[3].types[0])

            let condMarker = 0;
            let i = 0;

            while (condMarker === 0){
                console.log(i)
                let checkItem = response.results[0].address_components[i].types[0];
                console.log(checkItem)
                if (checkItem === "postal_code") {
                    console.log(response.results[0].address_components[i].long_name)
                    weatherCall(response.results[0].address_components[i].long_name);
                    condMarker = 1;
                }
                i++
            }


        })
    }
    
    function weatherCall(location){
        $.ajax({
            url: "https://api.wunderground.com/api/31f7570bfbcd751b/hourly10day/q/MN/"+location+".json",
            method: "GET"
        }).then(function (response) {
            console.log(response)
    
            let weatherNow = response.hourly_forecast[0].feelslike.english
            let weatherNowTime = response.hourly_forecast[0].FCTTIME.hour
            weatherNowTime = Math.abs((weatherNowTime - 12) * -1)
            // console.log(weatherNowTime)
    
            let counter = 0;
            for (let i=0;i<7;i++){
                let weatherDiv = "<div class='col s1' id='weatherDiv'>";
                let weatherTime = response.hourly_forecast[counter].FCTTIME.hour
                if (weatherTime === "0") {
                    weatherTime = "12:00 AM"
                }
                else if (weatherTime - 12 < 0){
                    weatherTime += ":00 AM"
                } else {
                    weatherTime -= 12
                    weatherTime += ":00 PM"
                }
                // let weatherTime = Math.abs((response.hourly_forecast[counter].FCTTIME.hour - 12) * -1)
                // weatherTime += ":00"
                if (counter === 0){
                    weatherTime = "Now"
                }
                weatherDiv += weatherTime + "<br>"
    
                weatherDiv += "<img src='./assets/images/"+response.hourly_forecast[counter].icon+".png' class='responsive-img'><br>";
    
                weatherDiv += response.hourly_forecast[counter].feelslike.english+"° F</div>"
                // console.log(weatherDiv)
                counter = counter + 1
                if(counter === 0){
                    $("#weatherZone").html("")
                }
                $("#weatherZone").append(weatherDiv)
    
    
            }
            let days = [null, "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
            let counter2 = 37-response.hourly_forecast[0].FCTTIME.hour;
    
            for (let i=0;i<7;i++){
                let weatherDiv = "<div class='col s1' id='weatherDiv'>";
                // let weatherTime = Math.abs((response.hourly_forecast[counter2].FCTTIME.hour - 12) * -1)
                var date = moment().add(i,'days').format('dddd');
                // date = date.add(i,'days')
                // console.log(date)
                // var dow = date.day();
                weatherDOW = date
                if (counter === 0){
                    weatherDOW = "Today"
                }
                weatherDiv += weatherDOW + "<br>"
    
                weatherDiv += "<img src='./assets/images/"+response.hourly_forecast[counter2].icon+".png' class='responsive-img'><br>";
                // console.log(weatherDiv)
    
                weatherDiv += response.hourly_forecast[counter2].feelslike.english+"° F</div>"
                // console.log(weatherDiv)
                counter2 = counter2 + 24
                if(counter2 === 0){
                    $("#weatherZoneWeek").html("")
                }
                $("#weatherZoneWeek").append(weatherDiv)
    
    
            }
            
        })
    }
    



    // <div style="width: 100%"><iframe width="100%" height="500" src="https://maps.google.com/maps?width=100%&amp;height=500&amp;hl=en&amp;q=1845%20Aglen%20St&amp;ie=UTF8&amp;t=p&amp;z=13&amp;iwloc=B&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"><a href="https://www.maps.ie/create-google-map/">Embed Google Map</a></iframe></div><br />










    // let time1 = Math.round((new Date()).getTime() / 1000);
    // console.log(time1+"is unix time for now")

    // let time2 = new Date()
    // console.log(time2+"is just Date")

    // let time3 = ((new Date()).getTime())
    // console.log(time3+"is date.getTime")

    // console.log("test with own date")

    // let time4 = (("Sat Mar 31 2018 19:37:52 GMT-0500 (Central Daylight Time)").getTime());
    // console.log(time4+" is test wtih 7:30 PM");









    //https://maps.googleapis.com/maps/api/directions/json?origin=500+s+4th+st+minneapolis&destination=1845+aglen+st&key=AIzaSyDcyfK1TBzMPg3vSfH13tfFEdmX1imKe4Q

    //geolocation = AIzaSyDily5OeCJQzyEUkBoXCaYbu9CQ5HauYXU
    //directions = AIzaSyCzwsje2Kj1pj97lj81UmrEOmPci7988XU
    //maps = AIzaSyDhNrKK89X09tx7PxILd7CKgxLzbrQZRjs
    //embed = AIzaSyDSCagDC4_ojyUv1k-8GuSelE_67iLSj3w







});