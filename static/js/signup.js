// add action listner to the form
document.getElementById('formmmm').addEventListener('submit', function(e) {
    e.preventDefault();
    let eligible = true;
    $.ajax({
        url: '/check-email-customer',
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
        url: '/check-ssn-customer',
        type: 'POST',
        async: false,
        data: {
            ssn: $('#ssn').val()
        },
        success: function (data) {
            if (data.taken == true) {
                eligible = false;
                alertify.alert("SSN already exists, try to signin.").set('frameless', true);
            }
        }
    });
    $.ajax({
        url: '/check-phone-customer',
        type: 'POST',
        async: false,
        data: {
            phone: $('#phone').val()
        },
        success: function (data) {
            if (data.taken == true) {
                eligible = false;
                alertify.alert("Phone already exists.").set('frameless', true);

            }
        }
    });
    if ($('#pass1').val() != $('#pass2').val()) {
        eligible = false;
        alertify.alert("Passwords do not match.").set('frameless', true);
    }
    if (eligible === true) {
        console.log(eligible);
        $.ajax({
            url: "/signup",
            type: 'post',
            async: false,
            data: $("#formmmm").serialize(),
            success: function (data) {
                var notification = alertify.notify('Signed up successfully, redirecting to signin page...', 'success', 3, function () {window.location.href = '/signin';});
            }
        });
    }
});