angular.module('ossdbWeb').controller('PackageCtrl',function($scope, $state, $ossdb){

    var model = $ossdb.model('package');

    function update() {
        model.getPage($scope.currentPage, $scope.itemsPerPage, 'name', function(resp) {
            $scope.packageList = resp.items;
            $scope.totalItems = resp.count;
        });
    }

    $scope.itemsPerPage = 5;
    $scope.currentPage = 1;
    $scope.pageChanged = function() {
        update();
    };
    $scope.goDetail = function(id) {
        $state.go('package-detail', {
            id: id
        });
    };

    update();

});