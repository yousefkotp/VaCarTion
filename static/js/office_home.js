let refStatuss = ["Available", "In Maintainance", "Being Cleaned", "Rented"];

let statuss = ["Available", "In Maintainance", "Being Cleaned", "Rented"];

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
                //get date object for reservation_date, pickup_date, return_date
                reservation.reserve_date = new Date(reservation.reserve_date);
                reservation.pickup_date = new Date(reservation.pickup_date);
                reservation.return_date = new Date(reservation.return_date);
                //format in yyyy-mm-dd
                reservation.reserve_date = reservation.reserve_date.getFullYear() + '-' + (reservation.reserve_date.getMonth() + 1) + '-' + reservation.reserve_date.getDate();
                reservation.pickup_date = reservation.pickup_date.getFullYear() + '-' + (reservation.pickup_date.getMonth() + 1) + '-' + reservation.pickup_date.getDate();
                reservation.return_date = reservation.return_date.getFullYear() + '-' + (reservation.return_date.getMonth() + 1) + '-' + reservation.return_date.getDate();
                var row = '<tr><td>' + reservation.reservation_no + '</td><td>' + reservation.plate_id + '</td><td>' + reservation.fname + " " + reservation.lname + '</td><td>' + reservation.reserve_date + '</td><td>' + reservation.pickup_date + '</td><td>' + reservation.return_date+ '</td><td>' + reservation.revenue + '</td></tr>';
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
                statuss.unshift(statuss[Number(car.status_code)]);
                var status_codes = statuss.filter((element, index) => {
                    return statuss.indexOf(element) === index;
                });
                //convert registration date to date format
                let date = new Date(car.registration_date);
                //format in yyyy-mm-dd
                let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                var row = '<tr><td>' + car.plate_id + '</td>' + "<TD> <select>\
                         <option value=\"saab\">"+ status_codes[0] + "</option>\
                         <option value=\"volvo\">" + status_codes[1] + "</option>\
                         <option value=\"mercedes\">"+ status_codes[2] + "</option>\
                         <option value=\"audi\">"+ status_codes[3] + "</option>\
                    </select>\
                 </TD><td>" + formatted_date + '</td><td>' + car.make + '</td><td>' + car.model + '</td><td>' + car.year + '</td><td>' + car.price +
                    "<td><button style=\"padding: 0\;border: none\;background: none\; \"><img src=\"/remove.png\" width=25 height=25> </button></td>" + '</td></tr>';
                $('.office-cars').append(row);
            }
        }
    });
    //save the original status 
    var prev;
    $('.office-cars').on('click', 'select', function (e) {
        prev = $(this).find(":selected").text();
    });

    $('.office-cars').on('change', function (e) {
        if(prev == "Rented"){
            $(this).find(":selected").text(prev);
            alertify.notify("Can't change the status of currently rented car", 'error');
            return;
        }
        //get row where change happened
        var row = $(e.target).closest('tr');
        //get plate_id
        var plate_id = row.children('td:first').text();
        //get new status
        var new_status = refStatuss.indexOf($(this).find(":selected").text());
        if(new_status == 3){
            $(this).find(":selected").text(prev);
            alertify.notify("The office can't rent cars", 'error');            
            return;
        }
        $.ajax({
            url: "/add-new-status",
            type: "POST",
            data: {
                plate_id: plate_id,
                status: new_status
            },
            success: function (response) {
                console.log(response);
                if (response.success == true)
                    var notification = alertify.notify("Status Updated Successfully", 'success');

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