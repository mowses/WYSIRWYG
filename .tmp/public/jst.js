this["JST"] = this["JST"] || {};

this["JST"]["assets/templates/Directives/Component.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="template"></div>';

}
return __p
};

this["JST"]["assets/templates/Directives/EditableArea.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<bounding-box draggable="draggable" resizable="resizable" ng-mousedown="toggleCtrlBB($event);">\n\t\n\t<div class="theme-switcher">\n\t    <label>\n\t        Theme:\n\t        <select ng-options="theme as theme for theme in data.themes" ng-model="slide.selectedTheme">\n\t            <option value="">--no theme--</option>\n\t        </select>\n\t    </label>\n\t</div>\n\n    <div ng-include="\'/templates/Directives/Component.html\'" onload="parseTemplate();"></div>\n</bounding-box>';

}
return __p
};