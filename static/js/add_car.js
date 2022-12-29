//add action listener to add photo button
var counter = 2;
document.getElementById("addPhoto").addEventListener("click", function(event) {
    event.preventDefault();
    //get element by name
    let photo = $("[name=photo" + counter + "]");
    //set hidden in photo to false
    photo.attr("hidden", false);
    counter++;
});


//add action listener to submit button
document.getElementById("submit-button").addEventListener("click", function(event) {
    event.preventDefault();
    let plate_id = $("[name=plate_id]").val();
    let model = $("[name=model]").val();
    let make = $("[name=make]").val();
    let year = $("[name=year]").val();
    let price = $("[name=price]").val();
    let photo1 = $("[name=photo1]").val();
    let photo2 = $("[name=photo2]").val();
    let photo3 = $("[name=photo3]").val();

    $.ajax({
        url: "/add-car",
        type: "POST",
        data: {
            plate_id: plate_id,
            model: model,
            make: make,
            year: year,
            price: price,
            photo1: photo1,
            photo2: photo2,
            photo3: photo3
        },
        success: function (data) {
            alert(data.message);
            window.location.href = "/office-home";
        },
    });
});