/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'styles/reset.css',
  'js/libraries/jQuery.ui/jquery-ui.structure.min.css',
  'js/libraries/jQuery.ui/jquery-ui.theme.min.css',

  'js/libraries/ionic/css/ionic.css',

  'styles/WYSIRWYG/main.css',

  'styles/editor/*.css',
  'styles/editor/**/*.css',
  'styles/WYSIRWYG/*.css',
  'styles/WYSIRWYG/directives/*.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [
  
  // Load sails.io before everything else
  //'js/dependencies/sails.io.js',

  // Dependencies like jQuery, or Angular are brought in here
  //'js/dependencies/**/*.js',

  'js/libraries/jQuery/jquery-2.1.1.js',
  'js/libraries/jQuery.ui/jquery-ui.js',
  //'js/libraries/angular/angular.js',
  'js/libraries/ionic/js/ionic.bundle.min.js',
  'js/libraries/Events/Events.js',
  'js/libraries/ObjDiff/ObjDiff.js',
  'js/libraries/ObserverCore/ObserverCore.js',
  'js/ngModelUtils.js',
  'js/libraries/JSS/jss.js',
  'js/libraries/jquery-ui.ruler-master/jqueryui-ruler/js/jquery.ui.ruler.js',

  // ace code editor
  'js/libraries/ace-code-editor/ace.js',
  //'js/libraries/ace-code-editor/mode-html.js',
  //'js/libraries/ace-code-editor/mode-javascript.js',
  //'js/libraries/ace-code-editor/mode-json.js',
  //'js/libraries/ace-code-editor/mode-html.js',
  // angular ace code editor directive
  'js/libraries/ui-ace-0.2.3/ui-ace.js',

  'js/libraries/WYSIRWYG/WYSIRWYG.js',
  'js/libraries/WYSIRWYG/Component.js',

  // filter files
  'js/WYSIRWYG/filters/debug.js',
  'js/WYSIRWYG/filters/css.js',
  'js/WYSIRWYG/filters/trustAsHtml.js',

  // controller files
  'js/WYSIRWYG/modules/Editor/EditorController.js',
  'js/WYSIRWYG/modules/Editor/RawController.js',

  // components files
  'js/WYSIRWYG/components/Foolish/controller.js',
  'js/WYSIRWYG/components/ResultBox/controller.js',
  'js/WYSIRWYG/components/Searcher/controller.js',
  'js/WYSIRWYG/components/module.js',  // after all components

  'js/WYSIRWYG/directives/Grid.js',
  'js/WYSIRWYG/directives/Ruler.js',
  'js/WYSIRWYG/directives/BoundingBox.js',
  'js/WYSIRWYG/directives/Component.js',
  'js/WYSIRWYG/directives/i18n.js',
  'js/WYSIRWYG/directives/Data.js',
  'js/WYSIRWYG/directives/EditableArea.js',
  'js/WYSIRWYG/directives/ElementScopeWatcher.js',
  //'js/WYSIRWYG/directives/Selectable.js',
  //'js/WYSIRWYG/directives/Sortable.js',
  'js/WYSIRWYG/directives/Draggable.js',
  'js/WYSIRWYG/directives/Resizable.js',
  'js/WYSIRWYG/App.js'

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  // 'js/**/*.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});
