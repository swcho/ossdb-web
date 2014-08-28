angular.module('ossdbWeb').factory('$ossdb',['$http', function($http) {


    var port = 1337;

    var baseUrl = 'http://' + window.location.hostname + ':' + port

    function get(url, cb) {
        $http.get(baseUrl + url).success(function(resp) {
            cb(resp);
        });
    }
    function post(url, data, cb) {
        $http.post(baseUrl + url, data).success(function(resp) {
            cb(resp);
        });
    }

	var ossdb = {
        getOsspList: function(cb) {
            get('/ossp', cb);
        },
        getOssp: function(id, cb) {
            get('/ossp/' + id, cb);
        },
        setOssp: function(ossp, cb) {
            if (ossp.id) {
                post('/ossp/update/' + ossp.id, ossp, cb);
            } else {
                post('/ossp/create', ossp, cb);
            }
        },
        getLicenseList: function(cb) {
            get('/license', cb);
        },
        getLicense: function(id, cb) {
            get('/license/' + id);
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