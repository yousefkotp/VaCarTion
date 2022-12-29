let currentDiv = $(".ajax");
        let header=$("<h3></h3>").addClass("display-6 black padd-down");
        currentDiv.append(header);
        let table = $("<table></table>").addClass("table table-striped table-success");
        currentDiv.append(table);

        // action listner to submit button
        $(".submit-button").click(function (e) {
            table.empty();
            header.text("Results");
            // get the values from the input fields
            var date = $("[name=date]").val();
            //make a request to the server
            $.ajax({
                url: "/get-car-status-on-a-day",
                type: "POST",
                data: {
                    date: date,
                },
                success: function (data) {
                    if(data.message != "success"){
                        alert(data.message);//error in the database 
                        return;
                    }
                    //log the length of carStatus array
                    if (data.carStatus.length > 0) {
                        //create table header
                        let thead = $("<thead></thead>");
                        let tr = $("<tr></tr>");
                        tr.append($("<th></th>").text("Car Plate ID"));
                        tr.append($("<th></th>").text("Car Model"));
                        tr.append($("<th></th>").text("Car Make"));
                        tr.append($("<th></th>").text("Car Year"));
                        tr.append($("<th></th>").text("Car Price/Hour"));
                        tr.append($("<th></th>").text("Status"));
                        thead.append(tr);
                        table.append(thead);
                        //create table body
                        let tbody = $("<tbody></tbody>");
                        for (let i = 0; i < data.carStatus.length; i++) {
                            let tr = $("<tr></tr>");
                            tr.append($("<td></td>").text(data.carStatus[i].plate_id));
                            tr.append($("<td></td>").text(data.carStatus[i].model));
                            tr.append($("<td></td>").text(data.carStatus[i].make));
                            tr.append($("<td></td>").text(data.carStatus[i].year));
                            tr.append($("<td></td>").text(data.carStatus[i].price));
                            if(data.carStatus[i].status_code ==0)
                                tr.append($("<td></td>").text("Available"));
                            else if(data.carStatus[i].status_code ==1)
                                tr.append($("<td></td>").text("In maintenance"));
                            else if(data.carStatus[i].status_code ==2)
                                tr.append($("<td></td>").text("Being Cleaned"));
                            else if(data.carStatus[i].status_code ==3)
                                tr.append($("<td></td>").text("Rented"));
                            tbody.append(tr);
                        }
                        table.append(tbody);
                    }
                    else
                        alert("No data found");
                },
            });
            
        });