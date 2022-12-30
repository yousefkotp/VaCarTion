document.getElementById("formmmm").addEventListener("submit", (event) => {
    event.preventDefault();
    let eligible = true;
    $.ajax({
        url: '/check-email-office',
        type: 'POST',
        async: false,
        data: {
            email: $('#email').val()
        },
        success: function (data) {
            if (data.taken == true) {
                eligible = false;
                alertify.alert("Email already exists, try to signin.").set('frameless', true);
            }
        }
    });
    $.ajax({
        url: '/check-phone-office',
        type: 'POST',
        async: false,
        data: {
            phone: $('#phone').val()
        },
        success: function (data) {
            if (data.taken == true) {
                eligible = false;
                //alert('Phone already exists');
                alertify.alert("Phone already exists.").set('frameless', true);


            }
        }
    });
    if ($('#pass1').val() != $('#pass2').val()) {
        eligible = false;
        //alert('Passwords do not match');
        alertify.alert("Passwords do not match.").set('frameless', true);
    }
    console.log(eligible);
    if (eligible === true) {
        $.ajax({
            url: "/office-signup",
            type: 'post',
            async: false,
            data: $("#formmmm").serialize(),
            success: function (data) {
                console.log(data);
                if (data.success == true)
                    var notification = alertify.notify('Signed up successfully, redirecting to signin page...', 'success', 3, function () { window.location.href = "/signin"; });
                else
                    var notification = alertify.notify('Error happenend, please contact the adminstrator', 'error');

            }
        });
    }
});
