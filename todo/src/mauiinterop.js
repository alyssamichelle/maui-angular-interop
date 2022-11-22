window.MauiInterop = {
    checkNumber: function () {
    const number = prompt("Enter a number:");
    DotNet.invokeMethodAsync("TodoWrapper6New", "CheckNumber", parseInt(number))
        .then(result => {
            alert(result);
        });
    },
    grabDeviceInfo: function () {
        return DotNet.invokeMethodAsync("TodoWrapper6New", "GetDeviceInfo")
            .then(result => {
                var el = document.getElementById("device-result");
                el.innerHTML = result;
            }, itBroke => {
                var el = document.getElementById("device-result");
                el.innerHTML = itBroke;
            });
    }
};


