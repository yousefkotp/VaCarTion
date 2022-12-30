let currentDiv = $(".ajax");
        let table = $("<table></table>").addClass("table table-striped table-success");
        currentDiv.append(table);

        // action listner to submit button
        $(".sumbit-button").click(function (e) {
            table.empty();
            let header=$("<h3></h3>").addClass("display-6 black padd-down");
            currentDiv.append(header);

            // get the values from the input fields
            var ssn = $("[name=ssn]").val();
            //make a request to the server
            $.ajax({
                url: "/get-customer-reservation",
                type: "POST",
                data: {
                    ssn: ssn,
                },
                success: function (data) {
                    if(data.message != "success"){
                        alert(data.message);//error in the database 
                        return;
                    }
                    if (data.reservation.length > 0) {
                        
                        //create table header
                        let thead = $("<thead></thead>");
                        let tr = $("<tr></tr>");
                        tr.append($("<th></th>").text("Reservation No"));
                        tr.append($("<th></th>").text("Customer SSN"));
                        tr.append($("<th></th>").text("Customer First Name"));
                        tr.append($("<th></th>").text("Customer Last Name"));
                        tr.append($("<th></th>").text("Customer Email"));
                        tr.append($("<th></th>").text("Plate ID"));
                        tr.append($("<th></th>").text("Car Model"));
                        tr.append($("<th></th>").text("Reserve Date"));
                        tr.append($("<th></th>").text("Pick up Date"));
                        tr.append($("<th></th>").text("Return Date"));
                        tr.append($("<th></th>").text("Payment Date"));
                        
                        thead.append(tr);
                        table.append(thead);
                        //create table body
                        let tbody = $("<tbody></tbody>");
                        for (let i = 0; i < data.reservation.length; i++) {
                            let tr = $("<tr></tr>");
                            //get date object for reserve_date, pickup_date, return_date, payment_date
                            let reserve_date = new Date(data.reservation[i].reserve_date);
                            let pickup_date = new Date(data.reservation[i].pickup_date);
                            let return_date = new Date(data.reservation[i].return_date);
                            let payment_date = new Date(data.reservation[i].payment_date);
                            //format in yyyy-mm-dd
                            reserve_date = reserve_date.getFullYear() + "-" + (reserve_date.getMonth() + 1) + "-" + reserve_date.getDate();
                            pickup_date = pickup_date.getFullYear() + "-" + (pickup_date.getMonth() + 1) + "-" + pickup_date.getDate();
                            return_date = return_date.getFullYear() + "-" + (return_date.getMonth() + 1) + "-" + return_date.getDate();
                            payment_date = payment_date.getFullYear() + "-" + (payment_date.getMonth() + 1) + "-" + payment_date.getDate();

                            tr.append($("<td></td>").text(data.reservation[i].reservation_no));
                            tr.append($("<td></td>").text(data.reservation[i].ssn));
                            tr.append($("<td></td>").text(data.reservation[i].fname));
                            tr.append($("<td></td>").text(data.reservation[i].lname));
                            tr.append($("<td></td>").text(data.reservation[i].email));
                            tr.append($("<td></td>").text(data.reservation[i].plate_id));
                            tr.append($("<td></td>").text(data.reservation[i].model));
                            tr.append($("<td></td>").text(reserve_date));
                            tr.append($("<td></td>").text(pickup_date));
                            tr.append($("<td></td>").text(return_date));
                            if(data.reservation[i].payment_date == null)
                                tr.append($("<td></td>").text("Not Paid"));
                            else
                                tr.append($("<td></td>").text(payment_date));
                            tbody.append(tr);
                        }
                        table.append(tbody);
                    }
                    else
                        alert("No data found");
                },
            });
        });