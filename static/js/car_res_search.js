let currentDiv = $(".ajax");
        let header=$("<h3></h3>").addClass("display-6 black padd-down");
        currentDiv.append(header);

        let table = $("<table></table>").addClass("table table-striped table-success");
        
        currentDiv.append(table);
        // action listner to submit button
        $(".sumbit-button").click(function (e) {
            table.empty();
            header.text("Results");
            // get the values from the input fields
            var plate_id = $("[name=plate_id]").val();
            //make a request to the server
            $.ajax({
                url: "/get-car-reservation",
                type: "POST",
                data: {
                    plate_id: plate_id,
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
                        tr.append($("<th></th>").text("Reserve Date"));
                        tr.append($("<th></th>").text("Pickup Date"));
                        tr.append($("<th></th>").text("Return Date"));
                        tr.append($("<th></th>").text("Payment Date"));
                        tr.append($("<th></th>").text("Car Plate ID"));
                        tr.append($("<th></th>").text("Car Model"));
                        tr.append($("<th></th>").text("Car Make"));
                        tr.append($("<th></th>").text("Car Year"));
                        tr.append($("<th></th>").text("Car Price/Hour"));
                        thead.append(tr);
                        table.append(thead);
                        //create table body
                        let tbody = $("<tbody></tbody>");
                        for (let i = 0; i < data.reservation.length; i++) {
                            let tr = $("<tr></tr>");
                            tr.append($("<td></td>").text(data.reservation[i].reservation_no));
                            tr.append($("<td></td>").text(data.reservation[i].reserve_date.substr(0,10)));
                            tr.append($("<td></td>").text(data.reservation[i].pickup_date.substr(0,10)));
                            tr.append($("<td></td>").text(data.reservation[i].return_date.substr(0,10)));
                            if(data.reservation.payment_date == null)
                                tr.append($("<td></td>").text("Not Paid Yet"));
                            else
                                tr.append($("<td></td>").text(data.reservation[i].payment_date.substr(0,10)));
                            tr.append($("<td></td>").text(data.reservation[i].plate_id));
                            tr.append($("<td></td>").text(data.reservation[i].model));
                            tr.append($("<td></td>").text(data.reservation[i].make));
                            tr.append($("<td></td>").text(data.reservation[i].year));
                            tr.append($("<td></td>").text(data.reservation[i].price));
                            tbody.append(tr);
                        }
                        table.append(tbody);
                    }
                    else
                        alert("No data found");
                },
            });
            
        });