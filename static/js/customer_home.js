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
                console.log(reservation);
                reservation.pickup_date = new Date(reservation.pickup_date);
                reservation.return_date = new Date(reservation.return_date);
                if(reservation.payment_date != null)
                    reservation.payment_date = new Date(reservation.payment_date);
                //convert to yyyy-mm-dd format
                reservation.pickup_date = reservation.pickup_date.getFullYear() + '-' + (reservation.pickup_date.getMonth() + 1) + '-' + reservation.pickup_date.getDate();
                reservation.return_date = reservation.return_date.getFullYear() + '-' + (reservation.return_date.getMonth() + 1) + '-' + reservation.return_date.getDate();
                if(reservation.payment_date != null)
                    reservation.payment_date = reservation.payment_date.getFullYear() + '-' + (reservation.payment_date.getMonth() + 1) + '-' + reservation.payment_date.getDate();

                
                var row = '<tr><td>' + reservation.reservation_no + '</td><td>' + reservation.plate_id + '</td><td>' + reservation.pickup_date+ '</td><td>' + reservation.return_date + '</td><td>' + reservation.model + '</td><td>' + reservation.make + '</td><td>' + reservation.year + '</td><td>' + reservation.revenue + '</td>';
                //check if payment_date is null
                if (reservation.payment_date == null) {
                    //if null, add button to pay
                    row += '<td> <button type="button" class="btn btn-outline-success pay-button" id="' + reservation.reservation_no + '">Pay</button></td> </tr>';
                }else{
                    //if not null, add payment date
                    row+= '<td>' + reservation.payment_date + '</td> </tr>';
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