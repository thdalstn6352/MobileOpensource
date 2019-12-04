//Android 2.3에서 Function.prototype.bind() 지원을 위한 보충 기능
(function () {
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (thisValue) {
            if (typeof this !== "function") {
                throw new TypeError(this + " cannot be bound as it is not a function");
            }

            // bind()도 호출 앞에 인수 추가를 허용합니다.
            var preArgs = Array.prototype.slice.call(arguments, 1);

            //"this" 값 및 인수를 다음에 바인딩하는 실제 함수
            var functionToBind = this;
            var noOpFunction = function () { };

            //다음을 사용하는 "this" 인수
            var thisArg = this instanceof noOpFunction && thisValue ? this : thisValue;

            //결과적인 바인딩된 함수
            var boundFunction = function () {
                return functionToBind.apply(thisArg, preArgs.concat(Array.prototype.slice.call(arguments)));
            };

            noOpFunction.prototype = this.prototype;
            boundFunction.prototype = new noOpFunction();

            return boundFunction;
        };
    }
}());
