// public-admin/scripts/directives/nwRects.js

app.directive('mrImageDrawer', function(){
    return {
        restrict: 'A',
        scope: {
            optionDelete: '=?mrAllowDelete',
            rects: '=mrModel',
            unit: '=mrUnit'
        },
        template: '<div ng-repeat="rect in rects" class="mr-face" ng-init="areaId = rect.id || $index" style="' +
            'top:    {{ rect.y1 + unit }};' +
            'left:   {{ rect.x1 + unit }};' +
            'width:  {{ (rect.x2 - rect.x1) + unit}};' +
            'height: {{ (rect.y2 - rect.y1) + unit}};' +
            '"' +
            "ng-click=\"this.toggleDisplayOptions(areaId)\""+
            "ng-class=\"{active: this.displayArea == areaId || this.selectedArea == areaId}\""+
            "ng-mouseover=\"this.displayInformations(areaId)\""+
            "ng-mouseout=\"this.hideInformations(areaId)\""+
        '>
            <div class="mr-face-delete" ng-show="this.selectedArea == areaId && optionDelete && displayOptions" ng-click="this.delete($index)"></div>
            <div class="mr-face-extra" ng-show="this.displayArea == areaId || this.selectedArea == areaId">
                <h2 ng-show=\"rect.title\">{{rect.title}}</h2>
                <p ng-show=\"rect.caption\">{{rect.caption}}</p>
            </div>
        </div>',
        link: function(scope, element) {

            scope.$on('mrImageDisplayArea', function(e, data) {
                scope.displayArea = data;
            });

            scope.$on('mrImageHideArea', function(e, data) {
                scope.displayArea = null;
            });

            scope.displayInformations = function(areaID) {
                scope.displayArea = areaID;
            }

            scope.hideInformations = function() {
                scope.displayArea = null;
            }

            scope.toggleDisplayOptions = function(areaID) {

                if(scope.selectedArea != areaID) {
                    scope.selectedArea   = areaID;
                    scope.displayOptions = true;
                } else {
                    scope.selectedArea   = null;
                    scope.displayOptions = false;
                }
            }

            scope.delete = function(index) {
                scope.$emit('mrImageDeleteEvent', scope.rects[index]);
                scope.rects.splice(index, 1);
            }

        },
    };
});