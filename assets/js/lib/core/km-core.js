var KM = function () {
    function _showInfo(info) {
        console.log(info);
    }

    function _sayHello() {
        console.log('hello');
    }

    var _blogBase = 'http://blog.km.com/';
    var _url = {
        blog : {
            save : _blogBase + 'save'
        }
    };

    return {
        showInfo : function (info) {
            console.log('public');
            _showInfo(info);
        },

        sayHello : function () {
            _sayHello();
        },

        url : _url
    };
}();