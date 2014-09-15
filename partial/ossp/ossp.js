angular.module('ossdbWeb').controller('OsspCtrl',function($scope, $state, $ossdb){

    var model = $ossdb.model('ossp');

    function update() {
        model.getPage($scope.currentPage, $scope.itemsPerPage, 'name', function(resp) {
            console.log(resp.items);
            $scope.osspList = resp.items;
            $scope.totalItems = resp.count;
        });
    }

    $scope.itemsPerPage = 5;
    $scope.currentPage = 1;
    $scope.pageChanged = function() {
        update();
    };
    $scope.goDetail = function(id) {
        $state.go('ossp-detail', {
            id: id
        });
    };

    update();

});