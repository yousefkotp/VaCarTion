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
                            tr.append($("<td></td>").text(data.reservation[i].reservation_no));
                            tr.append($("<td></td>").text(data.reservation[i].ssn));
                            tr.append($("<td></td>").text(data.reservation[i].fname));
                            tr.append($("<td></td>").text(data.reservation[i].lname));
                            tr.append($("<td></td>").text(data.reservation[i].email));
                            tr.append($("<td></td>").text(data.reservation[i].plate_id));
                            tr.append($("<td></td>").text(data.reservation[i].model));
                            tr.append($("<td></td>").text(data.reservation[i].reserve_date.substr(0,10)));
                            tr.append($("<td></td>").text(data.reservation[i].pickup_date.substr(0,10)));
                            tr.append($("<td></td>").text(data.reservation[i].return_date.substr(0,10)));
                            if(data.reservation[i].payment_date == null)
                                tr.append($("<td></td>").text("Not Paid"));
                            else
                                tr.append($("<td></td>").text(data.reservation[i].payment_date.substr(0,10)));
                            tbody.append(tr);
                        }
                        table.append(tbody);
                    }
                    else
                        alert("No data found");
                },
            });
        });