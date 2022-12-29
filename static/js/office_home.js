let status = ["Available", "In Maintainance", "Being Cleaned", "Rented"];

// wait for the DOM to be loaded
$(document).ready(function () {
    $.ajax({
        url: '/get-office-name',
        type: 'POST',
        success: function (data) {
            $('.office-name').text(data.office[0].name);
        }
    });
    //make post request to get-customer-reservation
    $.ajax({
        url: '/get-office-reservation',
        type: 'POST',
        success: function (data) {
            console.log(data);
            //add data to table body
            for (var i = 0; i < data.reservations.length; i++) {
                var reservation = data.reservations[i];
                //var revenue = reservation.price * diffDays;
                var row = '<tr><td>' + reservation.reservation_no + '</td><td>' + reservation.plate_id + '</td><td>' + reservation.fname + " " + reservation.lname + '</td><td>' + reservation.reserve_date.substr(0, 10) + '</td><td>' + reservation.pickup_date.substr(0, 10) + '</td><td>' + reservation.return_date.substr(0, 10) + '</td><td>' + reservation.revenue + '</td></tr>';
                $('.office-reservation').append(row);
            }
        }
    });
    $.ajax({
        url: '/get-cars-using-office',
        type: 'POST',
        success: function (data) {
            //add data to table body
            for (var i = 0; i < data.cars.length; i++) {
                var car = data.cars[i];
                console.log(car);
                var d = new Date(car.registration_date);
                status.unshift(status[Number(car.status_code)]);
                var status_codes = status.filter((element, index) => {
                    return status.indexOf(element) === index;
                });
                var row = '<tr><td>' + car.plate_id + '</td>' + "<TD> <select>\
                         <option value=\"saab\">"+ status_codes[0] + "</option>\
                         <option value=\"volvo\">" + status_codes[1] + "</option>\
                         <option value=\"mercedes\">"+ status_codes[2] + "</option>\
                         <option value=\"audi\">"+ status_codes[3] + "</option>\
                    </select>\
                 </TD><td>" + car.registration_date.substr(0, 10) + '</td><td>' + car.make + '</td><td>' + car.model + '</td><td>' + car.year + '</td><td>' + car.price +
                    "<td><button style=\"padding: 0\;border: none\;background: none\; \"><img src=\"/remove.png\" width=25 height=25> </button></td>" + '</td></tr>';
                $('.office-cars').append(row);
            }
        }
    });

    $('.office-cars').on('click', 'select', function (e) {
        var new_status = status.indexOf($(this).find(":selected").text()) - 1;
        console.log(new_status);
        //console.log($(this).closest('tr').children('td:first').text());
        $.ajax({
            url: "/add-new-status",
            type: "POST",
            data: {
                plate_id: $(this).closest('tr').children('td:first').text(),
                status: new_status
            },
            success: function (response) {
                //window.location.href = "/";
                console.log(response);
                if (response.success)
                    alert("Status Updated Successfully")
            },
            error: function (response) {
                console.log(response);
            }
        });

    });
    $('.office-cars').on('click', 'button', function (e) {
        //console.log($(this).closest('tr').children('td:first').text());
        $(this).closest('tr').remove();
        $.ajax({
            url: "/delete-car",
            type: "POST",
            data: {
                plate_id: $(this).closest('tr').children('td:first').text()
            },
            success: function (response) {
                //window.location.href = "/";
                console.log(response);
            }
        });
    });
    $(".logout-button").click(function () {
        $.ajax({
            url: "/logout",
            type: "POST",
            success: function (response) {
                window.location.href = "/";
            }
        });
    });

    $("#add_car_btn").click(function () {
        $.ajax({
            url: "/add-car",
            type: "GET",
            success: function (response) {
                window.location.href = "/add-car";
            }
        });
    });
});