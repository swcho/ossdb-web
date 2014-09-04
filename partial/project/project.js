angular.module('ossdbWeb').controller('ProjectCtrl', function($scope, $state, $ossdb){

    var model = $ossdb.model('project');

    function update() {
        model.getPage($scope.currentPage, $scope.itemsPerPage, 'projectId', function(resp) {
            $scope.projectList = resp.items;
            $scope.totalItems = resp.count;
        });
    }

    $scope.itemsPerPage = 5;
    $scope.currentPage = 1;
    $scope.pageChanged = function() {
        update();
    };
    $scope.goDetail = function(id) {
        $state.go('project-detail', {
            id: id
        });
    };

    update();

});