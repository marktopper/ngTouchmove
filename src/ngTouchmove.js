"use strict";

angular.module("ngTouchmove", []).directive("ngTouchmove", function () {
  return {
    controller: function ($scope, $element, $attrs) {
      $element.bind('touchstart', onTouchStart);
      var startEvent;
      
      function onTouchStart(event) {
        event.preventDefault();
        startEvent = event;
        $element.bind('touchmove', onTouchMove);
        $element.bind('touchend', onTouchEnd);
      };
      
      function onTouchMove(event) {
          var method = $element.attr('ng-touchmove');
          $scope.$event = event;
          $scope.$apply(method);
      };
      
      function onTouchEnd(event) {
        event.preventDefault();
        if (startEvent 
          && typeof event.pageX !== 'undefined'
          && event.pageX === startEvent.pageX
          && event.pageY === startEvent.pageY
        ) {
          angular.element($element).triggerHandler('click');
        }
        $element.unbind('touchmove', onTouchMove);
        $element.unbind('touchend', onTouchEnd);
      };
    }
  };
});
