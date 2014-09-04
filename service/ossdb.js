angular.module('ossdbWeb').factory('$ossdb',['$http', function($http) {

    var port = 1337;
    var baseUrl = 'http://' + window.location.hostname + ':' + port;

    function getAll(model, cb) {
        $http.get(baseUrl + '/' + model).success(function(resp) {
            cb(resp);
        });
    }
    function getCount(model, cb) {
        $http.get(baseUrl + '/' + model + '/count').success(function(resp) {
            cb(resp);
        });
    }
    function getPage(model, page, limit, sort, cb) {
        $http.get(baseUrl + '/' + model + '/page?no=' + page + '&limit=' + limit + '&sort=' + sort).success(function(resp) {
            cb(resp);
        });
    }
    function getById(model, id, cb) {
        $http.get(baseUrl + '/' + model + '/' + id).success(function(resp) {
            cb(resp);
        });
    }
    function getDetailById(model, id, cb) {
        $http.get(baseUrl + '/' + model + '/detail/' + id).success(function(resp) {
            cb(resp);
        });
    }
    function setItem(model, item, cb) {
        var method = item.id ? 'update/' + item.id : 'create';
        $http.post(baseUrl + '/' + model + '/' + method, item).success(function(resp) {
            cb(resp);
        });
    }
    function remove(model, id, cb) {
        $http.delete(baseUrl + '/' + model + '/' + id).success(function(resp) {
            cb(resp);
        });
    }

	var ossdb = {
        model: function(name) {
            return {
                getAll: function(cb) {
                    getAll(name, cb);
                },
                getCount: function(cb) {
                    getCount(name, cb);
                },
                getPage: function(page, limit, sort, cb) {
                    getPage(name, page, limit, sort, cb);
                },
                getById: function(id, cb) {
                    getById(name, id, cb);
                },
                getDetailById: function(id, cb) {
                    getDetailById(name, id, cb);
                },
                setItem: function(item, cb) {
                    setItem(name, item, cb);
                },
                remove: function(id, cb) {
                    remove(name, id, cb);
                }
            };
        }
    };

	return ossdb;
}]);