angular.module('ossdbWeb').factory('$ossdb',['$http', function($http) {


    var port = 1337;

    var baseUrl = 'http://' + window.location.hostname + ':' + port

	var ossdb = {
        getProjectList: function(cb) {
            console.log('ossdb.getProjectList');
            $http.get(baseUrl + '/project').success(function(project) {
                cb(project);
            });
        }
    };

	return ossdb;
}]);