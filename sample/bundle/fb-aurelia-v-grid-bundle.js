(function(FuseBox){FuseBox.$fuse$=FuseBox;
var __fsbx_css = function (__filename, contents) {
    if (FuseBox.isServer) {
        return;
    }
    var styleId = __filename.replace(/[\.\/]+/g, "-");
    if (styleId.charAt(0) === '-')
        styleId = styleId.substring(1);
    var exists = document.getElementById(styleId);
    if (!exists) {
        var s = document.createElement(contents ? "style" : "link");
        s.id = styleId;
        s.type = "text/css";
        if (contents) {
            s.innerHTML = contents;
        }
        else {
            s.rel = "stylesheet";
            s.href = __filename;
        }
        document.getElementsByTagName("head")[0].appendChild(s);
    }
    else {
        if (contents) {
            exists.innerHTML = contents;
        }
    }
};
FuseBox.on("async", function (name) {
    if (FuseBox.isServer) {
        return;
    }
    if (/\.css$/.test(name)) {
        __fsbx_css(name);
        return false;
    }
});

FuseBox.pkg("aurelia-v-grid", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){ 

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./interfaces"));
var prefix = './grid';
function configure(config) {
    config.globalResources(prefix + '/attributes/v-filter', prefix + '/attributes/v-filter-observer', prefix + '/attributes/v-sort', prefix + '/attributes/v-image', prefix + '/attributes/v-drag-drop-col', prefix + '/attributes/v-changed', prefix + '/attributes/v-data-handler', prefix + '/attributes/v-resize-col', prefix + '/attributes/v-menu', prefix + '/attributes/v-selection', prefix + '/v-grid-row-repeat', prefix + '/v-grid-group-row', prefix + '/v-grid-group-element', prefix + '/v-grid-loadingscreen', prefix + '/v-grid-contextmenu', prefix + '/v-grid-footer', prefix + '/v-grid-col', prefix + '/v-grid');
}
exports.configure = configure;
//# sourceMappingURL=index.js.map
});
___scope___.file("interfaces.js", function(exports, require, module, __filename, __dirname){ 

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("aurelia-framework"));
var htmlCache_1 = require("./grid/htmlCache");
exports.HtmlCache = htmlCache_1.HtmlCache;
var controller_1 = require("./grid/controller");
exports.Controller = controller_1.Controller;
var mainMarkup_1 = require("./grid/mainMarkup");
exports.MainMarkup = mainMarkup_1.MainMarkup;
var mainScrollEvents_1 = require("./grid/mainScrollEvents");
exports.MainScrollEvents = mainScrollEvents_1.MainScrollEvents;
var rowMarkup_1 = require("./grid/rowMarkup");
exports.RowMarkup = rowMarkup_1.RowMarkup;
var rowScrollEvents_1 = require("./grid/rowScrollEvents");
exports.RowScrollEvents = rowScrollEvents_1.RowScrollEvents;
var columnMarkup_1 = require("./grid/columnMarkup");
exports.ColumnMarkup = columnMarkup_1.ColumnMarkup;
var htmlHeightWidth_1 = require("./grid/htmlHeightWidth");
exports.HtmlHeightWidth = htmlHeightWidth_1.HtmlHeightWidth;
var viewSlots_1 = require("./grid/viewSlots");
exports.ViewSlots = viewSlots_1.ViewSlots;
var columnBindingContext_1 = require("./grid/columnBindingContext");
exports.ColumnBindingContext = columnBindingContext_1.ColumnBindingContext;
var rowDataBinder_1 = require("./grid/rowDataBinder");
exports.RowDataBinder = rowDataBinder_1.RowDataBinder;
var rowClickHandler_1 = require("./grid/rowClickHandler");
exports.RowClickHandler = rowClickHandler_1.RowClickHandler;
var groupingElements_1 = require("./grid/groupingElements");
exports.GroupingElements = groupingElements_1.GroupingElements;
var loadingScreen_1 = require("./grid/loadingScreen");
exports.LoadingScreen = loadingScreen_1.LoadingScreen;
var contextMenu_1 = require("./grid/contextMenu");
exports.ContextMenu = contextMenu_1.ContextMenu;
var v_grid_1 = require("./grid/v-grid");
exports.VGrid = v_grid_1.VGrid;
var gridConnector_1 = require("./gridConnector");
exports.GridConnector = gridConnector_1.GridConnector;
var dataSource_1 = require("./dataSource");
exports.DataSource = dataSource_1.DataSource;
var selection_1 = require("./selection");
exports.Selection = selection_1.Selection;
var arrayFilter_1 = require("./utils/arrayFilter");
exports.ArrayFilter = arrayFilter_1.ArrayFilter;
var arraySort_1 = require("./utils/arraySort");
exports.ArraySort = arraySort_1.ArraySort;
var arrayGrouping_1 = require("./utils/arrayGrouping");
exports.ArrayGrouping = arrayGrouping_1.ArrayGrouping;
var footer_1 = require("./grid/footer");
exports.Footer = footer_1.Footer;
//# sourceMappingURL=interfaces.js.map
});
___scope___.file("grid/htmlCache.js", function(exports, require, module, __filename, __dirname){ 

var HtmlCache = (function () {
    function HtmlCache(element) {
        this.element = element;
        this.avg_top_panel = null;
        this.avg_header = null;
        this.avg_header_left = null;
        this.avg_header_main = null;
        this.avg_header_main_scroll = null;
        this.avg_header_right = null;
        this.avg_content = null;
        this.avg_content_left = null;
        this.avg_content_left_scroll = null;
        this.avg_content_main = null;
        this.avg_content_main_scroll = null;
        this.avg_content_right = null;
        this.avg_content_right_scroll = null;
        this.avg_footer = null;
        this.avg_content_group = null;
        this.avg_content_group_scroll = null;
        this.avg_content_vhandle = null;
        this.avg_content_vhandle_scroll = null;
        this.avg_content_hhandle = null;
        this.avg_content_hhandle_scroll = null;
        this.avg_left_rows = null;
        this.avg_main_rows = null;
        this.avg_right_rows = null;
        this.avg_group_rows = null;
        this.rowCache = [];
        this.headerCache = {
            left: null,
            main: null,
            right: null,
            group: null,
            bindingContext: null,
            overrideContext: null,
            leftRowViewSlot: null,
            mainRowViewSlot: null,
            rightRowViewSlot: null,
            groupRowViewSlot: null
        };
    }
    HtmlCache.prototype.updateRowsMarkup = function () {
        this.avg_left_rows = this.avg_content_left_scroll.getElementsByTagName('avg-row');
        this.avg_main_rows = this.avg_content_main_scroll.getElementsByTagName('avg-row');
        this.avg_right_rows = this.avg_content_right_scroll.getElementsByTagName('avg-row');
        this.avg_group_rows = this.avg_content_group_scroll.getElementsByTagName('avg-row');
    };
    HtmlCache.prototype.updateMainMarkup = function () {
        this.avg_top_panel = this.element.getElementsByTagName('avg-top-panel')[0];
        this.avg_header = this.element.getElementsByTagName('avg-header')[0];
        this.avg_header_left = this.element.getElementsByTagName('avg-header-left')[0];
        this.avg_header_main = this.element.getElementsByTagName('avg-header-main')[0];
        this.avg_header_main_scroll = this.element.getElementsByTagName('avg-header-main-scroll')[0];
        this.avg_header_right = this.element.getElementsByTagName('avg-header-right')[0];
        this.avg_content = this.element.getElementsByTagName('avg-content')[0];
        this.avg_content_left = this.element.getElementsByTagName('avg-content-left')[0];
        this.avg_content_left_scroll = this.element.getElementsByTagName('avg-content-left-scroll')[0];
        this.avg_content_main = this.element.getElementsByTagName('avg-content-main')[0];
        this.avg_content_main_scroll = this.element.getElementsByTagName('avg-content-main-scroll')[0];
        this.avg_content_right = this.element.getElementsByTagName('avg-content-right')[0];
        this.avg_content_right_scroll = this.element.getElementsByTagName('avg-content-right-scroll')[0];
        this.avg_footer = this.element.getElementsByTagName('avg-footer')[0];
        this.avg_content_group = this.element.getElementsByTagName('avg-content-group')[0];
        this.avg_content_group_scroll = this.element.getElementsByTagName('avg-content-group-scroll')[0];
        this.avg_content_vhandle = this.element.getElementsByTagName('avg-content-vhandle')[0];
        this.avg_content_vhandle_scroll = this.element.getElementsByTagName('avg-content-vhandle-scroll')[0];
        this.avg_content_hhandle = this.element.getElementsByTagName('avg-content-hhandle')[0];
        this.avg_content_hhandle_scroll = this.element.getElementsByTagName('avg-content-hhandle-scroll')[0];
    };
    return HtmlCache;
}());
exports.HtmlCache = HtmlCache;
//# sourceMappingURL=htmlCache.js.map
});
___scope___.file("grid/controller.js", function(exports, require, module, __filename, __dirname){ 

var Controller = (function () {
    function Controller(vGrid) {
        this.vGrid = vGrid;
        this.element = vGrid.element;
    }
    Controller.prototype.getContext = function () {
        var c = this.vGrid;
        this.colConfig = c.colConfig;
        this.backupColConfig = c.backupColConfig;
        this.colRepeater = c.colRepeater;
        this.colGroupRow = c.colGroupRow;
        this.colGroupElement = c.colGroupElement;
        this.colRepeatRowTemplate = c.colRepeatRowTemplate;
        this.colRepeatRowHeaderTemplate = c.colRepeatRowHeaderTemplate;
        this.customMenuTemplates = c.customMenuTemplates;
        this.loadingScreenTemplate = c.loadingScreenTemplate;
        this.footerTemplate = c.footerTemplate;
        this.viewCompiler = c.viewCompiler;
        this.container = c.container;
        this.viewResources = c.viewResources;
        this.taskQueue = c.taskQueue;
        this.htmlCache = c.htmlCache;
        this.htmlHeightWidth = c.htmlHeightWidth;
        this.viewSlots = c.viewSlots;
        this.columnBindingContext = c.columnBindingContext;
        this.rowDataBinder = c.rowDataBinder;
        this.mainMarkup = c.mainMarkup;
        this.mainScrollEvents = c.mainScrollEvents;
        this.rowMarkup = c.rowMarkup;
        this.rowScrollEvents = c.rowScrollEvents;
        this.rowClickHandler = c.rowClickHandler;
        this.htmlcolumnMarkupCache = c.columnMarkup;
        this.columnMarkup = c.columnMarkup;
        this.groupingElements = c.groupingElements;
        this.loadingScreen = c.loadingScreen;
        this.contextMenu = c.contextMenu;
        this.footer = c.footer;
        this.bindingContext = c.bindingContext;
        this.overrideContext = c.overrideContext;
        this.attRowHeight = c.attRowHeight;
        this.attHeaderHeight = c.attHeaderHeight;
        this.attFooterHeight = c.attFooterHeight;
        this.attPanelHeight = c.attPanelHeight;
        this.attMultiSelect = c.attMultiSelect;
        this.attManualSelection = c.attManualSelection;
        this.attGridConnector = c.attGridConnector;
        this.attOnRowDraw = c.attOnRowDraw;
        this.attI18N = c.attI18N;
        this.attDataDelay = c.attDataDelay;
        this.attVariableRowHeight = c.attVariableRowHeight;
    };
    Controller.prototype.triggerI18N = function () {
        var _this = this;
        var keys = Object.keys({
            close: 'Close',
            pinLeft: 'Pin left',
            pinRight: 'Pin Right',
            groupBy: 'Group By',
            sortAscending: 'Sort Ascending',
            sortDescending: 'Sort Descending',
            showAll: 'Show All',
            clearCurrent: 'Clear Current',
            clearAll: 'Clear All',
            chooseOperator: 'Choose Operator',
            back: 'Back',
            equals: 'Equals',
            lessThanOrEqual: 'Less than or equal',
            greaterThanOrEqual: 'Greater than or equal',
            lessThan: 'Less than',
            greaterThan: 'Greater than',
            contains: 'Contains',
            notEqualTo: 'Not equal to',
            doesNotContain: 'Does not contain',
            beginsWith: 'Begins with',
            endsWith: 'Ends with',
            loading: 'loading'
        });
        if (this.attI18N) {
            keys.forEach(function (key) {
                if (_this.vGrid.filterOperatorTranslationKeys[key]) {
                    _this.vGrid.filterOperatorNames[_this.vGrid.filterOperatorTranslationKeys[key]] = _this.attI18N(key);
                }
                _this.contextMenu.updateMenuStrings(key, _this.attI18N(key));
            });
            this.raiseEvent('filterTranslation', {});
            var loading = this.attI18N('loading') || keys.loading;
            this.loadingScreen.updateLoadingDefaultLoadingMessage(loading);
        }
    };
    Controller.prototype.getRowHeightState = function () {
        return this.attGridConnector.getRowHeightState();
    };
    Controller.prototype.createGrid = function () {
        if (this.attI18N) {
            this.triggerI18N();
        }
        this.htmlHeightWidth.addDefaultsAttributes(this.attHeaderHeight, this.attRowHeight, this.attFooterHeight, this.attPanelHeight);
        this.htmlHeightWidth.setWidthFromColumnConfig(this.colConfig);
        this.mainMarkup.generateMainMarkup();
        this.htmlCache.updateMainMarkup();
        this.rowDataBinder.init();
        this.mainScrollEvents.init();
        this.rowMarkup.init(this.attRowHeight);
        this.htmlCache.updateRowsMarkup();
        this.rowScrollEvents.init(this.attRowHeight, this.attDataDelay, this.attVariableRowHeight);
        this.columnMarkup.init(this.colConfig, this.overrideContext, this.colRepeater, this.colRepeatRowTemplate, this.colRepeatRowHeaderTemplate, this.colGroupRow);
        this.rowClickHandler.init(this.attMultiSelect, this.attManualSelection, this);
        this.groupingElements.init(this, this.colGroupElement);
        this.loadingScreen.init(this.overrideContext, this.loadingScreenTemplate);
        this.footer.init(this.overrideContext, this.footerTemplate);
        this.contextMenu.init(this.customMenuTemplates, this.overrideContext);
    };
    Controller.prototype.getElement = function (rowNumber, isDownScroll, callbackFN) {
        var _this = this;
        this.attGridConnector.getElement({
            row: rowNumber,
            isDown: isDownScroll,
            callback: function (rowContext) {
                if (_this.attOnRowDraw) {
                    _this.attOnRowDraw(rowContext);
                }
                callbackFN(rowContext);
            }
        });
    };
    Controller.prototype.expandGroup = function (id) {
        this.attGridConnector.expandGroup(id);
    };
    Controller.prototype.collapseGroup = function (id) {
        this.attGridConnector.collapseGroup(id);
    };
    Controller.prototype.select = function (row) {
        this.attGridConnector.select(row);
    };
    Controller.prototype.addToGrouping = function (groupObj) {
        var currentGrouping = this.attGridConnector.getGrouping();
        var exist = false;
        currentGrouping.forEach(function (group) {
            if (group.field === groupObj.field) {
                exist = true;
            }
        });
        if (!exist) {
            currentGrouping.push(groupObj);
            this.attGridConnector.group(currentGrouping, true);
        }
    };
    Controller.prototype.removeFromGrouping = function (field) {
        var currentGrouping = this.attGridConnector.getGrouping();
        var index = -1;
        currentGrouping.forEach(function (group, i) {
            if (field === group.field) {
                index = i;
            }
        });
        if (index !== -1) {
            currentGrouping.splice(index, 1);
            this.attGridConnector.group(currentGrouping, true);
        }
    };
    Controller.prototype.getSelectionContext = function () {
        var sel = this.attGridConnector.getSelection();
        return sel;
    };
    Controller.prototype.raiseEvent = function (name, data) {
        if (data === void 0) { data = {}; }
        var event = new CustomEvent(name, {
            detail: data,
            bubbles: true
        });
        this.element.dispatchEvent(event);
    };
    Controller.prototype.setLoadingScreen = function (value, msg, collectionLength) {
        if (value) {
            return this.loadingScreen.enable(msg, collectionLength);
        }
        else {
            return this.loadingScreen.disable();
        }
    };
    Controller.prototype.updateHeights = function () {
        var totalRowHeight = this.htmlHeightWidth.getNewHeight(this.attGridConnector.getDatasourceLength());
        var bodyHeight = this.htmlCache.avg_content_main.clientHeight;
        if (bodyHeight < totalRowHeight) {
            this.htmlCache.avg_content_vhandle.style.display = 'block';
        }
        else {
            this.htmlCache.avg_content_vhandle.style.display = 'none';
        }
        this.rowScrollEvents.setCollectionLength(this.attGridConnector.getDatasourceLength());
        this.htmlHeightWidth.setCollectionLength(this.attGridConnector.getDatasourceLength(), bodyHeight < totalRowHeight);
    };
    Controller.prototype.udateHorizontalScroller = function () {
        var bodyWidth = this.htmlCache.avg_content_main.clientWidth;
        var scrollWidth = this.htmlHeightWidth.avgContentMainScroll_Width;
        if (bodyWidth < scrollWidth) {
            this.htmlCache.avg_content_hhandle.style.display = 'block';
            this.htmlHeightWidth.setCollectionLength(this.collectionLength(), true);
        }
        else {
            this.htmlCache.avg_content_hhandle.style.display = 'none';
            this.htmlHeightWidth.setCollectionLength(this.collectionLength(), false);
        }
    };
    Controller.prototype.updateHeaderGrouping = function (groups) {
        var _this = this;
        var length = groups.length;
        this.columnBindingContext.setupgrouping = length;
        if (length === 0) {
            var groupings = this.groupingElements.getGroups();
            groupings.forEach(function (group) {
                _this.groupingElements.removeGroup(group.field);
            });
        }
        else {
            var check_1 = true;
            groups.forEach(function (group) {
                if (!_this.groupingElements[group.field]) {
                    check_1 = false;
                }
            });
            if (!check_1) {
                var groupings = this.groupingElements.getGroups();
                groupings.forEach(function (group) {
                    _this.groupingElements.removeGroup(group);
                });
                groups.forEach(function (group) {
                    _this.groupingElements.addGroup(group.title, group.field);
                });
            }
        }
        this.htmlHeightWidth.adjustWidthsColumns(this.columnBindingContext, length);
    };
    Controller.prototype.collectionLength = function () {
        return this.attGridConnector.getDatasourceLength();
    };
    Controller.prototype.triggerScroll = function (position) {
        if (position === null || position === undefined) {
            position = this.htmlCache.avg_content_vhandle.scrollTop;
        }
        else {
            this.htmlCache.avg_content_vhandle.scrollTop = position;
            this.htmlCache.avg_content_left.scrollTop = position;
            this.htmlCache.avg_content_main.scrollTop = position;
            this.htmlCache.avg_content_right.scrollTop = position;
        }
        this.raiseEvent('avg-scroll', {
            isScrollBarScrolling: true,
            isDown: true,
            newTopPosition: position
        });
    };
    Controller.prototype.getTopRow = function () {
        var position = this.htmlCache.avg_content_vhandle.scrollTop;
        return Math.floor(position / this.attRowHeight);
    };
    Controller.prototype.rebindAllRows = function () {
        this.raiseEvent('avg-rebind-all-rows', {
            rowCache: this.htmlCache.rowCache,
            downScroll: true
        });
    };
    Controller.prototype.getColumnConfig = function () {
        var colContext = this.columnBindingContext;
        var tempArray = [];
        for (var i = 0; i < this.colConfig.length; i++) {
            switch (true) {
                case colContext.setupleft[i].show:
                    tempArray.push({
                        no: i,
                        set: 1,
                        colPinLeft: true,
                        colPinRight: false,
                        left: colContext.setupleft[i].left - 10000,
                        width: colContext.setupleft[i].width
                    });
                    break;
                case colContext.setupmain[i].show:
                    tempArray.push({
                        no: i,
                        set: 2,
                        colPinLeft: false,
                        colPinRight: false,
                        left: colContext.setupmain[i].left,
                        width: colContext.setupmain[i].width
                    });
                    break;
                case colContext.setupright[i].show:
                    tempArray.push({
                        no: i,
                        set: 3,
                        colPinLeft: false,
                        colPinRight: true,
                        left: colContext.setupright[i].left + 10000,
                        width: colContext.setupright[i].width
                    });
                    break;
                default:
            }
        }
        var newColConfig = [];
        this.colConfig.forEach(function (col, i) {
            var temp = {
                colWidth: tempArray[i].width,
                colRowTemplate: col.colRowTemplate,
                colHeaderTemplate: col.colHeaderTemplate,
                colField: col.colField ? col.colField.replace('rowRef.', '') : col.colField,
                colPinLeft: tempArray[i].colPinLeft,
                colPinRight: tempArray[i].colPinRight,
                colHeaderName: col.colHeaderName,
                colAddLabelAttributes: col.colAddLabelAttributes,
                colAddFilterAttributes: col.colAddFilterAttributes,
                colAddRowAttributes: col.colAddRowAttributes,
                colSort: col.colSort,
                colDisplayEdit: col.colDisplayEdit,
                colFilter: col.colFilter,
                colFilterTop: col.colFilterTop,
                colCss: col.colCss,
                colType: col.colType,
                __colSortHelper: tempArray[i].left,
            };
            newColConfig.push(temp);
        });
        newColConfig.sort(function (a, b) {
            return a.__colSortHelper - b.__colSortHelper;
        });
        return newColConfig;
    };
    Controller.prototype.setColumnConfig = function (colConfig) {
        var length = this.columnBindingContext.setupgrouping;
        this.viewSlots.unbindAndDetachColumns();
        this.columnBindingContext.clear();
        this.viewSlots.clear();
        this.colConfig = colConfig || this.backupColConfig;
        this.columnMarkup.init(this.colConfig, this.overrideContext, this.colRepeater, this.colRepeatRowTemplate, this.colRepeatRowHeaderTemplate, this.colGroupRow);
        this.viewSlots.bindAndAttachColumns(this.overrideContext, this.columnBindingContext, this.attGridConnector.getSelection());
        this.htmlHeightWidth.setWidthFromColumnConfig(this.colConfig);
        this.columnBindingContext.setupgrouping = length;
        this.htmlHeightWidth.adjustWidthsColumns(this.columnBindingContext, length);
        this.udateHorizontalScroller();
        this.rebindAllRows();
    };
    return Controller;
}());
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map
});
___scope___.file("grid/mainMarkup.js", function(exports, require, module, __filename, __dirname){ 

var aurelia_framework_1 = require("aurelia-framework");
var mainMarkupHtmlString_1 = require("./mainMarkupHtmlString");
var MainMarkup = (function () {
    function MainMarkup(element, viewCompiler, container, viewResources, htmlHeightWidth, viewSlots) {
        this.element = element;
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
        this.htmlHeightWidth = htmlHeightWidth;
        this.viewSlots = viewSlots;
    }
    MainMarkup.prototype.generateMainMarkup = function () {
        this.viewFactory = this.viewCompiler.compile('<template>' + mainMarkupHtmlString_1.MainMarkupHtmlString + '</template>', this.viewResources);
        this.view = this.viewFactory.create(this.container);
        this.viewSlots.mainViewSlot = new aurelia_framework_1.ViewSlot(this.element, true);
        this.viewSlots.mainViewSlot.add(this.view);
        this.viewSlots.mainViewSlot.bind(this, {
            bindingContext: this,
            parentOverrideContext: this.htmlHeightWidth
        });
        this.viewSlots.mainViewSlot.attached();
    };
    return MainMarkup;
}());
exports.MainMarkup = MainMarkup;
//# sourceMappingURL=mainMarkup.js.map
});
___scope___.file("grid/mainMarkupHtmlString.js", function(exports, require, module, __filename, __dirname){ 

exports.MainMarkupHtmlString = "\n        <avg-top-panel v-drag-drop-col class=\"avg-top-panel\" css=\"height:$au{avgPanel_Height}px\">\n\n        </avg-top-panel>\n\n        <avg-header class=\"avg-header\" css=\"height:$au{avgHeader_Height}px;top:$au{avgHeader_Top}px\">\n\n          <avg-header-left class=\"avg-header-left\" css=\"width:$au{avgHeaderLeft_Width}px\">\n           </avg-header-left>  \n\n           <avg-header-main class=\"avg-header-main\" css=\"left:$au{avgHeaderMain_Left}px;right:$au{avgHeaderMain_Right}px\">\n             <avg-header-main-scroll css=\"width:$au{avgHeaderMainScroll_Width}px;height:$au{avgHeaderMainScroll_Height}px\"> \n             </avg-header-main-scroll> \n           </avg-header-main> \n\n           <avg-header-right class=\"avg-header-right\" css=\"right:$au{avgHeaderRight_Right}px;width:$au{avgHeaderRight_Width}px\">\n           </avg-header-right> \n\n        </avg-header>\n\n        <avg-content class=\"avg-content\" css=\"top:$au{avgContent_Top}px;bottom:$au{avgContent_Bottom}px\">\n           \n            <avg-content-left  class=\"avg-content-left\" css=\"width:$au{avgContentLeft_Width}px\">\n              <avg-content-left-scroll css=\"width:$au{avgContentLeftScroll_Width};height:$au{avgContentLeftScroll_Height}px\">  \n              </avg-content-left-scroll> \n            </avg-content-left>  \n\n            <avg-content-main  class=\"avg-content-main\" css=\"left:$au{avgContentMain_Left}px;right:$au{avgContentMain_Right}px\">\n              <avg-content-main-scroll css=\"min-width: 100%;width:$au{avgContentMainScroll_Width}px;height:$au{avgContentMainScroll_Height}px\"> \n              </avg-content-main-scroll> \n            </avg-content-main> \n\n            <avg-content-right  class=\"avg-content-right\" css=\"right:$au{avgContentRight_Right}px;width:$au{avgContentRight_Width}px\">\n              <avg-content-right-scroll css=\"width:$au{avgContentRightScroll_Width};height:$au{avgContentRightScroll_Height}px\">  \n              </avg-content-right-scroll> \n            </avg-content-right>  \n            \n        </avg-content>\n\n       <avg-footer class=\"avg-footer\" css=\"height:$au{avgFooter_Height}px\">\n       </avg-footer> \n\n       <avg-content-group css=\"left:0;right:0;top:$au{avgContentGroup_Top}px;bottom:$au{avgContentGroup_Bottom}px\">\n          <avg-content-group-scroll css=\"left:0;right:0;height:$au{avgContentGroup_Height}px\">  \n          </avg-content-group-scroll> \n        </avg-content-group> \n\n        <avg-content-vhandle css=\"right:0;bottom:$au{avgContentVhandle_Bottom}px;right:$au{avgContentVhandle_Right}px;left:$au{avgContentVhandle_Left}px;top:$au{avgContentVhandle_Top}px\">\n          <avg-content-vhandle-scroll css=\"width:5px;height:$au{avgContentVhandleScroll_Height}px\"> \n          </avg-content-vhandle-scroll> \n        </avg-content-vhandle> \n\n        <avg-content-hhandle css=\"bottom:$au{avgContentHhandle_Bottom}px;right:$au{avgContentHhandle_Right}px;left:$au{avgContentHhandle_Left}px;height:$au{avgContentHhandle_Height}px\">\n          <avg-content-hhandle-scroll css=\"height:7px;width:$au{avgContentHhandleScroll_Width}px\"> \n          </avg-content-hhandle-scroll> \n        </avg-content-hhandle> \n\n        ".replace(/\$(au{)/g, '${');
//# sourceMappingURL=mainMarkupHtmlString.js.map
});
___scope___.file("grid/mainScrollEvents.js", function(exports, require, module, __filename, __dirname){ 

var MainScrollEvents = (function () {
    function MainScrollEvents(element, htmlCache) {
        this.element = element;
        this.htmlCache = htmlCache;
        this.timerLeft = null;
        this.timerMain = null;
        this.timerRight = null;
        this.timerVhandle = null;
        this.timerHhandle = null;
        this.timerWheel = null;
        this.isScrollbar = false;
        this.lastTopPosition = 0;
        this.wheelEvent = 'onwheel';
        this.isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
        if (this.isIE11) {
            this.wheelEvent = 'onmousewheel';
            console.warn('IE11, why!?!?!');
        }
    }
    MainScrollEvents.prototype.init = function () {
        this.updateInternalHtmlCache();
        this.addScrollEvents('all');
    };
    MainScrollEvents.prototype.updateInternalHtmlCache = function () {
        this.left = this.htmlCache.avg_content_left;
        this.main = this.htmlCache.avg_content_main;
        this.right = this.htmlCache.avg_content_right;
        this.mainHead = this.htmlCache.avg_header_main_scroll;
        this.vhandle = this.htmlCache.avg_content_vhandle;
        this.hhandle = this.htmlCache.avg_content_hhandle;
        this.group = this.htmlCache.avg_content_group;
    };
    MainScrollEvents.prototype.onWeel = function (event) {
        var _this = this;
        if (this.vhandle.scrollHeight === this.vhandle.parentNode.clientHeight) {
            return false;
        }
        requestAnimationFrame(function () {
            var deltaY = event.deltaY;
            if (event.deltaMode) {
                deltaY = deltaY * 40;
            }
            if (!event.deltaY && !event.deltaMode) {
                if (event.wheelDelta < 0) {
                    deltaY = 100;
                }
                else {
                    deltaY = -100;
                }
            }
            _this.handleEventWheelScroll(deltaY);
        });
        event.preventDefault();
        return false;
    };
    MainScrollEvents.prototype.addScrollEvents = function (type) {
        switch (type) {
            case 'all':
                this.right[this.wheelEvent] = this.onWeel.bind(this);
                this.main[this.wheelEvent] = this.onWeel.bind(this);
                this.left[this.wheelEvent] = this.onWeel.bind(this);
                this.group[this.wheelEvent] = this.onWeel.bind(this);
                this.vhandle.onscroll = this.handleEventVhandle.bind(this);
                this.hhandle.onscroll = this.handleEventHhandle.bind(this);
                this.htmlCache.element.addEventListener('touchmove', this.touchMove.bind(this));
                this.htmlCache.element.addEventListener('touchstart', this.touchStart.bind(this));
                break;
            case 'wheel':
                this.vhandle.onscroll = this.handleEventVhandle.bind(this);
                break;
            default:
        }
    };
    MainScrollEvents.prototype.removeScrollEvents = function (type) {
        switch (type) {
            case 'all':
                this.vhandle.onscroll = null;
                break;
            case 'wheel':
                this.vhandle.onscroll = null;
                break;
            default:
        }
    };
    MainScrollEvents.prototype.touchStart = function (e) {
        var touchobj = e.changedTouches[0];
        this.touchY = parseInt(touchobj.clientY, 10);
        this.touchX = parseInt(touchobj.clientX, 10);
    };
    MainScrollEvents.prototype.touchMove = function (e) {
        var touchobj = e.changedTouches[0];
        var dist = this.touchY - parseInt(touchobj.clientY, 10);
        var distX = parseInt(touchobj.clientX, 10) - this.touchX;
        this.touchY = parseInt(touchobj.clientY, 10);
        this.touchX = parseInt(touchobj.clientX, 10);
        this.handleEventWheelScroll(dist, -distX);
        e.preventDefault();
    };
    MainScrollEvents.prototype.handleEventWheelScroll = function (newTopPosition, left) {
        var _this = this;
        requestAnimationFrame(function () {
            if (_this.timerWheel) {
                clearTimeout(_this.timerWheel);
                _this.removeScrollEvents('wheel');
            }
            requestAnimationFrame(function () {
                _this.vhandle.scrollTop = _this.vhandle.scrollTop + newTopPosition;
                _this.main.scrollTop = _this.vhandle.scrollTop;
                _this.right.scrollTop = _this.vhandle.scrollTop;
                _this.left.scrollTop = _this.vhandle.scrollTop;
                _this.group.scrollTop = _this.vhandle.scrollTop;
                if (left !== undefined) {
                    _this.main.scrollLeft = _this.main.scrollLeft + left;
                    _this.mainHead.style.left = -_this.main.scrollLeft + 'px';
                }
                _this.isScrollbar = false;
                _this.checkScroll(_this.main.scrollTop);
                _this.timerWheel = setTimeout(function () {
                    _this.addScrollEvents('wheel');
                    _this.timerWheel = null;
                }, 30);
            });
        });
    };
    MainScrollEvents.prototype.handleEventVhandle = function () {
        var _this = this;
        requestAnimationFrame(function () {
            if (_this.timerVhandle) {
                clearTimeout(_this.timerVhandle);
                _this.removeScrollEvents('Vhandle');
            }
            requestAnimationFrame(function () {
                var newTopPosition = _this.vhandle.scrollTop;
                _this.right.scrollTop = newTopPosition;
                _this.main.scrollTop = newTopPosition;
                _this.left.scrollTop = newTopPosition;
                _this.group.scrollTop = newTopPosition;
                _this.isScrollbar = true;
                _this.checkScroll(newTopPosition);
                _this.timerVhandle = setTimeout(function () {
                    _this.addScrollEvents('Vhandle');
                    _this.timerVhandle = null;
                }, 30);
            });
        });
    };
    MainScrollEvents.prototype.handleEventHhandle = function () {
        var _this = this;
        requestAnimationFrame(function () {
            if (_this.timerHhandle) {
                clearTimeout(_this.timerHhandle);
                _this.removeScrollEvents('Hhandle');
            }
            requestAnimationFrame(function () {
                var newLeftPosition = _this.hhandle.scrollLeft;
                _this.main.scrollLeft = newLeftPosition;
                _this.mainHead.style.left = -newLeftPosition + 'px';
                _this.timerHhandle = setTimeout(function () {
                    _this.addScrollEvents('Hhandle');
                    _this.timerHhandle = null;
                }, 30);
            });
        });
    };
    MainScrollEvents.prototype.checkScroll = function (newTopPosition) {
        if (this.lastTopPosition !== newTopPosition) {
            var isDown = true;
            if (this.lastTopPosition > newTopPosition) {
                isDown = false;
            }
            this.lastTopPosition = newTopPosition;
            this.triggerGridScrollEvent(this.isScrollbar, isDown, newTopPosition);
        }
    };
    MainScrollEvents.prototype.triggerGridScrollEvent = function (scrollbarScrolling, down, topPosition) {
        var event = new CustomEvent('avg-scroll', {
            detail: {
                isScrollBarScrolling: scrollbarScrolling,
                isDown: down,
                newTopPosition: topPosition
            },
            bubbles: false
        });
        this.element.dispatchEvent(event);
    };
    return MainScrollEvents;
}());
exports.MainScrollEvents = MainScrollEvents;
//# sourceMappingURL=mainScrollEvents.js.map
});
___scope___.file("grid/rowMarkup.js", function(exports, require, module, __filename, __dirname){ 

var RowMarkup = (function () {
    function RowMarkup(element, htmlCache) {
        this.element = element;
        this.htmlCache = htmlCache;
    }
    RowMarkup.prototype.init = function (rowHeight) {
        this.rowHeight = rowHeight;
        this.updateInternalHtmlCache();
        this.generateRows();
    };
    RowMarkup.prototype.generateRows = function () {
        var markupLeft = '';
        var markupMain = '';
        var markupRight = '';
        var markupGroup = '';
        for (var i = 0; i < 40; i++) {
            var translateY = this.rowHeight * i;
            var avgRowMarkup = "\n        <avg-row \n          class=\"avg-row\" \n          style=\"height:" + this.rowHeight + "px; \n            transform:translate3d(0px, " + translateY + "px, 0px);\n            z-index:5;\" \n          row=\"" + i + "\">\n        </avg-row>";
            var avgRowMarkupGroup = "\n        <avg-row \n          class=\"avg-row-helper\" \n          style=\"height:" + this.rowHeight + "px; \n            transform:translate3d(0px, " + translateY + "px, 0px);\n            z-index:5;\" \n          row=\"" + i + "\">\n        </avg-row>";
            markupLeft = markupLeft + avgRowMarkup;
            markupMain = markupMain + avgRowMarkup;
            markupRight = markupRight + avgRowMarkup;
            markupGroup = markupGroup + avgRowMarkupGroup;
        }
        this.left.innerHTML = markupLeft;
        this.main.innerHTML = markupLeft;
        this.right.innerHTML = markupLeft;
        this.group.innerHTML = markupGroup;
    };
    RowMarkup.prototype.updateInternalHtmlCache = function () {
        this.left = this.htmlCache.avg_content_left_scroll;
        this.main = this.htmlCache.avg_content_main_scroll;
        this.right = this.htmlCache.avg_content_right_scroll;
        this.group = this.htmlCache.avg_content_group_scroll;
    };
    return RowMarkup;
}());
exports.RowMarkup = RowMarkup;
//# sourceMappingURL=rowMarkup.js.map
});
___scope___.file("grid/rowScrollEvents.js", function(exports, require, module, __filename, __dirname){ 

var RowScrollEvents = (function () {
    function RowScrollEvents(element, htmlCache, controller) {
        this.htmlCache = htmlCache;
        this.element = element;
        this.controller = controller;
        this.timer = null;
        this.largeScroll = false;
        this.collectionLength = 0;
        this.largeScrollUpdateDelay = 0;
    }
    RowScrollEvents.prototype.init = function (rowHeight, attDataDelay, attVariableRowHeight) {
        this.rowCache = this.htmlCache.rowCache;
        this.largeScrollUpdateDelay = attDataDelay;
        this.rowHeight = rowHeight;
        this.updateInternalHtmlCache();
        this.createRowCache();
        if (attVariableRowHeight) {
            this.scrollNormal = this.scrollNormalVariableRowHeight.bind(this);
            this.scrollScrollBar = this.scrollScrollBarVariableRowHeight.bind(this);
        }
        this.addEventListener();
    };
    RowScrollEvents.prototype.setCollectionLength = function (length) {
        this.collectionLength = length;
    };
    RowScrollEvents.prototype.createRowCache = function () {
        for (var i = 0; i < this.cacheLength; i++) {
            this.rowCache.push({
                left: this.leftRows[i],
                main: this.mainRows[i],
                right: this.rightRows[i],
                group: this.groupRows[i],
                top: this.rowHeight * i,
                row: i
            });
        }
    };
    RowScrollEvents.prototype.updateInternalHtmlCache = function () {
        this.left = this.htmlCache.avg_content_left_scroll;
        this.main = this.htmlCache.avg_content_main_scroll;
        this.right = this.htmlCache.avg_content_right_scroll;
        this.scroller = this.htmlCache.avg_content_right_scroll;
        this.leftRows = this.htmlCache.avg_left_rows;
        this.mainRows = this.htmlCache.avg_main_rows;
        this.rightRows = this.htmlCache.avg_right_rows;
        this.groupRows = this.htmlCache.avg_group_rows;
        this.cacheLength = this.leftRows.length;
    };
    Object.defineProperty(RowScrollEvents.prototype, "contentHeight", {
        get: function () {
            return this.htmlCache.avg_content_main.offsetHeight;
        },
        enumerable: true,
        configurable: true
    });
    RowScrollEvents.prototype.onScroll = function (event) {
        var _this = this;
        var isDown = event.detail.isDown;
        var isScrollBarScrolling = event.detail.isScrollBarScrolling;
        var newTopPosition = event.detail.newTopPosition;
        if (this.largeScroll || isScrollBarScrolling) {
            if (this.largeScrollUpdateDelay) {
                clearTimeout(this.timer);
                this.largeScroll = true;
                this.timer = setTimeout(function () {
                    _this.largeScroll = false;
                    _this.scrollScrollBar(newTopPosition, isDown);
                }, this.largeScrollUpdateDelay);
            }
            else {
                this.scrollScrollBar(newTopPosition, isDown);
            }
        }
        else {
            switch (true) {
                case isDown && !isScrollBarScrolling:
                    this.scrollNormal(newTopPosition, true);
                    break;
                case !isDown && !isScrollBarScrolling:
                    this.scrollNormal(newTopPosition, false);
                    break;
                default:
            }
        }
    };
    RowScrollEvents.prototype.setRowTopValue = function (cache, top) {
        cache.left.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.main.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.right.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.group.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.top = top;
        cache.row = Math.floor(top / this.rowHeight);
    };
    RowScrollEvents.prototype.setRowTopValueVariableRowHeight = function (cache, top) {
        cache.left.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.main.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.right.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.group.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.top = top;
        var rowHeightState = this.controller.getRowHeightState();
        cache.row = rowHeightState.top.indexOf(top);
    };
    RowScrollEvents.prototype.scrollNormal = function (newTopPosition, downScroll) {
        var rowHeight = this.rowHeight;
        var currentRow = Math.floor(newTopPosition / rowHeight);
        var cacheHeight = rowHeight * this.cacheLength;
        for (var i = 0; i < this.cacheLength; i++) {
            var cache = this.rowCache[i];
            var top = this.rowCache[i].top;
            var update = false;
            var newTop = void 0;
            if (!downScroll) {
                if (top > (newTopPosition + this.contentHeight)) {
                    update = true;
                    newTop = top - cacheHeight;
                    currentRow = (top - cacheHeight) / rowHeight;
                }
            }
            else {
                if (top < (newTopPosition - rowHeight)) {
                    update = true;
                    newTop = top + cacheHeight;
                    currentRow = (top + cacheHeight) / rowHeight;
                }
            }
            if (update === true && currentRow >= 0 && currentRow <= this.collectionLength - 1) {
                this.setRowTopValue(cache, newTop);
                this.triggerRebindRowEvent(currentRow, cache, downScroll);
            }
        }
        this.rowCache.sort(function (a, b) {
            return a.row - b.row;
        });
    };
    RowScrollEvents.prototype.scrollScrollBar = function (newTopPosition, downScroll) {
        var _this = this;
        if (this.collectionLength <= this.cacheLength) {
            newTopPosition = 0;
        }
        var rowHeight = this.rowHeight;
        var bodyHeight = this.contentHeight;
        var currentRow = Math.floor(newTopPosition / rowHeight);
        var firstRow = Math.floor(newTopPosition / rowHeight);
        var currentRowTop = rowHeight * currentRow;
        var firstRowTop = rowHeight * firstRow;
        var collectionLength = this.collectionLength;
        var setAfter = function (no) {
            var row = _this.rowCache[no];
            _this.setRowTopValue(row, currentRowTop);
            currentRowTop = currentRowTop + rowHeight;
        };
        var setBefore = function (no) {
            var row = _this.rowCache[no];
            firstRowTop = firstRowTop - rowHeight;
            _this.setRowTopValue(row, firstRowTop);
        };
        var setHiddenFromView = function (no) {
            var row = _this.rowCache[no];
            _this.setRowTopValue(row, -(currentRowTop + (rowHeight * 50)));
        };
        for (var i = 0; i < this.cacheLength; i++) {
            var moved = false;
            switch (true) {
                case currentRow >= 0 && currentRow <= collectionLength - 1:
                    setAfter(i);
                    moved = true;
                    break;
                case currentRow >= collectionLength && (collectionLength * rowHeight) >= bodyHeight:
                    setBefore(i);
                    moved = true;
                    break;
                default:
            }
            if (!moved) {
                if (currentRow >= collectionLength && (currentRowTop - rowHeight) >= bodyHeight) {
                    setHiddenFromView(i);
                }
                else {
                    if (currentRow >= collectionLength) {
                        setHiddenFromView(i);
                    }
                }
            }
            currentRow++;
        }
        this.rowCache.sort(function (a, b) {
            return a.row - b.row;
        });
        this.triggerRebindAllRowsEvent(downScroll, this.rowCache);
    };
    RowScrollEvents.prototype.setRowHeight = function (rowElement, rowNo) {
        var rowHeightState = this.controller.getRowHeightState();
        rowElement.left.style.height = rowHeightState.rows[rowNo] + 'px';
        rowElement.main.style.height = rowHeightState.rows[rowNo] + 'px';
        rowElement.right.style.height = rowHeightState.rows[rowNo] + 'px';
        rowElement.group.style.height = rowHeightState.rows[rowNo] + 'px';
    };
    RowScrollEvents.prototype.scrollNormalVariableRowHeight = function (newTopPosition, downScroll) {
        var rowHeightState = this.controller.getRowHeightState();
        for (var i = 0; i < this.cacheLength; i++) {
            var cache = this.rowCache[i];
            var top = this.rowCache[i].top;
            var currentRow = rowHeightState.top.indexOf(top);
            this.setRowHeight(this.rowCache[i], currentRow);
            var update = false;
            var newTop = void 0;
            if (!downScroll) {
                if (top > (newTopPosition + this.contentHeight)) {
                    currentRow = currentRow - this.cacheLength;
                    if (currentRow > -1) {
                        update = true;
                        newTop = rowHeightState.top[currentRow];
                    }
                }
            }
            else {
                if (top < (newTopPosition - rowHeightState.rows[currentRow])) {
                    update = true;
                    newTop = rowHeightState.top[currentRow + this.cacheLength];
                    currentRow = currentRow + this.cacheLength;
                }
            }
            if (update === true && currentRow >= 0 && currentRow <= this.collectionLength - 1) {
                this.setRowTopValueVariableRowHeight(cache, newTop);
                this.triggerRebindRowEvent(currentRow, cache, downScroll);
            }
        }
        this.rowCache.sort(function (a, b) {
            return a.row - b.row;
        });
    };
    RowScrollEvents.prototype.scrollScrollBarVariableRowHeight = function (newTopPosition, downScroll) {
        var _this = this;
        if (this.collectionLength <= this.cacheLength) {
            newTopPosition = 0;
        }
        var rowHeightState = this.controller.getRowHeightState();
        var x = 1000;
        var currentRow = 0;
        var currentRowTop = 0;
        var firstRow = 0;
        var i = 0;
        var run = true;
        if (newTopPosition !== 0) {
            while (i < rowHeightState.top.length) {
                var checkValue = Math.abs(newTopPosition - (rowHeightState.top[i]));
                if (checkValue === x) {
                    currentRow = i - 1;
                    firstRow = i - 1;
                    run = false;
                }
                else {
                    if (checkValue < x) {
                        currentRow = i - 1;
                        firstRow = i - 1;
                        x = checkValue;
                    }
                }
                i++;
            }
        }
        var bodyHeight = this.contentHeight;
        currentRowTop = rowHeightState.top[currentRow];
        var firstRowTop = currentRowTop * 1;
        var collectionLength = this.collectionLength;
        var setAfter = function (no) {
            var row = _this.rowCache[no];
            _this.setRowHeight(row, currentRow);
            _this.setRowTopValueVariableRowHeight(row, currentRowTop);
            row.row = currentRow;
            currentRowTop = currentRowTop + rowHeightState.rows[currentRow];
        };
        var setBefore = function (no) {
            var row = _this.rowCache[no];
            _this.setRowHeight(row, currentRow);
            firstRowTop = firstRowTop - rowHeightState.rows[currentRow];
            _this.setRowTopValueVariableRowHeight(row, firstRowTop);
        };
        var setHiddenFromView = function (no) {
            var row = _this.rowCache[no];
            _this.setRowTopValueVariableRowHeight(row, -(currentRowTop + (rowHeightState.rows[currentRow] * 50)));
        };
        for (var i_1 = 0; i_1 < this.cacheLength; i_1++) {
            var moved = false;
            switch (true) {
                case currentRow >= 0 && currentRow <= collectionLength - 1:
                    setAfter(i_1);
                    moved = true;
                    break;
                case currentRow >= collectionLength && (rowHeightState.total) >= bodyHeight:
                    setBefore(i_1);
                    moved = true;
                    break;
                default:
            }
            if (!moved) {
                if (currentRow >= collectionLength && (currentRowTop - rowHeightState.rows[currentRow]) >= bodyHeight) {
                    setHiddenFromView(i_1);
                }
                else {
                    if (currentRow >= collectionLength) {
                        setHiddenFromView(i_1);
                    }
                }
            }
            currentRow++;
        }
        this.rowCache.sort(function (a, b) {
            return a.row - b.row;
        });
        this.triggerRebindAllRowsEvent(downScroll, this.rowCache);
    };
    RowScrollEvents.prototype.addEventListener = function () {
        this.onScrollBinded = this.onScroll.bind(this);
        this.element.addEventListener('avg-scroll', this.onScrollBinded);
    };
    RowScrollEvents.prototype.triggerRebindRowEvent = function (curRow, curRowCache, isDownScroll) {
        var event = new CustomEvent('avg-rebind-row', {
            detail: {
                currentRow: curRow,
                rowCache: curRowCache,
                downScroll: isDownScroll
            },
            bubbles: false
        });
        this.element.dispatchEvent(event);
    };
    RowScrollEvents.prototype.triggerRebindAllRowsEvent = function (isDownScroll, curRowCache) {
        var event = new CustomEvent('avg-rebind-all-rows', {
            detail: {
                downScroll: isDownScroll,
                rowCache: curRowCache
            },
            bubbles: false
        });
        this.element.dispatchEvent(event);
    };
    return RowScrollEvents;
}());
exports.RowScrollEvents = RowScrollEvents;
//# sourceMappingURL=rowScrollEvents.js.map
});
___scope___.file("grid/columnMarkup.js", function(exports, require, module, __filename, __dirname){ 

var aurelia_framework_1 = require("aurelia-framework");
var columnMarkupHelper_1 = require("./columnMarkupHelper");
var ColumnMarkup = (function () {
    function ColumnMarkup(element, viewCompiler, container, viewResources, htmlCache, viewSlots, columnBindingContext) {
        this.element = element;
        this.htmlCache = htmlCache;
        this.viewSlots = viewSlots;
        this.columnBindingContext = columnBindingContext;
        this.markupHelper = new columnMarkupHelper_1.ColumnMarkupHelper();
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
    }
    ColumnMarkup.prototype.init = function (colConfig, overrideContext, colRepeater, colRepeatRowTemplate, colRepeatRowHeaderTemplate, colGroup) {
        this.overrideContext = overrideContext;
        this.colConfig = colConfig;
        this.configLength = colConfig.length;
        this.colRepeater = colRepeater;
        this.colRepeatRowTemplate = colRepeatRowTemplate;
        this.colRepeatHeaderTemplate = colRepeatRowHeaderTemplate;
        this.colGroup = colGroup;
        this.updateInternalHtmlCache();
        if (this.colConfig.length > 0) {
            this.markupHelper.generate(this.colConfig);
        }
        this.generateColumns();
    };
    ColumnMarkup.prototype.getRowViews = function (type) {
        var viewMarkup = '';
        var markupArray = [];
        if (type === 'group') {
            var defaultMarkup = [
                '<i click.delegate="changeGrouping(rowRef)">',
                '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">',
                '<path show.bind="rowRef.__groupExpanded" d="M4.8 7.5h6.5v1H4.8z"/>',
                '<path show.bind="!rowRef.__groupExpanded" d="M7.4 4.8v2.7H4.7v1h2.7v3h1v-3h2.8v-1H8.5V4.8h-1z"/>',
                '</svg>',
                '</i>&nbsp;${rowRef.__groupName} (${rowRef.__groupTotal})',
            ];
            var gTemplate = this.colGroup || defaultMarkup.join('');
            markupArray = [
                '<avg-col ',
                'class="avg-col-group"',
                'if.bind="rowRef.__group ===true"',
                'css="left:${rowRef.__groupLvl ? rowRef.__groupLvl *15:0}px;right:0">',
                gTemplate,
                '</avg-col>'
            ];
            viewMarkup = markupArray.join('');
        }
        else {
            if (this.colRepeater && type === 'main') {
                var style = 'style="left:0;right:0"';
                viewMarkup = "<avg-repeat                         class=\"avg-col\"                         if.bind=\"rowRef.__group !== true\" " + style + ">" + this.colRepeatRowTemplate + "                      </avg-repeat>";
            }
            else {
                for (var i = 0; i < this.configLength; i++) {
                    var style = void 0;
                    switch (type) {
                        case 'left':
                            style = 'css="width:${setupleft[' + i + '].width}px;\
                            left:${setupleft[' + i + '].left+ (setupgrouping * 15)}px"';
                            break;
                        case 'main':
                            style = 'css="width:${setupmain[' + i + '].width}px;\
                            left:${setupmain[' + i + '].left}px"';
                            break;
                        case 'right':
                            style = 'css="width:${setupright[' + i + '].width}px;\
                            left:${setupright[' + i + '].left}px"';
                            break;
                        default:
                    }
                    var template = this.colConfig[i].__colRowTemplateGenerated;
                    var colMarkup = "<avg-col                               class=\"avg-col\"                               if.bind=\"setup" + type + "[" + i + "].show && rowRef.__group !== true\" " + style + ">" + template + "                          </avg-col>";
                    viewMarkup = viewMarkup + colMarkup;
                }
            }
        }
        var groupingBlock = '';
        if (type === 'left') {
            groupingBlock = '<avg-col \
      class="avg-col-grouping" \
      css="left:0px;width:${rowRef.__groupLvl ? rowRef.__groupLvl *15:0}px"></avg-col>';
        }
        return this.viewCompiler.compile("<template>" + (groupingBlock + viewMarkup) + "</template>", this.viewResources);
    };
    ColumnMarkup.prototype.createColSetupContext = function (type) {
        var leftCur = 0;
        for (var i = 0; i < this.configLength; i++) {
            var widthCur = this.colConfig[i].colWidth;
            var showme = false;
            switch (type) {
                case 'left':
                    showme = this.colConfig[i].colPinLeft;
                    break;
                case 'main':
                    showme = !this.colConfig[i].colPinLeft && !this.colConfig[i].colPinRight;
                    break;
                case 'right':
                    showme = this.colConfig[i].colPinRight;
                    break;
                default:
            }
            this.columnBindingContext['setup' + type].push({
                width: widthCur,
                show: showme,
                left: leftCur
            });
            if (showme) {
                leftCur = leftCur + widthCur;
            }
        }
    };
    ColumnMarkup.prototype.getHeaderViews = function (type) {
        var viewMarkup = '';
        if (this.colRepeater && type === 'main' && this.colRepeatHeaderTemplate) {
            var style = 'css="left:0;right:0"';
            viewMarkup = "<div class=\"avg-col\" " + style + ">" + this.colRepeatHeaderTemplate + "</div>";
        }
        else {
            for (var i = 0; i < this.configLength; i++) {
                var style = void 0;
                switch (type) {
                    case 'left':
                        style = 'css="width:${setupleft[' + i + '].width}px;\
                          left:${setupleft[' + i + '].left + (setupgrouping * 15)}px"';
                        break;
                    case 'main':
                        style = 'css="width:${setupmain[' + i + '].width}px;\
                          left:${setupmain[' + i + '].left}px"';
                        break;
                    case 'right':
                        style = 'css="width:${setupright[' + i + '].width}px;\
                          left:${setupright[' + i + '].left}px"';
                        break;
                    default:
                }
                var template = this.colConfig[i].__colHeaderTemplateGenerated;
                var colMarkup = "<avg-col                             avg-type=\"" + type + "\"                             avg-config-col=\"" + i + "\"                             class=\"avg-col\"                             if.bind=\"setup" + type + "[" + i + "].show\"                             " + style + ">" + template + "                          </avg-col>";
                viewMarkup = viewMarkup + colMarkup;
            }
        }
        var groupingBlock = '';
        if (type === 'left') {
            groupingBlock = '<avg-col \
                          class="avg-col-grouping-header" \
                          css="left:0px;width:${setupgrouping ? (setupgrouping * 15):0}px"> \
                       </avg-col>';
        }
        return this.viewCompiler.compile("<template>" + (groupingBlock + viewMarkup) + "</template>", this.viewResources);
    };
    ColumnMarkup.prototype.generateColumns = function () {
        if (this.columnBindingContext.setupmain.length === 0) {
            this.createColSetupContext('left');
            this.createColSetupContext('main');
            this.createColSetupContext('right');
            this.createColSetupContext('group');
        }
        var viewFactoryLeft = this.getRowViews('left');
        var viewFactoryMain = this.getRowViews('main');
        var viewFactoryRight = this.getRowViews('right');
        var viewFactoryGroup = this.getRowViews('group');
        for (var i = 0; i < this.rowLength; i++) {
            this.viewSlots.leftRowViewSlots[i] = this.createViewSlot(this.leftRows[i], viewFactoryLeft);
            this.viewSlots.mainRowViewSlots[i] = this.createViewSlot(this.mainRows[i], viewFactoryMain);
            this.viewSlots.rightRowViewSlots[i] = this.createViewSlot(this.rightRows[i], viewFactoryRight);
            this.viewSlots.groupRowViewSlots[i] = this.createViewSlot(this.groupRows[i], viewFactoryGroup);
            this.htmlCache.rowCache[i].leftRowViewSlot = this.viewSlots.leftRowViewSlots[i];
            this.htmlCache.rowCache[i].mainRowViewSlot = this.viewSlots.mainRowViewSlots[i];
            this.htmlCache.rowCache[i].rightRowViewSlot = this.viewSlots.rightRowViewSlots[i];
            this.htmlCache.rowCache[i].groupRowViewSlot = this.viewSlots.groupRowViewSlots[i];
        }
        var viewFactoryHeaderLeft = this.getHeaderViews('left');
        var viewFactoryHeaderMain = this.getHeaderViews('main');
        var viewFactoryHeaderRight = this.getHeaderViews('right');
        this.viewSlots.leftHeaderViewSlot = this.createViewSlot(this.leftHeader, viewFactoryHeaderLeft);
        this.viewSlots.mainHeaderViewSlot = this.createViewSlot(this.mainHeader, viewFactoryHeaderMain);
        this.viewSlots.rightHeaderViewSlot = this.createViewSlot(this.rightHeader, viewFactoryHeaderRight);
    };
    ColumnMarkup.prototype.createViewSlot = function (element, viewFactory) {
        var view = viewFactory.create(this.container);
        var viewSlot = new aurelia_framework_1.ViewSlot(element, true);
        viewSlot.add(view);
        return viewSlot;
    };
    ColumnMarkup.prototype.updateInternalHtmlCache = function () {
        this.leftScroll = this.htmlCache.avg_content_left_scroll;
        this.mainScroll = this.htmlCache.avg_content_main_scroll;
        this.rightScroll = this.htmlCache.avg_content_right_scroll;
        this.groupScroll = this.htmlCache.avg_content_group_scroll;
        this.leftHeader = this.htmlCache.avg_header_left;
        this.mainHeader = this.htmlCache.avg_header_main_scroll;
        this.rightHeader = this.htmlCache.avg_header_right;
        this.leftRows = this.htmlCache.avg_left_rows;
        this.mainRows = this.htmlCache.avg_main_rows;
        this.rightRows = this.htmlCache.avg_right_rows;
        this.groupRows = this.htmlCache.avg_group_rows;
        this.rowLength = this.leftRows.length;
    };
    return ColumnMarkup;
}());
exports.ColumnMarkup = ColumnMarkup;
//# sourceMappingURL=columnMarkup.js.map
});
___scope___.file("grid/columnMarkupHelper.js", function(exports, require, module, __filename, __dirname){ 

var ColumnMarkupHelper = (function () {
    function ColumnMarkupHelper() {
    }
    ColumnMarkupHelper.prototype.generate = function (colConfig) {
        var type = null;
        if (colConfig && colConfig.length > 0) {
            type = 'typeHtml';
        }
        if (!type) {
            throw new Error('column setup missing');
        }
        this.processColumns(colConfig);
    };
    ColumnMarkupHelper.prototype.processColumns = function (array) {
        var _this = this;
        array.forEach(function (col, index) {
            if (!col.colField && !col.colRowTemplate) {
                if (col.colType !== 'selection') {
                    throw new Error('colField is not set on column' + index);
                }
            }
            col.colType = col.colType || 'text';
            col.colFilterTop = col.colFilterTop || false;
            col.colHeaderName = col.colHeaderName || _this.getAttribute(col.colField, true);
            col.colWidth = col.colWidth || 100;
            col.colCss = col.colCss || '';
            col.colField = _this.checkAttribute(col.colField);
            _this.createHeaderTemplate(col);
            _this.createRowTemplate(col);
            if (col.colRowTemplate) {
                col.__colRowTemplateGenerated = col.colRowTemplate;
            }
            if (col.colHeaderTemplate) {
                col.__colHeaderTemplateGenerated = col.colHeaderTemplate;
            }
        });
    };
    ColumnMarkupHelper.prototype.createHeaderTemplate = function (col) {
        if (!col.colHeaderTemplate) {
            var inputHeader = void 0;
            var labelHeader = void 0;
            switch (col.colType) {
                case 'selection':
                    labelHeader = '';
                    inputHeader = "<input \n            class=\"avg-row-checkbox-100\" \n            v-selection=\"type:header;selected.bind:selected\" \n            type=\"checkbox\">";
                    break;
                case 'image':
                    inputHeader = '<p class="avg-label-top"></p>';
                    if (!col.colFilterTop) {
                        col.colFilter = 'x';
                    }
                    labelHeader = this.createLabelMarkup(col);
                    break;
                default:
                    inputHeader = this.createInputHeaderMarkup(col);
                    labelHeader = this.createLabelMarkup(col);
                    break;
            }
            if (col.colFilterTop) {
                col.__colHeaderTemplateGenerated = inputHeader + labelHeader;
            }
            else {
                col.__colHeaderTemplateGenerated = labelHeader + inputHeader;
            }
        }
    };
    ColumnMarkupHelper.prototype.createRowTemplate = function (col) {
        if (!col.colRowTemplate) {
            switch (col.colType) {
                case 'selection':
                    col.colRowTemplate = "<input \n            v-key-move \n            class=\"avg-row-checkbox-100\"  \n            v-selection=\"type:row;selected.bind:selected\" \n            type=\"checkbox\" >";
                    break;
                case 'image':
                    this.createImageRowMarkup(col);
                    break;
                default:
                    this.createInputRowMarkup(col);
                    break;
            }
        }
    };
    ColumnMarkupHelper.prototype.getAttribute = function (value, capitalize) {
        var returnValue = value || 'missing!';
        if (value) {
            value = value.replace('rowRef.', '');
            value = value.replace('tempRef.', '');
            var newValue = '';
            var done = false;
            for (var x = 0; x < value.length; x++) {
                var letter = value.charAt(x);
                if (!done && letter !== ' ' && letter !== '&' && letter !== '|' && letter !== ':') {
                    newValue = newValue + letter;
                }
                else {
                    done = true;
                }
            }
            if (capitalize) {
                returnValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
            }
            else {
                returnValue = newValue;
            }
        }
        return returnValue;
    };
    ;
    ColumnMarkupHelper.prototype.checkAttribute = function (attribute) {
        var value = attribute;
        if (attribute) {
            if (attribute.indexOf('rowRef') === -1 && attribute.indexOf('tempRef') === -1) {
                value = 'rowRef.' + attribute;
            }
        }
        return value;
    };
    ColumnMarkupHelper.prototype.createImageRowMarkup = function (col) {
        var classNames = 'class="avg-image-round"';
        var attributeRow = col.colAddRowAttributes ? col.colAddRowAttributes : '';
        var css = col.colCss ? "css=\"" + col.colCss + "\"" : '';
        var imageFix = "v-image-fix.bind=\"" + col.colField + "\"";
        col.__colRowTemplateGenerated = "<image " + css + " " + classNames + " " + imageFix + " " + attributeRow + ">";
    };
    ColumnMarkupHelper.prototype.createInputRowMarkup = function (col) {
        var colClass = "class=\"" + (col.colType === 'checkbox' ? 'avg-row-checkbox-100' : 'avg-row-input') + "\"";
        var colType = "type=\"" + col.colType + "\"";
        var colAddRowAttributes = col.colAddRowAttributes ? col.colAddRowAttributes : '';
        var colRowMenu = col.colRowMenu ? "v-menu=\"" + col.colRowMenu + "\"" : '';
        var colCss = col.colCss ? "css=\"" + col.colCss + "\"" : '';
        if (col.colType === 'checkbox') {
            col.__colRowTemplateGenerated = "<input \n        " + colCss + " \n        " + colClass + " \n        " + colType + " \n        " + colAddRowAttributes + " \n        " + colRowMenu + "  \n        checked.bind=\"" + col.colField + "\">";
        }
        else {
            var binding = "value.bind=\"" + col.colField + "\"";
            if (col.colDisplayEdit) {
                binding = "v-data-handler=\"value.bind:" + col.colField + ";" + col.colDisplayEdit + "\"";
            }
            col.__colRowTemplateGenerated = "<input \n        " + colCss + " \n        " + colClass + " \n        " + colType + " \n        " + colRowMenu + "\n        " + colAddRowAttributes + "  \n        " + binding + ">";
        }
    };
    ColumnMarkupHelper.prototype.createInputHeaderMarkup = function (col) {
        var markup;
        if (col.colFilter) {
            var type = "type=\"" + col.colType + "\"";
            var filter = col.colFilter ? "v-filter=\"" + col.colFilter + "\"" : '';
            var colAddFilterAttributes = col.colAddFilterAttributes ? col.colAddFilterAttributes : '';
            var classNames = '';
            if (col.colType === 'checkbox') {
                classNames = "class=\"" + (col.colFilterTop ? 'avg-row-checkbox-50' : 'avg-row-checkbox-50') + "\"";
            }
            else {
                classNames = "class=\"" + (col.colFilterTop ? 'avg-header-input-top' : 'avg-header-input-bottom') + "\"";
            }
            var colRowMenu = col.colFilterMenu ? "v-menu=\"" + col.colFilterMenu + "\"" : '';
            markup = "<input " + colRowMenu + " " + classNames + " " + colAddFilterAttributes + " " + type + " " + filter + "\">";
        }
        else {
            markup = '';
        }
        return markup;
    };
    ColumnMarkupHelper.prototype.createLabelMarkup = function (col) {
        var filterClass = col.colFilter ? "" + (col.colFilterTop ? 'avg-label-bottom' : 'avg-label-top') : 'avg-label-full';
        var dragDropClass = col.colDragDrop ? 'avg-vGridDragHandle' : '';
        var classname = "class=\"" + dragDropClass + " " + filterClass + "\"";
        var colAddLabelAttributes = col.colAddLabelAttributes ? col.colAddLabelAttributes : '';
        var sort = col.colSort ? "v-sort=\"" + col.colSort + "\"" : '';
        var colLabelMenu = col.colLabelMenu ? "v-menu=\"" + col.colLabelMenu + "\"" : '';
        var colDragDrop = col.colDragDrop !== 'false' ? "v-drag-drop-col=\"" + col.colDragDrop + "\"" : '';
        var colResizeable = col.colResizeable !== 'false' ? "v-resize-col" : '';
        var extraAttributes = colDragDrop + " " + colResizeable + " " + colLabelMenu;
        return "<p \n      " + extraAttributes + " \n      " + classname + " \n      " + sort + " \n      " + colAddLabelAttributes + ">\n      " + col.colHeaderName + "\n      </p>";
    };
    return ColumnMarkupHelper;
}());
exports.ColumnMarkupHelper = ColumnMarkupHelper;
//# sourceMappingURL=columnMarkupHelper.js.map
});
___scope___.file("grid/htmlHeightWidth.js", function(exports, require, module, __filename, __dirname){ 

var HtmlHeightWidth = (function () {
    function HtmlHeightWidth(controller) {
        this.controller = controller;
        this.avgScrollBarWidth = this.getScrollbarWidth() || 17;
        this.avgPanel_Height = 0;
        this.avgHeader_Height = 30;
        this.avgHeader_Top = 0;
        this.avgContent_Top = 30;
        this.avgContent_Bottom = 30;
        this.avgHeaderLeft_Width = 200;
        this.avgHeaderMain_Left = 200;
        this.avgHeaderMain_Right = 150;
        this.avgHeaderMainScroll_Width = 0;
        this.avgHeaderMainScroll_Height = 100;
        this.avgHeaderRight_Right = 0;
        this.avgHeaderRight_Width = 150;
        this.avgContentLeft_Width = 200 + this.avgScrollBarWidth;
        this.avgContentLeftScroll_Width = '100%';
        this.avgContentLeftScroll_Height = 0 + this.avgScrollBarWidth;
        this.avgContentMain_Left = 200;
        this.avgContentMain_Right = 150 - this.avgScrollBarWidth;
        this.avgContentMainScroll_Width = 0;
        this.avgContentMainScroll_Height = 0;
        this.avgContentRight_Right = 0;
        this.avgContentRight_Width = 150;
        this.avgContentRightScroll_Width = '100%';
        this.avgContentRightScroll_Height = 0 + this.avgScrollBarWidth;
        this.avgContentGroup_Width = 150;
        this.avgContentGroup_Height = 0;
        this.avgContentGroup_Top = 0;
        this.avgContentGroup_Bottom = 0;
        this.avgContentVhandle_Width = 0 + this.avgScrollBarWidth;
        this.avgContentVhandle_Height = 0;
        this.avgContentVhandle_Top = 0;
        this.avgContentVhandleScroll_Height = 0;
        this.avgContentVhandle_Bottom = 0;
        this.avgContentHhandle_Bottom = 0;
        this.avgContentHhandle_Right = 0 + this.avgScrollBarWidth;
        this.avgContentHhandle_Left = 0;
        this.avgContentHhandle_Height = 17;
        this.avgContentHhandleScroll_Width = 17;
        this.avgFooter_Height = 30;
    }
    HtmlHeightWidth.prototype.getNewHeight = function (length) {
        var lengthTotal = 0;
        if (this.controller.attVariableRowHeight) {
            lengthTotal = this.controller.getRowHeightState().total;
        }
        else {
            lengthTotal = this.controller.attRowHeight * length;
        }
        return lengthTotal;
    };
    HtmlHeightWidth.prototype.setCollectionLength = function (length, includeScroller) {
        var rowTotal = this.getNewHeight(length);
        var avgScrollbarHeightValue = includeScroller === false ? 0 : this.avgScrollBarWidth;
        var total = rowTotal + avgScrollbarHeightValue;
        this.avgContentRightScroll_Height = total;
        this.avgContentGroup_Height = total;
        this.avgContentVhandleScroll_Height = total;
        this.avgContentMainScroll_Height = total;
        this.avgContentLeftScroll_Height = total;
    };
    HtmlHeightWidth.prototype.addDefaultsAttributes = function (attHeaderHeight, attRowHeight, attFooterHeight, attPanelHeight) {
        this.attHeaderHeight = attHeaderHeight;
        this.attRowHeight = attRowHeight;
        this.attFooterHeight = attFooterHeight;
        this.attPanelHeight = attPanelHeight;
        this.avgPanel_Height = attPanelHeight;
        this.avgHeader_Top = attPanelHeight;
        this.avgHeader_Height = attHeaderHeight;
        this.avgContent_Top = attHeaderHeight + attPanelHeight;
        this.avgContent_Bottom = attFooterHeight;
        this.avgFooter_Height = attFooterHeight;
        this.avgHeaderMainScroll_Height = attHeaderHeight;
        this.avgContentGroup_Height = this.avgContentGroup_Height;
        this.avgContentGroup_Top = this.avgContent_Top;
        this.avgContentGroup_Bottom = this.avgContent_Bottom;
        this.avgContentVhandle_Height = this.avgContentVhandle_Height;
        this.avgContentVhandle_Top = this.avgContent_Top;
        this.avgContentVhandle_Bottom = this.avgContent_Bottom;
        this.avgContentHhandle_Bottom = attFooterHeight;
        this.avgContentHhandle_Height = this.avgScrollBarWidth;
    };
    HtmlHeightWidth.prototype.adjustWidthsColumns = function (columnBindingContext, groupsLength) {
        var left = groupsLength ? groupsLength * 15 : 0;
        var main = 0;
        var right = 0;
        for (var i = 0; i < columnBindingContext.setupmain.length; i++) {
            if (columnBindingContext.setupleft[i].show) {
                left = left + columnBindingContext.setupleft[i].width;
            }
            if (columnBindingContext.setupmain[i].show) {
                main = main + columnBindingContext.setupmain[i].width;
            }
            if (columnBindingContext.setupright[i].show) {
                right = right + columnBindingContext.setupright[i].width;
            }
        }
        this.avgContentLeft_Width = left;
        this.avgHeaderLeft_Width = left;
        this.avgContentMain_Left = left;
        this.avgContentMain_Right = right;
        this.avgHeaderMain_Left = left;
        this.avgHeaderMain_Right = right;
        this.avgHeaderMainScroll_Width = main;
        this.avgContentMainScroll_Width = main;
        this.avgContentRight_Width = right;
        this.avgHeaderRight_Width = right;
        this.avgContentHhandle_Right = right;
        this.avgContentHhandle_Left = left;
        this.avgContentHhandleScroll_Width = main;
    };
    HtmlHeightWidth.prototype.setWidthFromColumnConfig = function (colConfig, groupsLength) {
        var left = groupsLength ? groupsLength * 15 : 0;
        var main = 0;
        var right = 0;
        for (var i = 0; i < colConfig.length; i++) {
            switch (true) {
                case colConfig[i].colPinLeft && colConfig[i].colPinRight:
                    left = left + colConfig[i].colWidth;
                    right = right + colConfig[i].colWidth;
                    break;
                case colConfig[i].colPinLeft:
                    left = left + colConfig[i].colWidth;
                    break;
                case colConfig[i].colPinRight:
                    right = right + colConfig[i].colWidth;
                    break;
                case !colConfig[i].colPinLeft && !colConfig[i].colPinRight:
                    main = main + colConfig[i].colWidth;
                    break;
                default:
            }
        }
        this.avgContentLeft_Width = left;
        this.avgHeaderLeft_Width = left;
        this.avgContentMain_Left = left;
        this.avgContentMain_Right = right;
        this.avgHeaderMain_Left = left;
        this.avgHeaderMain_Right = right;
        this.avgHeaderMainScroll_Width = main;
        this.avgContentMainScroll_Width = main;
        this.avgContentRight_Width = right;
        this.avgHeaderRight_Width = right;
        this.avgContentHhandle_Right = right;
        this.avgContentHhandle_Left = left;
        this.avgContentHhandleScroll_Width = main;
    };
    HtmlHeightWidth.prototype.getScrollbarWidth = function () {
        var outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        document.body.appendChild(outer);
        var widthNoScroll = outer.offsetWidth;
        outer.style.overflow = 'scroll';
        var inner = document.createElement('div');
        inner.style.width = '100%';
        outer.appendChild(inner);
        var widthWithScroll = inner.offsetWidth;
        outer.parentNode.removeChild(outer);
        return widthNoScroll - widthWithScroll;
    };
    return HtmlHeightWidth;
}());
exports.HtmlHeightWidth = HtmlHeightWidth;
//# sourceMappingURL=htmlHeightWidth.js.map
});
___scope___.file("grid/viewSlots.js", function(exports, require, module, __filename, __dirname){ 

var ViewSlots = (function () {
    function ViewSlots(htmlCache) {
        this.rowCache = htmlCache.rowCache;
        this.headerCache = htmlCache.headerCache;
        this.leftRowViewSlots = [];
        this.mainRowViewSlots = [];
        this.rightRowViewSlots = [];
        this.groupRowViewSlots = [];
        this.leftHeaderViewSlot = null;
        this.mainHeaderViewSlot = null;
        this.rightHeaderViewSlot = null;
        this.mainViewSlot = null;
        this.loadingScreenViewSlot = null;
        this.groupingViewSlots = [];
        this.contextMenu = null;
    }
    ViewSlots.prototype.bindAndAttachColumns = function (overrideContext, columnBindingContext, curSelection) {
        var context;
        var newParentOverrideContext = {
            bindingContext: columnBindingContext,
            parentOverrideContext: overrideContext
        };
        for (var i = 0; i < this.rowCache.length; i++) {
            context = { rowRef: {}, tempRef: {} };
            this.rowCache[i].bindingContext = context;
            this.rowCache[i].parentOverrideContext = {
                bindingContext: context,
                parentOverrideContext: newParentOverrideContext
            };
            this.leftRowViewSlots[i].bind(this.rowCache[i].bindingContext, this.rowCache[i].parentOverrideContext);
            this.leftRowViewSlots[i].attached();
            this.mainRowViewSlots[i].bind(this.rowCache[i].bindingContext, this.rowCache[i].parentOverrideContext);
            this.mainRowViewSlots[i].attached();
            this.rightRowViewSlots[i].bind(this.rowCache[i].bindingContext, this.rowCache[i].parentOverrideContext);
            this.rightRowViewSlots[i].attached();
            this.groupRowViewSlots[i].bind(this.rowCache[i].bindingContext, this.rowCache[i].parentOverrideContext);
            this.groupRowViewSlots[i].attached();
        }
        context = { selection: curSelection };
        this.headerCache.bindingContext = context;
        this.headerCache.parentOverrideContext = {
            bindingContext: context,
            parentOverrideContext: newParentOverrideContext
        };
        this.leftHeaderViewSlot.bind(this.headerCache.bindingContext, this.headerCache.parentOverrideContext);
        this.leftHeaderViewSlot.attached();
        this.mainHeaderViewSlot.bind(this.headerCache.bindingContext, this.headerCache.parentOverrideContext);
        this.mainHeaderViewSlot.attached();
        this.rightHeaderViewSlot.bind(this.headerCache.bindingContext, this.headerCache.parentOverrideContext);
        this.rightHeaderViewSlot.attached();
    };
    ViewSlots.prototype.unbindAndDetachColumns = function () {
        for (var i = 0; i < this.groupRowViewSlots.length; i++) {
            this.leftRowViewSlots[i].unbind();
            this.leftRowViewSlots[i].detached();
            this.mainRowViewSlots[i].unbind();
            this.mainRowViewSlots[i].detached();
            this.rightRowViewSlots[i].unbind();
            this.rightRowViewSlots[i].detached();
            this.groupRowViewSlots[i].unbind();
            this.groupRowViewSlots[i].detached();
        }
        this.leftHeaderViewSlot.unbind();
        this.leftHeaderViewSlot.detached();
        this.mainHeaderViewSlot.unbind();
        this.mainHeaderViewSlot.detached();
        this.rightHeaderViewSlot.unbind();
        this.rightHeaderViewSlot.detached();
    };
    ViewSlots.prototype.clear = function () {
        for (var i = 0; i < this.groupRowViewSlots.length; i++) {
            this.leftRowViewSlots[i].removeAll();
            this.mainRowViewSlots[i].removeAll();
            this.rightRowViewSlots[i].removeAll();
            this.groupRowViewSlots[i].removeAll();
        }
        this.leftHeaderViewSlot.removeAll();
        this.mainHeaderViewSlot.removeAll();
        this.rightHeaderViewSlot.removeAll();
        this.leftRowViewSlots = null;
        this.mainRowViewSlots = null;
        this.rightRowViewSlots = null;
        this.groupRowViewSlots = null;
        this.leftRowViewSlots = [];
        this.mainRowViewSlots = [];
        this.rightRowViewSlots = [];
        this.groupRowViewSlots = [];
        this.leftHeaderViewSlot = null;
        this.mainHeaderViewSlot = null;
        this.rightHeaderViewSlot = null;
    };
    return ViewSlots;
}());
exports.ViewSlots = ViewSlots;
//# sourceMappingURL=viewSlots.js.map
});
___scope___.file("grid/columnBindingContext.js", function(exports, require, module, __filename, __dirname){ 

var ColumnBindingContext = (function () {
    function ColumnBindingContext(controller) {
        var _this = this;
        this.controller = controller;
        this.setupleft = [];
        this.setupmain = [];
        this.setupright = [];
        this.setupgroup = [];
        this.setupgrouping = 0;
        this.changeGrouping = function (x) {
            if (x) {
                if (x.__groupExpanded) {
                    _this.controller.collapseGroup(x.__groupID);
                }
                else {
                    _this.controller.expandGroup(x.__groupID);
                }
            }
        };
    }
    ColumnBindingContext.prototype.clear = function () {
        var _this = this;
        this.setupleft = [];
        this.setupmain = [];
        this.setupright = [];
        this.setupgroup = [];
        this.setupgrouping = 0;
        this.changeGrouping = function (x) {
            if (x) {
                if (x.__groupExpanded) {
                    _this.controller.collapseGroup(x.__groupID);
                }
                else {
                    _this.controller.expandGroup(x.__groupID);
                }
            }
        };
    };
    return ColumnBindingContext;
}());
exports.ColumnBindingContext = ColumnBindingContext;
//# sourceMappingURL=columnBindingContext.js.map
});
___scope___.file("grid/rowDataBinder.js", function(exports, require, module, __filename, __dirname){ 

var RowDataBinder = (function () {
    function RowDataBinder(element, controller) {
        this.element = element;
        this.controller = controller;
    }
    RowDataBinder.prototype.init = function () {
        this.addEventListener();
    };
    RowDataBinder.prototype.rebindRowNo = function (row) {
        var rowCache = this.controller.htmlCache.rowCache;
        var foundRowCache = null;
        rowCache.forEach(function (cache) {
            if (cache.row === row) {
                foundRowCache = cache;
            }
        });
        if (foundRowCache) {
            this.rebindRow({
                detail: {
                    currentRow: row,
                    rowCache: foundRowCache,
                    downScroll: true
                }
            });
        }
    };
    RowDataBinder.prototype.addEventListener = function () {
        this.rebindRowBinded = this.rebindRow.bind(this);
        this.rebindAllRowsBinded = this.rebindAllRows.bind(this);
        this.element.addEventListener('avg-rebind-row', this.rebindRowBinded);
        this.element.addEventListener('avg-rebind-all-rows', this.rebindAllRowsBinded);
    };
    RowDataBinder.prototype.rebindRow = function (event) {
        var currentRow = event.detail.currentRow;
        var rowCache = event.detail.rowCache;
        var downScroll = event.detail.downScroll;
        var bindingContext = rowCache.bindingContext;
        this.controller.getElement(currentRow, downScroll, function (data) {
            if (data.rowRef) {
                if (data.rowRef.__group) {
                    rowCache.isGroup = true;
                }
                else {
                    rowCache.isGroup = false;
                }
            }
            var isSelected = data.selection.isSelected(rowCache.row);
            if (isSelected) {
                if (!rowCache.selected) {
                    rowCache.selected = true;
                    rowCache.left.classList.add('avg-selected-row');
                    rowCache.main.classList.add('avg-selected-row');
                    rowCache.right.classList.add('avg-selected-row');
                }
            }
            else {
                if (rowCache.selected) {
                    rowCache.selected = false;
                    rowCache.left.classList.remove('avg-selected-row');
                    rowCache.main.classList.remove('avg-selected-row');
                    rowCache.right.classList.remove('avg-selected-row');
                }
            }
            if (data.rowRef === undefined || data.rowRef === null) {
                rowCache.left.style.display = 'none';
                rowCache.main.style.display = 'none';
                rowCache.right.style.display = 'none';
                rowCache.group.style.display = 'none';
            }
            else {
                rowCache.left.style.display = 'block';
                rowCache.main.style.display = 'block';
                rowCache.right.style.display = 'block';
                rowCache.group.style.display = 'block';
            }
            bindingContext.rowRef = data.rowRef;
            bindingContext.tempRef = data.tempRef;
            bindingContext.selection = data.selection;
            bindingContext.selected = isSelected;
            bindingContext.row = currentRow;
        });
    };
    RowDataBinder.prototype.rebindAllRows = function (event) {
        var rowCache = event.detail.rowCache;
        var downScroll = event.detail.downScroll;
        var _loop_1 = function (i) {
            this_1.controller.getElement(rowCache[i].row, downScroll, function (data) {
                var bindingContext = rowCache[i].bindingContext;
                if (data.rowRef) {
                    if (data.rowRef.__group) {
                        rowCache[i].isGroup = true;
                    }
                    else {
                        rowCache[i].isGroup = false;
                    }
                }
                var isSelected = data.selection.isSelected(rowCache[i].row);
                if (isSelected) {
                    if (!rowCache[i].selected) {
                        rowCache[i].selected = true;
                        rowCache[i].left.classList.add('avg-selected-row');
                        rowCache[i].main.classList.add('avg-selected-row');
                        rowCache[i].right.classList.add('avg-selected-row');
                    }
                }
                else {
                    if (rowCache[i].selected) {
                        rowCache[i].selected = false;
                        rowCache[i].left.classList.remove('avg-selected-row');
                        rowCache[i].main.classList.remove('avg-selected-row');
                        rowCache[i].right.classList.remove('avg-selected-row');
                    }
                }
                if (data.rowRef === undefined || data.rowRef === null) {
                    rowCache[i].left.style.display = 'none';
                    rowCache[i].main.style.display = 'none';
                    rowCache[i].right.style.display = 'none';
                    rowCache[i].group.style.display = 'none';
                }
                else {
                    rowCache[i].left.style.display = 'block';
                    rowCache[i].main.style.display = 'block';
                    rowCache[i].right.style.display = 'block';
                    rowCache[i].group.style.display = 'block';
                }
                bindingContext.rowRef = data.rowRef;
                bindingContext.tempRef = data.tempRef;
                bindingContext.selection = data.selection;
                bindingContext.selected = isSelected;
                bindingContext.row = rowCache[i].row;
            });
        };
        var this_1 = this;
        for (var i = 0; i < rowCache.length; i++) {
            _loop_1(i);
        }
    };
    return RowDataBinder;
}());
exports.RowDataBinder = RowDataBinder;
//# sourceMappingURL=rowDataBinder.js.map
});
___scope___.file("grid/rowClickHandler.js", function(exports, require, module, __filename, __dirname){ 

var RowClickHandler = (function () {
    function RowClickHandler(element, htmlCache) {
        this.element = element;
        this.htmlCache = htmlCache;
        this.selectionMode = 'none';
        this.lastRowSelected = -1;
        this.lastKeyKodeUsed = 'none';
        this.selectedRows = 0;
    }
    RowClickHandler.prototype.init = function (mode, manualSelection, controller) {
        this.controller = controller;
        this.getSelection = controller.getSelectionContext.bind(controller);
        this.manualSelection = manualSelection;
        if (mode === false) {
            this.selectionMode = 'single';
        }
        if (mode === true) {
            this.selectionMode = 'multiple';
        }
        this.addEventlistener();
    };
    RowClickHandler.prototype.updateSelectionOnAllRows = function () {
        var rowCache = this.htmlCache.rowCache;
        for (var i = 0; i < rowCache.length; i++) {
            var selection = this.getSelection();
            var isSelected = selection.isSelected(rowCache[i].row);
            rowCache[i].bindingContext.selected = isSelected;
            rowCache[i].bindingContext.selected = isSelected;
            rowCache[i].bindingContext.selected = isSelected;
            if (isSelected) {
                if (!rowCache[i].selected) {
                    rowCache[i].selected = true;
                    rowCache[i].left.classList.add('avg-selected-row');
                    rowCache[i].main.classList.add('avg-selected-row');
                    rowCache[i].right.classList.add('avg-selected-row');
                }
            }
            else {
                if (rowCache[i].selected) {
                    rowCache[i].selected = false;
                    rowCache[i].left.classList.remove('avg-selected-row');
                    rowCache[i].main.classList.remove('avg-selected-row');
                    rowCache[i].right.classList.remove('avg-selected-row');
                }
            }
        }
    };
    RowClickHandler.prototype.getSelectionMode = function () {
        var selection = this.getSelection();
        return selection.getMode();
    };
    RowClickHandler.prototype.removeEventlistener = function () {
        var avgLeftRows = this.htmlCache.avg_left_rows;
        var avgMainRows = this.htmlCache.avg_main_rows;
        var avgRightRows = this.htmlCache.avg_right_rows;
        for (var i = 0; i < avgLeftRows.length; i++) {
            avgLeftRows[i].onclick = null;
            avgLeftRows[i].ondblclick = null;
            avgMainRows[i].onclick = null;
            avgMainRows[i].ondblclick = null;
            avgRightRows[i].onclick = null;
            avgRightRows[i].ondblclick = null;
        }
    };
    RowClickHandler.prototype.addEventlistener = function () {
        var avgLeftRows = this.htmlCache.avg_left_rows;
        var avgMainRows = this.htmlCache.avg_main_rows;
        var avgRightRows = this.htmlCache.avg_right_rows;
        for (var i = 0; i < avgLeftRows.length; i++) {
            avgLeftRows[i].onclick = this.singleClick.bind(this);
            avgLeftRows[i].ondblclick = this.doubleClick.bind(this);
            avgMainRows[i].onclick = this.singleClick.bind(this);
            avgMainRows[i].ondblclick = this.doubleClick.bind(this);
            avgRightRows[i].onclick = this.singleClick.bind(this);
            avgRightRows[i].ondblclick = this.doubleClick.bind(this);
        }
    };
    RowClickHandler.prototype.getCache = function (target) {
        var no = -1;
        this.htmlCache.rowCache.forEach(function (row, i) {
            if (row.left === target) {
                no = i;
            }
            if (row.main === target) {
                no = i;
            }
            if (row.right === target) {
                no = i;
            }
            if (row.group === target) {
                no = i;
            }
        });
        if (no !== -1) {
            return this.htmlCache.rowCache[no];
        }
        else {
            return null;
        }
    };
    RowClickHandler.prototype.singleClick = function (event) {
        var cache = this.getCache(event.currentTarget) || {};
        if (!cache.isGroup) {
            this.highlightRow(event, cache.row);
            this.controller.select(cache.row);
        }
        if (!this.manualSelection) {
            this.controller.raiseEvent('v-row-onclick', {
                evt: event,
                data: cache.bindingContext.rowRef,
                bindingContext: cache.bindingContext,
                row: cache.row
            });
        }
    };
    RowClickHandler.prototype.doubleClick = function (event) {
        var cache = this.getCache(event.currentTarget) || {};
        this.controller.raiseEvent('v-row-ondblclick', {
            evt: event,
            data: cache.bindingContext.rowRef,
            bindingContext: cache.bindingContext,
            row: cache.row
        });
    };
    RowClickHandler.prototype.isSelected = function (row) {
        var selection = this.getSelection();
        return selection.isSelected(row);
    };
    RowClickHandler.prototype.deSelect = function (row) {
        var selection = this.getSelection();
        selection.deSelect(row);
    };
    RowClickHandler.prototype.select = function (row, addToSelection) {
        var selection = this.getSelection();
        selection.select(row, addToSelection);
    };
    RowClickHandler.prototype.selectRange = function (start, end) {
        var selection = this.getSelection();
        selection.selectRange(start, end);
    };
    RowClickHandler.prototype.getSelectedRows = function () {
        var selection = this.getSelection();
        return selection.getSelectedRows();
    };
    RowClickHandler.prototype.setSelectedRows = function (newRows) {
        var selection = this.getSelection();
        selection.setSelectedRows(newRows);
    };
    RowClickHandler.prototype.highlightRow = function (e, currentRow) {
        var isSel;
        var manualSel = this.manualSelection;
        if (!manualSel) {
            var currentselectedRows = this.getSelectedRows();
            var currentKeyKode = '';
            if (currentRow !== this.lastRowSelected || currentselectedRows[0] !== currentRow) {
                if (currentRow <= (this.controller.collectionLength() - 1)) {
                    if (this.selectionMode === 'multiple') {
                        if (e.shiftKey) {
                            currentKeyKode = 'shift';
                            currentselectedRows = this.getSelectedRows();
                            if (currentselectedRows.length > 0 && this.lastKeyKodeUsed === 'none') {
                                this.lastRowSelected = currentselectedRows[0];
                                this.lastKeyKodeUsed = 'shift';
                            }
                        }
                        if (e.ctrlKey) {
                            currentKeyKode = 'ctrl';
                        }
                        if (!e.ctrlKey && !e.shiftKey) {
                            currentKeyKode = 'none';
                        }
                        switch (true) {
                            case currentKeyKode === 'none':
                                this.select(currentRow, false);
                                break;
                            case this.lastKeyKodeUsed === 'shift' && currentKeyKode === 'ctrl':
                                isSel = this.isSelected(currentRow);
                                if (isSel === true) {
                                    this.deSelect(currentRow);
                                }
                                else {
                                    this.select(currentRow, true);
                                }
                                this.lastRowSelected = currentRow;
                                break;
                            case this.lastKeyKodeUsed === 'ctrl' && currentKeyKode === 'shift':
                                var oldSel = this.getSelectedRows();
                                this.selectRange(this.lastRowSelected, currentRow);
                                var newSel = this.getSelectedRows();
                                this.setSelectedRows(oldSel.concat(newSel));
                                break;
                            case this.lastKeyKodeUsed === 'ctrl' && currentKeyKode === 'ctrl':
                                isSel = this.isSelected(currentRow);
                                if (isSel === true) {
                                    this.deSelect(currentRow);
                                }
                                else {
                                    this.select(currentRow, true);
                                }
                                this.lastRowSelected = currentRow;
                                break;
                            case this.lastKeyKodeUsed === 'none' && currentKeyKode === 'ctrl':
                                isSel = this.isSelected(currentRow);
                                if (isSel === true) {
                                    this.deSelect(currentRow);
                                }
                                else {
                                    this.select(currentRow, true);
                                }
                                this.lastRowSelected = currentRow;
                                break;
                            case this.lastKeyKodeUsed === 'shift' && currentKeyKode === 'shift':
                                if (this.lastRowSelected > currentRow) {
                                    this.selectRange(currentRow, this.lastRowSelected);
                                }
                                else {
                                    this.selectRange(this.lastRowSelected, currentRow);
                                }
                                break;
                            case this.lastKeyKodeUsed === 'none' && currentKeyKode === 'shift':
                                if (this.lastRowSelected !== -1) {
                                    if (this.lastRowSelected > currentRow) {
                                        this.selectRange(currentRow, this.lastRowSelected);
                                    }
                                    else {
                                        this.selectRange(this.lastRowSelected, currentRow);
                                    }
                                }
                                else {
                                    this.lastRowSelected = currentRow;
                                    this.select(currentRow, false);
                                }
                                break;
                            default:
                                console.error('error, this should not happen, debug selection');
                        }
                    }
                    else {
                        this.select(currentRow, false);
                    }
                    this.lastKeyKodeUsed = currentKeyKode;
                    this.updateSelectionOnAllRows();
                }
            }
            else {
                if (e.ctrlKey) {
                    currentKeyKode = 'ctrl';
                }
                if (currentKeyKode === 'ctrl') {
                    this.lastKeyKodeUsed = currentKeyKode;
                    isSel = this.isSelected(currentRow);
                    if (isSel === true) {
                        this.deSelect(currentRow);
                    }
                    this.lastRowSelected = currentRow;
                }
                else {
                    this.select(currentRow, false);
                }
                this.updateSelectionOnAllRows();
            }
        }
    };
    return RowClickHandler;
}());
exports.RowClickHandler = RowClickHandler;
//# sourceMappingURL=rowClickHandler.js.map
});
___scope___.file("grid/groupingElements.js", function(exports, require, module, __filename, __dirname){ 

var aurelia_framework_1 = require("aurelia-framework");
var GroupContext = (function () {
    function GroupContext(name, field, groupingElements) {
        this.name = name;
        this.field = field;
        this.groupingElements = groupingElements;
    }
    GroupContext.prototype.remove = function () {
        this.groupingElements.removeGroup(this.field);
        this.groupingElements.removeFromGrouping(this.field);
    };
    return GroupContext;
}());
var GroupingElements = (function () {
    function GroupingElements(element, viewCompiler, container, viewResources, htmlCache, viewSlots, columnBindingContext) {
        this.element = element;
        this.htmlCache = htmlCache;
        this.viewSlots = viewSlots;
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
        this.columnBindingContext = columnBindingContext;
        this.groupContext = {};
        this.lastAdded = null;
    }
    GroupingElements.prototype.getGroups = function () {
        var x = [];
        for (var i in this.groupContext) {
            if (i) {
                x.push(i);
            }
        }
        return x;
    };
    GroupingElements.prototype.init = function (controller, colGroupElement) {
        this.controller = controller;
        this.avgTopPanel = this.htmlCache.avg_top_panel;
        this.colGroupElement = colGroupElement;
    };
    GroupingElements.prototype.addGroup = function (name, field) {
        if (!this.groupContext[field]) {
            this.lastAdded = field;
            this.groupContext[field] = new GroupContext(name, field, this);
            var viewMarkup = this.colGroupElement ||
                "<div class=\"avg-grouping\">  \n          <p class=\"avg-grouping-element\" v-sort=\"field.bind:field\">" + name + " \n            <i><svg click.delegate=\"remove()\" class=\"icon iconhidden\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n              <path d=\"M3 4l4.3 4L3 12h1.4L8 8.7l3.5 3.3H13L8.6 8 13 4h-1.5L8 7.3 4.4 4H3z\"/>\n            </svg></i>\n          </p>\n         </div>";
            var viewFactory = this.viewCompiler.compile("<template>" + viewMarkup + "</template>", this.viewResources);
            var view = viewFactory.create(this.container);
            var viewSlot = new aurelia_framework_1.ViewSlot(this.avgTopPanel, true);
            viewSlot.add(view);
            this.groupContext[field].viewSlot = viewSlot;
            this.viewSlots.groupingViewSlots.push(this.groupContext[field]);
        }
        this.groupContext[field].viewSlot.bind(this.groupContext[field]);
        this.groupContext[field].viewSlot.attached();
    };
    GroupingElements.prototype.removeGroup = function (field) {
        if (field) {
            if (this.groupContext[field] !== null) {
                this.groupContext[field].viewSlot.unbind();
                this.groupContext[field].viewSlot.detached();
                this.groupContext[field].viewSlot.removeAll();
                this.groupContext[field] = null;
            }
        }
        else {
            if (this.lastAdded) {
                if (this.groupContext[this.lastAdded] !== null) {
                    this.groupContext[this.lastAdded].viewSlot.unbind();
                    this.groupContext[this.lastAdded].viewSlot.detached();
                    this.groupContext[this.lastAdded].viewSlot.removeAll();
                    this.groupContext[this.lastAdded] = null;
                    this.lastAdded = null;
                }
            }
        }
    };
    GroupingElements.prototype.addToGrouping = function () {
        if (this.lastAdded) {
            var toAddField = this.groupContext[this.lastAdded].field;
            var toAddTitle = this.groupContext[this.lastAdded].name;
            this.controller.addToGrouping({ field: toAddField, title: toAddTitle });
            this.lastAdded = null;
        }
    };
    GroupingElements.prototype.removeFromGrouping = function (field) {
        this.controller.removeFromGrouping(field);
    };
    return GroupingElements;
}());
exports.GroupingElements = GroupingElements;
//# sourceMappingURL=groupingElements.js.map
});
___scope___.file("grid/loadingScreen.js", function(exports, require, module, __filename, __dirname){ 

var aurelia_framework_1 = require("aurelia-framework");
var LoadingScreen = (function () {
    function LoadingScreen(element, viewCompiler, container, viewResources, viewSlots) {
        this.element = element;
        this.viewSlots = viewSlots;
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
        this.loading = false;
        this.loadingMessage = 'Loading';
    }
    LoadingScreen.prototype.updateLoadingDefaultLoadingMessage = function (msg) {
        this.loadingMessage = msg;
    };
    LoadingScreen.prototype.init = function (overrideContext, loadingScreenTemplate) {
        this.overrideContext = overrideContext;
        var loadingScreentHtml = loadingScreenTemplate || "[\n      <div class=\"avg-overlay\" if.bind=\"loading\">\n      </div>\n      <div if.two-way=\"loading\" class=\"avg-progress-indicator\">\n      <div class=\"avg-progress-bar\" role=\"progressbar\" style=\"width:100%\">\n      <span>$au{ loadingMessage }</span>\n      </div>\n      </div>".replace(/\$(au{)/g, '${');
        var viewFactory = this.viewCompiler.compile("<template>\n      " + loadingScreentHtml + "\n      </template>", this.viewResources);
        var view = viewFactory.create(this.container);
        var loadingScreenViewSlot = new aurelia_framework_1.ViewSlot(this.element, true);
        loadingScreenViewSlot.add(view);
        loadingScreenViewSlot.bind(this, {
            bindingContext: this,
            parentOverrideContext: this.overrideContext
        });
        loadingScreenViewSlot.attached();
        this.viewSlots.loadingScreenViewSlot = loadingScreenViewSlot;
    };
    LoadingScreen.prototype.enable = function (msg, collectionLength) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.loading = collectionLength ? collectionLength > 10000 ? true : false : false;
            _this.loadingMessage = msg || '...';
            setTimeout(function () {
                resolve(null);
            });
        });
    };
    LoadingScreen.prototype.disable = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.loading = false;
            setTimeout(function () {
                resolve();
            });
        });
    };
    return LoadingScreen;
}());
exports.LoadingScreen = LoadingScreen;
//# sourceMappingURL=loadingScreen.js.map
});
___scope___.file("grid/contextMenu.js", function(exports, require, module, __filename, __dirname){ 

var aurelia_framework_1 = require("aurelia-framework");
var ContextMenu = (function () {
    function ContextMenu(viewCompiler, container, viewResources, viewSlots) {
        this.menuStrings = {
            close: 'Close',
            pinLeft: 'Pin left',
            pinRight: 'Pin Right',
            groupBy: 'Group By',
            sortAscending: 'Sort Ascending',
            sortDescending: 'Sort Descending',
            showAll: 'Show All',
            clearCurrent: 'Clear Current',
            clearAll: 'Clear All',
            chooseOperator: 'Choose Operator',
            back: 'Back',
            equals: 'Equals',
            lessThanOrEqual: 'Less than or equal',
            greaterThanOrEqual: 'Greater than or equal',
            lessThan: 'Less than',
            greaterThan: 'Greater than',
            contains: 'Contains',
            notEqualTo: 'Not equal to',
            doesNotContain: 'Does not contain',
            beginsWith: 'Begins with',
            endsWith: 'Ends with'
        };
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
        this.viewSlots = viewSlots;
        this.setDefaults();
    }
    ContextMenu.prototype.setDefaults = function () {
        this.top = 0;
        this.left = 0;
        this.show = false;
        this.pinnedMenu = false;
        this.sortMenu = false;
        this.filterMainMenu = false;
        this.filterOptionsMenu = false;
    };
    ContextMenu.prototype.init = function (customMenuTemplates, overrideContext) {
        this.overrideContext = overrideContext;
        var viewFactory = this.viewCompiler.compile("<template>" + this.menuHtml(customMenuTemplates) + "</template>", this.viewResources);
        var view = viewFactory.create(this.container);
        var viewSlot = new aurelia_framework_1.ViewSlot(document.body, true);
        viewSlot.add(view);
        this.viewSlots.contextMenu = viewSlot;
        viewSlot.bind(this, { bindingContext: this, parentOverrideContext: this.overrideContext });
        viewSlot.attached();
    };
    ContextMenu.prototype.openMenu = function (options) {
        this.left = options.left;
        this.top = options.top;
        this.pinnedMenu = options.pinned ? true : false;
        this.sortMenu = options.sort ? true : false;
        this.groupbyMenu = options.groupby ? true : false;
        this.filterMainMenu = options.filter ? true : false;
        this.show = true;
        this.callback = options.callback;
    };
    ContextMenu.prototype.menuClick = function (type, option, event) {
        switch (true) {
            case type === 'filter' && option === 'options':
                this.showFilterOptions();
                break;
            case type === 'filterOption' && option === 'Back':
                this.hideFilterOptions();
                break;
            case type === 'close' && option === 'true':
                this.show = false;
                break;
            default:
                var result = this.callback(type, option, event);
                if (result) {
                    this.show = false;
                    this.pinnedMenu = false;
                    this.sortMenu = false;
                    this.filterMainMenu = false;
                    this.filterOptionsMenu = false;
                }
        }
    };
    ContextMenu.prototype.updateMenuStrings = function (key, text) {
        if (this.menuStrings[key]) {
            this.menuStrings[key] = text;
        }
    };
    ContextMenu.prototype.showFilterOptions = function () {
        this.filterOptionsMenu = true;
    };
    ContextMenu.prototype.hideFilterOptions = function () {
        this.filterOptionsMenu = false;
    };
    ContextMenu.prototype.menuHtml = function (customMenuTemplates) {
        var menuTop = "<div css=\"top:$au{top}px;left:$au{left}px\" if.bind=\"show\" class=\"avg-default avg-menu\">".replace(/\$(au{)/g, '${');
        var menuClose = customMenuTemplates.close ||
            "<ul if.bind=\"show\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('close','true')\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                      <path d=\"M3 4l4.3 4L3 12h1.4L8 8.7l3.5 3.3H13L8.6 8 13 4h-1.5L8 7.3 4.4 4H3z\"/>\n                      </svg> $au{menuStrings.close}\n                </p>\n                </li>\n            </ul>".replace(/\$(au{)/g, '${');
        var menuPinned = customMenuTemplates.pinned ||
            "<ul if.bind=\"pinnedMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('pinned','left', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> $au{menuStrings.pinLeft}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('pinned','right', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> $au{menuStrings.pinRight}\n                </p>\n                </li>\n            </ul>".replace(/\$(au{)/g, '${');
        var menuGroupby = customMenuTemplates.groupby ||
            "<ul if.bind=\"groupbyMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('groupby','groupby', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                     <path d=\"M3 4v1h10V4H3zm3.7 2.4v1H13v-1H6.8zm0 2.4v1H13v-1H6.8zm0 2.3v1H13v-1H6.8z\"/>\n                      </svg> $au{menuStrings.groupBy}\n                </p>\n                </li>\n            </ul>".replace(/\$(au{)/g, '${');
        var menuSort = customMenuTemplates.sort ||
            "<ul if.bind=\"sortMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('sort','asc', $event)\" class=\"avg-menu__link\">\n                       <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.4 6L3 10h1.5L8 7l3.4 3H13L8.5 6h-1z\"/>\n                      </svg> $au{menuStrings.sortAscending}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('sort','desc', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.4 10L3 6h1.5L8 9.2 11.3 6H13l-4.5 4h-1z\"/>\n                    </svg> $au{menuStrings.sortDescending}\n                </p>\n                </li>\n            </ul>".replace(/\$(au{)/g, '${');
        var menuFilter = customMenuTemplates.filter ||
            "<ul if.bind=\"filterMainMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','showall', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.4 4.8v2.7H4.7v1h2.7v3h1v-3h2.8v-1H8.5V4.8h-1z\"/>\n                      </svg> $au{menuStrings.showAll}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','clear', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M4.8 7.5h6.5v1H4.8z\">\n                      </svg> $au{menuStrings.clearCurrent}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','clearall', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M4.8 7.5h6.5v1H4.8z\">\n                      </svg> $au{menuStrings.clearAll}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','options', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.3 4v1.2L11 7.5H3v1h8l-3.7 2.2V12L13 8.4v-.8L7.3 4z\"/>\n                      </svg> $au{menuStrings.chooseOperator}\n                </p>\n                </li>\n            </ul>".replace(/\$(au{)/g, '${');
        var menuFilterOptions = customMenuTemplates.filterOptions ||
            "<ul if.bind=\"filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','Back', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                       <path d=\"M8.7 4v1.2L5 7.5h8v1H5l3.7 2.2V12L3 8.4v-1L8.7 4z\"/>\n                      </svg> $au{menuStrings.back}\n                </p>\n                </li>\n            </ul>\n            <ul if.bind=\"filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M13 7H3V6h10v1zm0 3H3V9h10v1z\"/>\n                      </svg> $au{menuStrings.equals}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','<=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M13 10.3L3 7.5v-.7L13 4v1L5.3 7 13 9.3v1zm0 1.7H3v-1h10v1z\"/>\n                      </svg> $au{menuStrings.lessThanOrEqual}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','>=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M13 7.4L3 10.2v-1l7.7-2L3 5V4l10 2.7v.7zm0 4.5H3v-1h10v1z\"/>\n                      </svg> $au{menuStrings.greaterThanOrEqual}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','<', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                       <path d=\"M3 8.5L13 12v-1.2L5 8l8-2.7V4L3 7.7v1z\"/>\n                      </svg> $au{menuStrings.lessThan}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','>', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                      <path d=\"M13 8L3 12v-1.4l8-3-8-3.2V3l10 4v1z\"/>\n                      </svg> $au{menuStrings.greaterThan}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','*', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M13 9.7l-.7 1L8.6 9v3H7.4V9l-3.6 1.7-.7-1L7 8 3 6.2l.7-1 3.7 2V4h1.3v3l3.6-1.7.7 1L9 8l4 1.7z\"/>\n                      </svg> $au{menuStrings.contains}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','!=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M13 9.8H7.7l-1 2.2H5.7l1-2.2H2.8v-1h4L7.5 7H3V6h5l1-2H10l-1 2H13v1H9L8 9H13v1z\"/>\n                      </svg> $au{menuStrings.notEqualTo}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','!*', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                       <path d=\"M5 4V10H4V4h1zm5.5 0v3l2-1.7.5 1L10.7 8 13 9.8l-.4 1-2-2V12h-1l.2-3-2.2 1.7-.3-1L9.5 8 7.3 6.3l.3-1L9.8 7V4h.7zM5 11v1H4v-1h1z\"/>\n                      </svg> $au{menuStrings.doesNotContain}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','*=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                      <path d=\"M5.2 4v3l-2-1.7-.2 1L5 8 3 9.8l.3 1 2-2V12h.6l-.2-3 2 1.8.2-1L6 8l2-1.8-.3-1-2 2L6 4H5zm3 2v1.2H13v-1H8.3zm0 2.8v1H13v-1H8.3z\"/>\n                      </svg> $au{menuStrings.beginsWith}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','=*', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M10.8 4v3l2-1.8.2 1L11 8l2 1.7-.3 1-2-2V12h-.6l.2-3.2-2 2-.3-1 2-2-2-1.6.3-1 2 2L10 4h.8zm-3 2v1H3V6h4.7zm0 2.7v1H3v-1h4.7z\"/>\n                      </svg> $au{menuStrings.endsWith}\n                </p>\n                </li>\n            </ul>".replace(/\$(au{)/g, '${');
        var menuBottom = "</div>";
        var menuAll = customMenuTemplates.all || [
            menuTop,
            menuClose,
            menuPinned,
            menuGroupby,
            menuSort,
            menuFilter,
            menuFilterOptions,
            menuBottom,
        ].join('');
        return menuAll;
    };
    return ContextMenu;
}());
exports.ContextMenu = ContextMenu;
//# sourceMappingURL=contextMenu.js.map
});
___scope___.file("grid/v-grid.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
var __decorate = __fsbx_decorate(arguments)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var mainMarkup_1 = require("./mainMarkup");
var mainScrollEvents_1 = require("./mainScrollEvents");
var rowMarkup_1 = require("./rowMarkup");
var rowScrollEvents_1 = require("./rowScrollEvents");
var columnMarkup_1 = require("./columnMarkup");
var htmlCache_1 = require("./htmlCache");
var htmlHeightWidth_1 = require("./htmlHeightWidth");
var viewSlots_1 = require("./viewSlots");
var columnBindingContext_1 = require("./columnBindingContext");
var rowDataBinder_1 = require("./rowDataBinder");
var rowClickHandler_1 = require("./rowClickHandler");
var groupingElements_1 = require("./groupingElements");
var controller_1 = require("./controller");
var loadingScreen_1 = require("./loadingScreen");
var contextMenu_1 = require("./contextMenu");
var footer_1 = require("./footer");
var interfaces_1 = require("../interfaces");
var VGrid = (function () {
    function VGrid(element, viewCompiler, container, viewResources, taskQueue) {
        this.element = element;
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
        this.taskQueue = taskQueue;
        this.dragDropAttributeSharedContext = {};
        this.resizeAttributeSharedContext = {};
        this.colConfig = [];
        this.backupColConfig = [];
        this.colRepeater = false;
        this.colRepeatRowTemplate = null;
        this.colRepeatRowHeaderTemplate = null;
        this.colGroupRow = null;
        this.colGroupElement = null;
        this.customMenuTemplates = {};
        this.footerTemplate = null;
        this.loadingScreenTemplate = null;
        this.newGrid = true;
        this.controller = new controller_1.Controller(this);
        this.htmlCache = new htmlCache_1.HtmlCache(element);
        this.htmlHeightWidth = new htmlHeightWidth_1.HtmlHeightWidth(this.controller);
        this.viewSlots = new viewSlots_1.ViewSlots(this.htmlCache);
        this.columnBindingContext = new columnBindingContext_1.ColumnBindingContext(this.controller);
        this.rowDataBinder = new rowDataBinder_1.RowDataBinder(element, this.controller);
        this.mainMarkup = new mainMarkup_1.MainMarkup(element, viewCompiler, container, viewResources, this.htmlHeightWidth, this.viewSlots);
        this.mainScrollEvents = new mainScrollEvents_1.MainScrollEvents(element, this.htmlCache);
        this.rowMarkup = new rowMarkup_1.RowMarkup(element, this.htmlCache);
        this.rowScrollEvents = new rowScrollEvents_1.RowScrollEvents(element, this.htmlCache, this.controller);
        this.rowClickHandler = new rowClickHandler_1.RowClickHandler(element, this.htmlCache);
        this.columnMarkup = new columnMarkup_1.ColumnMarkup(element, viewCompiler, container, viewResources, this.htmlCache, this.viewSlots, this.columnBindingContext);
        this.groupingElements = new groupingElements_1.GroupingElements(element, viewCompiler, container, viewResources, this.htmlCache, this.viewSlots, this.columnBindingContext);
        this.loadingScreen = new loadingScreen_1.LoadingScreen(element, viewCompiler, container, viewResources, this.viewSlots);
        this.contextMenu = new contextMenu_1.ContextMenu(viewCompiler, container, viewResources, this.viewSlots);
        this.footer = new footer_1.Footer(this.htmlCache, viewCompiler, container, viewResources, this.viewSlots);
        this.filterOperatorNames = {
            '=': 'equals',
            '<=': 'less than or eq',
            '>=': 'greater than or eq',
            '<': 'less than',
            '>': 'greater than',
            '*': 'contains',
            '!=': 'not equal to',
            '!*': 'does not contain',
            '*=': 'begins with',
            '=*': 'ends with'
        };
        this.filterOperatorTranslationKeys = {
            equals: '=',
            lessThanOrEqual: '<=',
            greaterThanOrEqual: '>=',
            lessThan: '<',
            greaterThan: '>',
            contains: '*',
            notEqualTo: '!=',
            doesNotContain: '!*',
            beginsWith: '*=',
            endsWith: '=*'
        };
    }
    VGrid.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.attRowHeight = this.attRowHeight ? this.attRowHeight * 1 : 25;
        this.attHeaderHeight = this.attHeaderHeight ? this.attHeaderHeight * 1 : 25;
        this.attFooterHeight = this.attFooterHeight ? this.attFooterHeight * 1 : 25;
        this.attPanelHeight = this.attPanelHeight ? this.attPanelHeight * 1 : 25;
        this.attDataDelay = this.attDataDelay ? this.attDataDelay * 1 : 0;
        this.attMultiSelect = this.checkBool(this.attMultiSelect);
        this.attManualSelection = this.attManualSelection ? this.checkBool(this.attManualSelection) : null;
        this.attVariableRowHeight = this.attVariableRowHeight ? this.checkBool(this.attVariableRowHeight) : null;
        this.attTheme = this.attTheme || 'avg-default';
        this.element.classList.add(this.attTheme);
        this.attOnRowDraw = typeof this.attOnRowDraw === 'function' ? this.attOnRowDraw : null;
        this.attI18N = typeof this.attI18N === 'function' ? this.attI18N : null;
    };
    VGrid.prototype.unbind = function () {
        this.newGrid = false;
        this.viewSlots.unbindAndDetachColumns();
    };
    VGrid.prototype.attached = function () {
        var _this = this;
        this.attGridConnector.connect(this.controller, function () {
            if (_this.newGrid) {
                _this.backupColConfig = _this.colConfig.slice(0);
                if (_this.attColConfig) {
                    _this.colConfig = _this.attColConfig.length > 0 ? _this.attColConfig : _this.colConfig;
                }
                _this.controller.getContext();
                _this.controller.createGrid();
            }
            _this.viewSlots.bindAndAttachColumns(_this.overrideContext, _this.columnBindingContext, _this.attGridConnector.getSelection());
            setTimeout(function () {
                _this.controller.udateHorizontalScroller();
            }, 50);
            _this.attGridConnector.gridCreated();
        });
    };
    VGrid.prototype.checkBool = function (value) {
        if (typeof value === 'string') {
            value = value.toLowerCase();
        }
        switch (true) {
            case value === 'true':
            case value === true:
                value = true;
                break;
            case value === 'false':
            case value === false:
                value = false;
                break;
            default:
                value = false;
                break;
        }
        return value;
    };
    return VGrid;
}());
VGrid.inject = [Element, aurelia_framework_1.ViewCompiler, aurelia_framework_1.Container, aurelia_framework_1.ViewResources, aurelia_framework_1.TaskQueue];
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-row-height' }),
    __metadata("design:type", Number)
], VGrid.prototype, "attRowHeight", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-header-height' }),
    __metadata("design:type", Number)
], VGrid.prototype, "attHeaderHeight", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-footer-height' }),
    __metadata("design:type", Number)
], VGrid.prototype, "attFooterHeight", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-panel-height' }),
    __metadata("design:type", Number)
], VGrid.prototype, "attPanelHeight", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-grid-connector' }),
    __metadata("design:type", typeof (_a = typeof interfaces_1.GridConnectorInterface !== "undefined" && interfaces_1.GridConnectorInterface) === "function" && _a || Object)
], VGrid.prototype, "attGridConnector", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-multi-select' }),
    __metadata("design:type", Boolean)
], VGrid.prototype, "attMultiSelect", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-manual-sel' }),
    __metadata("design:type", Boolean)
], VGrid.prototype, "attManualSelection", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-theme' }),
    __metadata("design:type", String)
], VGrid.prototype, "attTheme", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-row-on-draw' }),
    __metadata("design:type", Object)
], VGrid.prototype, "attOnRowDraw", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-columns' }),
    __metadata("design:type", Array)
], VGrid.prototype, "attColConfig", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-i18n' }),
    __metadata("design:type", Object)
], VGrid.prototype, "attI18N", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-data-delay' }),
    __metadata("design:type", Number)
], VGrid.prototype, "attDataDelay", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-variable-row-height' }),
    __metadata("design:type", Boolean)
], VGrid.prototype, "attVariableRowHeight", void 0);
exports.VGrid = VGrid;
var _a;
//# sourceMappingURL=v-grid.js.map
});
___scope___.file("grid/footer.js", function(exports, require, module, __filename, __dirname){ 

var aurelia_framework_1 = require("aurelia-framework");
var Footer = (function () {
    function Footer(htmlCache, viewCompiler, container, viewResources, viewSlots) {
        this.htmlCache = htmlCache;
        this.viewSlots = viewSlots;
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
    }
    Footer.prototype.init = function (overrideContext, footerStringTemplate) {
        this.overrideContext = overrideContext;
        var footerTemplate = footerStringTemplate || "".replace(/\$(au{)/g, '${');
        var viewFactory = this.viewCompiler.compile("<template>\n      " + footerTemplate + "\n      </template>", this.viewResources);
        var view = viewFactory.create(this.container);
        var footerViewSlot = new aurelia_framework_1.ViewSlot(this.htmlCache.avg_footer, true);
        footerViewSlot.add(view);
        footerViewSlot.bind(this, {
            bindingContext: this,
            parentOverrideContext: this.overrideContext
        });
        footerViewSlot.attached();
        this.viewSlots.footerViewSlot = footerViewSlot;
    };
    return Footer;
}());
exports.Footer = Footer;
//# sourceMappingURL=footer.js.map
});
___scope___.file("gridConnector.js", function(exports, require, module, __filename, __dirname){ 

var GridConnector = (function () {
    function GridConnector(datasource, selection, errorHandler) {
        this.initTop = 0;
        this.controller = null;
        this.datasource = datasource;
        this.key = datasource.getKey();
        this.selection = selection || datasource.getSelection();
        this.errorhandler = errorHandler || null;
    }
    GridConnector.prototype.setInitTop = function (top) {
        this.initTop = top;
    };
    GridConnector.prototype.getSelection = function () {
        return this.selection;
    };
    GridConnector.prototype.connect = function (controller, create) {
        this.controller = controller;
        this.eventID = this.datasource.addEventListener(this.eventHandler.bind(this));
        this.controller.element.style.visibility = 'hidden';
        create();
    };
    GridConnector.prototype.gridCreated = function () {
        var _this = this;
        this.raiseEvent('sortIconUpdate');
        this.controller.updateHeights();
        setTimeout(function () {
            _this.controller.updateHeaderGrouping(_this.datasource.getGrouping());
            _this.raiseEvent('sortIconUpdate');
            _this.raiseEvent('filterUpdateValues');
            _this.controller.triggerScroll(_this.initTop);
            setTimeout(function () {
                _this.controller.element.style.visibility = 'visible';
            }, 100);
        }, 0);
    };
    GridConnector.prototype.select = function (row) {
        this.datasource.select(row);
    };
    GridConnector.prototype.getRowHeightState = function () {
        return this.datasource.getRowHeightState();
    };
    GridConnector.prototype.getDatasourceLength = function () {
        return this.datasource.length();
    };
    GridConnector.prototype.getColConfig = function () {
        return this.controller.getColumnConfig();
    };
    GridConnector.prototype.setColConfig = function (colconfig) {
        this.controller.setColumnConfig(colconfig);
    };
    GridConnector.prototype.getGrouping = function () {
        return this.datasource.getGrouping();
    };
    GridConnector.prototype.group = function (grouping, keepExpanded) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.group(grouping, keepExpanded);
        });
    };
    GridConnector.prototype.getElement = function (options) {
        var rowData = this.datasource.getElement(options.row);
        var rowContext = {
            row: options.row,
            selection: this.selection,
            rowRef: rowData,
            tempRef: this.getRowProperties(rowData)
        };
        options.callback(rowContext);
    };
    GridConnector.prototype.query = function (a) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.query(a);
        });
    };
    GridConnector.prototype.orderBy = function (attribute, addToCurrentSort) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.orderBy(attribute, addToCurrentSort);
        });
    };
    GridConnector.prototype.destroy = function () {
        this.datasource.removeEventListener(this.eventID);
    };
    GridConnector.prototype.getCurrentOrderBy = function () {
        return this.datasource.getCurrentOrderBy();
    };
    GridConnector.prototype.getCurrentFilter = function () {
        return this.datasource.getCurrentFilter();
    };
    GridConnector.prototype.expandGroup = function (id) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.groupExpand(id);
        });
    };
    GridConnector.prototype.collapseGroup = function (id) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.groupCollapse(id);
        });
    };
    GridConnector.prototype.getTopRow = function () {
        return this.controller.getTopRow();
    };
    GridConnector.prototype.triggerI18n = function () {
        this.controller.triggerI18N();
    };
    GridConnector.prototype.raiseEvent = function (name, data) {
        if (data === void 0) { data = {}; }
        var event = new CustomEvent(name, {
            detail: data,
            bubbles: true
        });
        if (this.controller) {
            this.controller.element.dispatchEvent(event);
        }
    };
    GridConnector.prototype.eventHandler = function (event) {
        switch (event) {
            case 'collection_changed':
            case 'collection_grouped':
            case 'collection_collapsed_all':
            case 'collection_expanded_all':
                this.raiseEvent('sortIconUpdate');
                this.controller.updateHeights();
                this.controller.udateHorizontalScroller();
                this.controller.triggerScroll(0);
                this.controller.updateHeaderGrouping(this.datasource.getGrouping());
                this.controller.setLoadingScreen(false);
                break;
            case 'collection_collapsed':
            case 'collection_expanded':
            case 'collection_updated':
                this.raiseEvent('sortIconUpdate');
                this.controller.updateHeights();
                this.controller.udateHorizontalScroller();
                this.controller.triggerScroll(null);
                this.controller.updateHeaderGrouping(this.datasource.getGrouping());
                this.controller.setLoadingScreen(false);
                break;
            case 'collection_sorted':
                this.raiseEvent('sortIconUpdate');
                this.controller.rebindAllRows();
                this.controller.triggerScroll(null);
                this.controller.setLoadingScreen(false);
                break;
            case 'collection_filtered':
                this.raiseEvent('sortIconUpdate');
                this.controller.updateHeights();
                this.controller.triggerScroll(null);
                this.controller.setLoadingScreen(false);
                break;
            case 'selection_changed':
                break;
            default:
                console.warn('unknown event');
                console.warn(event);
        }
        return true;
    };
    GridConnector.prototype.getRowProperties = function (obj) {
        var x = {};
        if (obj) {
            var k = void 0;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    if (x[k] !== obj[k]) {
                        x[k] = obj[k];
                    }
                }
            }
        }
        return x;
    };
    return GridConnector;
}());
exports.GridConnector = GridConnector;
//# sourceMappingURL=gridConnector.js.map
});
___scope___.file("dataSource.js", function(exports, require, module, __filename, __dirname){ 

var selection_1 = require("./selection");
var collection_1 = require("./collection");
var arrayUtils_1 = require("./utils/arrayUtils");
var DataSource = (function () {
    function DataSource(selection, config) {
        this.selection = selection || new selection_1.Selection('single');
        this.selectionEventID = this.selection.addEventListener(this.selectionEventCallback.bind(this));
        this.selection.overrideGetRowKey(this.getRowKey.bind(this));
        this.selection.overrideGetRowKeys(this.getRowKeys.bind(this));
        this.arrayUtils = new arrayUtils_1.ArrayUtils();
        this.key = null;
        this.mainArray = null;
        this.config = config;
        if (config) {
            this.key = config.key || '__avgKey';
            this.rowHeight = config.rowHeight || 25;
            this.groupHeight = config.groupHeight || 25;
        }
        else {
            this.key = '__avgKey';
        }
        this.eventIdCount = -1;
        this.eventCallBacks = [];
        this.entity = null;
        this.collection = new collection_1.Collection(this);
    }
    DataSource.prototype.getSelection = function () {
        return this.selection;
    };
    DataSource.prototype.getKey = function () {
        return this.key;
    };
    DataSource.prototype.length = function () {
        return this.collection.length;
    };
    DataSource.prototype.triggerEvent = function (event) {
        var _this = this;
        this.eventCallBacks.forEach(function (FN, i) {
            if (FN !== null) {
                var alive = FN(event);
                if (!alive) {
                    _this.eventCallBacks[i] = null;
                }
            }
        });
    };
    DataSource.prototype.addEventListener = function (callback) {
        this.eventIdCount++;
        this.eventCallBacks.push(callback);
        return this.eventIdCount;
    };
    DataSource.prototype.removeEventListener = function (id) {
        this.eventCallBacks.splice(id, 1);
    };
    DataSource.prototype.setArray = function (array) {
        this.collection = new collection_1.Collection(this);
        this.selection.reset();
        this.arrayUtils.resetGrouping();
        this.arrayUtils.resetSort(this.key);
        this.entity = null;
        this.collection.setData(array);
        this.mainArray = this.collection.getEntities();
        this.triggerEvent('collection_changed');
    };
    DataSource.prototype.push = function (array) {
        if (Array.isArray(array)) {
            var grouping = this.arrayUtils.getGrouping();
            var collection = this.collection.getEntities();
            collection = collection.concat(array);
            this.collection.setData(collection);
            this.mainArray = this.collection.getEntities();
            this.arrayUtils.runOrderbyOn(this.collection.getEntities());
            var untouchedgrouped = this.collection.getEntities();
            if (grouping.length > 0) {
                var groupedArray = this.arrayUtils.group(untouchedgrouped, grouping, true);
                this.collection.setData(groupedArray, untouchedgrouped);
            }
            this.triggerEvent('collection_updated');
        }
    };
    DataSource.prototype.refresh = function (data) {
        if (data) {
            this.collection = new collection_1.Collection(this);
            this.collection.setData(data);
            this.mainArray = this.collection.getEntities();
            this.entity = null;
        }
        var grouping = this.arrayUtils.getGrouping();
        this.arrayUtils.runOrderbyOn(this.collection.getEntities());
        if (grouping.length > 0) {
            var unGroupedArray = this.collection.getEntities();
            var groupedArray = this.arrayUtils.group(unGroupedArray, grouping, true);
            this.collection.setData(groupedArray, unGroupedArray);
        }
        this.triggerEvent('collection_updated');
    };
    DataSource.prototype.select = function (row) {
        this.entity = this.collection.getRow(row);
    };
    DataSource.prototype.query = function (options) {
        if (options) {
            var newArray = this.arrayUtils.query(this.mainArray, options);
            this.collection.setData(newArray);
        }
        else {
            this.collection.setData(this.mainArray);
        }
        this.orderBy(null, true);
        this.triggerEvent('collection_filtered');
    };
    DataSource.prototype.orderBy = function (attribute, addToCurrentSort) {
        var collection = this.collection.getEntities();
        var result = this.arrayUtils.orderBy(collection, attribute, addToCurrentSort);
        this.collection.setData(result.fixed, result.full);
        this.triggerEvent('collection_sorted');
    };
    DataSource.prototype.getCurrentOrderBy = function () {
        return this.arrayUtils.getOrderBy();
    };
    DataSource.prototype.getCurrentFilter = function () {
        return this.arrayUtils.getCurrentFilter();
    };
    DataSource.prototype.getElement = function (row) {
        if (row === undefined || row === null) {
            throw new Error('row missing');
        }
        else {
            return this.collection.getRow(row);
        }
    };
    DataSource.prototype.group = function (grouping, keepExpanded) {
        var _this = this;
        this.arrayUtils.resetSort();
        grouping.forEach(function (group) {
            _this.arrayUtils.setOrderBy(group.field, true);
        });
        this.arrayUtils.runOrderbyOn(this.collection.getEntities());
        var ungroupedArray = this.collection.getEntities();
        var groupedArray = this.arrayUtils.group(ungroupedArray, grouping, keepExpanded);
        this.collection.setData(groupedArray, ungroupedArray);
        this.triggerEvent('collection_grouped');
    };
    DataSource.prototype.groupCollapse = function (id) {
        var groupedArray = this.arrayUtils.groupCollapse(id);
        var ungroupedArray = this.collection.getEntities();
        this.collection.setData(groupedArray, ungroupedArray);
        if (id) {
            this.triggerEvent('collection_collapsed');
        }
        else {
            this.triggerEvent('collection_collapsed_all');
        }
    };
    DataSource.prototype.groupExpand = function (id) {
        var groupedArray = this.arrayUtils.groupExpand(id);
        var ungroupedArray = this.collection.getEntities();
        this.collection.setData(groupedArray, ungroupedArray);
        if (id) {
            this.triggerEvent('collection_expanded');
        }
        else {
            this.triggerEvent('collection_expanded_all');
        }
    };
    DataSource.prototype.getGrouping = function () {
        return this.arrayUtils.getGrouping();
    };
    DataSource.prototype.addBlankRow = function () {
        var newElement = {};
        this.mainArray.unshift(newElement);
        var collectionUngrouped = this.collection.getEntities();
        var displayedCollection = this.collection.getCurrentEntities();
        var index = collectionUngrouped.indexOf(newElement);
        if (index === -1) {
            collectionUngrouped.unshift(newElement);
        }
        displayedCollection.unshift(newElement);
        this.collection.setData(displayedCollection, collectionUngrouped);
        this.entity = newElement;
        this.triggerEvent('collection_filtered');
    };
    DataSource.prototype.unshift = function (data) {
        if (data) {
            this.mainArray.unshift(data);
            var displayedCollection = this.collection.getEntities();
            var ungroupedCollection = this.collection.getCurrentEntities();
            var index = displayedCollection.indexOf(data);
            if (index === -1) {
                displayedCollection.unshift(data);
            }
            ungroupedCollection.unshift(data);
            this.collection.setData(ungroupedCollection, displayedCollection);
            this.entity = data;
            this.triggerEvent('collection_filtered');
        }
    };
    DataSource.prototype.remove = function (rows) {
        var _this = this;
        var keysToDelete = new Set();
        var returnArray = [];
        if (Array.isArray(rows)) {
            rows.forEach(function (row) {
                keysToDelete.add(_this.getRowKey(row));
            });
        }
        else {
            if (this.entity && Number.isInteger(rows)) {
                keysToDelete.add(this.getRowKey(rows));
            }
        }
        if (keysToDelete.size > 0) {
            var oldArray = this.collection.getEntities();
            for (var i = 0; i < oldArray.length; i++) {
                if (keysToDelete.has(oldArray[i][this.key]) === true) {
                    returnArray.push(oldArray.splice(i, 1)[0]);
                    i--;
                }
            }
            this.collection.setData(oldArray);
            this.refresh();
        }
        return returnArray;
    };
    DataSource.prototype.getCollectionStatus = function () {
        var status = {};
        status.collectionLength = this.mainArray ? this.mainArray.length : 0;
        status.filteredCollectionLength = this.collection.getEntities().length;
        status.selectionLength = this.selection.getLength();
        return status;
    };
    DataSource.prototype.setLocaleCompare = function (code, options) {
        this.arrayUtils.setLocaleCompare(code, options);
    };
    DataSource.prototype.getRowHeightState = function () {
        return this.collection.getRowHeightState();
    };
    DataSource.prototype.getRowKey = function (row) {
        if (this.collection) {
            return this.collection.getRowKey(row);
        }
        else {
            return null;
        }
    };
    DataSource.prototype.getRowKeys = function () {
        if (this.collection) {
            return this.collection.getRowKeys();
        }
        else {
            return [];
        }
    };
    DataSource.prototype.selectionEventCallback = function (e) {
        this.triggerEvent(e);
        return true;
    };
    return DataSource;
}());
exports.DataSource = DataSource;
//# sourceMappingURL=dataSource.js.map
});
___scope___.file("selection.js", function(exports, require, module, __filename, __dirname){ 

var Selection = (function () {
    function Selection(mode) {
        this.mode = mode;
        this.selectedRows = 0;
        this.eventIdCount = -1;
        this.eventCallBacks = [];
        this.selection = new Set([]);
    }
    Selection.prototype.triggerEvent = function (event) {
        var _this = this;
        this.eventCallBacks.forEach(function (FN, i) {
            if (FN !== null) {
                var alive = FN(event);
                if (!alive) {
                    _this.eventCallBacks[i] = null;
                }
            }
        });
    };
    Selection.prototype.addEventListener = function (callback) {
        this.eventIdCount++;
        this.eventCallBacks.push(callback);
        return this.eventIdCount;
    };
    Selection.prototype.getLength = function () {
        return this.selection.size;
    };
    Selection.prototype.getMode = function () {
        return this.mode;
    };
    Selection.prototype.getRowKey = function (row) {
        return row;
    };
    Selection.prototype.getRowKeys = function () {
        return [];
    };
    Selection.prototype.overrideGetRowKey = function (fn) {
        this.getRowKey = fn;
    };
    Selection.prototype.overrideGetRowKeys = function (fn) {
        this.getRowKeys = fn;
    };
    Selection.prototype.isSelected = function (row) {
        var result = false;
        if (this.selectedRows > 0) {
            result = this.selection.has(this.getRowKey(row));
        }
        return result;
    };
    Selection.prototype.deSelectAll = function () {
        this.selection.clear();
        this.selectedRows = this.selection.size;
        this.triggerEvent('selection_changed');
    };
    Selection.prototype.deSelect = function (row) {
        this.selection.delete(this.getRowKey(row));
        this.selectedRows = this.selection.size;
        this.triggerEvent('selection_changed');
    };
    Selection.prototype.select = function (row, add) {
        switch (this.mode) {
            case 'none':
            case null:
            case undefined:
                break;
            case 'single':
                this.selection.clear();
                this.selection.add(this.getRowKey(row));
                this.selectedRows = this.selection.size;
                break;
            case 'multiple':
                if (!add) {
                    this.selection.clear();
                    this.selection.add(this.getRowKey(row));
                    this.selectedRows = this.selection.size;
                }
                else {
                    this.selection.add(this.getRowKey(row));
                    this.selectedRows = this.selection.size;
                }
                break;
            default:
        }
        this.triggerEvent('selection_changed');
    };
    Selection.prototype.selectRange = function (start, end) {
        if (this.mode === 'multiple') {
            this.selection.clear();
            for (var i = start; i < end + 1; i++) {
                this.selection.add(this.getRowKey(i));
            }
            this.selectedRows = this.selection.size;
            this.triggerEvent('selection_changed');
        }
    };
    Selection.prototype.getSelectedRows = function () {
        var _this = this;
        var array = [];
        var keys = this.getRowKeys();
        if (this.selectedRows > 0) {
            keys.forEach(function (key, index) {
                if (_this.selection.has(key) === true) {
                    array.push(index);
                }
            });
        }
        return array;
    };
    Selection.prototype.setSelectedRows = function (newRows) {
        if (this.selectedRows > 0) {
            this.selection.clear();
        }
        for (var i = 0; i < newRows.length; i++) {
            this.selection.add(this.getRowKey(newRows[i]));
        }
        this.selectedRows = this.selection.size;
        this.triggerEvent('selection_changed');
    };
    Selection.prototype.reset = function () {
        if (this.selectedRows > 0) {
            this.selection.clear();
        }
        this.selectedRows = this.selection.size;
        this.triggerEvent('selection_changed');
    };
    return Selection;
}());
exports.Selection = Selection;
//# sourceMappingURL=selection.js.map
});
___scope___.file("collection.js", function(exports, require, module, __filename, __dirname){ 

var Collection = (function () {
    function Collection(datasource) {
        this.datasource = datasource;
        this.key = datasource.getKey();
        this.rowHeight = datasource.rowHeight || 25;
        this.groupHeight = datasource.groupHeight || 25;
        this.displayedEntities = [];
        this.keys = [];
        this.count = 0;
        this.length = 0;
        this.ungroupedArray = [];
        this.rowHeightArray = [];
        this.rowTopArray = [];
        this.rowHeightTotal = 0;
    }
    Collection.prototype.setData = function (array, ungroupedArray) {
        var _this = this;
        this.displayedEntities = [];
        this.keys = [];
        this.rowHeightArray = [];
        this.rowHeightTotal = 0;
        this.rowTopArray = [];
        this.ungroupedArray = ungroupedArray || array;
        this.length = array.length;
        array.forEach(function (rowData) {
            if (!rowData[_this.key]) {
                _this.count++;
                rowData[_this.key] = _this.count;
            }
            if (!rowData.__group) {
                _this.rowHeightArray.push(_this.rowHeight);
                _this.rowTopArray.push(_this.rowHeightTotal);
                _this.rowHeightTotal = _this.rowHeightTotal + _this.rowHeight;
                _this.keys.push(rowData[_this.key]);
            }
            else {
                _this.rowHeightArray.push(_this.groupHeight);
                _this.rowTopArray.push(_this.rowHeightTotal);
                _this.rowHeightTotal = _this.rowHeightTotal + _this.groupHeight;
                _this.keys.push(null);
            }
            _this.displayedEntities.push(rowData);
        });
    };
    Collection.prototype.getRowHeightState = function () {
        return {
            total: this.rowHeightTotal,
            rows: this.rowHeightArray,
            top: this.rowTopArray
        };
    };
    Collection.prototype.getEntities = function () {
        return this.ungroupedArray;
    };
    Collection.prototype.getCurrentEntities = function () {
        return this.displayedEntities;
    };
    Collection.prototype.getRowKey = function (row) {
        return this.keys[row];
    };
    Collection.prototype.getRowKeys = function () {
        return this.keys;
    };
    Collection.prototype.getRow = function (row) {
        return this.displayedEntities[row];
    };
    Collection.prototype.getRowFromEntity = function (entity) {
        return this.displayedEntities.indexOf(entity);
    };
    return Collection;
}());
exports.Collection = Collection;
//# sourceMappingURL=collection.js.map
});
___scope___.file("utils/arrayUtils.js", function(exports, require, module, __filename, __dirname){ 

var arrayFilter_1 = require("./arrayFilter");
var arraySort_1 = require("./arraySort");
var arrayGrouping_1 = require("./arrayGrouping");
var ArrayUtils = (function () {
    function ArrayUtils() {
        this.arrayFilter = new arrayFilter_1.ArrayFilter();
        this.arraySort = new arraySort_1.ArraySort();
        this.arrayGrouping = new arrayGrouping_1.ArrayGrouping();
    }
    ArrayUtils.prototype.orderBy = function (collection, attribute, addToCurrentSort) {
        var groupingFields = this.getGrouping().map(function (data) { return data.field; });
        var grouping = this.getGrouping();
        var result = {
            fixed: null,
            full: null
        };
        if (groupingFields.length > 0) {
            var lastSort = this.getOrderBy();
            this.resetSort();
            var exist_1 = false;
            var newSort_1 = [];
            var count_1 = 0;
            lastSort.forEach(function (sort) {
                count_1++;
                if (groupingFields.indexOf(sort.attribute) !== -1 || addToCurrentSort) {
                    newSort_1.push(sort);
                    if (sort.attribute === attribute) {
                        sort.asc = sort.asc === true ? false : true;
                        sort.no = count_1;
                        exist_1 = true;
                    }
                }
                else {
                    if (sort.attribute === attribute) {
                        sort.asc = sort.asc === true ? false : true;
                        sort.no = count_1;
                        exist_1 = true;
                        newSort_1.push(sort);
                    }
                }
            });
            this.setLastSort(newSort_1);
            if (!exist_1 && attribute) {
                this.setOrderBy(attribute, true);
            }
            this.runOrderbyOn(collection);
            var groupedArray = this.group(collection, grouping, true);
            result = {
                fixed: groupedArray,
                full: collection
            };
        }
        else {
            if (!attribute) {
                var lastSort = this.getOrderBy();
                this.resetSort();
                this.setLastSort(lastSort);
                this.runOrderbyOn(collection);
                result = {
                    fixed: collection,
                    full: collection
                };
            }
            else {
                this.setOrderBy(attribute, addToCurrentSort);
                this.runOrderbyOn(collection);
                result = {
                    fixed: collection,
                    full: collection
                };
            }
        }
        return result;
    };
    ArrayUtils.prototype.group = function (array, grouping, keepExpanded) {
        return this.arrayGrouping.group(array, grouping, keepExpanded);
    };
    ArrayUtils.prototype.getGrouping = function () {
        return this.arrayGrouping.getGrouping();
    };
    ArrayUtils.prototype.groupCollapse = function (id) {
        return this.arrayGrouping.collapse(id);
    };
    ArrayUtils.prototype.groupExpand = function (id) {
        return this.arrayGrouping.expand(id);
    };
    ArrayUtils.prototype.getOrderBy = function () {
        return this.arraySort.getOrderBy();
    };
    ArrayUtils.prototype.setLastSort = function (array) {
        this.arraySort.setLastSort(array);
    };
    ArrayUtils.prototype.setOrderBy = function (attribute, addToCurrentSort) {
        this.arraySort.setOrderBy(attribute, addToCurrentSort);
    };
    ArrayUtils.prototype.runOrderbyOn = function (array) {
        this.arraySort.runOrderbyOn(array);
    };
    ArrayUtils.prototype.resetSort = function (defaultSortAttribute) {
        this.arraySort.reset(defaultSortAttribute);
    };
    ArrayUtils.prototype.resetGrouping = function () {
        this.arrayGrouping.reset();
    };
    ArrayUtils.prototype.getCurrentFilter = function () {
        return this.arrayFilter.getLastFilter();
    };
    ArrayUtils.prototype.query = function (array, params) {
        return this.arrayFilter.runQueryOn(array, params);
    };
    ArrayUtils.prototype.setLocaleCompare = function (code, options) {
        this.arraySort.setLocaleCompare(code, options);
    };
    return ArrayUtils;
}());
exports.ArrayUtils = ArrayUtils;
//# sourceMappingURL=arrayUtils.js.map
});
___scope___.file("utils/arrayFilter.js", function(exports, require, module, __filename, __dirname){ 

var ArrayFilter = (function () {
    function ArrayFilter() {
        this.filterOperators = {
            '=': 1,
            '<=': 2,
            '>=': 3,
            '<': 4,
            '>': 5,
            '*': 6,
            '!=': 7,
            '!*': 8,
            '*=': 9,
            '=*': 10
        };
        this.lastFilter = [];
    }
    ArrayFilter.prototype.getOperatorNo = function (val) {
        return this.filterOperators[val];
    };
    ArrayFilter.prototype.getLastFilter = function () {
        return this.lastFilter;
    };
    ArrayFilter.prototype.runQueryOn = function (objArray, ObjFilter) {
        var _this = this;
        this.lastFilter = ObjFilter;
        var resultArray = objArray.filter(function (data) {
            var result = true;
            ObjFilter.forEach(function (x) {
                var rowValue;
                var filterValue;
                var filterOperator = _this.getOperatorNo(x.operator);
                var newFilterOperator;
                var typeBool = {
                    true: true,
                    false: false
                };
                var type;
                try {
                    type = typeof (data[x.attribute]);
                }
                catch (e) {
                    type = 'string';
                }
                switch (type) {
                    case 'number':
                        rowValue = data[x.attribute];
                        filterValue = Number(x.value);
                        filterOperator = filterOperator || 1;
                        if (filterOperator === 6) {
                            filterOperator = 1;
                        }
                        break;
                    case 'string':
                        rowValue = data[x.attribute].toLowerCase();
                        filterValue = x.value.toLowerCase();
                        filterOperator = filterOperator || 9;
                        newFilterOperator = filterOperator;
                        if (x.value.charAt(0) === '*' && filterOperator === 9) {
                            newFilterOperator = 6;
                            filterValue = filterValue.substr(1, filterValue.length);
                        }
                        if (x.value.charAt(0) === '*' && filterOperator === 1) {
                            newFilterOperator = 10;
                            filterValue = filterValue.substr(1, filterValue.length);
                        }
                        if (x.value.charAt(x.value.length - 1) === '*' && filterOperator === 1 && newFilterOperator === 10) {
                            newFilterOperator = 6;
                            filterValue = filterValue.substr(0, filterValue.length - 1);
                        }
                        if (x.value.charAt(x.value.length - 1) === '*'
                            && filterOperator === 1
                            && newFilterOperator !== 10
                            && newFilterOperator !== 6) {
                            newFilterOperator = 9;
                            filterValue = filterValue.substr(0, filterValue.length - 1);
                        }
                        if (filterOperator !== newFilterOperator) {
                            filterOperator = newFilterOperator;
                        }
                        break;
                    case 'boolean':
                        rowValue = data[x.attribute];
                        filterValue = typeBool[x.value];
                        filterOperator = 1;
                        break;
                    case 'object':
                        rowValue = data[x.attribute].toISOString();
                        filterValue = new Date(x.value).toISOString();
                        filterOperator = filterOperator || 2;
                        break;
                    default:
                        try {
                            rowValue = data[x.attribute].toLowerCase();
                        }
                        catch (err) {
                            rowValue = data[x.attribute];
                        }
                        try {
                            filterValue = x.value.toLowerCase();
                        }
                        catch (err) {
                            filterValue = x.value;
                        }
                        filterOperator = filterOperator || 1;
                        break;
                }
                switch (filterOperator) {
                    case 1:
                        if (rowValue !== filterValue) {
                            result = false;
                        }
                        break;
                    case 2:
                        if (!(rowValue <= filterValue)) {
                            result = false;
                        }
                        break;
                    case 3:
                        if (!(rowValue >= filterValue)) {
                            result = false;
                        }
                        break;
                    case 4:
                        if (!(rowValue < filterValue)) {
                            result = false;
                        }
                        break;
                    case 5:
                        if (!(rowValue > filterValue)) {
                            result = false;
                        }
                        break;
                    case 6:
                        if (rowValue.indexOf(filterValue) === -1) {
                            result = false;
                        }
                        break;
                    case 7:
                        if (rowValue === filterValue) {
                            result = false;
                        }
                        break;
                    case 8:
                        if (rowValue.indexOf(filterValue) !== -1) {
                            result = false;
                        }
                        break;
                    case 9:
                        if (rowValue.substring(0, filterValue.length) !== filterValue) {
                            result = false;
                        }
                        break;
                    case 10:
                        if (rowValue.substring(rowValue.length - filterValue.length, rowValue.length) !== filterValue) {
                            result = false;
                        }
                        break;
                    default:
                        if (rowValue !== filterValue) {
                            result = false;
                        }
                }
                if (type === 'string') {
                    if (x.value.charAt(0) === '*' && x.value.length === 1) {
                        result = true;
                    }
                }
            });
            return result;
        });
        return resultArray;
    };
    return ArrayFilter;
}());
exports.ArrayFilter = ArrayFilter;
//# sourceMappingURL=arrayFilter.js.map
});
___scope___.file("utils/arraySort.js", function(exports, require, module, __filename, __dirname){ 

var ArraySort = (function () {
    function ArraySort() {
        this.lastSort = [];
        this.curSort = [];
        this.localeCompareCode = null;
        this.localeCompareOptions = { sensitivity: 'base' };
    }
    ArraySort.prototype.setLocaleCompare = function (code, options) {
        this.localeCompareCode = code ? code : null;
        this.localeCompareOptions = options ? options : { sensitivity: 'base' };
    };
    ArraySort.prototype.reset = function (defaultSortAttribute) {
        if (defaultSortAttribute) {
            this.lastSort = [{ attribute: defaultSortAttribute, asc: true, no: 0 }];
            this.curSort = [{ attribute: defaultSortAttribute, asc: true, no: 0 }];
        }
        else {
            this.lastSort = [];
            this.curSort = [];
        }
    };
    ArraySort.prototype.setLastSort = function (array) {
        this.lastSort = array;
        this.curSort = array;
    };
    ArraySort.prototype.setOrderBy = function (param, add) {
        var sort;
        var useSetValue = false;
        if (param.asc === undefined) {
            sort = {
                attribute: param,
                asc: true
            };
        }
        else {
            sort = {
                attribute: param.attribute,
                asc: param.asc
            };
            useSetValue = true;
        }
        if (add && this.lastSort.length > 0) {
            this.curSort = this.lastSort;
            var exist_1 = false;
            this.curSort.forEach(function (x) {
                if (!useSetValue) {
                    if (x.attribute === sort.attribute) {
                        exist_1 = true;
                        x.asc = x.asc === true ? false : true;
                    }
                }
            });
            if (!exist_1) {
                this.curSort.push(sort);
                this.curSort[this.curSort.length - 1].no = this.curSort.length;
            }
            this.lastSort = this.curSort;
        }
        else {
            this.curSort = [sort];
            this.curSort[0].no = 1;
            if (this.lastSort[0]) {
                if (this.lastSort[0].attribute === this.curSort[0].attribute) {
                    if (this.lastSort[0].asc === this.curSort[0].asc) {
                        if (!useSetValue) {
                            this.curSort[0].asc = this.curSort[0].asc === true ? false : true;
                        }
                    }
                }
            }
            this.lastSort = this.curSort;
        }
    };
    ArraySort.prototype.getOrderBy = function () {
        return this.curSort;
    };
    ArraySort.prototype.getValue = function (attribute, obj) {
        var arr = attribute.split('.');
        var tempValue = Infinity;
        if (arr.length > 1) {
            try {
                tempValue = obj[arr[0]][arr[1]];
            }
            catch (e) { }
        }
        if (arr.length === 1) {
            try {
                tempValue = obj[attribute];
            }
            catch (e) { }
        }
        return tempValue;
    };
    ArraySort.prototype.runOrderbyOn = function (array) {
        var _this = this;
        var thisSort = this.getOrderBy();
        array.sort(function (obj1, obj2) {
            var result = 0;
            for (var i = 0; i < thisSort.length && result === 0; ++i) {
                var currentObj = thisSort[i];
                var v1 = _this.getValue(currentObj.attribute, obj1);
                var v2 = _this.getValue(currentObj.attribute, obj2);
                var getLocaleCompareResult = function (x1, x2) {
                    var resultLocale = null;
                    if (_this.localeCompareCode) {
                        resultLocale = x1.localeCompare(x2, _this.localeCompareCode, _this.localeCompareOptions);
                    }
                    else {
                        resultLocale = x1.localeCompare(x2);
                    }
                    return resultLocale;
                };
                if (v1 !== v2) {
                    if (currentObj.asc) {
                        if (typeof v1 === 'string' && typeof v1 === 'string') {
                            if (getLocaleCompareResult(v1, v2) < 0 &&
                                getLocaleCompareResult(v1, v2) !== 0) {
                                result = -1;
                            }
                            else {
                                result = 1;
                            }
                        }
                        else {
                            if (v1 < v2) {
                                result = -1;
                            }
                            else {
                                result = 1;
                            }
                        }
                    }
                    else {
                        if (typeof v1 === 'string' && typeof v1 === 'string') {
                            if (getLocaleCompareResult(v1, v2) < 0 &&
                                getLocaleCompareResult(v1, v2) !== 0) {
                                result = 1;
                            }
                            else {
                                result = -1;
                            }
                        }
                        else {
                            if (v1 < v2) {
                                result = 1;
                            }
                            else {
                                result = -1;
                            }
                        }
                    }
                }
            }
            return result;
        });
        this.lastSort = this.getOrderBy().slice(0);
    };
    return ArraySort;
}());
exports.ArraySort = ArraySort;
//# sourceMappingURL=arraySort.js.map
});
___scope___.file("utils/arrayGrouping.js", function(exports, require, module, __filename, __dirname){ 

var ArrayGrouping = (function () {
    function ArrayGrouping() {
        this.grouping = [];
        this.expanded = new Set([]);
    }
    ArrayGrouping.prototype.reset = function () {
        this.groups = [];
        this.grouping = [];
        this.expanded = new Set([]);
    };
    ArrayGrouping.prototype.group = function (arrayToGroup, grouping, keepExpanded) {
        var _this = this;
        if (grouping.length > 0) {
            if (!keepExpanded) {
                this.expanded = new Set([]);
            }
            var groups_1 = [];
            grouping.forEach(function (groupBy, groupNo) {
                if (groupNo === 0) {
                    var mainGroup = _this.groupMain(arrayToGroup, groupBy.field, groupNo);
                    groups_1.push(mainGroup);
                }
                else {
                    var childGroupArray = groups_1[groups_1.length - 1];
                    var newSubGroup = _this.groupChildren(childGroupArray, groupBy.field, groupNo);
                    groups_1.push(newSubGroup);
                }
            });
            this.groups = groups_1;
            this.grouping = grouping;
            if (!keepExpanded) {
                return groups_1[0];
            }
            else {
                return this.expand(null, this.expanded);
            }
        }
        else {
            arrayToGroup.forEach(function (row) {
                row.__groupLvl = 0;
            });
            this.grouping = [];
            return arrayToGroup;
        }
    };
    ArrayGrouping.prototype.getGrouping = function () {
        return this.grouping;
    };
    ArrayGrouping.prototype.expand = function (id, array) {
        var _this = this;
        var all = id ? false : true;
        if (!id) {
            if (array) {
                all = false;
            }
        }
        if (!array) {
            array = new Set([]);
        }
        var subGroup;
        var collection = [];
        var mainGroups = this.groups[0];
        subGroup = function (g) {
            g.__groupChildren.forEach(function (sg) {
                collection.push(sg);
                switch (true) {
                    case all:
                    case sg.__groupID === id:
                    case array.has(sg.__groupID):
                    case sg.__groupID !== id && sg.__groupExpanded:
                        if (sg.__groupChildren) {
                            sg.__groupExpanded = true;
                            _this.expanded.add(sg.__groupID);
                            subGroup(sg);
                        }
                        break;
                    default:
                        break;
                }
            });
        };
        mainGroups.forEach(function (g) {
            collection.push(g);
            switch (true) {
                case all:
                case g.__groupID === id:
                case array.has(g.__groupID):
                case g.__groupID !== id && g.__groupExpanded:
                    g.__groupExpanded = true;
                    _this.expanded.add(g.__groupID);
                    if (g.__groupChildren) {
                        subGroup(g);
                    }
                    break;
                default:
                    break;
            }
        });
        return collection;
    };
    ArrayGrouping.prototype.collapse = function (id) {
        var _this = this;
        var all = id ? false : true;
        id = id === undefined ? null : id;
        var subGroup;
        var collection = [];
        var mainGroups = this.groups[0];
        subGroup = function (g) {
            g.__groupChildren.forEach(function (sg) {
                switch (true) {
                    case all:
                        if (sg.__groupChildren) {
                            sg.__groupExpanded = false;
                            _this.expanded.delete(sg.__groupID);
                            subGroup(sg);
                        }
                        break;
                    case sg.__groupID === id:
                        collection.push(sg);
                        _this.expanded.delete(sg.__groupID);
                        sg.__groupExpanded = false;
                        break;
                    default:
                        collection.push(sg);
                        if (sg.__groupChildren && sg.__groupExpanded) {
                            subGroup(sg);
                        }
                        break;
                }
            });
        };
        mainGroups.forEach(function (g) {
            collection.push(g);
            switch (true) {
                case all:
                    g.__groupExpanded = false;
                    _this.expanded.delete(g.__groupID);
                    if (g.__groupChildren) {
                        subGroup(g);
                    }
                    break;
                case g.__groupID === id:
                    g.__groupExpanded = false;
                    _this.expanded.delete(g.__groupID);
                    break;
                default:
                    if (g.__groupChildren && g.__groupExpanded) {
                        subGroup(g);
                    }
                    break;
            }
        });
        return collection;
    };
    ArrayGrouping.prototype.groupMain = function (array, groupBy, groupNo) {
        var tempGroupArray = [];
        var curGroup = {};
        var tempValue = null;
        array.forEach(function (element) {
            var gidm = element[groupBy];
            gidm = typeof gidm === 'boolean' ? gidm.toString() : gidm;
            gidm = gidm || 'blank';
            if (gidm !== tempValue) {
                curGroup = {
                    __groupName: gidm || 'blank',
                    __group: true,
                    __groupID: gidm,
                    __groupLvl: groupNo,
                    __groupChildren: [element],
                    __groupTotal: 1,
                    __groupExpanded: false
                };
                element.__groupLvl = groupNo + 1;
                tempValue = gidm;
                tempGroupArray.push(curGroup);
            }
            else {
                element.__groupLvl = groupNo + 1;
                curGroup.__groupChildren.push(element);
                curGroup.__groupTotal++;
            }
        });
        return tempGroupArray;
    };
    ArrayGrouping.prototype.groupChildren = function (childGroupArray, groupBy, groupNo) {
        var tempGroupArray = [];
        var curGroup = {};
        childGroupArray.forEach(function (element) {
            var tempValue = null;
            var rebuiltChildrenArray = [];
            element.__groupChildren.forEach(function (child) {
                if (child[groupBy] !== tempValue) {
                    var gidm = child[groupBy] || 'blank';
                    var gidc = element.__groupID || 'blank';
                    curGroup = {
                        __groupName: child[groupBy],
                        __groupID: gidm + '-' + gidc,
                        __group: true,
                        __groupLvl: groupNo,
                        __groupChildren: [child],
                        __groupTotal: 1,
                        __groupExpanded: false
                    };
                    child.__groupLvl = groupNo + 1;
                    tempValue = child[groupBy];
                    rebuiltChildrenArray.push(curGroup);
                    tempGroupArray.push(curGroup);
                }
                else {
                    child.__groupLvl = groupNo + 1;
                    curGroup.__groupChildren.push(child);
                    curGroup.__groupTotal++;
                }
            });
            element.__groupChildren = rebuiltChildrenArray;
        });
        return tempGroupArray;
    };
    return ArrayGrouping;
}());
exports.ArrayGrouping = ArrayGrouping;
//# sourceMappingURL=arrayGrouping.js.map
});
___scope___.file("grid/v-grid.html", function(exports, require, module, __filename, __dirname){ 

module.exports.default =  "<template>\n  <!--\n    get the internal css, \n    todo: we might want to be able to replace this\n  -->\n  <require from=\"./styles/main-element-tags.css\"></require>\n  <require from=\"./styles/main-elements.css\"></require>\n  <require from=\"./styles/contextmenu.css\"></require>\n  <require from=\"./styles/dragAndResize.css\"></require>\n  <require from=\"./styles/loader.css\"></require>\n  <require from=\"./styles/icons.css\"></require>\n  <require from=\"./styles/grouping.css\"></require>\n  <require from=\"./styles/cellsAndLabels.css\"></require>\n  <content>\n  </content>\n</template>\n"
});
___scope___.file("grid/attributes/v-changed.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
var __decorate = __fsbx_decorate(arguments)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributesOnChange = (function () {
    function VGridAttributesOnChange(element, vGrid) {
        this.element = element;
        this.vGrid = vGrid;
    }
    VGridAttributesOnChange.prototype.attached = function () {
        if (!this.element.onchange) {
            this.element.onchange = this.onChanged.bind(this);
        }
    };
    VGridAttributesOnChange.prototype.onChanged = function () {
        this.vGrid.controller.rowDataBinder.rebindRowNo(this.bindingContext.row);
    };
    VGridAttributesOnChange.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
    };
    return VGridAttributesOnChange;
}());
VGridAttributesOnChange = __decorate([
    aurelia_framework_1.customAttribute('v-onchange'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof v_grid_1.VGrid !== "undefined" && v_grid_1.VGrid) === "function" && _a || Object])
], VGridAttributesOnChange);
exports.VGridAttributesOnChange = VGridAttributesOnChange;
var _a;
//# sourceMappingURL=v-changed.js.map
});
___scope___.file("grid/attributes/v-data-handler.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
var __decorate = __fsbx_decorate(arguments)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributesDataHandler = (function () {
    function VGridAttributesDataHandler(element, vGrid) {
        this.isSet = false;
        this.element = element;
        this.vGrid = vGrid;
    }
    VGridAttributesDataHandler.prototype.attached = function () {
        this.element.onchange = this.onChanged.bind(this);
        this.element.onfocus = this.onFocus.bind(this);
        this.element.onblur = this.onBlur.bind(this);
    };
    VGridAttributesDataHandler.prototype.valueChanged = function (newValue) {
        if (this.isSet) {
            var checkValue = this.editFormater.toView(newValue);
            if (checkValue !== this.tempValue) {
                this.element.value = this.displayFormater.toView(newValue);
            }
        }
        else {
            this.element.value = this.displayFormater.toView(newValue);
        }
    };
    VGridAttributesDataHandler.prototype.onFocus = function () {
        this.isSet = true;
        this.element.value = this.editFormater.toView(this.value);
        this.tempValue = this.element.value;
    };
    VGridAttributesDataHandler.prototype.onBlur = function () {
        if (this.tempValue === this.element.value) {
            this.onChanged();
        }
        this.isSet = false;
    };
    VGridAttributesDataHandler.prototype.onChanged = function () {
        this.value = this.editFormater.fromView(this.element.value);
        this.bindingContext.rowRef[this.field] = this.value;
        this.element.value = this.displayFormater.toView(this.value);
        this.vGrid.controller.rowDataBinder.rebindRowNo(this.bindingContext.row);
    };
    VGridAttributesDataHandler.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.displayFormater = this.valueConverters(this.display);
        this.editFormater = this.valueConverters(this.edit);
        this.element.value = this.displayFormater.toView(this.value);
    };
    VGridAttributesDataHandler.prototype.valueConverters = function (value) {
        var valueConverter = this.vGrid.viewResources.getValueConverter.bind(this.vGrid.viewResources);
        return valueConverter(value);
    };
    return VGridAttributesDataHandler;
}());
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesDataHandler.prototype, "field", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesDataHandler.prototype, "value", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesDataHandler.prototype, "display", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesDataHandler.prototype, "edit", void 0);
VGridAttributesDataHandler = __decorate([
    aurelia_framework_1.customAttribute('v-data-handler'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof v_grid_1.VGrid !== "undefined" && v_grid_1.VGrid) === "function" && _a || Object])
], VGridAttributesDataHandler);
exports.VGridAttributesDataHandler = VGridAttributesDataHandler;
var _a;
//# sourceMappingURL=v-data-handler.js.map
});
___scope___.file("grid/attributes/v-drag-drop-col.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
var __decorate = __fsbx_decorate(arguments)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridDragDropCol = (function () {
    function VGridDragDropCol(element, vGrid) {
        this.vGrid = vGrid;
        this.vGridElement = vGrid.element;
        this.controller = vGrid.controller;
        this.groupingElements = vGrid.groupingElements;
        this.sharedContext = vGrid.dragDropAttributeSharedContext;
        this.element = element;
        this.column = this.element;
        this.entered = null;
        this.curColNo = null;
    }
    VGridDragDropCol.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.onDragstartBinded = this.onDragstart.bind(this);
        this.onDragenterBinded = this.onDragenter.bind(this);
        this.onDragoverBinded = this.onDragover.bind(this);
        this.onDragendBinded = this.onDragend.bind(this);
        this.onDragOutSideBinded = this.onDragOutSide.bind(this);
    };
    VGridDragDropCol.prototype.unbind = function () {
    };
    VGridDragDropCol.prototype.detached = function () {
    };
    VGridDragDropCol.prototype.attached = function () {
        var _this = this;
        var result = this.getTargetData(this.column);
        if (result.ok && !result.panel) {
            this.column = result.target;
            this.colType = this.column.attributes.getNamedItem('avg-type').value;
            this.colNo = parseInt(this.column.attributes.getNamedItem('avg-config-col').value, 10);
            this.context = this.vGrid.columnBindingContext['setup' + this.colType][this.colNo];
            this.columnsArray = this.vGrid.columnBindingContext['setup' + this.colType];
            this.element.addEventListener('mousedown', this.onDragstartBinded);
            result.target.addEventListener('mouseenter', this.onDragenterBinded);
        }
        if (result.ok && result.target.nodeName === 'AVG-TOP-PANEL') {
            this.isPanel = true;
            this.sharedContext.panel = result.target;
            result.target.onmouseleave = function () {
                if (_this.sharedContext.dragging && _this.sharedContext.title && _this.sharedContext.field) {
                    _this.groupingElements.removeGroup('');
                }
            };
            result.target.onmouseenter = function () {
                if (_this.sharedContext.dragging && _this.sharedContext.title && _this.sharedContext.field) {
                    _this.groupingElements.addGroup(_this.sharedContext.title, _this.sharedContext.field);
                    _this.sharedContext.lastTarget = result.target;
                }
            };
            result.target.onmouseup = function () {
                if (_this.sharedContext.dragging && _this.sharedContext.title && _this.sharedContext.field) {
                    _this.groupingElements.addToGrouping();
                }
            };
        }
    };
    VGridDragDropCol.prototype.createDragElement = function () {
        this.dragColumnBlock = document.createElement('div');
        this.dragColumnBlock.classList.add(this.vGrid.attTheme);
        this.dragColumnBlock.classList.add('avg-drag');
        this.dragColumnBlock.style.top = -1200 + 'px';
        this.dragColumnBlock.style.left = -1200 + 'px';
        document.body.appendChild(this.dragColumnBlock);
        this.dragColumnBlock.innerHTML = this.title || this.vGrid.colConfig[this.colNo].colHeaderName;
    };
    VGridDragDropCol.prototype.onDragstart = function () {
        var _this = this;
        document.addEventListener('mouseup', this.onDragendBinded);
        this.vGridElement.addEventListener('mouseleave', this.onDragOutSideBinded);
        this.createDragElement();
        this.mouseMoveTimer = setTimeout(function () {
            document.addEventListener('mousemove', _this.onDragoverBinded, false);
        }, 300);
        this.sharedContext.dragging = true;
        this.sharedContext.colType = this.colType;
        this.sharedContext.context = this.context;
        this.sharedContext.colNo = this.colNo;
        this.sharedContext.curColNo = this.colNo;
        this.sharedContext.columnsArray = this.columnsArray;
        this.sharedContext.title = this.title;
        this.sharedContext.field = this.field;
        this.sharedContext.columnsArraySorted = [];
        this.sharedContext.columnsArray.forEach(function (x) {
            _this.sharedContext.columnsArraySorted.push(x);
        });
    };
    VGridDragDropCol.prototype.onDragOutSide = function (event) {
        if (this.sharedContext.dragging) {
            if (event.layerX < 0) {
                var left_1 = false;
                this.vGrid.columnBindingContext.setupleft.forEach(function (x) {
                    if (x.show) {
                        left_1 = true;
                    }
                });
                if (!left_1) {
                    this.switchColumns({
                        colType: 'left'
                    });
                }
            }
            if (event.layerX > this.vGridElement.clientWidth) {
                var right_1 = false;
                this.vGrid.columnBindingContext.setupright.forEach(function (x) {
                    if (x.show) {
                        right_1 = true;
                    }
                });
                if (!right_1) {
                    this.switchColumns({
                        colType: 'right'
                    });
                }
            }
        }
    };
    VGridDragDropCol.prototype.onDragenter = function (event) {
        if (this.sharedContext.dragging) {
            var result = this.getTargetData(event.target);
            if (result.target.nodeName === 'AVG-COL' && result.ok && this.sharedContext.lastTarget !== result.target) {
                this.sharedContext.lastTarget = result.target;
                if (result.colNo !== this.sharedContext.colNo && result.colType === this.sharedContext.colType) {
                    var newLeft = this.sharedContext.columnsArray[result.colNo].left;
                    var oldLeft = this.sharedContext.columnsArray[this.sharedContext.colNo].left;
                    if (newLeft < oldLeft) {
                        this.sharedContext.columnsArray[this.sharedContext.colNo].left = newLeft;
                        this.sharedContext.columnsArray[result.colNo].left = newLeft + 1;
                    }
                    else {
                        this.sharedContext.columnsArray[this.sharedContext.colNo].left = newLeft;
                        this.sharedContext.columnsArray[result.colNo].left = newLeft - 1;
                    }
                    this.sharedContext.columnsArraySorted.sort(function (a, b) {
                        return a.left - b.left;
                    });
                    var appendValue_1 = 0;
                    this.sharedContext.columnsArraySorted.forEach(function (x) {
                        if (x.show) {
                            x.left = appendValue_1;
                            appendValue_1 = appendValue_1 + x.width;
                        }
                    });
                }
                if (result.colNo !== this.sharedContext.colNo && result.colType !== this.sharedContext.colType) {
                    this.switchColumns(result);
                }
            }
        }
    };
    VGridDragDropCol.prototype.onDragover = function (event) {
        if (this.dragColumnBlock) {
            this.dragColumnBlock.style.top = event.clientY + 'px';
            this.dragColumnBlock.style.left = event.clientX + 'px';
        }
    };
    VGridDragDropCol.prototype.onDragend = function () {
        clearTimeout(this.mouseMoveTimer);
        this.sharedContext.dragging = false;
        document.removeEventListener('mouseup', this.onDragendBinded);
        document.removeEventListener('mousemove', this.onDragoverBinded);
        this.vGridElement.removeEventListener('mouseleave', this.onDragOutSideBinded);
        this.sharedContext.lastTarget = null;
        if (this.dragColumnBlock) {
            var parent = this.dragColumnBlock.parentNode;
            if (parent) {
                parent.removeChild(this.dragColumnBlock);
                this.dragColumnBlock = null;
            }
        }
    };
    VGridDragDropCol.prototype.switchColumns = function (result) {
        var _this = this;
        var width;
        var newColType = result.colType;
        var oldColType = this.sharedContext.colType;
        var heightAndWidths = this.vGrid.htmlHeightWidth;
        switch (true) {
            case newColType === 'left' && oldColType === 'main':
            case newColType === 'main' && oldColType === 'left':
            case newColType === 'right' && oldColType === 'main':
            case newColType === 'main' && oldColType === 'right':
            case newColType === 'left' && oldColType === 'right':
            case newColType === 'right' && oldColType === 'left':
                this.sharedContext.columnsArray[this.sharedContext.colNo].show = false;
                width = this.sharedContext.columnsArray[this.sharedContext.colNo].width;
                this.sharedContext.columnsArraySorted.sort(function (a, b) {
                    return a.left - b.left;
                });
                var appendValue_2 = 0;
                this.sharedContext.columnsArraySorted.forEach(function (x) {
                    if (x.show) {
                        x.left = appendValue_2;
                        appendValue_2 = appendValue_2 + x.width;
                    }
                });
                this.sharedContext.colType = result.colType;
                this.sharedContext.columnsArray = this.vGrid.columnBindingContext['setup' + result.colType];
                this.sharedContext.columnsArray[this.sharedContext.colNo].show = true;
                this.sharedContext.columnsArray[this.sharedContext.colNo].width = width;
                this.sharedContext.columnsArraySorted = [];
                this.sharedContext.columnsArray.forEach(function (x) {
                    _this.sharedContext.columnsArraySorted.push(x);
                });
                this.sharedContext.columnsArraySorted.sort(function (a, b) {
                    return a.left - b.left;
                });
                appendValue_2 = 0;
                this.sharedContext.columnsArraySorted.forEach(function (x) {
                    if (x.show) {
                        x.left = appendValue_2;
                        appendValue_2 = appendValue_2 + x.width;
                    }
                });
                break;
            default:
                break;
        }
        if (newColType === 'left' && oldColType === 'main') {
            heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width - width;
            heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width - width;
            heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width + width;
            heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width + width;
            heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left + width;
            heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left + width;
            heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left + width;
        }
        if (newColType === 'main' && oldColType === 'left') {
            heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width + width;
            heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width + width;
            heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width - width;
            heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width - width;
            heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left - width;
            heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left - width;
            heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left - width;
        }
        if (newColType === 'right' && oldColType === 'main') {
            heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width - width;
            heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width - width;
            heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width + width;
            heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width + width;
            heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right + width;
            heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right + width;
            heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right + width;
        }
        if (newColType === 'main' && oldColType === 'right') {
            heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width + width;
            heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width + width;
            heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width - width;
            heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width - width;
            heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right - width;
            heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right - width;
            heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right - width;
        }
        if (newColType === 'left' && oldColType === 'right') {
            heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width - width;
            heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width - width;
            heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width + width;
            heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width + width;
            heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right - width;
            heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right - width;
            heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right - width;
            heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left + width;
            heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left + width;
            heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left + width;
        }
        if (newColType === 'right' && oldColType === 'left') {
            heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width + width;
            heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width + width;
            heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width - width;
            heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width - width;
            heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right + width;
            heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right + width;
            heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right + width;
            heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left - width;
            heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left - width;
            heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left - width;
        }
    };
    VGridDragDropCol.prototype.getTargetData = function (curTarget) {
        var draggableTarget = null;
        var count = 0;
        var exit = true;
        var isOk = false;
        while (exit) {
            count++;
            if (!curTarget.parentNode) {
                exit = false;
            }
            else {
                if (curTarget.draggable === true && draggableTarget === null) {
                    draggableTarget = curTarget;
                }
                switch (true) {
                    case curTarget.nodeName === 'AVG-COL':
                    case curTarget.nodeName === 'AVG-TOP-PANEL':
                        isOk = true;
                        exit = false;
                        break;
                    default:
                        curTarget = curTarget.parentNode;
                        break;
                }
            }
            if (count > 10) {
                exit = false;
            }
        }
        var curColType = null;
        var curColNo = null;
        var curContext = null;
        var curColumnsArray = null;
        var isPanel = false;
        if (isOk && curTarget.nodeName === 'AVG-COL') {
            curColType = curTarget.attributes.getNamedItem('avg-type').value;
            curColNo = parseInt(curTarget.attributes.getNamedItem('avg-config-col').value, 10);
            curContext = this.vGrid.columnBindingContext['setup' + curColType][curColNo];
            curColumnsArray = this.vGrid.columnBindingContext['setup' + curColType];
        }
        if (isOk && curTarget.nodeName === 'AVG-TOP-PANEL') {
            isPanel = true;
        }
        return {
            draggable: draggableTarget,
            ok: isOk,
            target: curTarget,
            colType: curColType,
            colNo: curColNo,
            context: curContext,
            columnsArray: curColumnsArray,
            panel: isPanel
        };
    };
    return VGridDragDropCol;
}());
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridDragDropCol.prototype, "title", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridDragDropCol.prototype, "field", void 0);
VGridDragDropCol = __decorate([
    aurelia_framework_1.customAttribute('v-drag-drop-col'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof v_grid_1.VGrid !== "undefined" && v_grid_1.VGrid) === "function" && _a || Object])
], VGridDragDropCol);
exports.VGridDragDropCol = VGridDragDropCol;
var _a;
//# sourceMappingURL=v-drag-drop-col.js.map
});
___scope___.file("grid/attributes/v-filter-observer.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
var __decorate = __fsbx_decorate(arguments)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributesFilterObserver = (function () {
    function VGridAttributesFilterObserver(element, vGrid) {
        this.vGrid = vGrid;
        this.element = element;
    }
    VGridAttributesFilterObserver.prototype.valueChanged = function (newValue) {
        if (this.attribute && newValue) {
            this.updateFilter();
        }
    };
    VGridAttributesFilterObserver.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        var valueConverter = this.valueConverters(this.converter);
        this.filterOperator = this.operator || '=';
        this.attribute = this.field;
        this.valueFormater = valueConverter || null;
        this.state = 0;
    };
    VGridAttributesFilterObserver.prototype.getValue = function () {
        return this.valueFormater ? this.valueFormater.fromView(this.value) : this.value;
    };
    VGridAttributesFilterObserver.prototype.updateFilter = function () {
        var _this = this;
        var curFilter = this.vGrid.attGridConnector.getCurrentFilter();
        var filterIndex = -1;
        curFilter.forEach(function (filter, index) {
            if (filter.attribute === _this.attribute) {
                filterIndex = index;
            }
        });
        if (filterIndex !== -1) {
            if (this.getValue() === '') {
                curFilter.splice(filterIndex, 1);
            }
            else {
                curFilter[filterIndex].value = this.getValue();
                curFilter[filterIndex].operator = this.filterOperator;
            }
        }
        else {
            if (this.getValue() !== '') {
                curFilter.push({
                    attribute: this.attribute,
                    operator: this.filterOperator,
                    value: this.getValue()
                });
            }
        }
        this.vGrid.attGridConnector.query(this.vGrid.attGridConnector.getCurrentFilter());
    };
    VGridAttributesFilterObserver.prototype.valueConverters = function (value) {
        var valueConverter = this.vGrid.viewResources.getValueConverter.bind(this.vGrid.viewResources);
        return valueConverter(value);
    };
    return VGridAttributesFilterObserver;
}());
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilterObserver.prototype, "field", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilterObserver.prototype, "operator", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilterObserver.prototype, "converter", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilterObserver.prototype, "value", void 0);
VGridAttributesFilterObserver = __decorate([
    aurelia_framework_1.customAttribute('v-filter-observer'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof v_grid_1.VGrid !== "undefined" && v_grid_1.VGrid) === "function" && _a || Object])
], VGridAttributesFilterObserver);
exports.VGridAttributesFilterObserver = VGridAttributesFilterObserver;
var _a;
//# sourceMappingURL=v-filter-observer.js.map
});
___scope___.file("grid/attributes/v-filter.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
var __decorate = __fsbx_decorate(arguments)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributesFilter = (function () {
    function VGridAttributesFilter(element, vGrid) {
        this.vGrid = vGrid;
        this.element = element;
    }
    VGridAttributesFilter.prototype.getOperatorName = function (operator) {
        return this.vGrid.filterOperatorNames[operator];
    };
    VGridAttributesFilter.prototype.attached = function () {
        var _this = this;
        if (this.attribute) {
            this.vGrid.element.addEventListener('filterUpdate', function (e) {
                if (e.detail.attribute === _this.attribute && e.detail.key === _this.key) {
                    _this.filterOperator = e.detail.operator;
                    _this.element.placeholder =
                        _this.getOperatorName(_this.filterOperator);
                    _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                }
            });
            this.vGrid.element.addEventListener('filterUpdateValues', function () {
                var curFilter = _this.vGrid.attGridConnector.getCurrentFilter();
                curFilter.forEach(function (f) {
                    if (f.attribute === _this.attribute && f.key === _this.key) {
                        _this.element.value = f.value;
                        _this.filterOperator = f.operator;
                        _this.element.placeholder =
                            _this.getOperatorName(_this.filterOperator);
                    }
                });
            });
            this.vGrid.element.addEventListener('filterTranslation', function () {
                _this.element.placeholder =
                    _this.getOperatorName(_this.filterOperator);
                _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
            });
            this.vGrid.element.addEventListener('filterClearCell', function (e) {
                if (e.detail.attribute === _this.attribute && e.detail.key === _this.key) {
                    _this.resetValue();
                    _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                }
            });
            this.vGrid.element.addEventListener('filterClearAll', function () {
                _this.resetValue();
                _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
            });
            if (this.type !== 'checkbox') {
                this.element.placeholder =
                    this.getOperatorName(this.filterOperator);
                this.element.onkeyup = function (e) {
                    if (e.keyCode === 13) {
                        _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                        _this.vGrid.attGridConnector.query(_this.vGrid.attGridConnector.getCurrentFilter());
                    }
                    else {
                        if (_this.filterOn === 'onKeyDown') {
                            _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                            _this.vGrid.attGridConnector.query(_this.vGrid.attGridConnector.getCurrentFilter());
                        }
                    }
                };
            }
            else {
                this.element.indeterminate = true;
                this.element.style.opacity = '0.3';
                this.element.onclick = function () {
                    switch (_this.state) {
                        case 0:
                            _this.state = 2;
                            _this.element.style.opacity = '1';
                            _this.element.checked = true;
                            _this.element.indeterminate = false;
                            break;
                        case 2:
                            _this.state = 3;
                            _this.element.style.opacity = '1';
                            _this.element.indeterminate = false;
                            break;
                        default:
                            _this.element.checked = false;
                            _this.state = 0;
                            _this.element.style.opacity = '0.3';
                            _this.element.indeterminate = true;
                    }
                    _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                    _this.vGrid.attGridConnector.query(_this.vGrid.attGridConnector.getCurrentFilter());
                };
            }
        }
    };
    VGridAttributesFilter.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        var valueConverter = this.valueConverters(this.converter);
        this.filterOn = this.keydown === 'true' ? 'onKeyDown' : 'onEnterKey';
        this.filterOperator = this.operator || '=';
        this.attribute = this.field;
        this.valueFormater = valueConverter || null;
        this.type = this.element.type;
        this.state = 0;
    };
    VGridAttributesFilter.prototype.getValue = function () {
        if (this.type !== 'checkbox') {
            return this.valueFormater ? this.valueFormater.fromView(this.element.value) : this.element.value;
        }
        else {
            if (this.valueFormater && this.state) {
                return this.valueFormater.fromView(this.state ? this.state === 2 ? true : false : '');
            }
            else {
                return this.state ? this.state === 2 ? true : false : '';
            }
        }
    };
    VGridAttributesFilter.prototype.resetValue = function () {
        if (this.type !== 'checkbox') {
            this.element.value = '';
        }
        else {
            this.state = 0;
            this.element.checked = false;
        }
    };
    VGridAttributesFilter.prototype.updateFilter = function (curFilter) {
        var _this = this;
        var filterIndex = -1;
        curFilter.forEach(function (filter, index) {
            if (filter.attribute === _this.attribute && filter.key === _this.key) {
                filterIndex = index;
            }
        });
        if (filterIndex !== -1) {
            if (this.getValue() === '') {
                curFilter.splice(filterIndex, 1);
            }
            else {
                curFilter[filterIndex].value = this.getValue();
                curFilter[filterIndex].operator = this.filterOperator;
            }
        }
        else {
            if (this.getValue() !== '') {
                curFilter.push({
                    key: this.key,
                    attribute: this.attribute,
                    operator: this.filterOperator,
                    value: this.getValue()
                });
            }
        }
    };
    VGridAttributesFilter.prototype.valueConverters = function (value) {
        var valueConverter = this.vGrid.viewResources.getValueConverter.bind(this.vGrid.viewResources);
        return valueConverter(value);
    };
    return VGridAttributesFilter;
}());
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilter.prototype, "field", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilter.prototype, "operator", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilter.prototype, "converter", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilter.prototype, "keydown", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilter.prototype, "key", void 0);
VGridAttributesFilter = __decorate([
    aurelia_framework_1.customAttribute('v-filter'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof v_grid_1.VGrid !== "undefined" && v_grid_1.VGrid) === "function" && _a || Object])
], VGridAttributesFilter);
exports.VGridAttributesFilter = VGridAttributesFilter;
var _a;
//# sourceMappingURL=v-filter.js.map
});
___scope___.file("grid/attributes/v-image.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
var __decorate = __fsbx_decorate(arguments)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributesImageFix = (function () {
    function VGridAttributesImageFix(element, vGrid) {
        this.vGrid = vGrid;
        this.element = element;
    }
    VGridAttributesImageFix.prototype.valueChanged = function (newValue) {
        newValue = newValue ? newValue : '';
        this.element.src = '';
        this.element.src = this.value || newValue;
    };
    VGridAttributesImageFix.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.element.src = '';
        this.element.src = this.value || '';
    };
    return VGridAttributesImageFix;
}());
VGridAttributesImageFix = __decorate([
    aurelia_framework_1.customAttribute('v-image-fix'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof v_grid_1.VGrid !== "undefined" && v_grid_1.VGrid) === "function" && _a || Object])
], VGridAttributesImageFix);
exports.VGridAttributesImageFix = VGridAttributesImageFix;
var _a;
//# sourceMappingURL=v-image.js.map
});
___scope___.file("grid/attributes/v-menu.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
var __decorate = __fsbx_decorate(arguments)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributeMenu = (function () {
    function VGridAttributeMenu(element, vGrid) {
        this.element = element;
        this.controller = vGrid.controller;
        this.raiseEvent = vGrid.controller.raiseEvent;
        this.groupingElements = vGrid.groupingElements;
        this.openBinded = this.open.bind(this);
        this.checkBinded = this.check.bind(this);
        this.callbackBinded = this.callback.bind(this);
    }
    VGridAttributeMenu.prototype.attached = function () {
        this.element.addEventListener('contextmenu', this.openBinded);
    };
    VGridAttributeMenu.prototype.unbind = function () {
        document.removeEventListener('click', this.checkBinded);
    };
    VGridAttributeMenu.prototype.check = function (e) {
        var x = e.target.classList.contains('avg-menu__link');
        if (!x) {
            this.controller.contextMenu.setDefaults();
            document.removeEventListener('click', this.checkBinded);
        }
    };
    VGridAttributeMenu.prototype.callback = function (type, option, event) {
        if (type === 'filter') {
            if (option === 'clear') {
                this.raiseEvent('filterClearCell', { attribute: this.filter.replace('rowRef.', ''), key: this.filterkey });
                document.removeEventListener('click', this.checkBinded);
                return true;
            }
            if (option === 'clearall') {
                this.raiseEvent('filterClearAll', {});
                document.removeEventListener('click', this.checkBinded);
                return true;
            }
            if (option === 'showall') {
                this.controller.attGridConnector.query(null);
                document.removeEventListener('click', this.checkBinded);
                return true;
            }
        }
        if (type === 'sort') {
            var field_1 = this.sort;
            var arr = this.sort.split(';');
            arr.forEach(function (x) {
                if (x.indexOf('field') !== -1) {
                    field_1 = x.replace('field:', '');
                }
            });
            this.controller.attGridConnector.orderBy({
                attribute: field_1,
                asc: option === 'desc' ? false : true
            }, event.shiftKey);
            document.removeEventListener('click', this.checkBinded);
            return true;
        }
        if (type === 'groupby') {
            var groupTitle = this.groupbytitle ? this.groupbytitle : this.groupby;
            this.groupingElements.addGroup(groupTitle, this.groupby);
            this.groupingElements.addToGrouping();
            return true;
        }
        if (type === 'filterOption') {
            var field_2 = this.filter;
            var arr = this.filter.split(';');
            arr.forEach(function (x) {
                if (x.indexOf('field') !== -1) {
                    field_2 = x.replace('field:', '');
                }
            });
            this.raiseEvent('filterUpdate', {
                attribute: field_2,
                operator: option,
                key: this.filterkey
            });
            document.removeEventListener('click', this.checkBinded);
            return true;
        }
        return false;
    };
    VGridAttributeMenu.prototype.open = function (e) {
        this.check(e);
        document.addEventListener('click', this.checkBinded);
        e.preventDefault();
        if (!this.controller.contextMenu.show) {
            var clickCoords = this.getPosition(e);
            this.controller.contextMenu.openMenu({
                top: clickCoords.y,
                left: clickCoords.x,
                filter: this.filter,
                sort: this.sort,
                pinned: this.pinned,
                groupby: this.groupby,
                callback: this.callbackBinded
            });
        }
    };
    VGridAttributeMenu.prototype.getPosition = function (e) {
        var posx = 0;
        var posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return {
            x: posx,
            y: posy
        };
    };
    return VGridAttributeMenu;
}());
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributeMenu.prototype, "filter", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributeMenu.prototype, "filterkey", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributeMenu.prototype, "sort", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributeMenu.prototype, "pinned", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributeMenu.prototype, "groupby", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributeMenu.prototype, "groupbytitle", void 0);
VGridAttributeMenu = __decorate([
    aurelia_framework_1.customAttribute('v-menu'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof v_grid_1.VGrid !== "undefined" && v_grid_1.VGrid) === "function" && _a || Object])
], VGridAttributeMenu);
exports.VGridAttributeMenu = VGridAttributeMenu;
var _a;
//# sourceMappingURL=v-menu.js.map
});
___scope___.file("grid/attributes/v-resize-col.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
var __decorate = __fsbx_decorate(arguments)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributesResizeCol = (function () {
    function VGridAttributesResizeCol(element, vGrid) {
        this.vGrid = vGrid;
        this.ctx = vGrid.resizeAttributeSharedContext;
        this.element = element;
        this.screenX = 0;
        this.originalWidth = 0;
        this.column = this.element;
        while (this.column.nodeName !== 'AVG-COL') {
            this.column = this.column.parentNode;
        }
        this.colType = this.column.attributes.getNamedItem('avg-type').value;
        this.colNo = parseInt(this.column.attributes.getNamedItem('avg-config-col').value, 10);
        this.context = vGrid.columnBindingContext['setup' + this.colType][this.colNo];
        this.columnsArray = vGrid.columnBindingContext['setup' + this.colType];
        this.columnBindingContext = vGrid.columnBindingContext;
    }
    VGridAttributesResizeCol.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
    };
    VGridAttributesResizeCol.prototype.attached = function () {
        var _this = this;
        var resizeHandle = document.createElement('DIV');
        resizeHandle.classList.add('avg-draggable-handler');
        this.onmousedownBinded = this.onmousedown.bind(this);
        this.onmousemoveBinded = this.onmousemove.bind(this);
        this.onmouseupBinded = this.onmouseup.bind(this);
        resizeHandle.onmousedown = function (e) {
            _this.ctx.resizing = true;
            _this.onmousedown(e);
        };
        this.column.appendChild(resizeHandle);
    };
    VGridAttributesResizeCol.prototype.onmouseup = function () {
        document.removeEventListener('mousemove', this.onmousemoveBinded);
        document.removeEventListener('mouseup', this.onmouseupBinded);
        this.ctx.resizing = false;
    };
    VGridAttributesResizeCol.prototype.onmousemove = function (e) {
        this.updateHeader(e);
    };
    VGridAttributesResizeCol.prototype.updateHeader = function (e) {
        var _this = this;
        var w = Math.abs(this.screenX - e.screenX);
        if (w % 2 === 0) {
            requestAnimationFrame(function () {
                var movementX = _this.originalWidth - (_this.screenX - e.screenX);
                var appendValue = _this.originalWidth - movementX;
                if (_this.colType === 'main' && movementX > 10) {
                    _this.columnsArray[_this.colNo].width = movementX;
                    _this.vGrid.colConfig[_this.colNo].colWidth = _this.columnsArray[_this.colNo].width;
                    for (var i = 0; i < _this.columnsArray.length; i++) {
                        if (_this.columnsArray[_this.colNo].left < _this.columnsArray[i].left) {
                            _this.columnsArray[i].left = _this.originals[i] - appendValue;
                        }
                    }
                    _this.vGrid.htmlHeightWidth.avgContentMainScroll_Width = _this.avgContentMainScroll_Width - appendValue;
                    _this.vGrid.htmlHeightWidth.avgContentHhandleScroll_Width = _this.avgContentHhandleScroll_Width - appendValue;
                }
                if (_this.colType === 'right' && movementX > 10) {
                    _this.columnsArray[_this.colNo].width = movementX;
                    _this.vGrid.colConfig[_this.colNo].colWidth = _this.columnsArray[_this.colNo].width;
                    for (var i = 0; i < _this.columnsArray.length; i++) {
                        if (_this.columnsArray[_this.colNo].left < _this.columnsArray[i].left) {
                            _this.columnsArray[i].left = _this.originals[i] - appendValue;
                        }
                    }
                    _this.vGrid.htmlHeightWidth.avgContentRight_Width = _this.avgContentRight_Width - appendValue;
                    _this.vGrid.htmlHeightWidth.avgHeaderRight_Width = _this.avgHeaderRight_Width - appendValue;
                    _this.vGrid.htmlHeightWidth.avgContentMain_Right = _this.avgContentMain_Right - appendValue;
                    _this.vGrid.htmlHeightWidth.avgHeaderMain_Right = _this.avgHeaderMain_Right - appendValue;
                    _this.vGrid.htmlHeightWidth.avgContentHhandle_Right = _this.avgContentHhandle_Right - appendValue;
                }
                if (_this.colType === 'left' && movementX > 10) {
                    _this.columnsArray[_this.colNo].width = movementX;
                    _this.vGrid.colConfig[_this.colNo].colWidth = _this.columnsArray[_this.colNo].width;
                    for (var i = 0; i < _this.columnsArray.length; i++) {
                        if (_this.columnsArray[_this.colNo].left < _this.columnsArray[i].left) {
                            _this.columnsArray[i].left = _this.originals[i] - appendValue;
                        }
                    }
                    _this.vGrid.htmlHeightWidth.avgContentLeft_Width = _this.avgContentLeft_Width - appendValue;
                    _this.vGrid.htmlHeightWidth.avgHeaderLeft_Width = _this.avgHeaderLeft_Width - appendValue;
                    _this.vGrid.htmlHeightWidth.avgContentMain_Left = _this.avgContentMain_Left - appendValue;
                    _this.vGrid.htmlHeightWidth.avgHeaderMain_Left = _this.avgHeaderMain_Left - appendValue;
                    _this.vGrid.htmlHeightWidth.avgContentHhandle_Left = _this.avgContentHhandle_Left - appendValue;
                }
                _this.vGrid.controller.udateHorizontalScroller();
            });
        }
    };
    VGridAttributesResizeCol.prototype.onmousedown = function (e) {
        var _this = this;
        this.screenX = e.screenX;
        this.originalWidth = this.context.width;
        this.originals = [];
        for (var i = 0; i < this.columnsArray.length; i++) {
            this.originals.push(this.columnsArray[i].left);
        }
        this.avgContentLeft_Width = this.vGrid.htmlHeightWidth.avgContentLeft_Width;
        this.avgHeaderLeft_Width = this.vGrid.htmlHeightWidth.avgHeaderLeft_Width;
        this.avgContentMainScroll_Width = this.vGrid.htmlHeightWidth.avgContentMainScroll_Width;
        this.avgHeaderMain_Left = this.vGrid.htmlHeightWidth.avgHeaderMain_Left;
        this.avgContentMain_Left = this.vGrid.htmlHeightWidth.avgContentMain_Left;
        this.avgContentMain_Right = this.vGrid.htmlHeightWidth.avgContentMain_Right;
        this.avgHeaderMain_Right = this.vGrid.htmlHeightWidth.avgHeaderMain_Right;
        this.avgContentRight_Width = this.vGrid.htmlHeightWidth.avgContentRight_Width;
        this.avgHeaderRight_Width = this.vGrid.htmlHeightWidth.avgHeaderRight_Width;
        this.avgContentHhandle_Right = this.vGrid.htmlHeightWidth.avgContentHhandle_Right;
        this.avgContentHhandle_Left = this.vGrid.htmlHeightWidth.avgContentHhandle_Left;
        this.avgContentHhandleScroll_Width = this.vGrid.htmlHeightWidth.avgContentHhandleScroll_Width;
        this.avgContentMainScrollLeft = this.vGrid.htmlCache.avg_content_main.scrollLeft;
        if (this.colType === 'main') {
            this.isLast = this.vGrid.htmlHeightWidth.avgContentMainScroll_Width === (this.context.left + this.context.width);
        }
        if (this.colType === 'left') {
            var sumContext = this.context.left + this.context.width + this.vGrid.htmlHeightWidth.avgScrollBarWidth;
            var sumGrouping = this.columnBindingContext.setupgrouping * 15;
            this.isLast = this.vGrid.htmlHeightWidth.avgContentLeft_Width === (sumContext + sumGrouping);
        }
        if (this.colType === 'right') {
            var sum = this.context.left + this.context.width + this.vGrid.htmlHeightWidth.avgScrollBarWidth;
            this.isLast = this.vGrid.htmlHeightWidth.avgContentRight_Width === sum;
        }
        var setupRight = this.vGrid.columnBindingContext.setupright;
        this.rightColNo = 0;
        this.rightColNoWidth = 0;
        setupRight.forEach(function (col, i) {
            if (col.left === 0) {
                _this.rightColNo = i;
                _this.rightColNoWidth = col.width;
            }
        });
        document.addEventListener('mousemove', this.onmousemoveBinded);
        document.addEventListener('mouseup', this.onmouseupBinded);
    };
    return VGridAttributesResizeCol;
}());
VGridAttributesResizeCol = __decorate([
    aurelia_framework_1.customAttribute('v-resize-col'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof v_grid_1.VGrid !== "undefined" && v_grid_1.VGrid) === "function" && _a || Object])
], VGridAttributesResizeCol);
exports.VGridAttributesResizeCol = VGridAttributesResizeCol;
var _a;
//# sourceMappingURL=v-resize-col.js.map
});
___scope___.file("grid/attributes/v-selection.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
var __decorate = __fsbx_decorate(arguments)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributesSelection = (function () {
    function VGridAttributesSelection(element, vGrid) {
        this.vGrid = vGrid;
        this.controller = vGrid.controller;
        this.element = element;
    }
    VGridAttributesSelection.prototype.selectedChanged = function (newValue) {
        if (this.type === 'row') {
            this.element.checked = newValue;
        }
    };
    VGridAttributesSelection.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
    };
    VGridAttributesSelection.prototype.attached = function () {
        var _this = this;
        this.element.checked = this.selected;
        this.element.onclick = function () {
            var status = _this.element.checked === 'true' || _this.element.checked === true ? true : false;
            if (status) {
                if (_this.type === 'header') {
                    _this.bindingContext.selection.selectRange(0, _this.controller.collectionLength() - 1);
                    _this.controller.rowClickHandler.updateSelectionOnAllRows();
                }
                if (_this.type === 'row') {
                    _this.bindingContext.selection.select(_this.bindingContext.row, true);
                    _this.controller.rowClickHandler.updateSelectionOnAllRows();
                }
            }
            else {
                if (_this.type === 'header') {
                    _this.bindingContext.selection.deSelectAll();
                    _this.controller.rowClickHandler.updateSelectionOnAllRows();
                }
                if (_this.type === 'row') {
                    _this.bindingContext.selection.deSelect(_this.bindingContext.row);
                    _this.controller.rowClickHandler.updateSelectionOnAllRows();
                }
            }
        };
    };
    return VGridAttributesSelection;
}());
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", Boolean)
], VGridAttributesSelection.prototype, "selected", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesSelection.prototype, "type", void 0);
VGridAttributesSelection = __decorate([
    aurelia_framework_1.customAttribute('v-selection'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof v_grid_1.VGrid !== "undefined" && v_grid_1.VGrid) === "function" && _a || Object])
], VGridAttributesSelection);
exports.VGridAttributesSelection = VGridAttributesSelection;
var _a;
//# sourceMappingURL=v-selection.js.map
});
___scope___.file("grid/attributes/v-sort.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
var __decorate = __fsbx_decorate(arguments)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributesSort = (function () {
    function VGridAttributesSort(element, vGrid) {
        this.firstTime = true;
        this.vGrid = vGrid;
        this.element = element;
    }
    VGridAttributesSort.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.attribute = this.field;
    };
    VGridAttributesSort.prototype.attached = function () {
        var _this = this;
        this.sortIcon = document.createElement('i');
        this.sortIcon.innerHTML = this.getSortIconMarkup();
        this.element.appendChild(this.sortIcon);
        this.element.onmousedown = function () {
            _this.element.onmouseup = function (e) {
                if (e.button === 0) {
                    if (_this.firstTime && _this.asc === 'false') {
                        _this.vGrid.attGridConnector.orderBy({ attribute: _this.attribute, asc: false }, e.shiftKey);
                    }
                    else {
                        _this.vGrid.attGridConnector.orderBy(_this.attribute, e.shiftKey);
                    }
                }
            };
            setTimeout(function () {
                _this.element.onmouseup = null;
            }, 300);
        };
        this.vGrid.element.addEventListener('sortIconUpdate', function () {
            _this.sortIcon.innerHTML = _this.getSortIconMarkup();
        });
    };
    VGridAttributesSort.prototype.detached = function () {
        this.element.removeChild(this.sortIcon);
    };
    VGridAttributesSort.prototype.getSortIconMarkup = function () {
        var _this = this;
        var markup = "";
        var isAscHtml = "<svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.4 6L3 10h1.5L8 7l3.4 3H13L8.5 6h-1z\"/>\n                      </svg>";
        var isDescHtml = "<svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.4 10L3 6h1.5L8 9.2 11.3 6H13l-4.5 4h-1z\"/>\n                      </svg>";
        var sortlength = this.vGrid.attGridConnector.getCurrentOrderBy().length;
        this.vGrid.attGridConnector.getCurrentOrderBy().forEach(function (x) {
            if (x.attribute === _this.attribute) {
                _this.firstTime = false;
                var block = x.asc === true ? isAscHtml : isDescHtml;
                var main = '';
                if (sortlength > 1) {
                    main = "<i class=\"" + 'avg-fa-sort-number' + "\" data-vgridsort=\"" + x.no + "\"></i>";
                }
                markup = block + main;
            }
        });
        return markup;
    };
    return VGridAttributesSort;
}());
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesSort.prototype, "field", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesSort.prototype, "asc", void 0);
VGridAttributesSort = __decorate([
    aurelia_framework_1.customAttribute('v-sort'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof v_grid_1.VGrid !== "undefined" && v_grid_1.VGrid) === "function" && _a || Object])
], VGridAttributesSort);
exports.VGridAttributesSort = VGridAttributesSort;
var _a;
//# sourceMappingURL=v-sort.js.map
});
___scope___.file("grid/v-grid-col.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
var __decorate = __fsbx_decorate(arguments)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
var interfaces_1 = require("../interfaces");
var VGridElementColConfig = (function () {
    function VGridElementColConfig(element, vGrid, targetInstruction) {
        this.vGrid = vGrid;
        this.element = element;
        this.colRowTemplate = targetInstruction.elementInstruction.colRowTemplate;
        this.colHeaderTemplate = targetInstruction.elementInstruction.colHeaderTemplate;
        this.colCss = targetInstruction.elementInstruction.colCss;
    }
    VGridElementColConfig.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.vGrid.colConfig.push({
            colWidth: this.colWidth ? this.colWidth * 1 : 100,
            colRowTemplate: this.colRowTemplate,
            colHeaderTemplate: this.colHeaderTemplate,
            colField: this.colField,
            colPinLeft: this.checkBool(this.colPinLeft),
            colPinRight: this.checkBool(this.colPinRight),
            colHeaderName: this.colHeaderName,
            colFilterMenu: this.colFilterMenu,
            colLabelMenu: this.colLabelMenu,
            colRowMenu: this.colRowMenu,
            colHidden: this.checkBool(this.colHidden),
            colDragDrop: this.colDragDrop,
            colResizeable: this.colResizeable,
            colAddLabelAttributes: this.colAddLabelAttributes,
            colAddFilterAttributes: this.colAddFilterAttributes,
            colAddRowAttributes: this.colAddRowAttributes,
            colSort: this.colSort,
            colDisplayEdit: this.colDisplayEdit,
            colFilter: this.colFilter,
            colFilterTop: this.checkBool(this.colFilterTop),
            colCss: this.colCss,
            colType: this.colType || 'text'
        });
    };
    VGridElementColConfig.prototype.checkBool = function (value) {
        if (typeof value === 'string') {
            value = value.toLowerCase();
        }
        switch (true) {
            case value === 'true':
            case value === true:
                value = true;
                break;
            case value === 'false':
            case value === false:
                value = false;
                break;
            default:
                value = false;
                break;
        }
        return value;
    };
    return VGridElementColConfig;
}());
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-width' }),
    __metadata("design:type", Number)
], VGridElementColConfig.prototype, "colWidth", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-field' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colField", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-header-name' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colHeaderName", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-sort' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colSort", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-pin-left' }),
    __metadata("design:type", Boolean)
], VGridElementColConfig.prototype, "colPinLeft", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-pin-right' }),
    __metadata("design:type", Boolean)
], VGridElementColConfig.prototype, "colPinRight", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-filter' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colFilter", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-filter-top' }),
    __metadata("design:type", Boolean)
], VGridElementColConfig.prototype, "colFilterTop", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-add-label-attributes' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colAddLabelAttributes", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-add-filter-attributes' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colAddFilterAttributes", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-add-row-attributes' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colAddRowAttributes", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-type' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colType", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-filter-menu' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colFilterMenu", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-label-menu' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colLabelMenu", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-row-menu' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colRowMenu", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-hidden' }),
    __metadata("design:type", Boolean)
], VGridElementColConfig.prototype, "colHidden", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-drag-drop' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colDragDrop", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-resizeable' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colResizeable", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-display-edit' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colDisplayEdit", void 0);
VGridElementColConfig = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        compiler = null;
        resources = null;
        var headerTemplateElement = element.getElementsByTagName('V-HEADER-TEMPLATE')[0];
        var headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
        if (headerTemplateHtml !== '') {
            instruction.colHeaderTemplate = headerTemplateHtml;
        }
        var rowTemplateElement = element.getElementsByTagName('V-ROW-TEMPLATE')[0];
        var rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
        if (rowTemplateHtml !== '') {
            instruction.colRowTemplate = rowTemplateHtml;
        }
        element.innerHTML = '';
        var css = element.getAttribute('col-css');
        if (css) {
            instruction.colCss = css;
        }
    }),
    aurelia_framework_1.customElement('v-grid-col'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof v_grid_1.VGrid !== "undefined" && v_grid_1.VGrid) === "function" && _a || Object, typeof (_b = typeof interfaces_1.CustomTargetInstruction !== "undefined" && interfaces_1.CustomTargetInstruction) === "function" && _b || Object])
], VGridElementColConfig);
exports.VGridElementColConfig = VGridElementColConfig;
var _a, _b;
//# sourceMappingURL=v-grid-col.js.map
});
___scope___.file("grid/v-grid-contextmenu.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
var __decorate = __fsbx_decorate(arguments)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
var interfaces_1 = require("../interfaces");
var VGridContextmenu = (function () {
    function VGridContextmenu(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.customMenuTemplates = targetInstruction.elementInstruction.menuTemplates;
    }
    VGridContextmenu.prototype.bind = function () {
        this.vGrid.customMenuTemplates = this.customMenuTemplates;
    };
    return VGridContextmenu;
}());
VGridContextmenu = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.customElement('v-grid-contextmenu'),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        compiler = null;
        resources = null;
        instruction.menuTemplates = {};
        var template;
        var templateHTML;
        template = element.getElementsByTagName('V-MENU-CLOSE')[0];
        templateHTML = template ? template.innerHTML : null;
        if (templateHTML !== '') {
            instruction.menuTemplates.close = templateHTML;
        }
        template = element.getElementsByTagName('V-MENU-PINNED')[0];
        templateHTML = template ? template.innerHTML : null;
        if (templateHTML !== '') {
            instruction.menuTemplates.pinned = templateHTML;
        }
        template = element.getElementsByTagName('V-MENU-GROUPBY')[0];
        templateHTML = template ? template.innerHTML : null;
        if (templateHTML !== '') {
            instruction.menuTemplates.groupby = templateHTML;
        }
        template = element.getElementsByTagName('V-MENU-SORT')[0];
        templateHTML = template ? template.innerHTML : null;
        if (templateHTML !== '') {
            instruction.menuTemplates.sort = templateHTML;
        }
        template = element.getElementsByTagName('V-MENU-FILTER')[0];
        templateHTML = template ? template.innerHTML : null;
        if (templateHTML !== '') {
            instruction.menuTemplates.filter = templateHTML;
        }
        template = element.getElementsByTagName('V-MENU-FILTER-OPTIONS')[0];
        templateHTML = template ? template.innerHTML : null;
        if (templateHTML !== '') {
            instruction.menuTemplates.filterOptions = templateHTML;
        }
        template = element.getElementsByTagName('V-MENU-ALL')[0];
        templateHTML = template ? template.innerHTML : null;
        if (templateHTML !== '') {
            instruction.menuTemplates.all = templateHTML;
        }
        element.innerHTML = '';
    }),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof v_grid_1.VGrid !== "undefined" && v_grid_1.VGrid) === "function" && _a || Object, typeof (_b = typeof interfaces_1.CustomTargetInstruction !== "undefined" && interfaces_1.CustomTargetInstruction) === "function" && _b || Object])
], VGridContextmenu);
exports.VGridContextmenu = VGridContextmenu;
var _a, _b;
//# sourceMappingURL=v-grid-contextmenu.js.map
});
___scope___.file("grid/v-grid-footer.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
var __decorate = __fsbx_decorate(arguments)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
var interfaces_1 = require("../interfaces");
var VGridFooter = (function () {
    function VGridFooter(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.template = targetInstruction.elementInstruction.template;
    }
    VGridFooter.prototype.bind = function () {
        this.vGrid.footerTemplate = this.template;
    };
    return VGridFooter;
}());
VGridFooter = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.customElement('v-grid-footer'),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        compiler = null;
        resources = null;
        instruction.template = element.innerHTML;
        element.innerHTML = '';
    }),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof v_grid_1.VGrid !== "undefined" && v_grid_1.VGrid) === "function" && _a || Object, typeof (_b = typeof interfaces_1.CustomTargetInstruction !== "undefined" && interfaces_1.CustomTargetInstruction) === "function" && _b || Object])
], VGridFooter);
exports.VGridFooter = VGridFooter;
var _a, _b;
//# sourceMappingURL=v-grid-footer.js.map
});
___scope___.file("grid/v-grid-group-element.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
var __decorate = __fsbx_decorate(arguments)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
var interfaces_1 = require("../interfaces");
var VGridGroupElement = (function () {
    function VGridGroupElement(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
    }
    VGridGroupElement.prototype.bind = function () {
        this.vGrid.colGroupElement = this.rowTemplate;
    };
    return VGridGroupElement;
}());
VGridGroupElement = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.customElement('v-grid-group-element'),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        compiler = null;
        resources = null;
        instruction.rowTemplate = element.innerHTML;
        element.innerHTML = '';
    }),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof v_grid_1.VGrid !== "undefined" && v_grid_1.VGrid) === "function" && _a || Object, typeof (_b = typeof interfaces_1.CustomTargetInstruction !== "undefined" && interfaces_1.CustomTargetInstruction) === "function" && _b || Object])
], VGridGroupElement);
exports.VGridGroupElement = VGridGroupElement;
var _a, _b;
//# sourceMappingURL=v-grid-group-element.js.map
});
___scope___.file("grid/v-grid-group-row.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
var __decorate = __fsbx_decorate(arguments)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
var interfaces_1 = require("../interfaces");
var VGridGroupRow = (function () {
    function VGridGroupRow(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
    }
    VGridGroupRow.prototype.bind = function () {
        this.vGrid.colGroupRow = this.rowTemplate;
    };
    return VGridGroupRow;
}());
VGridGroupRow = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.customElement('v-grid-group-row'),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        compiler = null;
        resources = null;
        instruction.rowTemplate = element.innerHTML;
        element.innerHTML = '';
    }),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof v_grid_1.VGrid !== "undefined" && v_grid_1.VGrid) === "function" && _a || Object, typeof (_b = typeof interfaces_1.CustomTargetInstruction !== "undefined" && interfaces_1.CustomTargetInstruction) === "function" && _b || Object])
], VGridGroupRow);
exports.VGridGroupRow = VGridGroupRow;
var _a, _b;
//# sourceMappingURL=v-grid-group-row.js.map
});
___scope___.file("grid/v-grid-loadingscreen.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
var __decorate = __fsbx_decorate(arguments)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
var interfaces_1 = require("../interfaces");
var VGridLoadingScreen = (function () {
    function VGridLoadingScreen(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.template = targetInstruction.elementInstruction.template;
    }
    VGridLoadingScreen.prototype.bind = function () {
        this.vGrid.loadingScreenTemplate = this.template;
    };
    return VGridLoadingScreen;
}());
VGridLoadingScreen = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.customElement('v-grid-loadingscreen'),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        compiler = null;
        resources = null;
        instruction.template = element.innerHTML;
        element.innerHTML = '';
    }),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof v_grid_1.VGrid !== "undefined" && v_grid_1.VGrid) === "function" && _a || Object, typeof (_b = typeof interfaces_1.CustomTargetInstruction !== "undefined" && interfaces_1.CustomTargetInstruction) === "function" && _b || Object])
], VGridLoadingScreen);
exports.VGridLoadingScreen = VGridLoadingScreen;
var _a, _b;
//# sourceMappingURL=v-grid-loadingscreen.js.map
});
___scope___.file("grid/v-grid-row-repeat.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
var __decorate = __fsbx_decorate(arguments)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
var interfaces_1 = require("../interfaces");
var VGridElementRowRepeat = (function () {
    function VGridElementRowRepeat(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
        this.headerTemplate = targetInstruction.elementInstruction.headerTemplate;
    }
    VGridElementRowRepeat.prototype.bind = function () {
        this.vGrid.colRepeater = true;
        this.vGrid.colRepeatRowTemplate = this.rowTemplate;
        this.vGrid.colRepeatRowHeaderTemplate = this.headerTemplate;
    };
    return VGridElementRowRepeat;
}());
VGridElementRowRepeat = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.customElement('v-grid-row-repeat'),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        compiler = null;
        resources = null;
        var headerTemplateElement = element.getElementsByTagName('V-HEADER-TEMPLATE')[0];
        var headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
        if (headerTemplateHtml !== '') {
            instruction.headerTemplate = headerTemplateHtml;
        }
        var rowTemplateElement = element.getElementsByTagName('V-ROW-TEMPLATE')[0];
        var rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
        if (rowTemplateHtml !== '') {
            instruction.rowTemplate = rowTemplateHtml;
        }
        if (!rowTemplateHtml) {
            instruction.rowTemplate = element.innerHTML;
        }
        element.innerHTML = '';
    }),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof v_grid_1.VGrid !== "undefined" && v_grid_1.VGrid) === "function" && _a || Object, typeof (_b = typeof interfaces_1.CustomTargetInstruction !== "undefined" && interfaces_1.CustomTargetInstruction) === "function" && _b || Object])
], VGridElementRowRepeat);
exports.VGridElementRowRepeat = VGridElementRowRepeat;
var _a, _b;
//# sourceMappingURL=v-grid-row-repeat.js.map
});
___scope___.file("grid/styles/cellsAndLabels.css", function(exports, require, module, __filename, __dirname){ 

__fsbx_css("grid/styles/cellsAndLabels.css", "/*here we can have utility classes the users can use to simply fy use, and that we can use with future markup generator*/\n\n.avg-default .avg-header-input-top {\n  box-sizing: border-box;\n  border: 0;\n  border-bottom: 1px solid rgb(230, 230, 230) !important;\n  border-radius: initial;\n  box-shadow: initial;\n  height: 50% !important;\n  width: 100%;\n  background-color: white !important;\n  padding: 5px 10px;\n  margin: initial !important;\n  transition: initial !important;\n}\n\n.avg-default .avg-header-input-bottom {\n  box-sizing: border-box;\n  border: 0;\n  border-radius: initial;\n  box-shadow: initial;\n  border-top: 1px solid rgb(230, 230, 230) !important;\n  height: 50% !important;\n  width: 100%;\n  background-color: white !important;\n  padding: 5px 10px;\n  margin: initial !important;\n  transition: initial !important;\n}\n\n.avg-default .avg-row-checkbox-100 {\n  height: 100% !important;\n  width: initial;\n  left: initial !important;\n  position: initial !important;\n  display: block;\n  opacity: initial !important;\n  margin: auto !important;\n}\n\n.avg-default .avg-row-checkbox-50 {\n  height: 50% !important;\n  width: initial;\n  opacity: initial;\n  left: initial !important;\n  position: initial !important;\n  display: block;\n  margin: auto !important;\n}\n\n.avg-default .avg-row-input {\n  box-sizing: border-box;\n  border: 0;\n  border-radius: initial;\n  box-shadow: initial;\n  height: 100% !important;\n  width: 100%;\n  background-color: transparent;\n  padding: 5px 10px !important;\n}\n\n.avg-default .avg-image-round {\n  border-radius: 50%;\n  height: 100%;\n  box-sizing: border-box;\n  position: relative;\n  left: 50%;\n  transform: translateX(-50%);\n  padding-top: 5px;\n}\n\n.avg-default .avg-label-bottom {\n  box-sizing: border-box;\n  border: 0;\n  border-radius: initial;\n  box-shadow: initial;\n  height: 50%;\n  width: 100%;\n  position: relative;\n  margin: 0 !important;\n  padding-top: 5px;\n  text-align: center;\n  overflow: hidden;\n}\n\n.avg-default .avg-label-top {\n  box-sizing: border-box;\n  border: 0;\n  border-radius: initial;\n  box-shadow: initial;\n  height: 50%;\n  width: 100%;\n  position: relative;\n  margin: 0 !important;\n  padding-top: 5px;\n  text-align: center;\n  overflow: hidden;\n}\n\n/*.avg-default .avg-label-top p {\n  margin: 0 !important;\n}\n\n.avg-default .avg-label-bottom p {\n  margin: 0 !important;\n}*/\n\n.avg-default .avg-label-full {\n  box-sizing: border-box;\n  border: 0;\n  border-radius: initial;\n  box-shadow: initial;\n  height: 100%;\n  width: 100%;\n  position: relative;\n  margin: 0 !important;\n  padding-top: 5px;\n  text-align: center;\n}\n");
});
___scope___.file("grid/styles/contextmenu.css", function(exports, require, module, __filename, __dirname){ 

__fsbx_css("grid/styles/contextmenu.css", ".avg-default.avg-menu {\n  position: absolute;\n  z-index: 10;\n  background-color: rgb(240, 240, 240);\n  min-width: 170px;\n}\n\n.avg-default .avg-menu--active {\n  display: block;\n}\n\n.avg-default .avg-menu__items {\n  padding-left: 0;\n  padding-bottom: 3px;\n}\n\n.avg-default .avg-menu__item {\n  list-style: none;\n}\n\n.avg-default .avg-menu__item p {\n  margin: 0 0 0 10px;\n}\n\n.avg-default .avg-menu__item:hover {\n  border-left: 6px solid grey;\n  background-color: lightcyan\n}\n");
});
___scope___.file("grid/styles/dragAndResize.css", function(exports, require, module, __filename, __dirname){ 

__fsbx_css("grid/styles/dragAndResize.css", ".avg-default .avg-draggable-handler {\n  position: absolute;\n  cursor: w-resize;\n  width: 15px;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  z-index: 900;\n}\n\n.avg-default .avg-vGridDragHandle {\n  cursor: move;\n}\n\n.avg-default.avg-drag {\n  border: 1px solid rgb(230, 230, 230);\n  box-sizing: border-box;\n  box-shadow: initial;\n  line-height: 50%;\n  pointer-events: none;\n  background-color: rgb(240, 240, 240);\n  height: 25px;\n  min-width: 100px;\n  position: absolute;\n  padding-top: 5px;\n  text-align: center;\n}\n");
});
___scope___.file("grid/styles/grouping.css", function(exports, require, module, __filename, __dirname){ 

__fsbx_css("grid/styles/grouping.css", ".avg-default .avg-grouping {\n  background-color: rgb(240, 240, 240);\n  position: relative;\n  margin: 3px;\n  height: 80%;\n  box-sizing: border-box;\n  padding-left: 10px;\n  padding-right: 10px;\n  display: block;\n  float: left;\n  border: 1px solid rgb(230, 230, 230);\n}\n\n.avg-default .avg-colunHelper {\n  top: 0;\n  width: 2px;\n  left: 0;\n  height: 100%;\n  box-sizing: border-box;\n  position: absolute;\n}\n\n.avg-default .avg-group-full {\n  border: 1px solid rgb(230, 230, 230);\n  box-sizing: border-box;\n  box-shadow: initial;\n  line-height: 50%;\n  background-color: rgb(240, 240, 240);\n  margin: 3px;\n  height: 80%;\n  position: relative;\n  float: left;\n  padding-top: 5px;\n}\n\n.avg-default .avg-grouping-element {\n  box-sizing: border-box;\n  border: 0;\n  border-radius: initial;\n  box-shadow: initial;\n  height: 100%;\n  width: 100%;\n  position: relative;\n  margin: 0 !important;\n  display: flex;\n  text-align: center;\n}\n");
});
___scope___.file("grid/styles/icons.css", function(exports, require, module, __filename, __dirname){ 

__fsbx_css("grid/styles/icons.css", "\n.avg-default .avg-fa-sort-number[data-vgridsort]:after {\n  font: x-small;\n  font-size: 8px;\n  content: attr(data-vgridsort);\n}\n\n\n.avg-default .icon {\n  /* Lets the icon inherit the text color. */\n  fill: currentColor;\n\n  /* Inherit the text’s size too. Also allows sizing\n     the icon by changing its font-size. */\n  width: 1em;\n  height: 1em;\n\n  /* Nice visual alignment for icons alongside text.\n     (I got a few questions about this and: with most\n     fonts and styles, this works better than just\n     vertical-align:middle. Try it and see what you\n     like best. */\n  vertical-align: -0.15em;\n\n  /* Paths and strokes that overflow the viewBox can\n     show in IE. If you use normalize.css, it already\n     sets this. */\n  overflow: hidden;\n}\n\n.avg-default .iconhidden{\n  display:none\n}\n\n.avg-grouping:hover .iconhidden { display:block; }\n    \n\n \n");
});
___scope___.file("grid/styles/loader.css", function(exports, require, module, __filename, __dirname){ 

__fsbx_css("grid/styles/loader.css", ".avg-default .avg-overlay {\n  position: absolute;\n  left: 0;\n  top: 0;\n  min-width: 100%;\n  min-height: 100%;\n  height: 100%;\n  width: 100%;\n  z-index: 9999 !important;\n  background: rgba(0, 0, 0, 0.3);\n  color: black;\n}\n\n.avg-default .avg-progress-indicator {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  z-index: 10000;\n  transform: translate(-50%, -50%);\n  width: 150px;\n  background-color: gray;\n}\n\n.avg-default .avg-progress-bar {\n  -webkit-animation: progress-bar-stripes 2s linear infinite;\n  -o-animation: progress-bar-stripes 2s linear infinite;\n  animation: progress-bar-stripes 2s linear infinite;\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  -webkit-background-size: 40px 40px;\n  background-size: 40px 40px;\n  color: black;\n  text-align: center;\n}\n");
});
___scope___.file("grid/styles/main-element-tags.css", function(exports, require, module, __filename, __dirname){ 

__fsbx_css("grid/styles/main-element-tags.css", "/*here is the main tag css, keeping them here, so theming will be easier */\n\nv-grid {\n  display: block;\n  position: relative;\n}\n\navg-top-panel {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  top: 0;\n}\n\navg-footer {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  bottom: 0;\n}\n\navg-header {\n  position: absolute;\n  box-sizing: border-box;\n  display: inline-block;\n  width: 100%;\n}\n\navg-content {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n}\n\navg-header-left {\n  position: absolute;\n  box-sizing: border-box;\n  height: 100%;\n}\n\navg-header-main {\n  position: absolute;\n  box-sizing: border-box;\n  height: 100%;\n  overflow: hidden;\n}\n\navg-header-main-scroll {\n  position: absolute;\n  box-sizing: border-box;\n  height: 100%;\n}\n\n\navg-header-right {\n  position: absolute;\n  box-sizing: border-box;\n  height: 100%;\n}\n\navg-content-left {\n  z-index:5;\n  position: absolute;\n  box-sizing: border-box;\n  height: 100%;\n  overflow: hidden;\n  overflow-y: hidden;\n}\n\n\navg-content-left-scroll {\n  position: absolute;\n  box-sizing: border-box;\n}\n\navg-content-main {\n  z-index:6;\n  position: absolute;\n  box-sizing: border-box;\n  height: 100%;\n  overflow: hidden;\n  overflow-x: hidden;\n  overflow-y: hidden;\n}\n\navg-content-main-scroll {\n  position: absolute;\n  box-sizing: border-box;\n}\n\navg-content-right {\n  z-index:7;\n  position: absolute;\n  box-sizing: border-box;\n  height: 100%;\n  overflow: hidden;\n  overflow-y: hidden;\n}\n\n\n\navg-content-right-scroll {\n  position: absolute;\n  box-sizing: border-box;\n}\n\navg-content-group {\n  position: absolute;\n  box-sizing: border-box;\n  overflow-x: hidden;\n  overflow-y: hidden;\n}\n\navg-content-group-scroll {\n  z-index: 9;\n  pointer-events: none;\n  position: absolute;\n  box-sizing: border-box;\n}\n\navg-content-vhandle {\n  z-index: 10;\n  position: absolute;\n  box-sizing: border-box;\n  overflow-x: hidden;\n  overflow-y: scroll;\n}\n\navg-content-vhandle-scroll {\n  position: absolute;\n  box-sizing: border-box;\n}\n\n\n\navg-content-hhandle {\n  z-index:10;\n  position: absolute;\n  box-sizing: border-box;\n  overflow-x: scroll;\n  overflow-y: hidden;\n}\n\navg-content-hhandle-scroll {\n  position: absolute;\n  box-sizing: border-box;\n}\n\navg-row {\n  width: 100%;\n  min-width: 1px; /*without this left scrolltop will not be set when hidden*/\n  position: absolute;\n}\n\navg-col {\n  position: absolute;\n  height: 100%;\n}\n");
});
___scope___.file("grid/styles/main-elements.css", function(exports, require, module, __filename, __dirname){ 

__fsbx_css("grid/styles/main-elements.css", "﻿.avg-default {\n  border: 1px solid rgb(230, 230, 230);\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.avg-default .avg-top-panel {\n  border-bottom: 1px solid rgb(230, 230, 230);\n  background-color: rgb(240, 240, 240);\n}\n\n.avg-default .avg-header {\n  border-bottom: 1px solid rgb(230, 230, 230);\n}\n\n.avg-default .avg-footer {\n  border-top: 1px solid rgb(230, 230, 230);\n  background-color: rgb(240, 240, 240);\n}\n\n.avg-default .avg-content-right {\n  background-color: white;\n  border-top: 1px solid rgb(230, 230, 230);\n}\n\n.avg-default .avg-content-left {\n  background-color: white;\n  border-top: 1px solid rgb(230, 230, 230);\n}\n\n.avg-default .avg-header-main {\n  background-color: rgb(240, 240, 240);\n}\n\n.avg-default .avg-header-left {\n  background-color: rgb(240, 240, 240);\n}\n\n.avg-default .avg-header-right {\n  background-color: rgb(240, 240, 240);\n}\n\n.avg-default .avg-content-main {\n  background-color: white;\n  border-top: 1px solid rgb(230, 230, 230);\n}\n\n.avg-default .avg-row {\n  border-bottom: 1px solid rgb(230, 230, 230);\n}\n\n.avg-default .avg-header-left .avg-col {\n  /*white-space: nowrap;*/\n  box-sizing: border-box;\n  text-overflow: ellipsis;\n  border-right: 1px solid rgb(230, 230, 230);\n  overflow: hidden;\n}\n\n.avg-default .avg-header-main .avg-col {\n  /*white-space: nowrap;*/\n  box-sizing: border-box;\n  text-overflow: ellipsis;\n  border-right: 1px solid rgb(230, 230, 230);\n  overflow: hidden;\n}\n\n.avg-default .avg-header-right .avg-col {\n  box-sizing: border-box;\n  border-left: 1px solid rgb(230, 230, 230);\n}\n\n.avg-default .avg-content-left .avg-col {\n  white-space: nowrap;\n  box-sizing: border-box;\n  text-overflow: ellipsis;\n  border-right: 1px solid rgb(230, 230, 230);\n  overflow: hidden;\n}\n\n.avg-default .avg-content-main .avg-col {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  border-right: 1px solid rgb(230, 230, 230);\n  overflow: hidden;\n}\n\n.avg-default .avg-content-right .avg-col {\n  border-left: 1px solid rgb(230, 230, 230);\n}\n\n.avg-default .avg-col-group {\n  pointer-events: all;\n  box-sizing: border-box;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  background-color: rgb(250, 250, 250);\n  border-top: 1px solid rgb(230, 230, 230);\n  padding: 5px 10px;\n}\n\n.avg-default .avg-col-grouping {\n  white-space: nowrap;\n  box-sizing: border-box;\n  text-overflow: ellipsis;\n  background-color: rgb(250, 250, 250);\n  border-right: 1px solid rgb(230, 230, 230);\n  overflow: hidden;\n}\n\n.avg-default .avg-col-grouping-header {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  background-color: rgb(240, 240, 240);\n  border-right: 1px solid rgb(230, 230, 230);\n  overflow: hidden;\n}\n\n.avg-default .avg-selected-row {\n  box-shadow: none;\n  background-color: rgb(203, 195, 203);\n}\n");
});
});
FuseBox.global("__fsbx_decorate", function(localArguments) {
    return function(decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;

        if (!decorators) {
            return;
        }
        if (decorators && decorators.push) {
            decorators.push(
                __metadata("fusebox:exports", localArguments[0]),
                __metadata("fusebox:require", localArguments[1]),
                __metadata("fusebox:module", localArguments[2]),
                __metadata("fusebox:__filename", localArguments[3]),
                __metadata("fusebox:__dirname", localArguments[4])
            )
        }
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
});

FuseBox.global("__metadata", function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
});
FuseBox.expose([{"alias":"aurelia-v-grid","pkg":"aurelia-v-grid/index.js"}]);
FuseBox.main("aurelia-v-grid/index.js");
FuseBox.defaultPackageName = "aurelia-v-grid";
})
(function(e){var r="undefined"!=typeof window&&window.navigator;r&&(window.global=window),e=r&&"undefined"==typeof __fbx__dnm__?e:module.exports;var n=r?window.__fsbx__=window.__fsbx__||{}:global.$fsbx=global.$fsbx||{};r||(global.require=require);var t=n.p=n.p||{},i=n.e=n.e||{},a=function(e){var r=e.charCodeAt(0);if(r>=97&&r<=122||64===r){if(64===r){var n=e.split("/"),t=n.splice(2,n.length).join("/");return[n[0]+"/"+n[1],t||void 0]}var i=e.indexOf("/");if(i===-1)return[e];var a=e.substring(0,i),o=e.substring(i+1);return[a,o]}},o=function(e){return e.substring(0,e.lastIndexOf("/"))||"./"},f=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var n=[],t=0,i=arguments.length;t<i;t++)n=n.concat(arguments[t].split("/"));for(var a=[],t=0,i=n.length;t<i;t++){var o=n[t];o&&"."!==o&&(".."===o?a.pop():a.push(o))}return""===n[0]&&a.unshift(""),a.join("/")||(a.length?"/":".")},u=function(e){var r=e.match(/\.(\w{1,})$/);if(r){var n=r[1];return n?e:e+".js"}return e+".js"},s=function(e){if(r){var n,t=document,i=t.getElementsByTagName("head")[0];/\.css$/.test(e)?(n=t.createElement("link"),n.rel="stylesheet",n.type="text/css",n.href=e):(n=t.createElement("script"),n.type="text/javascript",n.src=e,n.async=!0),i.insertBefore(n,i.firstChild)}},l=function(e,r){for(var n in e)e.hasOwnProperty(n)&&r(n,e[n])},c=function(e,n){var i=n.path||"./",o=n.pkg||"default",s=a(e);s&&(i="./",o=s[0],n.v&&n.v[o]&&(o=o+"@"+n.v[o]),e=s[1]),e&&126===e.charCodeAt(0)&&(e=e.slice(2,e.length),i="./");var l=t[o];if(!l){if(r)throw'Package was not found "'+o+'"';return{serverReference:require(o)}}e||(e="./"+l.s.entry);var c,v=f(i,e),p=u(v),d=l.f[p];return!d&&p.indexOf("*")>-1&&(c=p),d||c||(p=f(v,"/","index.js"),d=l.f[p],d||(p=v+".js",d=l.f[p]),d||(d=l.f[v+".jsx"])),{file:d,wildcard:c,pkgName:o,versions:l.v,filePath:v,validPath:p}},v=function(e,n){if(!r)return n(/\.(js|json)$/.test(e)?global.require(e):"");var t;t=new XMLHttpRequest,t.onreadystatechange=function(){if(4==t.readyState)if(200==t.status){var r=t.getResponseHeader("Content-Type"),i=t.responseText;/json/.test(r)?i="module.exports = "+i:/javascript/.test(r)||(i="module.exports = "+JSON.stringify(i));var a=f("./",e);g.dynamic(a,i),n(g.import(e,{}))}else console.error(e+" was not found upon request"),n(void 0)},t.open("GET",e,!0),t.send()},p=function(e,r){var n=i[e];if(n)for(var t in n){var a=n[t].apply(null,r);if(a===!1)return!1}},d=function(e,n){if(void 0===n&&(n={}),58===e.charCodeAt(4)||58===e.charCodeAt(5))return s(e);var i=c(e,n);if(i.serverReference)return i.serverReference;var a=i.file;if(i.wildcard){var f=new RegExp(i.wildcard.replace(/\*/g,"@").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&").replace(/@/g,"[a-z0-9$_-]+"),"i"),u=t[i.pkgName];if(u){var l={};for(var g in u.f)f.test(g)&&(l[g]=d(i.pkgName+"/"+g));return l}}if(!a){var m="function"==typeof n,h=p("async",[e,n]);if(h===!1)return;return v(e,function(e){if(m)return n(e)})}var _=i.validPath,x=i.pkgName;if(a.locals&&a.locals.module)return a.locals.module.exports;var w=a.locals={},y=o(_);w.exports={},w.module={exports:w.exports},w.require=function(e,r){return d(e,{pkg:x,path:y,v:i.versions})},w.require.main={filename:r?"./":global.require.main.filename,paths:r?[]:global.require.main.paths};var b=[w.module.exports,w.require,w.module,_,y,x];p("before-import",b);var k=a.fn;return k.apply(0,b),p("after-import",b),w.module.exports},g=function(){function n(){}return n.global=function(e,n){var t=r?window:global;return void 0===n?t[e]:void(t[e]=n)},n.import=function(e,r){return d(e,r)},n.on=function(e,r){i[e]=i[e]||[],i[e].push(r)},n.exists=function(e){try{var r=c(e,{});return void 0!==r.file}catch(e){return!1}},n.remove=function(e){var r=c(e,{}),n=t[r.pkgName];n&&n.f[r.validPath]&&delete n.f[r.validPath]},n.main=function(e){return this.mainFile=e,n.import(e,{})},n.expose=function(r){var n=function(n){var t=r[n],i=t.alias,a=d(t.pkg);"*"===i?l(a,function(r,n){return e[r]=n}):"object"==typeof i?l(i,function(r,n){return e[n]=a[r]}):e[i]=a};for(var t in r)n(t)},n.dynamic=function(r,n,t){var i=t&&t.pkg||"default";this.pkg(i,{},function(t){t.file(r,function(r,t,i,a,o){var f=new Function("__fbx__dnm__","exports","require","module","__filename","__dirname","__root__",n);f(!0,r,t,i,a,o,e)})})},n.flush=function(e){var r=t.default;for(var n in r.f){var i=!e||e(n);if(i){var a=r.f[n];delete a.locals}}},n.pkg=function(e,r,n){if(t[e])return n(t[e].s);var i=t[e]={},a=i.f={};i.v=r;var o=i.s={file:function(e,r){a[e]={fn:r}}};return n(o)},n.addPlugin=function(e){this.plugins.push(e)},n}();return g.packages=t,g.isBrowser=void 0!==r,g.isServer=!r,g.plugins=[],e.FuseBox=g}(this))