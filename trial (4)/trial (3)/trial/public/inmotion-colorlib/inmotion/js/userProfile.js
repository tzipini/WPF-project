// JavaScript source code
function showDetials(username) {
    let req = $.ajax({
        url: '/getUser/' + username,
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            alert(data);
        },
        error: function (jqXHR, exception) {
            alert("Error")
        }
    })
}

function displayUserDetails() {
    alert("hi");
}