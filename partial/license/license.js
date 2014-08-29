angular.module('ossdbWeb').controller('LicenseCtrl',function($scope){

    function update() {
        $ossdb.getLicenseList($scope.currentPage, $scope.itemsPerPage, 'name', function(resp) {
            $scope.osspList = resp.items;
            $scope.totalItems = resp.count;
        });
    }

    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.pageChanged = function() {
        update();
    }
    $scope.goDetail = function(id) {
        $state.go('ossp-detail', {
            id: id
        });
    }

    update();

});