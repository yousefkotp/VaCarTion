let currentDiv = $(".ajax");
        let table = $("<table></table>").addClass("table table-striped table-success");
        let header=$("<h3></h3>").addClass("display-6 black padd-down");
        //remove header and table if they exist
        currentDiv.empty();
        
        //add event listener to the submit button
        document.querySelector('.submit-button').addEventListener('click', function (e) {
            
            currentDiv.append(header);
            header.text("Results");
            table.empty();
            //get values of all the inputs in a separate variable by name
            var make = document.querySelector('input[name="make"]').value;
            var model = document.querySelector('input[name="model"]').value;
            var year = document.querySelector('input[name="year"]').value;
            var plate_id = document.querySelector('input[name="plate_id"]').value;
            var ssn = document.querySelector('input[name="ssn"]').value;
            var fName = document.querySelector('input[name="fName"]').value;
            var lName = document.querySelector('input[name="lName"]').value;
            var email = document.querySelector('input[name="email"]').value;
            var phone_no = document.querySelector('input[name="phone_no"]').value;
            var reservation_date = document.querySelector('input[name="reservation_date"]').value;
            //post request to the /advanced-search endpoint
            $.post('/advanced-search', {
                make: make,
                model: model,
                year: year,
                plate_id: plate_id,
                ssn: ssn,
                fName: fName,
                lName: lName,
                email: email,
                phone_no: phone_no,
                reservation_date: reservation_date
            }, function (data) {
                //append the table to the div with id table
                $(".ajax").append(table);
                let thead = $("<thead></thead>");
                let tr = $("<tr></tr>");
                tr.append($("<th></th>").text("Reservation Number"));
                tr.append($("<th></th>").text("Plate ID"));
                tr.append($("<th></th>").text("Make"));
                tr.append($("<th></th>").text("Model"));
                tr.append($("<th></th>").text("Year"));
                tr.append($("<th></th>").text("Price/Day"));
                tr.append($("<th></th>").text("Reservation Date"));
                tr.append($("<th></th>").text("Pickup Date"));
                tr.append($("<th></th>").text("Return Date"));
                tr.append($("<th></th>").text("Payment Date"));
                tr.append($("<th></th>").text("Customer SSN"));
                tr.append($("<th></th>").text("Customer First Name"));
                tr.append($("<th></th>").text("Customer Last Name"));
                tr.append($("<th></th>").text("Customer E-Mail"));
                tr.append($("<th></th>").text("Customer Phone Number"));
                thead.append(tr);
                table.append(thead);
                console.log(data);
                let tbody = $("<tbody></tbody>");
                for (let i = 0; i < data.reservation.length; i++) {
                    //convert reserved date, pickup date, return date, and payment date to a readable format
                    let reserved_date = new Date(data.reservation[i].reserve_date);
                    let pickup_date = new Date(data.reservation[i].pickup_date);
                    let return_date = new Date(data.reservation[i].return_date);
                    let payment_date = new Date(data.reservation[i].payment_date);
                    //convert to yyyy-mm-dd format
                    reserved_date = reserved_date.getFullYear() + "-" + (reserved_date.getMonth() + 1) + "-" + reserved_date.getDate();
                    pickup_date = pickup_date.getFullYear() + "-" + (pickup_date.getMonth() + 1) + "-" + pickup_date.getDate();
                    return_date = return_date.getFullYear() + "-" + (return_date.getMonth() + 1) + "-" + return_date.getDate();
                    payment_date = payment_date.getFullYear() + "-" + (payment_date.getMonth() + 1) + "-" + payment_date.getDate();

                    let tr = $("<tr></tr>");
                    if(data.reservation[i].reservation_no == null)
                        tr.append($("<td></td>").text("No Results Found"));
                    else
                        tr.append($("<td></td>").text(data.reservation[i].reservation_no));
                    if(data.reservation[i].plate_id == null)
                        tr.append($("<td></td>").text("No Results Found"));
                    else
                        tr.append($("<td></td>").text(data.reservation[i].plate_id));
                    if(data.reservation[i].make == null)
                        tr.append($("<td></td>").text("No Results Found"));
                    else
                        tr.append($("<td></td>").text(data.reservation[i].make));
                    if(data.reservation[i].model == null)
                        tr.append($("<td></td>").text("No Results Found"));
                    else
                        tr.append($("<td></td>").text(data.reservation[i].model));
                    if(data.reservation[i].year == null)
                        tr.append($("<td></td>").text("No Results Found"));
                    else
                        tr.append($("<td></td>").text(data.reservation[i].year));
                    if(data.reservation[i].price == null)
                        tr.append($("<td></td>").text("No Results Found"));
                    else
                        tr.append($("<td></td>").text(data.reservation[i].price));
                    if(data.reservation[i].reserve_date == null)
                        tr.append($("<td></td>").text("No Results Found"));
                    else
                        tr.append($("<td></td>").text(reserved_date));
                    if(data.reservation[i].pickup_date == null)
                        tr.append($("<td></td>").text("No Results Found"));
                    else
                        tr.append($("<td></td>").text(pickup_date));
                    if(data.reservation[i].return_date == null)
                        tr.append($("<td></td>").text("No Results Found"));
                    else
                        tr.append($("<td></td>").text(return_date));
                    if(data.reservation[i].payment_date == null)
                        tr.append($("<td></td>").text("Not Paid Yet"));
                    else
                        tr.append($("<td></td>").text(payment_date));
                    if(data.reservation[i].ssn == null)
                        tr.append($("<td></td>").text("No Results Found"));
                    else
                        tr.append($("<td></td>").text(data.reservation[i].ssn));
                    if(data.reservation[i].fname == null)
                        tr.append($("<td></td>").text("No Results Found"));
                    else
                        tr.append($("<td></td>").text(data.reservation[i].fname));
                    if(data.reservation[i].lname == null)
                        tr.append($("<td></td>").text("No Results Found"));
                    else
                        tr.append($("<td></td>").text(data.reservation[i].lname));
                    if(data.reservation[i].email == null)
                        tr.append($("<td></td>").text("No Results Found"));
                    else
                        tr.append($("<td></td>").text(data.reservation[i].email));
                    if(data.reservation[i].phone_no == null)
                        tr.append($("<td></td>").text("No Results Found"));
                    else
                        tr.append($("<td></td>").text(data.reservation[i].phone_no));

                    tbody.append(tr);
                }
                table.append(tbody);
            });
        });