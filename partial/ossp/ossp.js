angular.module('ossdbWeb').controller('OsspCtrl',function($scope, $state, $stateParams, $ossdb){

    var model = $ossdb.model('ossp');
    var pageNo = parseInt($stateParams.page, 10) || 1;

    function update() {
        model.getPage($scope.currentPage, $scope.itemsPerPage, 'name', ['licenses'],function(resp) {
            console.log(resp.items);
            $scope.osspList = resp.items;
            $scope.totalItems = resp.count;
        });
    }

    $scope.itemsPerPage = 5;
    $scope.currentPage = 1;
    $scope.pageChanged = function() {
        $state.go('ossp', {
            page :$scope.currentPage
        });
    };
    $scope.goDetail = function(id) {
        $state.go('ossp-detail', {
            id: id
        });
    };

    model.getCount(function(resp) {
        $scope.totalItems = resp.count;
        $scope.currentPage = pageNo;
        update();
    });

});