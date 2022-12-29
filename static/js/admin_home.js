// action listener for logout button
$(".logout-button").click(function () {
    $.ajax({
        url: "/logout",
        type: "POST",
        success: function (response) {
            window.location.href = "/";
        }
    });
});
let mostRentedMake = null;
let mostProfitableOffice = null;

//ajax call to get the most rented model
$.ajax({
    url: "/get-most-rented-model",
    type: "POST",
    success: function (response) {
        $(".most-rented-span").text(response.mostRentedModel[0].model);
        $(".most-rented-number").text(response.mostRentedModel[0].count);
    }
});

//ajax call to get the most rented make
$.ajax({
    url: "/get-most-rented-make",
    type: "POST",
    success: function (response) {
        $(".most-rented-make-span").text(response.mostRentedMake[0].make);
        $(".most-rented-make-number").text(response.mostRentedMake[0].count);
    }
});
//ajax call to get the most profitable office
$.ajax({
    url: "/get-most-profitable-office",
    type: "POST",
    success: function (response) {
        $(".most-profitable-office-span").text(response.mostProfitableOffice[0].name);
        $(".most-profitable-office-revenue").text(response.mostProfitableOffice[0].total);
    }
});