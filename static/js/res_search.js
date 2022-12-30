let currentDiv = $(".ajax");
        //create table inside the center div
        let table = $("<table></table>").addClass("table table-striped table-success");
        //put table inside the center div
        
        $(".sumbit-button").click(function (e) {
            currentDiv.empty();
            table.empty();
            let header=$("<h3></h3>").addClass("display-6 black padd-down");
            currentDiv.append(header);
            let start_date = $("[name='start_date']").val()
            let end_date = $("[name='end_date']").val()
            currentDiv.append(table);
            //make a request to the server
            $.ajax({
                url: "/get-reservations-within-period",
                type: "POST",
                data: {
                    start_date: start_date,
                    end_date: end_date
                },
                success: function (data) {
                    if(data.message != "success"){
                        alert(data.message);//error in the database 
                        return;
                    }
                    console.log(data);
                    if (data.reservation.length > 0) {
                        
                        //create table header
                        let thead = $("<thead></thead>");
                        let tr = $("<tr></tr>");
                        tr.append($("<th></th>").text("Reservation No"));
                        tr.append($("<th></th>").text("Customer SSN"));
                        tr.append($("<th></th>").text("Customer First Name"));
                        tr.append($("<th></th>").text("Customer Last Name"));
                        tr.append($("<th></th>").text("Customer Email"));
                        tr.append($("<th></th>").text("Customer Phone"));
                        tr.append($("<th></th>").text("Plate ID"));
                        tr.append($("<th></th>").text("Car Model"));
                        tr.append($("<th></th>").text("Car Make"));
                        tr.append($("<th></th>").text("Car Year"));
                        tr.append($("<th></th>").text("Car Price/Hour"));
                        tr.append($("<th></th>").text("Reservation Date"));
                        tr.append($("<th></th>").text("Pick up Date"));
                        tr.append($("<th></th>").text("Return Date"));
                        tr.append($("<th></th>").text("Payment Date"));
                        thead.append(tr);
                        table.append(thead);
                        //create table body
                        let tbody = $("<tbody></tbody>");
                        for (let i = 0; i < data.reservation.length; i++) {
                            let tr = $("<tr></tr>");
                            //convert reserve_date, pickup_date, return_date, payment_date to date format
                            let reserve_date = new Date(data.reservation[i].reserve_date);
                            let pickup_date = new Date(data.reservation[i].pickup_date);
                            let return_date = new Date(data.reservation[i].return_date);
                            let payment_date = new Date(data.reservation[i].payment_date);
                            //convert to yyyy-mm-dd format
                            reserve_date = reserve_date.getFullYear() + "-" + (reserve_date.getMonth() + 1) + "-" + reserve_date.getDate();
                            pickup_date = pickup_date.getFullYear() + "-" + (pickup_date.getMonth() + 1) + "-" + pickup_date.getDate();
                            return_date = return_date.getFullYear() + "-" + (return_date.getMonth() + 1) + "-" + return_date.getDate();
                            payment_date = payment_date.getFullYear() + "-" + (payment_date.getMonth() + 1) + "-" + payment_date.getDate();
                            tr.append($("<td></td>").text(data.reservation[i].reservation_no));
                            tr.append($("<td></td>").text(data.reservation[i].ssn));
                            tr.append($("<td></td>").text(data.reservation[i].fname));
                            tr.append($("<td></td>").text(data.reservation[i].lname));
                            tr.append($("<td></td>").text(data.reservation[i].email));
                            tr.append($("<td></td>").text(data.reservation[i].phone_no));
                            tr.append($("<td></td>").text(data.reservation[i].plate_id));
                            tr.append($("<td></td>").text(data.reservation[i].model));
                            tr.append($("<td></td>").text(data.reservation[i].make));
                            tr.append($("<td></td>").text(data.reservation[i].year));
                            tr.append($("<td></td>").text(data.reservation[i].price));
                            tr.append($("<td></td>").text(reserve_date));
                            tr.append($("<td></td>").text(pickup_date));
                            tr.append($("<td></td>").text(return_date));
                            if(data.reservation[i].payment_date != null)
                                tr.append($("<td></td>").text(payment_date));
                            else
                                tr.append($("<td></td>").text("Not Paid Yet"));
                            tbody.append(tr);
                        }
                        table.append(tbody);
                    }
                    else
                        alert("No data found");
                },
            });
        });