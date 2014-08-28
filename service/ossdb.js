angular.module('ossdbWeb').factory('$ossdb',['$http', function($http) {


    var port = 1337;

    var baseUrl = 'http://' + window.location.hostname + ':' + port

    function get(url, cb) {
        $http.get(baseUrl + url).success(function(resp) {
            cb(resp);
        });
    }

	var ossdb = {
        getOsspList: function(cb) {
            get('/ossp', cb);
        },
        getLicenseList: function(cb) {
            get('/license', cb);
        },
        getPackageList: function(cb) {
            get('/package', cb);
        },
        getProjectList: function(cb) {
            get('/project', cb);
        }
    };

	return ossdb;
}]);