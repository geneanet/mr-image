
var app = angular.module('mrImage', []);

app.directive('mrImage', function() {
    return {
        restrict: 'A',
        scope: {
            src: '=mrSrc',
            optionDelete: '=?mrAllowDelete',
            maxWidth: '=?mrMaxWidth',
            maxHeight: '=?mrMaxHeight',
            aspectRatio: '=?mrAspectRatio',
            scale: '=?mrScale',
            drawer: '=?mrDrawer',
            selector: '=?mrSelector'
        },

        template:
            '<div class="mr-layer-wrapper">'+
            '<div class="layer" mr-image-selector mr-model="selector" mr-aspect-ratio="aspectRatio"></div>'+
            '<div class="layer" mr-image-drawer mr-model="drawer" mr-unit="unit" mr-allow-delete="optionDelete"></div>'+
            '<img ng-src="{{src}}" width="{{scaleValue(width, scale)}}" height="{{scaleValue(height, scale)}}">'+
            '</div>',

        link: function (scope, element) {

            element.addClass('mr-image');

            function setImageSize(src) {
                scope.image = new Image();
                scope.image.onload = function () {
                    scope.$apply(function () {
                        scope.height = scope.height || scope.image.height;
                        scope.width = scope.width || scope.image.width;

                        if(angular.isUndefined(scope.scale) && angular.isDefined(scope.maxHeight)) {

                            element.css('max-height', scope.maxHeight + 'px');

                            scope.unit = '%';
                            scope.scale = scope.maxHeight / scope.height;

                        } else {
                            scope.unit = 'px';
                            if(angular.isUndefined(scope.scale) && angular.isDefined(scope.maxWidth)) {
                                scope.scale = scope.maxWidth >= scope.width ? 1 : scope.maxWidth / scope.width;
                            }else {
                                scope.scale = scope.scale || 1;
                            }

                            element.css('width', scope.scaleValue(scope.width, scope.scale) + 'px');
                            element.css('height', scope.scaleValue(scope.height, scope.scale) + 'px');
                        }
                    });
                };
                scope.image.src = src;
            }

            setImageSize(scope.src);

            scope.scaleValue = function (value, scale) {
                return Math.floor(value * scale);
            };
        }
    };
});
