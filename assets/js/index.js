function on() {
    var loginState = document.getElementById("username").innerHTML;
    if (loginState != "Login")
    {
        console.log("loginState != Login");
        document.getElementById("loginOverlay").style.display = "none";
        document.getElementById("userOverlay").style.display = "block";
        document.getElementById("signinOverlay").style.display = "none";
    }
    else {
        console.log("loginState == Login");
        document.getElementById("loginOverlay").style.display = "block";
        document.getElementById("userOverlay").style.display = "none";
        document.getElementById("signinOverlay").style.display = "none";
    }

  }
  
  function off() {
      console.log("running off");
        document.getElementById("loginOverlay").style.display = "none";
        document.getElementById("userOverlay").style.display = "none";
        document.getElementById("signinOverlay").style.display = "none";
  }

function gotoMock()
{
    location.replace("mock.html");
}

function gotoProfile()
{
    location.replace("profile.html");
}

// Your web app's Firebase configuration
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('N c=["\\J\\P\\w\\a\\W\\p\\J\\D\\o\\D\\f\\A\\m\\e\\w\\u\\P\\V\\K\\X\\C\\x\\b\\w\\I\\Y\\U\\Z\\D\\d\\r\\10\\A\\l\\S\\u\\y\\u\\R","\\g\\t\\a\\n\\a\\z\\p\\a\\l\\a\\d\\b\\h\\i\\q\\F\\f\\C\\k\\d\\a\\m\\k\\a\\e\\e\\q\\g\\v\\y","\\t\\o\\o\\e\\m\\B\\L\\L\\g\\t\\a\\n\\a\\z\\p\\a\\l\\a\\d\\b\\h\\i\\q\\F\\f\\C\\k\\d\\a\\m\\k\\f\\v\\q\\g\\v\\y","\\g\\t\\a\\n\\a\\z\\p\\a\\l\\a\\d\\b\\h\\i","\\g\\t\\a\\n\\a\\z\\p\\a\\l\\a\\d\\b\\h\\i\\q\\a\\e\\e\\m\\e\\v\\o\\q\\g\\v\\y","\\b\\j\\i\\r\\s\\j\\h\\b\\A\\j\\b\\H","\\i\\B\\b\\j\\i\\r\\s\\j\\h\\b\\A\\j\\b\\H\\B\\11\\k\\d\\B\\j\\d\\G\\h\\s\\s\\G\\k\\r\\F\\x\\a\\h\\d\\b\\x\\E\\x\\i\\a\\H\\s","\\I\\l\\r\\17\\18\\19\\E\\u\\G\\I\\u\\E","\\f\\n\\f\\o\\f\\a\\K\\f\\w\\k\\J\\e\\e","\\a\\n\\a\\K\\p\\o\\f\\g\\m"];N O={13:c[0],16:c[1],15:c[2],14:c[3],12:c[4],1a:c[5],Q:c[6],T:c[7]};M[c[8]](O);M[c[9]]()',62,73,'||||||||||x61|x35|_0xe225|x62|x70|x69|x63|x34|x31|x39|x65|x2D|x73|x6E|x74|x79|x2E|x33|x37|x68|x4C|x6F|x7A|x64|x6D|x6B|x38|x3A|x72|x76|x36|x66|x32|x30|x47|x41|x6C|x2F|firebase|var|firebaseConfig|x49|appId|x45|x48|measurementId|x42|x56|x53|x59|x67|x4F|x54|x77|storageBucket|apiKey|projectId|databaseURL|authDomain|x5A|x4E|x52|messagingSenderId'.split('|'),0,{}))


// Authorization
var currentUser = "No User Now";

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
        off();
        document.getElementById("username").innerHTML = user.email;
        console.log("Logged In");
    } else {
      // No user is signed in.
      off();
      document.getElementById("username").innerHTML = "Login";
      console.log("Not Logged In");
    }
  });

function login()
{
    var user_email_id = document.getElementById("user_email_id").value;    
    var user_password = document.getElementById("user_password").value;
    currentUser = user_email_id;
    firebase.auth().signInWithEmailAndPassword(user_email_id, user_password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        //...
        alert("Error!!!" + errorMessage);
        console.log("Error!!!");
      });
}

function logout()
{
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        alert("Logout Successful");
      }).catch(function(error) {
        // An error happened.
        alert("Error!!!" + error);
      });
}

//SignUP

function signUp()
{
    document.getElementById("loginOverlay").style.display = "none";
    document.getElementById("userOverlay").style.display = "none";
    document.getElementById("signinOverlay").style.display = "block";
}

function signIn()
{
    var user_email_id = document.getElementById("S_enterEmail").value;    
    var user_password = document.getElementById("S_enterPassword").value;
    var user_name = document.getElementById("S_enterName").value;
    var user_class = document.getElementById("S_enterClass").value;

    var userRef = database.ref('users');

    var data = {
        email : user_email_id,
        name : user_name,
        class : user_class
    };

    userRef.push(data);

    firebase.auth().createUserWithEmailAndPassword(user_email_id, user_password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert("Error, Try Again!!!");
        console.log(errorMessage);
      });
    
      alert("Welcome aboard " + user_name +"!!!");
}


//Real-Time DataBase 
var database = firebase.database();

var ref = database.ref('name');

var noOfUsers = 0;

function nameEntered() {
    var name = document.getElementById("enterName").value;

    if (name == "")
        console.log("Enter your name!!!");
    else 
    {
        document.getElementById("textChange").innerHTML = name;
        noOfUsers++;
        console.log(noOfUsers);
        var data = {
            number : noOfUsers,
            name : name
        }
        ref.push(data);
        console.log("Name Entered");
    }
}

ref.on('value', getData, errData);

function getData(data)
{
	//console.log(data.val());
    var users = data.val();
    var keys = Object.keys(users);
    for (var i = 0; i < keys.length; i++)
    {
        var k = keys[i];
        var username = users[k].name;
        var noOfUsers = users[k].number;
        console.log(username, noOfUsers);
    }
}

function errData(err)
{
    alert("Error!!!");
    console.log("Error!!!");
	console.log(err);
}


function sendMessage()
{
    var message_name = document.getElementById("message_name").value;    
    var message_email = document.getElementById("message_email").value;
    var message_message = document.getElementById("message_message").value;

    var messageRef = database.ref('messages');

    var data = {
        name : message_name,
        email : message_email,
        message : message_message
    };

    messageRef.push(data);
    
    alert("Your Message has been sent. We'll surely get back to you soon.");
    
    document.getElementById("message_name").value = "";    
    document.getElementById("message_email").value = "";
    document.getElementById("message_message").value = "";
}

function otherCourse(){
    var course = document.getElementById("otherCourse").value;
    location.replace("https://www.youtube.com/results?search_query=" + course + "&sp=CAESAhAC");
    document.getElementById("otherCourse").value = "";
}

function resetCourse(){
    var course = document.getElementById("otherCourse").value;
    document.getElementById("otherCourse").value = "";
}