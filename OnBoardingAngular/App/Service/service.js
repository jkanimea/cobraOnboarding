
app.service("service", function ($http) {
   

    this.readData = function (url) {
        return $http.get(url);
    }

    this.postData = function (url, data) {
        return $http.post(url, data);
    }

})