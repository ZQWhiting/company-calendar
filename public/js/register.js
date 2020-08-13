$(document).ready(function() {
    var usernameInput = $("#username");
    var passwordInput = $("#password");
    var confPassInput = $("#rePassword");
    var fullName = $("#fullName");
    console.log("hello");
    $(".regForm").on("submit", function(){
        event.preventDefault();

        var username = usernameInput.val().trim();
        var password = passwordInput.val().trim();
        var confPassword = confPassInput.val().trim();
        //var fullName = fullName.val().trim();
        //console.log(fullName.val().trim());
        var firstName = fullName.val().trim().split(/ (.+)/)[0];
        var lastName = fullName.val().trim().split(/ (.+)/)[1];
        if(!lastName){
            lastName = " ";
        }
        if(firstName !== ""){
            if(username !== ""){
                if(password === confPassword && password !== ""){
                    var newUser = {
                        username : username,
                        password : password,
                        firstName : firstName,
                        lastName : lastName
                    };
                    //console.log(newUser);
                    $.post("/api/register", newUser, function() {
                        window.location.href = "/";
                    });
                }else{
                    alert("Passwords do not match");
                }
            }else{
                alert("Fill in username");
            }
        }
        else{
            alert("Fill in name");
        }

    });
});