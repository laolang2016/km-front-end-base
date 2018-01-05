/**
 * 折叠面板
 *
 */
;(function ($, window, document, undefined) {
    var classes = {
        accordion: '.km-accordion',
        accordionStr: 'km-accordion',

        active: '.active',
        activeStr: 'active'
    };

    var events = {
        onSelect: '.kmAccordion',
        onUnselect: 'onUnselect.kmAccordion',
        onAdd: 'onAdd.kmAccordion',
        onBeforeRemove: 'onBeforeRemove.kmAccordion',
        onRemove: 'onRemove.kmAccordion'
    };

    function options(container) {
    }

    function panels(container) {
    }

    function resize(container) {
    }

    function getSelected(container) {
    }

    function getSelections(container) {
    }

    /**
     * 根据标题或索引返回指定的面板
     * @param container
     * @param which
     */
    function getPanel(container, which) {
        var panelAndParam = [];
        panelAndParam[0] = null;
        // TODO 优化选择
        if ('string' === typeof which) {
            panelAndParam[0] = container.children("h3[title='" + which + "']");
            panelAndParam[1] = which;

            /**
             * TODO 工具类 增强jquery.index方法，返回当前元素在父元素中相同的所有元素集合中的索引
             * 如
             * <div>
             * <h3 id="h1"></h3>
             * <div></div>
             * <h3 id="h2"></h3>
             * <div></div>
             * * <h3 id="h3"></h3>
             * <div></div>
             * <h3 id="h4"></h3>
             * <div></div>
             * </div>
             * h3#h2 应该返回1而不是2
             */
            panelAndParam[2] = panelAndParam[0].index() / 2;
        } else if ("number" === typeof which) {
            panelAndParam[0] = container.children('h3').eq(which);
            panelAndParam[1] = panelAndParam[0].text();
            panelAndParam[2] = which;
        }
        return panelAndParam;
    }

    function getPanelIndex(container, panel) {
    }


    /**
     * 选择指定面板
     * @param container
     * @param which 面板标题或索引
     */
    function select(container, which) {
        var panelAndParam = getPanel(container, which);
        var titleElement = panelAndParam[0];

        if (titleElement) {
            var title = panelAndParam[1];
            var index = panelAndParam[2];
            var animate = container.config.animate;
            titleElement.addClass(classes.activeStr);
            if (animate) {
                titleElement.next('div').slideDown();
            } else {
                titleElement.next('div').show();
            }
            if (!container.config.multiple) {
                titleElement.siblings('h3').each(function (i) {
                    unselect(container, $(this).text());
                });
            }
            container.config.onSelect.call(this, title, index);
        }
    }

    /**
     * 取消选择指定面板
     * @param container
     * @param which 面板标题或索引
     */
    function unselect(container, which) {
        var panelAndParam = getPanel(container, which);
        var titleElement = panelAndParam[0];
        if (titleElement) {
            var title = panelAndParam[1];
            var index = panelAndParam[2];
            var animate = container.config.animate;
            titleElement.removeClass(classes.activeStr);
            if (animate) {
                titleElement.next('div').slideUp();
            } else {
                titleElement.next('div').hide();
            }
            container.config.onUnselect.call(this, title, index);
        }
    }

    function selectAll(container, which) {
    }

    function unselectAll(container, which) {
    }

    function add(container, options) {
    }

    function remove(container, which) {
    }

    function createPanel(container, param) {
    }

    /**
     * 绑定事件
     * @param jq
     */
    function bindEvent(jq) {
        jq.on(events.onSelect, jq.config.onSelect);
        jq.on(events.onUnselect, jq.onUnselect);
        jq.on(events.onAdd, jq.config.onAdd);
        jq.on(events.onBeforeRemove, jq.config.onBeforeRemove);
        jq.on(events.onRemove, jq.config.onRemove);
    }

    /**
     * 初始化标题
     * @param jq
     */
    function initTitle(jq) {
        jq.children('h3').each(function () {
            $(this).attr('title', $(this).text());
        });
        var halign = jq.config.halign;
        // 设置标题
        if ('left' !== halign) {
            switch (halign) {
                case 'center': {
                    jq.find('h3').css({
                        'padding-left': '0',
                        'padding-right': '0',
                        'text-align': 'center'
                    });
                    break;
                }
                case 'right': {
                    jq.find('h3').css({
                        'padding-left': '0',
                        'padding-right': '25px',
                        'text-align': 'right'
                    });
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }

    /**
     * 初始化选择面板
     * @param jq
     */
    function initSelect(jq) {
        var selected = jq.config.selected;
        if (0 <= selected && selected < jq.children('h3').length) {
            select(jq, selected);
        }
    }

    /**
     * 初始化边框样式
     * @param jq
     */
    function initBorder(jq) {
        if (jq.config.border) {
            var borderStyle = jq.config.borderStyle;
            jq.css(borderStyle);
            jq.attr('offsetWidth', jq.parent().width()).attr('offsetHeight', jq.parent().height());
        }
    }

    /**
     * 初始化高度与宽度
     * @param jq
     */
    function initWidthAndHeight(jq) {
        // 如果fit为true，则忽略宽度与高度的设置
        if (jq.config.fit) {
            return;
        }

        if ('auto' !== jq.config.width) {
            jq.css({
                'width': jq.config.width + 'px'
            });
        }

        if ('auto' !== jq.config.height) {
            jq.css({
                'height': jq.config.height + 'px'
            });
        }
    }

    function initStyle(jq) {
        initTitle(jq);
        initBorder(jq);
        initSelect(jq);
        initWidthAndHeight(jq);
    }


    /***
     * TODO init
     * 初始化
     * @param jq
     */
    function init(jq) {
        initStyle(jq);
        bindEvent(jq);
        jq.children('h3').click(function () {
            var titleClass = $(this).attr('class');
            // TODO 工具类 判断某个元素是否包含给定的class样式
            if (undefined === titleClass || titleClass.indexOf(classes) < 0) {
                console.log('click:select');
                select(jq, $(this).text());
            }

            if (undefined !== titleClass && titleClass.indexOf(classes.activeStr) >= 0) {
                console.log('click:unselect');
                unselect(jq, $(this).text());
            }
        })
    }


    $.fn.kmAccordion = function (options, param) {
        if (typeof options === 'string') {
            return $.fn.kmAccordion.methods[options](this, param);
        }

        var _opts = $.extend({}, $.fn.kmAccordion.defaults, options);
        var jq = this;
        jq.config = _opts;

        return this.each(function () {
            // 插件初始化
            init(jq);
        });
    };


    $.fn.kmAccordion.methods = {
        /**
         * 返回当前折叠面板的属性
         * @param jq
         */
        options: function (jq) {
            return jq.config;
        },

        /**
         * TODO 获取所有面板
         * @param jq
         */
        panels: function (jq) {
        },

        /**
         * TODO 调整折叠面板大小
         * @param jq
         */
        resize: function (jq) {
        },

        /**
         * TODO 获取选中的面板
         * @param jq
         */
        getSelected: function (jq) {
        },

        /**
         * TODO 获取所有选中的面板
         * @param jq
         */
        getSelections: function (jq) {
        },

        /**
         * TODO 获取指定的面板
         * @param jq
         * @param which 面板的标题或索引
         */
        getPanel: function (jq, which) {
            return jq.each(function () {
                getPanel(jq, which);
            });
        },

        /**
         * TODO 获取指定面板的索引
         * @param jq
         * @param panel
         */
        getPanelIndex: function (jq, panel) {
        },

        /**
         * 选择指定面板
         * @param jq
         * @param which 面板的标题或索引
         */
        select: function (jq, which) {
            return jq.each(function () {
                select(jq, which);
            });
        },

        /**
         * TODO 取消选择指定面板
         * @param jq
         * @param which 面板标题或索引
         */
        unselect: function (jq, which) {
            return jq.each(function () {
                unselect(jq, which);
            });
        },

        /**
         * TODO 选择所有面板
         * @param jq
         */
        selectAll: function (jq) {
        },

        /**
         * TODO 取消选择所有面板
         * @param jq
         */
        unselectAll: function (jq) {
        },

        /**
         * TODO 添加一个新面板
         * 默认情况下，新增的面板会被选中
         * @param jq
         * @param options 面板配置项
         */
        add: function (jq, options) {
        },

        /**
         * TODO 移除指定面板
         * @param jq
         * @param which 面板标题或索引
         */
        remove: function (jq, which) {
        }
    };

    $.fn.kmAccordion.defaults = {
        /**
         * 宽度，可以是百分比【相对父容器(div)】、数字(像素)、auto，默认为auto
         */
        width: 'auto',
        /**
         * 高度，可以是百分比【相对父容器(div)】、数字(像素)、auto，默认为auto
         */
        height: 'auto',
        /**
         * 如果为true，则自适应父容器【div】，默认为true
         */
        fit: true,
        /**
         * 是否显示边框，默认为false
         */
        border: false,
        /**
         * 边框样式，字面量对象形式
         */
        borderStyle: null,
        /**
         * 定义在展开和折叠的时候是否显示动画效果。默认：true
         */
        animate: true,
        /**
         * 如果为true，则可以同时展开多个面板
         */
        multiple: false,
        /**
         * 初始化时默认选中的面板索引号，如果为-1，则都不展开。默认：0
         */
        selected: 0,
        /**
         * 设置面板标题对齐方式，可用值：'left', 'center', 'right'，默认为'left'
         */
        halign: 'left',

        /**
         * 用户选择面板时触发
         * @param title
         * @param index
         */
        onSelect: function (title, index) {
        },

        /**
         * 面板被取消选择时触发
         * @param title
         * @param index
         */
        onUnselect: function (title, index) {
        },

        /**
         * TODO 添加新面板时触发
         * @param title
         * @param index
         */
        onAdd: function (title, index) {
        },

        /**
         * TODO 移除面板之前触发，返回false可取消移除操作
         * @param title
         * @param index
         */
        onBeforeRemove: function (title, index) {
        },

        /**
         * TODO 面板被移除时触发
         * @param title
         * @param index
         */
        onRemove: function (title, index) {
        }
    };
})(jQuery, window, document);