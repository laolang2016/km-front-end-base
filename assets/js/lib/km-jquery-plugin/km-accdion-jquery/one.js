;(function ($, window, document, undefined) {

    /**
     * 插件的私有方法
     * 初始化
     * @param jq jquery 对象，和你使用$('#one')获得的对象是一样的
     */
    function init(jq) {
        // 初始化步骤：
        // 1. 初始化插件样式，这里就不写那么多了
        console.log('私有方法：init');

        // 2. 自定义事件
        // 绑定事件，我这里是直接绑定在插件本身上面
        jq.on('onBorderChanged.kmAccordion', jq.config.onBorderChanged);

        // 3. 绑定单击事件逻辑，实现点击按钮，改变padding和border
        jq.find('button').click(function () {
            var text = jq.find('button').text();
            // 私有方法调用公有方法
            jq.kmAccordion('changeBorder',text);
        });
    }

    function sayNo() {
        console.log('私有方法：sayNo');
    }

    /**
     * 插件实现代码
     * @param options 如果是json对象，则创建[初始化]插件，如果是字符串，则用来调用插件的公开方法
     * @param param 当前options是字符串时，代表传递给插件公开方法的参数。当然，你可以不传
     * @returns {*}
     */
    $.fn.kmAccordion = function (options, param) {
        // console.log(this);
        // 如果是方法调用
        if (typeof options === 'string') {
            return $.fn.kmAccordion.methods[options](this, param);
        }

        // 获得配置，这里为了得到用户的配置项，覆盖默认配置项，并保存到当前jquery插件实例中
        var _opts = $.extend({}, $.fn.kmAccordion.defaults, options);
        var jq = this;
        jq.config = _opts;

        // 链式调用
        return this.each(function () {
            // console.log(this);
            // 调用私有方法，初始化插件
            init(jq);
        });
    };


    /**
     * 插件的公开方法
     */
    $.fn.kmAccordion.methods = {
        changeBorder: function (jq, text) {
            // 公有方法可以相互调用
            jq.kmAccordion('sayHello');

            // 公有方法调用私有方法，但是对插件外部来说，私有方法是不可见的
            sayNo();

            // 实现逻辑
            jq.css({'border-color':jq.config.color});
            if( jq.config.clearPadding ){
                jq.css({'padding':'0'});
            }
            console.log('按钮文本：'+text);

            // 触发事件
            jq.config.onBorderChanged.call(jq, jq.css('border-color'));

            // 返回jquery对象，支持链式调用
            return jq;
        },
        sayHello : function(jq){
            console.log('hello');
            return jq;
        },
        options: function (jq) {
            // 这个就不需要支持链式调用了
            return jq.config;
        }
    };


    /**
     * 插件的默认配置
     */
    $.fn.kmAccordion.defaults = {
        // 属性
        clearPadding: true,
        color: 'blue',

        /**
         * 自定义事件
         * @param color 事件触发时的参数
         */
        onBorderChanged: function (color) {
            console.log('默认事件实现，当然，你也可以不实现，留空:' + color);
        }
    };
})(jQuery, window, document);