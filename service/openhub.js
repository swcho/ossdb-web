angular.module('ossdbWeb').factory('$openhub', function($http) {

    //https://www.openhub.net/p.xml?api_key=RbLeBswjUFhuHhAUM7QhQ&query=libusb


    var baseUrl = 'https://www.openhub.net';
    var apiKey = 'RbLeBswjUFhuHhAUM7QhQ';

    function query(text, cb) {
        var url = baseUrl + '/p.xml?api_key=' + apiKey + '$query=' + text;
        console.log(url);
        $http.get(url).success(function(data) {
            var json = xml2json(data);
            console.log(json);
            cb(json);
        });
    }

	return {
        query: function(text, cb) {
            query(text, cb);
        }
    };
});