angular.module('ossdbWeb').controller('PackageCtrl',function($scope, $state, $stateParams, $ossdb, $log){

    var model = $ossdb.model('package');
    var pageNo = parseInt($stateParams.page, 10) || 1;

    function update() {
        model.getPage($scope.currentPage, $scope.itemsPerPage, 'name', function(resp) {
            $scope.packageList = resp.items;
            $scope.totalItems = resp.count;
        });
    }

    $scope.itemsPerPage = 5;
    $scope.pageChanged = function() {
        $state.go('package', {
            page :$scope.currentPage
        });
    };
    $scope.goDetail = function(id) {
        $state.go('package-detail', {
            id: id
        });
    };

    model.getCount(function(resp) {
        $scope.totalItems = resp.count;
        $scope.currentPage = pageNo;
        update();
    });

});