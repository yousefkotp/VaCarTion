// wait for the DOM to be loaded
$(document).ready(function () {
    //make post request to get-customer-name
    $.ajax({
        url: '/get-customer-name',
        type: 'POST',
        success: function (data) {
            //add name to customer-name class
            $('.customer-name').text(data.customer[0].fname + ' ' + data.customer[0].lname);
        }
    });
    //make post request to get-customer-reservation
    $.ajax({
        url: '/get-customer-reservation',
        type: 'POST',
        success: function (data) {
            //add data to table body
            for (var i = 0; i < data.reservation.length; i++) {
                var reservation = data.reservation[i];
                var row = '<tr><td>' + reservation.reservation_no + '</td><td>' + reservation.plate_id + '</td><td>' + reservation.pickup_date.substr(0, 10) + '</td><td>' + reservation.return_date.substr(0, 10) + '</td><td>' + reservation.model + '</td><td>' + reservation.make + '</td><td>' + reservation.year + '</td><td>' + reservation.revenue + '</td>';
                //check if payment_date is null
                if (reservation.payment_date == null) {
                    //if null, add button to pay
                    row += '<td> <button type="button" class="btn btn-outline-success pay-button" id="' + reservation.reservation_no + '">Pay</button></td> </tr>';
                }else{
                    //if not null, add payment date
                    row+= '<td>' + reservation.payment_date.substr(0, 10) + '</td> </tr>';
                }
                $('.customer-reservation').append(row);
            }

            //add click event to pay button
            $(".pay-button").click(function () {
                //make post request to pay-reservation
                $.ajax({
                    url: "/pay-reservation",
                    type: "POST",
                    data: {
                        reservation_no: this.id
                    },
                    success: function (response) {
                        var notification = alertify.notify('Reservation Paid successfully', 'success', 3, function () { window.location.href = "/customer-home"; });
                    }
                });
            });
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

$("#new_res").click(function () {
    $.ajax({
        url: "/reserve",
        type: "GET",
        success: function (response) {
            window.location.href = "/reserve";
        }
    });
});