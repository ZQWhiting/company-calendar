$(document).ready(function() {
    var usernameInput = $("#username");
    var passwordInput = $("#password");
    //console.log("hello");
    $("#loginForm").on("submit", function(){
        //console.log("do this");
        event.preventDefault();
        var findUser = {
            username: usernameInput
              .val()
              .trim(),
            password: passwordInput
              .val()
              .trim()
        };
        console.log(findUser);
        $.post("/api/login", findUser, function(user) {
            //if "user" not empty redirect to /calendar, else display error
            console.log(user);
            if(user !== null){
                sessionStorage.id = user.id;
                window.location.href = "/calendar";
            }
            else{
                alert("Incorrect login credentials");
            }
            //window.location.href = "/calendar";
        });
    });
});