'use strict';



;define("emberjs-tutorial/adapters/-json-api", ["exports", "@ember-data/adapter/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/adapter/json-api"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/adapters/application", ["exports", "@ember-data/adapter/rest"], function (_exports, _rest) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember-data/adapter/rest"eaimeta@70e063a35619d71f

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class ApplicationAdapter extends _rest.default {
    constructor() {
      super(...arguments);

      _defineProperty(this, "namespace", 'api');
    }

    buildURL() {
      return `${super.buildURL(...arguments)}.json`;
    }

  }

  _exports.default = ApplicationAdapter;
});
;define("emberjs-tutorial/adapters/tableManager", [], function () {
  "use strict";

  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f

  /**
  
  jQuery Plugin
  Name: tableManager
  Version: 1.1.0
  Author: Pietrantonio Alessandro (Stone)
  Author's website: http://www.stonewebdesign.it
  
  @-- What's new --@
  
  1) 
      New classes to the table: tablePagination, tableFilterBy;
  
  2)
      New class to the th element: disableFilterBy;
  
  3)
      New option to disable filter on one or more column: disableFilterBy: []
  
  @-- Usage --@
  
  Important! This plugin NEED jQuery library to work. As a matter of fact it's a jQuery plugin.
  
  Minimum requirements:
  -   jQuery library
  
  1)
      To include jQuery library download it from jQuery site and put the .js file into your site folders, then put this line into your document:
      <script type="text/javascript" src="PATH_TO_YOUR_FILE/jquery-VERSION_NUMBER.min.js"></script>
      Alternatively you can include it without download it, just like this:
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
  2)
      Include this plugin just like this: download it and put the .js file into your site folders, then write this line into your document:
      <script type="text/javascript" src="PATH_TO_YOUR_FILE/tableManager.js"></script>
      Important! REMEMBER: THIS LINE HAVE TO BE AFTER JQUERY INCLUDING LINE!
  
  
  If you want you can customize this plugin as you prefer and need just with the following options.
  Options:
  
      debug = (boolean) can be true or false or not set. It activates debug mode and show messages into browser console.
  
      firstSort = can be an array of integer, or just a single integer. The first parameter determines the number of column to start sorting, the second parameter determines the order (asc or 0 = ascending, desc or 1 = descending). Ex.:
          firstSort : [[1,'asc']] --> the table is sorted by first column (first parameter = 1), by ascending order (second parameter = 0).
  
      disable = this option is used to disable one or more columns and expect one parameter per column. The parameter can be an integer or, to disable last column, -1 or the word "last". Ex.:
          disable : [3] --> disable sorting on third column
  
      appendFilterby = (boolean) used to add a filter on top of the table. The filter will be composed by one select to select by which column to filter and an input text to filter typing. Ex.:
          appendFilterby : true
  
      dateFormat = used to indicate column and dateformat. It helps to sort by date which is formatted like dd-mm-yyyy or mmddyyyy. The first parameter is the column, the second parameter is date format. Ex.:
          dateFormat : [[3, 'dd-mm-yyyy']] --> the third column is date and it's formatted like dd-mm-yyyy
  
      pagination = true or false or not set. It permits to paginate table and append controllers under the table. Ex.:
          pagination : true --> enable pagination tool
  
      showrows = you can append to table a select by which you can select number of rows to show. It must be an array of numbers. Ex.:
          showrows : [10,100,1000] --> you can choose to show 10, 100, 1000 rows
  
      vocabulary = used to translate labels. The following are accepted labels:
          voc_filter_by
          voc_type_here_filter
  
      disableFilterBy = used to disable filter by specific columns. It must be an array of numbers. To disable filter by last column you can use "last". Ex.:
          disableFilterBy: [1, "last"] --> it disable filter by first and last column
  
  Classes:
  
      (th)        disableSort = disable that specific column
                  disableFilterBy = disable filter for that specific column
  
      (table)     tablePagination = append pagination elements to table
                  tableFilterBy = append filter tool to table
  
  Data- attributes:
  
      data-tablemanager =
          'disable' --> disable that specific column
  
          '{"dateFormat":"dd-mm-yyyy"}' --> this secific column represent a date with the forma tdd-mm-yyyy (Important! To pass correctly this data attribute the attribute value has to be written between '' and attribute single elements like dateFormat or mm-dd-yyyy between "")
  
  
  Important! Do not edit this plugin if you're not sure you're doing it right. The Author is not responsible for any malfunctions caused by the end User.
  
  **/
  (function ($) {
    /* Initialize function */
    $.fn.tablemanager = function () {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      /**
      Get common variables, parts of tables and others utilities
      **/
      var Table = $(this),
          Heads = $(this).find("thead th"),
          tbody = $(this).find("tbody"),
          rows = $(this).find("tbody tr"),
          rlen = rows.length,
          arr = [],
          cells,
          clen;
      /**
      Options default values
      **/

      var firstSort = [[0, 0]],
          dateColumn = [],
          dateFormat = [],
          disableFilterBy = [];
      /**
      Debug value true or false
      **/

      var debug = false;
      var debug = options !== null && options.debug == true ? true : false;
      /**
      Set pagination true or false
      **/

      var pagination = false;
      pagination = options !== null && options.pagination == true ? true : false; // default pagination variables

      var currentPage = 0;
      var numPerPage = pagination !== true && showrows_option !== true ? rows.length : 5;
      var numOfPages = options.numOfPages !== undefined && options.numOfPages > 0 ? options.numOfPages : 5;
      /**
      Set default show rows list or set if option is set
      **/

      var showrows = [5, 10, 50];
      showrows = options !== null && options.showrows != "" && typeof options.showrows !== undefined && options.showrows !== undefined ? options.showrows : showrows;
      /**
      Default labels translations
      **/

      var voc_filter_by = "Filter by",
          voc_type_here_filter = "Type here to filter...",
          voc_show_rows = "Show rows";
      /**
      Available options:
      **/

      var availableOptions = new Array();
      availableOptions = ["debug", "firstSort", "disable", "appendFilterby", "dateFormat", "pagination", "showrows", "vocabulary", "disableFilterBy", "numOfPages"]; // debug
      // make array form options object

      arrayOptions = $.map(options, function (value, index) {
        return [index];
      });

      for (i = 0; i < arrayOptions.length; i++) {
        // check if options are in available options array
        if (availableOptions.indexOf(arrayOptions[i]) === -1) {
          if (debug) {
            cLog("Error! " + arrayOptions[i] + " is unavailable option.");
          }
        }
      }
      /**
      Get options if set
      **/


      if (options !== null) {
        /**
        Check options vocabulary
        **/
        if (options.vocabulary != "" && typeof options.vocabulary !== undefined && options.vocabulary !== undefined) {
          // Check every single label
          voc_filter_by = options.vocabulary.voc_filter_by != "" && options.vocabulary.voc_filter_by !== undefined ? options.vocabulary.voc_filter_by : voc_filter_by;
          voc_type_here_filter = options.vocabulary.voc_type_here_filter != "" && options.vocabulary.voc_type_here_filter !== undefined ? options.vocabulary.voc_type_here_filter : voc_type_here_filter;
          voc_show_rows = options.vocabulary.voc_show_rows != "" && options.vocabulary.voc_show_rows !== undefined ? options.vocabulary.voc_show_rows : voc_show_rows;
        }
        /**
        Option disable
        **/


        if (options.disable != "" && typeof options.disable !== undefined && options.disable !== undefined) {
          for (var i = 0; i < options.disable.length; i++) {
            // check if should be disabled last column
            col = options.disable[i] == -1 || options.disable[i] == "last" ? Heads.length : options.disable[i] == "first" ? 1 : options.disable[i];
            Heads.eq(col - 1).addClass("disableSort").removeClass("sortingAsc").removeClass("sortingDesc"); // debug

            if (isNaN(col - 1)) {
              if (debug) {
                cLog('Error! Check your "disable" option.');
              }
            }
          }
        }
        /**
        Option select number of rows to show
        **/


        var showrows_option = false;

        if (options.showrows != "" && typeof options.showrows !== undefined && options.showrows !== undefined) {
          showrows_option = true; // div num rows

          var numrowsDiv = '<div id="for_numrows" class="for_numrows" style="display: inline;"><label for="numrows">' + translate(voc_show_rows) + ': </label><select id="numrows"></select></div>'; // append div to choose num rows to show

          Table.before(numrowsDiv); // get show rows options and append select to its div

          for (i = 0; i < showrows.length; i++) {
            $("select#numrows").append($("<option>", {
              value: showrows[i],
              text: showrows[i]
            })); // debug

            if (isNaN(showrows[i])) {
              if (debug) {
                cLog('Error! One of your "show rows" options is not a number.');
              }
            }
          }

          var selectNumRowsVal = $("select#numrows").val();
          numPerPage = selectNumRowsVal; // on select num rows change get value and call function

          $("select#numrows").on("change", function () {
            selectNumRowsVal = $(this).val(); // reset current page to show always first page if select change

            currentPage = 0;
            generatePaginationValues();
          });
        }
        /**
        Pagination
        **/


        if (pagination === true || Table.hasClass("tablePagination")) {
          var numPages = Math.ceil(rows.length / numPerPage); // append num pages on bottom

          var pagesDiv = '<div id="pagesControllers" class="pagesControllers"></div>';
          Table.after(pagesDiv); // Showrows option and append
          // If showrows is set get select val

          if (showrows_option !== true) {
            var selectNumRowsVal = numPerPage;
          }

          generatePaginationValues();
        }
        /**
        Check if disable filter by is empty or undefined
        **/


        if (options.disableFilterBy != "" && typeof options.disableFilterBy !== undefined && options.disableFilterBy !== undefined) {
          for (var i = 0; i < options.disableFilterBy.length; i++) {
            // check if should be disabled last column
            col = options.disableFilterBy[i] == -1 || options.disableFilterBy[i] == "last" ? Heads.length : options.disableFilterBy[i] == "first" ? 1 : options.disableFilterBy[i];
            Heads.eq(col - 1).addClass("disableFilterBy"); // debug

            if (isNaN(col - 1)) {
              if (debug) {
                cLog('Error! Check your "disableFilterBy" option.');
              }
            }
          }
        }
        /**
        Append filter option
        **/


        if (options.appendFilterby === true || Table.hasClass("tableFilterBy")) {
          // Create div and select to filter
          var filterbyDiv = '<div id="for_filter_by" class="for_filter_by" style="display: inline;"><label for="filter_by">' + translate(voc_filter_by) + ': </label><select id="filter_by"></select> <input id="filter_input" type="text" placeholder="' + translate(voc_type_here_filter) + '"></div>';
          $(this).before(filterbyDiv); // Populate select with every th text and as value use column number

          $(Heads).each(function (i) {
            if (!$(this).hasClass("disableFilterBy")) {
              $("select#filter_by").append($("<option>", {
                value: i,
                text: $(this).text()
              }));
            }
          }); // Filter on typing selecting column by select #filter_by

          $("input#filter_input").on("keyup", function () {
            var val = $.trim($(this).val()).replace(/ +/g, " ").toLowerCase();
            var select_by = $("select#filter_by").val();
            Table.find("tbody tr").show().filter(function () {
              // search into column selected by #filter_by
              var text = $(this).find("td:eq(" + select_by + ")").text().replace(/\s+/g, " ").toLowerCase();
              return !~text.indexOf(val);
            }).hide();
            if (val == '') paginate();
          });
        }
        /**
        Date format option
        **/


        if (options.dateFormat != "" && typeof options.dateFormat !== undefined && options.dateFormat !== undefined) {
          for (i = 0; i < options.dateFormat.length; i++) {
            dateColumn.push(options.dateFormat[i][0] - 1);
            dateFormat.push([options.dateFormat[i][0] - 1, options.dateFormat[i][1]]);
          } // check if column has table manager data attribute


          Heads.each(function (col) {
            if ($(this).data("tablemanager") && $(this).data("tablemanager").dateFormat !== undefined) {
              var dateF = $(this).data("tablemanager").dateFormat;
              dateColumn.push(col);
              dateFormat.push([col, dateF]);
            }
          });
        }
        /**
        Check if first element to sort is empty or undefined
        **/


        if (options.firstSort != "" && typeof options.firstSort !== undefined && options.firstSort !== undefined) {
          var firstSortColumn = [];
          var firstSortRules = options.firstSort;
          var firstSortOrder = [];

          for (i = 0; i < options.firstSort.length; i++) {
            firstSortColumn.push(options.firstSort[i][0]);
            firstSortOrder.push(options.firstSort[i][1]);
          }

          TableSort(firstSortRules);
        }
      }

      if (debug) {
        cLog("Options set:", options);
      }
      /**
      Detect theads click and sort by that column
      **/


      Heads.each(function (n) {
        // check if has class disableSort or has data-attribute = disable
        var disable = $(this).data("tablemanager") === "disable" ? true : $(this).hasClass("disableSort") ? true : false;

        if (!disable === true) {
          $(this).on("click", function () {
            if ($(this).hasClass("sortingAsc")) {
              $(Heads).removeClass("sortingAsc").removeClass("sortingDesc");
              $(this).addClass("sortingDesc");
              order = 1;
            } else {
              $(Heads).removeClass("sortingDesc").removeClass("sortingAsc");
              $(this).addClass("sortingAsc");
              order = 0;
            } // TableSort(this, n, order);


            var sortRules = [];
            sortRules.push([n + 1, order]);
            TableSort(sortRules);
          });
          $(this).addClass("sorterHeader");
        }
      });
      /**
      Main function: sort table
      rules = array of column, order
      **/

      function TableSort(rules) {
        cellsArray = [];

        for (i = 0; i < rlen; i++) {
          cells = rows[i].cells;
          clen = cells.length;
          cellsArray[i] = [];

          for (j = 0; j < clen; j++) {
            cellsArray[i].push(cells[j].outerHTML);
          }
        } // For each firtsort rule


        var firstSortData = [];

        for (i = 0; i < rules.length; i++) {
          var col = rules[i][0] - 1;
          var thead = Heads.eq(col);
          var order = rules[i][1] == undefined ? 0 : rules[i][1] == 0 || rules[i][1] == "asc" ? 0 : rules[i][1] == 1 || rules[i][1] == "desc" ? 1 : 0; // Manage classes asc and desc

          if (i == 0) {
            var firstClassOrder = order == 0 ? "sortingAsc" : "sortingDesc";
            $(thead).addClass(firstClassOrder);
          }

          asc = order == 0 ? 1 : -1; // if column is date

          if (dateColumn.indexOf(col) != -1) {
            for (j = 0; j < dateFormat.length; j++) {
              if (dateFormat[j][0] == col) {
                var type = "date";
                var format = dateFormat[j][1];
              }
            }
          } else {
            var type = "alphanumeric";
            var format = null;
          }

          firstSortData.push([col, asc, type, format]);
        }

        multipleSortCol(cellsArray, firstSortData);
        appendSortedTable(cellsArray);
      }
      /** 
      Function which sort columns
      array = what have to be sorted
      data = columns, orders (asc and desc), types(alphanum or date), formats (for dates)
      **/


      function multipleSortCol(array, data) {
        var cols = [];
        var orders = [];
        var types = [];
        var formats = [];

        for (i = 0; i < data.length; i++) {
          cols.push(data[i][0]);
          orders.push(data[i][1]);
          types.push(data[i][2]);
          formats.push(data[i][3]);
        }

        array.sort(function (a, b) {
          for (i = 0; i < cols.length; i++) {
            // initialize variables
            var first = "",
                second = "";
            var order = orders[i]; // get inner text from stringified elements

            let firstCol = new DOMParser().parseFromString(a[cols[i]], "text/html").documentElement.textContent;
            let secondCol = new DOMParser().parseFromString(b[cols[i]], "text/html").documentElement.textContent; // If it's last col selected and a = b return 0

            if (i == cols.length && firstCol == secondCol) {
              return 0;
            } // check col type if is aplhpanum or date


            if (types[i] == "alphanumeric") {
              if (firstCol > secondCol) {
                return order;
              } else if (firstCol < secondCol) {
                return -1 * order;
              }
            } else if (types[i] == "date") {
              if (formatDate(formats[i], firstCol) > formatDate(formats[i], secondCol)) {
                return order;
              } else if (formatDate(formats[i], firstCol) < formatDate(formats[i], secondCol)) {
                return -1 * order;
              }
            }
          }
        });
      }
      /**
      Append sorted table
      arr = array with table html
      **/


      function appendSortedTable(arr) {
        // create rows and cells by sorted array
        // for(i = 0; i < rlen; i++){
        //     arr[i] = "<td>"+arr[i].join("</td><td>")+"</td>";
        // };
        // reset tbody
        tbody.html(""); // append new sorted rows

        tbody.html("<tr>" + arr.join("</tr><tr>") + "</tr>"); // then launch paginate function (if options.paginate = false it will not do anything)

        paginate();
      }
      /**
      Format date
      dateFormat = the date format passed by user
      date = date to format
      **/


      function formatDate(dateFormat, date) {
        var $date = date; // debug variable

        var format = 0;

        if (dateFormat == "ddmmyyyy") {
          $date = date.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3$2$1");
          format = 1;
        }

        if (dateFormat == "mmddyyyy") {
          $date = date.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3$1$2");
          format = 1;
        }

        if (dateFormat == "dd-mm-yyyy") {
          $date = date.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3-$2-$1");
          format = 1;
        }

        if (dateFormat == "mm-dd-yyyy") {
          $date = date.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3-$1-$2");
          format = 1;
        }

        if (dateFormat == "dd/mm/yyyy") {
          $date = date.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1");
          format = 1;
        }

        if (dateFormat == "mm/dd/yyyy") {
          $date = date.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$1/$2");
          format = 1;
        } // For debugging


        if (format == 0) {
          if (debug) {
            cLog('Error! Unvalid "date format".');
          }
        }

        return $date;
      }
      /**
      Generate page values: if numrows are selected or not it organize every value needed by pagination function and others
      **/


      function generatePaginationValues() {
        // get first select num rows value
        numPerPage = selectNumRowsVal;
        numPages = Math.ceil(rows.length / numPerPage); // append first controllers for pages

        appendPageControllers(numPages); // Give currentPage class to first page number

        $(".pagecontroller-num").eq(0).addClass("currentPage");
        paginate(currentPage, numPerPage);
        pagecontrollersClick();
        filterPages();
      }
      /**
      Pagination function: reorganize entire table by pages
      curPage = (can be null) current page if it's set
      perPage = (can be null) number of rows per page
      **/


      function paginate() {
        let curPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        let perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        return function (curPage, perPage) {
          var curPage = curPage === null ? currentPage : curPage;
          var perPage = perPage === null ? numPerPage : perPage;
          Table.on("paginating", function () {
            $(this).find("tbody tr").hide().slice(curPage * perPage, (curPage + 1) * perPage).show();
          });
          Table.trigger("paginating");
        }(curPage, perPage);
      }
      /**
      Page controllers append: generate page controllers and append them on bottom of table
      **/


      function appendPageControllers(nPages) {
        // reset div
        $("#pagesControllers").html(""); // First

        $("#pagesControllers").append($("<button>", {
          value: "first",
          text: "<<",
          class: "pagecontroller pagecontroller-f"
        })); // Previous

        $("#pagesControllers").append($("<button>", {
          value: "prev",
          text: "<",
          class: "pagecontroller pagecontroller-p"
        })); // Numbers

        for (i = 1; i <= nPages; i++) {
          $("#pagesControllers").append($("<button>", {
            value: i,
            text: i,
            class: "pagecontroller pagecontroller-num"
          }));
        } // Next


        $("#pagesControllers").append($("<button>", {
          value: "next",
          text: ">",
          class: "pagecontroller pagecontroller-n"
        })); // Last

        $("#pagesControllers").append($("<button>", {
          value: "last",
          text: ">>",
          class: "pagecontroller pagecontroller-l"
        }));
      }
      /**
      Page controllers click: check if pagecontroller has clicked and change page to view
      **/


      function pagecontrollersClick() {
        $(".pagecontroller").on("click", function () {
          // on click on button do something
          if ($(this).val() == "first") {
            currentPage = 0;
            paginate(currentPage, numPerPage);
          } else if ($(this).val() == "last") {
            currentPage = numPages - 1;
            paginate(currentPage, numPerPage);
          } else if ($(this).val() == "prev") {
            if (currentPage != 0) {
              currentPage = currentPage - 1;
              paginate(currentPage, numPerPage);
            }
          } else if ($(this).val() == "next") {
            if (currentPage != numPages - 1) {
              currentPage = currentPage + 1;
              paginate(currentPage, numPerPage);
            }
          } else {
            currentPage = $(this).val() - 1;
            paginate(currentPage, numPerPage);
          } // Reset class and give to currentPage


          $(".pagecontroller-num").removeClass("currentPage");
          $(".pagecontroller-num").eq(currentPage).addClass("currentPage");
          filterPages();
        });
      }

      function filterPages() {
        $(".pagecontroller-num").hide().filter(function (i, el) {
          let mid = Math.ceil(numOfPages / 2);

          if (currentPage < mid) {
            if (i < numOfPages) return true;
          } else if (currentPage > numPages - (numOfPages - 1)) {
            if (i >= numPages - numOfPages) return true;
          } else {
            if (numOfPages % 2 == 0) {
              if (i >= currentPage - mid && i < currentPage + mid) return true;
            } else {
              if (i > currentPage - mid && i < currentPage + mid) return true;
            }
          }
        }).show();
      }
      /**
      Translating function
      string = string to be translated
      **/


      function translate(string) {
        return string;
      }
      /**
      Debug function
      name = label for data
      string = string to pass by console.log
      **/


      function cLog(name) {
        let string = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        console.log(name);

        if (string != null) {
          console.log(JSON.parse(JSON.stringify(string)));
        }
      }
    };
  })(jQuery);
});
;define("emberjs-tutorial/app", ["exports", "@ember/application", "ember-resolver", "ember-load-initializers", "emberjs-tutorial/config/environment"], function (_exports, _application, _emberResolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/application",0,"ember-resolver",0,"ember-load-initializers",0,"emberjs-tutorial/config/environment"eaimeta@70e063a35619d71f

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class App extends _application.default {
    constructor() {
      super(...arguments);

      _defineProperty(this, "modulePrefix", _environment.default.modulePrefix);

      _defineProperty(this, "podModulePrefix", _environment.default.podModulePrefix);

      _defineProperty(this, "Resolver", _emberResolver.default);
    }

  }

  _exports.default = App;
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
});
;define("emberjs-tutorial/component-managers/glimmer", ["exports", "@glimmer/component/-private/ember-component-manager"], function (_exports, _emberComponentManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberComponentManager.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component/-private/ember-component-manager"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/components/-dynamic-element-alt", ["exports", "@glimmer/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component"eaimeta@70e063a35619d71f

  // This component is not needed anymore. However we can only safely remove it once we have an Embroider release that
  // has the special dependency rule for this addon removed:
  // https://github.com/embroider-build/embroider/blob/4fad67f16f811e7f93199a1ee92dba8254c42978/packages/compat/src/addon-dependency-rules/ember-element-helper.ts
  // eslint-disable-next-line ember/no-empty-glimmer-component-classes
  class DynamicElementAlt extends _component.default {}

  _exports.default = DynamicElementAlt;
});
;define("emberjs-tutorial/components/-dynamic-element", ["exports", "@glimmer/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component"eaimeta@70e063a35619d71f

  // This component is not needed anymore. However we can only safely remove it once we have an Embroider release that
  // has the special dependency rule for this addon removed:
  // https://github.com/embroider-build/embroider/blob/4fad67f16f811e7f93199a1ee92dba8254c42978/packages/compat/src/addon-dependency-rules/ember-element-helper.ts
  // eslint-disable-next-line ember/no-empty-glimmer-component-classes
  class DynamicElement extends _component.default {}

  _exports.default = DynamicElement;
});
;define("emberjs-tutorial/components/basic-dropdown-content", ["exports", "ember-basic-dropdown/components/basic-dropdown-content"], function (_exports, _basicDropdownContent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _basicDropdownContent.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-basic-dropdown/components/basic-dropdown-content"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/components/basic-dropdown-trigger", ["exports", "ember-basic-dropdown/components/basic-dropdown-trigger"], function (_exports, _basicDropdownTrigger) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _basicDropdownTrigger.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-basic-dropdown/components/basic-dropdown-trigger"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/components/basic-dropdown", ["exports", "ember-basic-dropdown/components/basic-dropdown"], function (_exports, _basicDropdown) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _basicDropdown.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-basic-dropdown/components/basic-dropdown"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/components/general-container", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/service"], function (_exports, _component, _templateFactory, _component2, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor;

  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/service"eaimeta@70e063a35619d71f

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <LinkTo @route="cart" class="cart-link">
    <i class="fa fa-shopping-cart"></i>
    {{#if this.shoppingCart.itemList.length}}
      <span
        data-test-cart-count
        class="cart-count d-inline-flex justify-content-center align-items-center">
        {{this.itemCount}}
      </span>
    {{/if}}
  </LinkTo>
  
  <main class="container mt-5">
    {{yield}}
  </main>
  */
  {
    "id": "ZJViJocC",
    "block": "[[[8,[39,0],[[24,0,\"cart-link\"]],[[\"@route\"],[\"cart\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"i\"],[14,0,\"fa fa-shopping-cart\"],[12],[13],[1,\"\\n\"],[41,[30,0,[\"shoppingCart\",\"itemList\",\"length\"]],[[[1,\"    \"],[10,1],[14,\"data-test-cart-count\",\"\"],[14,0,\"cart-count d-inline-flex justify-content-center align-items-center\"],[12],[1,\"\\n      \"],[1,[30,0,[\"itemCount\"]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null]],[]]]]],[1,\"\\n\\n\"],[10,\"main\"],[14,0,\"container mt-5\"],[12],[1,\"\\n  \"],[18,1,null],[1,\"\\n\"],[13]],[\"&default\"],false,[\"link-to\",\"if\",\"yield\"]]",
    "moduleName": "emberjs-tutorial/components/general-container.hbs",
    "isStrictMode": false
  });

  let GeneralContainerComponent = (_class = class GeneralContainerComponent extends _component2.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "shoppingCart", _descriptor, this);
    }

    get itemCount() {
      return this.shoppingCart.itemList.reduce((total, item) => {
        return total += item.count;
      }, 0);
    }

  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "shoppingCart", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = GeneralContainerComponent;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, GeneralContainerComponent);
});
;define("emberjs-tutorial/components/maybe-in-element", ["exports", "ember-maybe-in-element/components/maybe-in-element"], function (_exports, _maybeInElement) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _maybeInElement.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-maybe-in-element/components/maybe-in-element"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/components/pagination", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component"], function (_exports, _component, _templateFactory, _component2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component"eaimeta@70e063a35619d71f

  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{yield}}
  */
  {
    "id": "Hzaw1IA+",
    "block": "[[[18,1,null]],[\"&default\"],false,[\"yield\"]]",
    "moduleName": "emberjs-tutorial/components/pagination.hbs",
    "isStrictMode": false
  });

  class PaginationComponent extends _component2.default {}

  _exports.default = PaginationComponent;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, PaginationComponent);
});
;define("emberjs-tutorial/components/power-select-multiple", ["exports", "ember-power-select/components/power-select-multiple"], function (_exports, _powerSelectMultiple) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _powerSelectMultiple.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-power-select/components/power-select-multiple"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/components/power-select-multiple/trigger", ["exports", "ember-power-select/components/power-select-multiple/trigger"], function (_exports, _trigger) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-power-select/components/power-select-multiple/trigger"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/components/power-select", ["exports", "ember-power-select/components/power-select"], function (_exports, _powerSelect) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _powerSelect.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-power-select/components/power-select"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/components/power-select/before-options", ["exports", "ember-power-select/components/power-select/before-options"], function (_exports, _beforeOptions) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _beforeOptions.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-power-select/components/power-select/before-options"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/components/power-select/no-matches-message", ["exports", "ember-power-select/components/power-select/no-matches-message"], function (_exports, _noMatchesMessage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _noMatchesMessage.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-power-select/components/power-select/no-matches-message"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/components/power-select/options", ["exports", "ember-power-select/components/power-select/options"], function (_exports, _options) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _options.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-power-select/components/power-select/options"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/components/power-select/placeholder", ["exports", "ember-power-select/components/power-select/placeholder"], function (_exports, _placeholder) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _placeholder.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-power-select/components/power-select/placeholder"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/components/power-select/power-select-group", ["exports", "ember-power-select/components/power-select/power-select-group"], function (_exports, _powerSelectGroup) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _powerSelectGroup.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-power-select/components/power-select/power-select-group"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/components/power-select/search-message", ["exports", "ember-power-select/components/power-select/search-message"], function (_exports, _searchMessage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _searchMessage.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-power-select/components/power-select/search-message"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/components/power-select/trigger", ["exports", "ember-power-select/components/power-select/trigger"], function (_exports, _trigger) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-power-select/components/power-select/trigger"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/components/product", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component"], function (_exports, _component, _templateFactory, _component2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component"eaimeta@70e063a35619d71f

  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <LinkTo
    data-test-product={{@product.id}}
    @route="item" @model={{@product.id}} class="product">
    <Product::Image @src={{@product.thumbnail}}/>
    <Product::Details
      @product={{@product}}
    />
  </LinkTo>
  
  
  {{!-- <LinkTo
    data-test-product={{@product.id}}
    @route="item" @model={{@product.id}} class="product">
    <Product::Image @src={{this.productImage}}/>
    <Product::Details
      @name={{@product.name}}
      @price={{@product.price}}
    />
  </LinkTo> --}}
  
  */
  {
    "id": "vcRk4ElP",
    "block": "[[[8,[39,0],[[16,\"data-test-product\",[30,1,[\"id\"]]],[24,0,\"product\"]],[[\"@route\",\"@model\"],[\"item\",[30,1,[\"id\"]]]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@src\"],[[30,1,[\"thumbnail\"]]]],null],[1,\"\\n  \"],[8,[39,2],null,[[\"@product\"],[[30,1]]],null],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\\n\"]],[\"@product\"],false,[\"link-to\",\"product/image\",\"product/details\"]]",
    "moduleName": "emberjs-tutorial/components/product.hbs",
    "isStrictMode": false
  });

  class ProductComponent extends _component2.default {}

  _exports.default = ProductComponent;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ProductComponent);
});
;define("emberjs-tutorial/components/product/details", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/service", "@ember/object", "emberjs-tutorial/data/products"], function (_exports, _component, _templateFactory, _component2, _service, _object, _products) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _class, _descriptor, _descriptor2;

  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/service",0,"@ember/object",0,"emberjs-tutorial/data/products"eaimeta@70e063a35619d71f

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="product-details">
  
    {{!-- Header --}}
    <section>
      <h3>{{@product.title}}</h3>
      <div class="text-warning">
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star-half-o"></i>
      </div>
    </section>
  
    {{!-- Price --}}
    <section class={{unless @isDetails 'h4'}}>
      {{!-- <del data-test-original-price class="small text-black-50">{{currency @price}}</del> --}}
      <i data-test-current-price class="text-danger font-weight-bold">{{currency @product.price}}</i>
    </section>
  
    <div class="d-flex justify-content-between align-items-end">
      <div>
      
        {{!-- <div class="product-colors active-{{@color}}">
          {{#each @colors as |colorInfo|}}
            <span data-test-color class="product-color {{concat 'color-' colorInfo.color}}"
              {{on "click" (fn @onChangeColor colorInfo.color)}}></span>
          {{/each}}
        </div> --}}
      </div> 
     
      <button
        data-test-add-to-cart
        class="btn btn-info" type="button" {{on "click" this.addToCart}}>
        <i class="fa fa-shopping-cart mr-1"></i>
        Add to cart
        {{!-- {{@product.title}} --}}
      </button>
    </div>
  </div>
  */
  {
    "id": "96uAQb/k",
    "block": "[[[10,0],[14,0,\"product-details\"],[12],[1,\"\\n\\n\"],[1,\"  \"],[10,\"section\"],[12],[1,\"\\n    \"],[10,\"h3\"],[12],[1,[30,1,[\"title\"]]],[13],[1,\"\\n    \"],[10,0],[14,0,\"text-warning\"],[12],[1,\"\\n      \"],[10,\"i\"],[14,0,\"fa fa-star\"],[12],[13],[1,\"\\n      \"],[10,\"i\"],[14,0,\"fa fa-star\"],[12],[13],[1,\"\\n      \"],[10,\"i\"],[14,0,\"fa fa-star\"],[12],[13],[1,\"\\n      \"],[10,\"i\"],[14,0,\"fa fa-star\"],[12],[13],[1,\"\\n      \"],[10,\"i\"],[14,0,\"fa fa-star-half-o\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,\"section\"],[15,0,[52,[51,[30,2]],\"h4\"]],[12],[1,\"\\n\"],[1,\"    \"],[10,\"i\"],[14,\"data-test-current-price\",\"\"],[14,0,\"text-danger font-weight-bold\"],[12],[1,[28,[35,1],[[30,1,[\"price\"]]],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"d-flex justify-content-between align-items-end\"],[12],[1,\"\\n    \"],[10,0],[12],[1,\"\\n    \\n\"],[1,\"    \"],[13],[1,\" \\n   \\n    \"],[11,\"button\"],[24,\"data-test-add-to-cart\",\"\"],[24,0,\"btn btn-info\"],[24,4,\"button\"],[4,[38,2],[\"click\",[30,0,[\"addToCart\"]]],null],[12],[1,\"\\n      \"],[10,\"i\"],[14,0,\"fa fa-shopping-cart mr-1\"],[12],[13],[1,\"\\n      Add to cart\\n\"],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"@product\",\"@isDetails\"],false,[\"unless\",\"currency\",\"on\"]]",
    "moduleName": "emberjs-tutorial/components/product/details.hbs",
    "isStrictMode": false
  });

  let ProductDetailsComponent = (_dec = (0, _service.inject)('shopping-cart'), (_class = class ProductDetailsComponent extends _component2.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "cart", _descriptor, this);

      _initializerDefineProperty(this, "store", _descriptor2, this);
    }

    addToCart() {
      const {
        title,
        price,
        thumbnail
      } = this.store.peekRecord('product', this.args.product.id);
      this.cart.addItem({
        title,
        price,
        thumbnail
      });
    }

  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "cart", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "store", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "addToCart", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "addToCart"), _class.prototype)), _class));
  _exports.default = ProductDetailsComponent;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ProductDetailsComponent);
});
;define("emberjs-tutorial/components/product/filter", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@glimmer/tracking", "ember-concurrency", "@ember/object"], function (_exports, _component, _templateFactory, _component2, _tracking, _emberConcurrency, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@glimmer/tracking",0,"ember-concurrency",0,"@ember/object"eaimeta@70e063a35619d71f

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    
  
  <PowerSelect  @searchEnabled={{true}} @options={{this.categories}} 
      @selected={{this.destination}} @onChange={{this.handleFilter}} as |name|>
      {{name}}
  </PowerSelect>
  
  <input class="searchbox"  placeholder="Search.." {{on "input" this.search}}>
  
  {{log @product 'model-data'}}
  
  {{!-- {{log this.data 'new-data'}} --}}
   
  
  
  {{#each this.data.products as |p|}}
  <LinkTo @route="item" @model={{p.id}} class="product">
      <Product::Details @product={{p}} />
      <Product::Image @src={{p.thumbnail}} />
  </LinkTo>
  {{/each}}
  
  
  {{#if this.prev_button}} 
  <button type="button" class="previous round " {{on "click" (perform this.paginationTask this.prev)}}> &laquo; Previous</button>
  {{/if}}
  
  
  
   {{#if this.next}} 
  <button type="button" class="next round " {{on "click" (perform this.paginationTask this.next)}}>Next &raquo; </button>
  {{/if}} 
  
  
  */
  {
    "id": "HkXztmyH",
    "block": "[[[1,\"\\n\\n\"],[8,[39,0],null,[[\"@searchEnabled\",\"@options\",\"@selected\",\"@onChange\"],[true,[30,0,[\"categories\"]],[30,0,[\"destination\"]],[30,0,[\"handleFilter\"]]]],[[\"default\"],[[[[1,\"\\n    \"],[1,[30,1]],[1,\"\\n\"]],[1]]]]],[1,\"\\n\\n\"],[11,\"input\"],[24,0,\"searchbox\"],[24,\"placeholder\",\"Search..\"],[4,[38,1],[\"input\",[30,0,[\"search\"]]],null],[12],[13],[1,\"\\n\\n\"],[1,[54,[[30,2],\"model-data\"]]],[1,\"\\n\\n\"],[1,\" \\n\\n\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"data\",\"products\"]]],null]],null],null,[[[8,[39,5],[[24,0,\"product\"]],[[\"@route\",\"@model\"],[\"item\",[30,3,[\"id\"]]]],[[\"default\"],[[[[1,\"\\n    \"],[8,[39,6],null,[[\"@product\"],[[30,3]]],null],[1,\"\\n    \"],[8,[39,7],null,[[\"@src\"],[[30,3,[\"thumbnail\"]]]],null],[1,\"\\n\"]],[]]]]],[1,\"\\n\"]],[3]],null],[1,\"\\n\\n\"],[41,[30,0,[\"prev_button\"]],[[[11,\"button\"],[24,0,\"previous round \"],[24,4,\"button\"],[4,[38,1],[\"click\",[28,[37,9],[[30,0,[\"paginationTask\"]],[30,0,[\"prev\"]]],null]],null],[12],[1,\" « Previous\"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\\n\\n\"],[41,[30,0,[\"next\"]],[[[11,\"button\"],[24,0,\"next round \"],[24,4,\"button\"],[4,[38,1],[\"click\",[28,[37,9],[[30,0,[\"paginationTask\"]],[30,0,[\"next\"]]],null]],null],[12],[1,\"Next » \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"]],[\"name\",\"@product\",\"p\"],false,[\"power-select\",\"on\",\"log\",\"each\",\"-track-array\",\"link-to\",\"product/details\",\"product/image\",\"if\",\"perform\"]]",
    "moduleName": "emberjs-tutorial/components/product/filter.hbs",
    "isStrictMode": false
  });

  let FilterComponent = (_dec = (0, _emberConcurrency.task)({
    keepLatest: true
  }), (_class = class FilterComponent extends _component2.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "data", _descriptor, this);

      _initializerDefineProperty(this, "destination", _descriptor2, this);

      _initializerDefineProperty(this, "next", _descriptor3, this);

      _initializerDefineProperty(this, "prev", _descriptor4, this);

      _initializerDefineProperty(this, "prev_button", _descriptor5, this);

      _defineProperty(this, "categories", ["smartphones", "laptops", "fragrances", "skincare", "groceries", "home-decoration", "furniture", "tops", "womens-dresses", "womens-shoes", "mens-shirts", "mens-shoes", "mens-watches", "womens-watches", "womens-bags", "womens-jewellery", "sunglasses", "automotive", "motorcycle", "lighting", "AllProducts"]);

      this.next = 20;
    }

    async handleFilter(categories) {
      this.destination = categories;
      this.args.filter({
        queryParams: {
          category: categories
        }
      });

      if (categories == "AllProducts") {
        let response = await fetch(`https://dummyjson.com/products`).then(res => res.json());
        this.data = response;
        return this.data;
      } else {
        this.next = 0;
        this.prev_button = 0;
        let response = await fetch(`https://dummyjson.com/products/category/${categories}`).then(res => res.json());
        this.data = response;
        return this.data;
      }
    } // @action
    // async handleClick(value) {
    //   this.next = 0;
    //   this.prev_button =0;
    //   this.destination = value;
    //   if (value == "All Products") {
    //     let response =
    //       await fetch
    //         (`https://dummyjson.com/products`)
    //         .then((res) => res.json());
    //     this.data = response;
    //   }
    //   else {
    //     let response =
    //       await fetch
    //         (`https://dummyjson.com/products/category/${value}`)
    //         .then((res) => res.json());
    //     this.data = response;
    //   }
    // }


    async search(term) {
      this.next = 0;
      this.prev_button = 0;
      let url = await fetch(`https://dummyjson.com/products/search?q=${term.target.value}`).then(resp => resp.json());
      console.log(this.data);
      return this.data = url;
    }

    *paginationTask(skip_pages) {
      let page_number = skip_pages / 10;
      console.log(skip_pages, 'skipped', page_number, 'page');
      this.args.filter({
        queryParams: {
          page: page_number
        }
      });
      this.args.filter({
        queryParams: {
          category: "AllProducts"
        }
      });

      if (skip_pages < this.data.total) {
        this.data = yield fetch(`https://dummyjson.com/products?limit=10&skip=${skip_pages}`).then(response => response.json());

        if (skip_pages >= 20) {
          this.prev = skip_pages - 10;
          this.prev_button = 1;
        } else if (skip_pages < 20) {
          this.prev_button = 0;
        }

        this.next = skip_pages + 10;

        if (this.next == this.data.total) {
          this.next = 0;
        }

        return this.data;
      }
    } // @task({ keepLatest: true })
    // *paginationTask(skip_pages) {
    //   if (skip_pages <this.data.total) {
    //     this.data = yield fetch(
    //       `https://dummyjson.com/products?limit=20&skip=${skip_pages}`
    //     ).then((response) => response.json());
    //     if (skip_pages >= 20) {
    //       this.prev = skip_pages - 20;
    //       this.prev_button = 1;
    //     }
    //     else if (skip_pages < 20) {
    //       this.prev_button = 0;
    //     }
    //       this.next = skip_pages + 20; 
    //       if(this.next == this.data.total){
    //         this.next = 0;
    //       }
    //     return this.data;
    //   }
    // }


  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "data", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return this.args.product;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "destination", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return "Filter...";
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "next", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "prev", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "prev_button", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "handleFilter", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleFilter"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "search", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "search"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "paginationTask", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "paginationTask"), _class.prototype)), _class));
  _exports.default = FilterComponent;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, FilterComponent);
});
;define("emberjs-tutorial/components/product/image", ["exports", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function (_exports, _component, _templateFactory, _templateOnly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only"eaimeta@70e063a35619d71f

  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="product-image">
    <img src={{@src}} alt="">
  </div>
  */
  {
    "id": "ElMwc765",
    "block": "[[[10,0],[14,0,\"product-image\"],[12],[1,\"\\n  \"],[10,\"img\"],[15,\"src\",[30,1]],[14,\"alt\",\"\"],[12],[13],[1,\"\\n\"],[13]],[\"@src\"],false,[]]",
    "moduleName": "emberjs-tutorial/components/product/image.hbs",
    "isStrictMode": false
  });

  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());

  _exports.default = _default;
});
;define("emberjs-tutorial/components/welcome-page", ["exports", "ember-welcome-page/components/welcome-page.js"], function (_exports, _welcomePage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-welcome-page/components/welcome-page.js"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/controllers/cart", ["exports", "@ember/controller", "@ember/service", "@ember/object"], function (_exports, _controller, _service, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _class, _descriptor;

  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/service",0,"@ember/object"eaimeta@70e063a35619d71f

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let CartController = (_dec = (0, _service.inject)('shopping-cart'), (_class = class CartController extends _controller.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "cart", _descriptor, this);
    }

    get subtotal() {
      return this.cart.itemList.reduce((acc, item) => {
        return acc + item.price * item.count;
      }, 0);
    }

    get tax() {
      return 0.09 * this.subtotal;
    }

    get total() {
      return this.subtotal + this.tax;
    }

    updateItemCount(item, event) {
      const count = event.target.value;

      if (count >= 0) {
        item.count = count;
      } else {
        item.count = 0;
      }
    }

  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "cart", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "updateItemCount", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "updateItemCount"), _class.prototype)), _class));
  _exports.default = CartController;
});
;define("emberjs-tutorial/controllers/index", ["exports", "@ember/controller", "@glimmer/tracking", "@ember/object", "@ember/service"], function (_exports, _controller, _tracking, _object, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor, _descriptor2, _descriptor3;

  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@glimmer/tracking",0,"@ember/object",0,"@ember/service"eaimeta@70e063a35619d71f

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let IndexController = (_class = class IndexController extends _controller.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "router", _descriptor, this);

      _defineProperty(this, "queryParams", ['category', 'page']);

      _initializerDefineProperty(this, "category", _descriptor2, this);

      _initializerDefineProperty(this, "page", _descriptor3, this);
    }

    async handleClick(queryParams) {
      this.router.transitionTo('index', queryParams);
    }

  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "category", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 'AllProduct';
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "page", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 1;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "handleClick", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleClick"), _class.prototype)), _class);
  _exports.default = IndexController;
});
;define("emberjs-tutorial/controllers/item", ["exports", "@ember/controller", "@glimmer/tracking", "@ember/object"], function (_exports, _controller, _tracking, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@glimmer/tracking",0,"@ember/object"eaimeta@70e063a35619d71f

  class ItemController extends _controller.default {// @tracked color;
    // @tracked isZoomed = false;
    // get productImage() {
    //    return 
    // }
    // @action
    // onChangeColor(newColor) {
    //   this.color = newColor;
    // }
    // @action
    // toggleZoom() {
    //   this.isZoomed = !this.isZoomed;
    // }
  }

  _exports.default = ItemController;
});
;define("emberjs-tutorial/data-adapter", ["exports", "@ember-data/debug"], function (_exports, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _debug.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/debug"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/data/products", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.products = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f

  const products = [{
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": {
      "original": 109.95,
      "current": 99.8
    },
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  }, {
    "id": 2,
    "title": "Mens Casual Premium Slim Fit T-Shirts ",
    "price": {
      "original": 110.95,
      "current": 80.8
    },
    "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    "rating": {
      "rate": 4.1,
      "count": 259
    }
  }, {
    "id": 3,
    "title": "Mens Cotton Jacket",
    "price": {
      "original": 50.5,
      "current": 99.8
    },
    "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    "rating": {
      "rate": 4.7,
      "count": 500
    }
  }, {
    "id": 4,
    "title": "Mens Casual Slim Fit",
    "price": {
      "original": 100.95,
      "current": 90.8
    },
    "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    "rating": {
      "rate": 2.1,
      "count": 430
    }
  }, {
    "id": 5,
    "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    "price": {
      "original": 20.5,
      "current": 98
    },
    "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    "category": "jewelery",
    "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    "rating": {
      "rate": 4.6,
      "count": 400
    }
  }, {
    "id": 6,
    "title": "Solid Gold Petite Micropave ",
    "price": {
      "original": 25.6,
      "current": 90.7
    },
    "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    "category": "jewelery",
    "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    "rating": {
      "rate": 39.9,
      "count": 70
    }
  }, {
    "id": 7,
    "title": "White Gold Plated Princess",
    "price": {
      "original": 40.4,
      "current": 90.5
    },
    "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    "category": "jewelery",
    "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    "rating": {
      "rate": 3,
      "count": 400
    }
  }, {
    "id": 8,
    "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
    "price": {
      "original": 55.5,
      "current": 40.8
    },
    "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    "category": "jewelery",
    "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    "rating": {
      "rate": 1.9,
      "count": 100
    }
  }, {
    "id": 9,
    "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    "price": {
      "original": 100,
      "current": 90
    },
    "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    "rating": {
      "rate": 3.3,
      "count": 203
    }
  }, {
    "id": 10,
    "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    "price": {
      "original": 109.95,
      "current": 99.8
    },
    "description": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    "rating": {
      "rate": 2.9,
      "count": 470
    }
  }, {
    "id": 11,
    "title": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    "price": {
      "original": 70.5,
      "current": 80.5
    },
    "description": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    "rating": {
      "rate": 4.8,
      "count": 319
    }
  }, {
    "id": 12,
    "title": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    "price": {
      "original": 108.5,
      "current": 99.8
    },
    "description": "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    "rating": {
      "rate": 4.8,
      "count": 400
    }
  }, {
    "id": 13,
    "title": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    "price": {
      "original": 109,
      "current": 99.8
    },
    "description": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    "rating": {
      "rate": 2.9,
      "count": 250
    }
  }, {
    "id": 14,
    "title": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    "price": {
      "original": 104.4,
      "current": 99.3
    },
    "description": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    "rating": {
      "rate": 2.2,
      "count": 140
    }
  }, {
    "id": 15,
    "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    "price": {
      "original": 10.4,
      "current": 96.4
    },
    "description": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    "rating": {
      "rate": 2.6,
      "count": 235
    }
  }, {
    "id": 16,
    "title": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    "price": {
      "original": 10.5,
      "current": 94.5
    },
    "description": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    "rating": {
      "rate": 2.9,
      "count": 340
    }
  }, {
    "id": 17,
    "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    "price": {
      "original": 10.33,
      "current": 90.6
    },
    "description": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    "rating": {
      "rate": 3.8,
      "count": 679
    }
  }, {
    "id": 18,
    "title": "MBJ Women's Solid Short Sleeve Boat Neck V ",
    "price": {
      "original": 10.66,
      "current": 99.4
    },
    "description": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    "rating": {
      "rate": 4.7,
      "count": 130
    }
  }, {
    "id": 19,
    "title": "Opna Women's Short Sleeve Moisture",
    "price": {
      "original": 10.66,
      "current": 33.4
    },
    "description": "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    "rating": {
      "rate": 4.5,
      "count": 146
    }
  }, {
    "id": 20,
    "title": "DANVOUY Womens T Shirt Casual Cotton Short",
    "price": {
      "original": 75.5,
      "current": 99.3
    },
    "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    "rating": {
      "rate": 3.6,
      "count": 145
    }
  }];
  _exports.products = products;
});
;define("emberjs-tutorial/helpers/and", ["exports", "ember-truth-helpers/helpers/and"], function (_exports, _and) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "and", {
    enumerable: true,
    get: function () {
      return _and.and;
    }
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _and.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/and"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/app-version", ["exports", "@ember/component/helper", "emberjs-tutorial/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _helper, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper",0,"emberjs-tutorial/config/environment",0,"ember-cli-app-version/utils/regexp"eaimeta@70e063a35619d71f

  function appVersion(_) {
    let hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const version = _environment.default.APP.version; // e.g. 1.0.0-alpha.1+4jds75hf
    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility

    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      } // Fallback to just version


      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  var _default = (0, _helper.helper)(appVersion);

  _exports.default = _default;
});
;define("emberjs-tutorial/helpers/assign", ["exports", "ember-assign-helper/helpers/assign"], function (_exports, _assign) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "assign", {
    enumerable: true,
    get: function () {
      return _assign.assign;
    }
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _assign.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-assign-helper/helpers/assign"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/cancel-all", ["exports", "ember-concurrency/helpers/cancel-all"], function (_exports, _cancelAll) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _cancelAll.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-concurrency/helpers/cancel-all"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/currency", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper"eaimeta@70e063a35619d71f

  class currency extends _helper.default {
    compute(params) {
      let hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // {{currency 25}}
      const [number] = params;
      const {
        sign = '$'
      } = hash;
      const dollars = Math.floor(number);
      let cents = Math.floor(number * 100 % 100);

      if (cents.toString().length === 1) {
        cents = '0' + cents;
      }

      return `${sign}${dollars}.${cents}`;
    }

  }

  _exports.default = currency;
});
;define("emberjs-tutorial/helpers/element", ["exports", "ember-element-helper/helpers/element"], function (_exports, _element) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-element-helper/helpers/element"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/ember-power-select-is-group", ["exports", "ember-power-select/helpers/ember-power-select-is-group"], function (_exports, _emberPowerSelectIsGroup) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsGroup.default;
    }
  });
  Object.defineProperty(_exports, "emberPowerSelectIsGroup", {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsGroup.emberPowerSelectIsGroup;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-power-select/helpers/ember-power-select-is-group"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/ember-power-select-is-selected", ["exports", "ember-power-select/helpers/ember-power-select-is-selected"], function (_exports, _emberPowerSelectIsSelected) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsSelected.default;
    }
  });
  Object.defineProperty(_exports, "emberPowerSelectIsSelected", {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsSelected.emberPowerSelectIsSelected;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-power-select/helpers/ember-power-select-is-selected"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/ensure-safe-component", ["exports", "@embroider/util"], function (_exports, _util) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _util.EnsureSafeComponentHelper;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@embroider/util"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/eq", ["exports", "ember-truth-helpers/helpers/eq"], function (_exports, _eq) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _eq.default;
    }
  });
  Object.defineProperty(_exports, "equal", {
    enumerable: true,
    get: function () {
      return _eq.equal;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/eq"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/gt", ["exports", "ember-truth-helpers/helpers/gt"], function (_exports, _gt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gt.default;
    }
  });
  Object.defineProperty(_exports, "gt", {
    enumerable: true,
    get: function () {
      return _gt.gt;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/gt"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/gte", ["exports", "ember-truth-helpers/helpers/gte"], function (_exports, _gte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gte.default;
    }
  });
  Object.defineProperty(_exports, "gte", {
    enumerable: true,
    get: function () {
      return _gte.gte;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/gte"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/is-array", ["exports", "ember-truth-helpers/helpers/is-array"], function (_exports, _isArray) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isArray.default;
    }
  });
  Object.defineProperty(_exports, "isArray", {
    enumerable: true,
    get: function () {
      return _isArray.isArray;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/is-array"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/is-empty", ["exports", "ember-truth-helpers/helpers/is-empty"], function (_exports, _isEmpty) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isEmpty.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/is-empty"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/is-equal", ["exports", "ember-truth-helpers/helpers/is-equal"], function (_exports, _isEqual) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(_exports, "isEqual", {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/is-equal"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/lt", ["exports", "ember-truth-helpers/helpers/lt"], function (_exports, _lt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lt.default;
    }
  });
  Object.defineProperty(_exports, "lt", {
    enumerable: true,
    get: function () {
      return _lt.lt;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/lt"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/lte", ["exports", "ember-truth-helpers/helpers/lte"], function (_exports, _lte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lte.default;
    }
  });
  Object.defineProperty(_exports, "lte", {
    enumerable: true,
    get: function () {
      return _lte.lte;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/lte"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/not-eq", ["exports", "ember-truth-helpers/helpers/not-eq"], function (_exports, _notEq) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _notEq.default;
    }
  });
  Object.defineProperty(_exports, "notEqualHelper", {
    enumerable: true,
    get: function () {
      return _notEq.notEqualHelper;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/not-eq"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/not", ["exports", "ember-truth-helpers/helpers/not"], function (_exports, _not) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _not.default;
    }
  });
  Object.defineProperty(_exports, "not", {
    enumerable: true,
    get: function () {
      return _not.not;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/not"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/or", ["exports", "ember-truth-helpers/helpers/or"], function (_exports, _or) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _or.default;
    }
  });
  Object.defineProperty(_exports, "or", {
    enumerable: true,
    get: function () {
      return _or.or;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/or"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/page-title", ["exports", "ember-page-title/helpers/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-page-title/helpers/page-title"eaimeta@70e063a35619d71f

  var _default = _pageTitle.default;
  _exports.default = _default;
});
;define("emberjs-tutorial/helpers/perform", ["exports", "ember-concurrency/helpers/perform"], function (_exports, _perform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _perform.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-concurrency/helpers/perform"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-inflector/lib/helpers/pluralize"eaimeta@70e063a35619d71f

  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("emberjs-tutorial/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-inflector/lib/helpers/singularize"eaimeta@70e063a35619d71f

  var _default = _singularize.default;
  _exports.default = _default;
});
;define("emberjs-tutorial/helpers/task", ["exports", "ember-concurrency/helpers/task"], function (_exports, _task) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _task.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-concurrency/helpers/task"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/helpers/xor", ["exports", "ember-truth-helpers/helpers/xor"], function (_exports, _xor) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xor.default;
    }
  });
  Object.defineProperty(_exports, "xor", {
    enumerable: true,
    get: function () {
      return _xor.xor;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/xor"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "emberjs-tutorial/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-app-version/initializer-factory",0,"emberjs-tutorial/config/environment"eaimeta@70e063a35619d71f

  let name, version;

  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("emberjs-tutorial/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-resolver/resolvers/classic/container-debug-adapter"eaimeta@70e063a35619d71f

  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
    }

  };
  _exports.default = _default;
});
;define("emberjs-tutorial/initializers/ember-data-data-adapter", ["exports", "@ember-data/debug/setup"], function (_exports, _setup) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _setup.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/debug/setup"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/initializers/ember-data", ["exports", "ember-data", "ember-data/setup-container"], function (_exports, _emberData, _setupContainer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-data",0,"ember-data/setup-container"eaimeta@70e063a35619d71f

  /*
    This code initializes EmberData in an Ember application.
  */
  var _default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
  _exports.default = _default;
});
;define("emberjs-tutorial/instance-initializers/ember-data", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f

  /* exists only for things that historically used "after" or "before" */
  var _default = {
    name: 'ember-data',

    initialize() {}

  };
  _exports.default = _default;
});
;define("emberjs-tutorial/models/cart", ["exports", "@ember-data/model"], function (_exports, _model) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor, _descriptor2, _descriptor3;

  0; //eaimeta@70e063a35619d71f0,"@ember-data/model"eaimeta@70e063a35619d71f

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let CartModel = (_class = class CartModel extends _model.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "title", _descriptor, this);

      _initializerDefineProperty(this, "thumbnail", _descriptor2, this);

      _initializerDefineProperty(this, "price", _descriptor3, this);
    }

  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "title", [attr], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "thumbnail", [attr], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "price", [attr], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = CartModel;
});
;define("emberjs-tutorial/models/product", ["exports", "@ember-data/model"], function (_exports, _model) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

  0; //eaimeta@70e063a35619d71f0,"@ember-data/model"eaimeta@70e063a35619d71f

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let ProductModel = (_class = class ProductModel extends _model.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "category", _descriptor, this);

      _initializerDefineProperty(this, "description", _descriptor2, this);

      _initializerDefineProperty(this, "title", _descriptor3, this);

      _initializerDefineProperty(this, "thumbnail", _descriptor4, this);

      _initializerDefineProperty(this, "price", _descriptor5, this);
    }

  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "category", [_model.attr], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "description", [_model.attr], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "title", [_model.attr], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "thumbnail", [_model.attr], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "price", [_model.attr], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = ProductModel;
});
;define("emberjs-tutorial/modifiers/basic-dropdown-trigger", ["exports", "ember-basic-dropdown/modifiers/basic-dropdown-trigger"], function (_exports, _basicDropdownTrigger) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _basicDropdownTrigger.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-basic-dropdown/modifiers/basic-dropdown-trigger"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/modifiers/did-insert", ["exports", "@ember/render-modifiers/modifiers/did-insert"], function (_exports, _didInsert) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didInsert.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/render-modifiers/modifiers/did-insert"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/modifiers/did-update", ["exports", "@ember/render-modifiers/modifiers/did-update"], function (_exports, _didUpdate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didUpdate.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/render-modifiers/modifiers/did-update"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/modifiers/style", ["exports", "ember-style-modifier/modifiers/style"], function (_exports, _style) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _style.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-style-modifier/modifiers/style"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/modifiers/will-destroy", ["exports", "@ember/render-modifiers/modifiers/will-destroy"], function (_exports, _willDestroy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _willDestroy.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/render-modifiers/modifiers/will-destroy"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/router", ["exports", "@ember/routing/router", "emberjs-tutorial/config/environment"], function (_exports, _router, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/router",0,"emberjs-tutorial/config/environment"eaimeta@70e063a35619d71f

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class Router extends _router.default {
    constructor() {
      super(...arguments);

      _defineProperty(this, "location", _environment.default.locationType);

      _defineProperty(this, "rootURL", _environment.default.rootURL);
    }

  }

  _exports.default = Router;
  Router.map(function () {
    this.route('item', {
      path: '/item/:item_id'
    });
    this.route('not-found', {
      path: '/*path'
    });
    this.route('cart', {
      path: 'shopping-cart'
    });
  });
});
;define("emberjs-tutorial/routes/cart", ["exports", "@ember/routing/route"], function (_exports, _route) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route"eaimeta@70e063a35619d71f

  class CartRoute extends _route.default {
    model() {
      const items = [{
        price: 10
      }, {
        price: 15
      }];
      return items;
    }

  }

  _exports.default = CartRoute;
});
;define("emberjs-tutorial/routes/index", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor;

  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let IndexRoute = (_class = class IndexRoute extends _route.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "store", _descriptor, this);
    }

    async model() {
      let p = await fetch('https://dummyjson.com/products?limit=20&skip=0').then(response => response.json());
      this.store.pushPayload({
        products: p.products
      });
      return p;
    }

  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "store", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = IndexRoute;
});
;define("emberjs-tutorial/routes/item", ["exports", "@ember/routing/route", "emberjs-tutorial/data/products", "@ember/service"], function (_exports, _route, _products, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor;

  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"emberjs-tutorial/data/products",0,"@ember/service"eaimeta@70e063a35619d71f

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let ItemRoute = (_class = class ItemRoute extends _route.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "store", _descriptor, this);
    }

    async model(params) {
      const {
        item_id
      } = params;
      let data = await fetch(`https://dummyjson.com/products/${item_id}`).then(response => response.json());
      return data;
    }

  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "store", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class); //  const data =await fetch('https://fakestoreapi.com/products').then((response) => response.json());
  // async model(params) {
  //   const {
  //     item_id
  //   } = params;
  //    const data  = await this.store.findAll('product');
  //    const p =await fetch('https://fakestoreapi.com/products');
  //    console.log(p);
  //   // return products;
  //}  
  // setupController(controller, model) {
  //   super.setupController(controller, model);
  //   controller.color = model.colors[0].color;
  // }

  _exports.default = ItemRoute;
});
;define("emberjs-tutorial/routes/not-found", ["exports", "@ember/routing/route"], function (_exports, _route) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route"eaimeta@70e063a35619d71f

  class NotFoundRoute extends _route.default {}

  _exports.default = NotFoundRoute;
});
;define("emberjs-tutorial/serializers/-default", ["exports", "@ember-data/serializer/json"], function (_exports, _json) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _json.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/serializer/json"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/serializers/-json-api", ["exports", "@ember-data/serializer/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/serializer/json-api"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/serializers/-rest", ["exports", "@ember-data/serializer/rest"], function (_exports, _rest) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _rest.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/serializer/rest"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/serializers/application", ["exports", "@ember-data/serializer/rest"], function (_exports, _rest) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember-data/serializer/rest"eaimeta@70e063a35619d71f

  class ApplicationSerializer extends _rest.default {}

  _exports.default = ApplicationSerializer;
});
;define("emberjs-tutorial/services/-ensure-registered", ["exports", "@embroider/util/services/ensure-registered"], function (_exports, _ensureRegistered) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _ensureRegistered.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@embroider/util/services/ensure-registered"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/services/page-title-list", ["exports", "ember-page-title/services/page-title-list"], function (_exports, _pageTitleList) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitleList.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-page-title/services/page-title-list"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/services/page-title", ["exports", "ember-page-title/services/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitle.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-page-title/services/page-title"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/services/shopping-cart", ["exports", "@ember/service", "@glimmer/tracking"], function (_exports, _service, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor, _class3, _descriptor2;

  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"@glimmer/tracking"eaimeta@70e063a35619d71f

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let Item = (_class = class Item {
    constructor(item) {
      _initializerDefineProperty(this, "count", _descriptor, this);

      _defineProperty(this, "title", void 0);

      _defineProperty(this, "thumbnail", void 0);

      _defineProperty(this, "price", void 0);

      this.count = item.count;
      this.title = item.title; // this.color = item.color;

      this.thumbnail = item.thumbnail;
      this.price = item.price;
    }

  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "count", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  let ShoppingCartService = (_class3 = class ShoppingCartService extends _service.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "itemList", _descriptor2, this);
    }

    addItem(item) {
      const existingItem = this.itemList.find(_ref => {
        let {
          title
        } = _ref;
        return title === item.title;
      });

      if (existingItem) {
        existingItem.count += 1;
      } else {
        this.itemList = [...this.itemList, new Item({ ...item,
          count: 1
        })];
      }
    }

  }, (_descriptor2 = _applyDecoratedDescriptor(_class3.prototype, "itemList", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  })), _class3);
  _exports.default = ShoppingCartService;
});
;define("emberjs-tutorial/services/store", ["exports", "ember-data/store"], function (_exports, _store) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _store.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-data/store"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/services/text-measurer", ["exports", "ember-text-measurer/services/text-measurer"], function (_exports, _textMeasurer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _textMeasurer.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-text-measurer/services/text-measurer"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/templates/application", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{outlet}}
  */
  {
    "id": "pQclbE4Z",
    "block": "[[[46,[28,[37,1],null,null],null,null,null]],[],false,[\"component\",\"-outlet\"]]",
    "moduleName": "emberjs-tutorial/templates/application.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("emberjs-tutorial/templates/cart", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <main class="container mt-5">
    <h1>Shopping Cart</h1>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <LinkTo @route="index">
          Home
        </LinkTo>
      </li>
      <li class="breadcrumb-item">Shopping Cart</li>
    </ol>
    
    {{#each this.cart.itemList as |item|}}
      <div class="cart-item d-flex align-items-center">
        <div class="cart-item-thumbnail">
          <img src={{item.thumbnail}} alt="error">
        </div>
        <div class="ml-3">
          <h4>{{item.title}}</h4>
          <i class="font-weight-bold">{{currency item.price}}</i>
        </div>
        <input
          type="number"
          class="ml-auto"
          value={{item.count}}
          {{on "input" (fn this.updateItemCount item)}}
        >
      </div>
    {{/each}}
    <section class="w-50 ml-auto text-right mb-5">
      <div class="row">
        <span class="col">Subtotal</span>
        <span class="col">{{currency this.subtotal}}</span>
      </div>
      <div class="row">
        <span class="col">Tax</span>
        <span class="col">{{currency this.tax}}</span>
      </div>
      <div class="row">
        <span class="col">Total</span>
        <span class="col">{{currency this.total}}</span>
      </div>
    </section>
  
    <button type="button" class="btn btn-success float-right">
      Pay Now
    </button>
  </main>
  */
  {
    "id": "M1yL3eVx",
    "block": "[[[10,\"main\"],[14,0,\"container mt-5\"],[12],[1,\"\\n  \"],[10,\"h1\"],[12],[1,\"Shopping Cart\"],[13],[1,\"\\n  \"],[10,\"ol\"],[14,0,\"breadcrumb\"],[12],[1,\"\\n    \"],[10,\"li\"],[14,0,\"breadcrumb-item\"],[12],[1,\"\\n      \"],[8,[39,0],null,[[\"@route\"],[\"index\"]],[[\"default\"],[[[[1,\"\\n        Home\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"breadcrumb-item\"],[12],[1,\"Shopping Cart\"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"cart\",\"itemList\"]]],null]],null],null,[[[1,\"    \"],[10,0],[14,0,\"cart-item d-flex align-items-center\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"cart-item-thumbnail\"],[12],[1,\"\\n        \"],[10,\"img\"],[15,\"src\",[30,1,[\"thumbnail\"]]],[14,\"alt\",\"error\"],[12],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"ml-3\"],[12],[1,\"\\n        \"],[10,\"h4\"],[12],[1,[30,1,[\"title\"]]],[13],[1,\"\\n        \"],[10,\"i\"],[14,0,\"font-weight-bold\"],[12],[1,[28,[35,3],[[30,1,[\"price\"]]],null]],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[11,\"input\"],[24,0,\"ml-auto\"],[16,2,[30,1,[\"count\"]]],[24,4,\"number\"],[4,[38,4],[\"input\",[28,[37,5],[[30,0,[\"updateItemCount\"]],[30,1]],null]],null],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[1]],null],[1,\"  \"],[10,\"section\"],[14,0,\"w-50 ml-auto text-right mb-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n      \"],[10,1],[14,0,\"col\"],[12],[1,\"Subtotal\"],[13],[1,\"\\n      \"],[10,1],[14,0,\"col\"],[12],[1,[28,[35,3],[[30,0,[\"subtotal\"]]],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n      \"],[10,1],[14,0,\"col\"],[12],[1,\"Tax\"],[13],[1,\"\\n      \"],[10,1],[14,0,\"col\"],[12],[1,[28,[35,3],[[30,0,[\"tax\"]]],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n      \"],[10,1],[14,0,\"col\"],[12],[1,\"Total\"],[13],[1,\"\\n      \"],[10,1],[14,0,\"col\"],[12],[1,[28,[35,3],[[30,0,[\"total\"]]],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"button\"],[14,0,\"btn btn-success float-right\"],[14,4,\"button\"],[12],[1,\"\\n    Pay Now\\n  \"],[13],[1,\"\\n\"],[13]],[\"item\"],false,[\"link-to\",\"each\",\"-track-array\",\"currency\",\"on\",\"fn\"]]",
    "moduleName": "emberjs-tutorial/templates/cart.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("emberjs-tutorial/templates/index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{!-- 
  <form>
     <span class="m-4">Search Products - </span>
     <input type="text" placeholder="Search" id="filterInput" class="bg-grap-200 w-2/4 py-1 px-3 m-3 placeholder-gray-800 rounded-md">
  </form>
   --}}
  
  <GeneralContainer> 
  {{log this.model 'new'}}
     <Product::filter @product={{this.model}} @filter={{this.handleClick}}/>
  </GeneralContainer> 
  
  
  
  {{!-- 
  {{#each this.model as |product|}}
       <Product @product={{product}}/>  
       <Product::filter @model={{this.model}}/>
    {{/each}} --}}
   {{!-- {{product.id}} -->
        {{product.image}} --}}
  
       {{!-- <Product::Image @src={{product.image}}/>   --}}
  */
  {
    "id": "s2F47R0D",
    "block": "[[[1,\"\\n\"],[8,[39,0],null,null,[[\"default\"],[[[[1,\" \\n\"],[1,[54,[[30,0,[\"model\"]],\"new\"]]],[1,\"\\n   \"],[8,[39,2],null,[[\"@product\",\"@filter\"],[[30,0,[\"model\"]],[30,0,[\"handleClick\"]]]],null],[1,\"\\n\"]],[]]]]],[1,\" \\n\\n\\n\\n\"],[1,\"\\n\"]],[],false,[\"general-container\",\"log\",\"product/filter\"]]",
    "moduleName": "emberjs-tutorial/templates/index.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("emberjs-tutorial/templates/item", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
       <GeneralContainer>
    <div class="product item-details-page">
      <Product::Image
        @src={{this.model.thumbnail}}  
      />
       <Product::Details
        @product={{this.model}}
      />
      </div>
     {{!-- <h5 class="mt-5">Features</h5>  --}}
  
  
     {{!-- <ul>
      {{#each this.model.features as |feature|}}
        <li>{{feature}}</li>
      {{/each}}
    </ul> --}}
  
   </GeneralContainer> 
  
  
    {{!-- @colors={{this.model.colors}} 
        @color={{this.color}} 
         @onChangeColor={{this.onChangeColor}} --}}
  */
  {
    "id": "2j674hZb",
    "block": "[[[1,\"   \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"product item-details-page\"],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@src\"],[[30,0,[\"model\",\"thumbnail\"]]]],null],[1,\"\\n     \"],[8,[39,2],null,[[\"@product\"],[[30,0,[\"model\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"],[1,\"\\n\\n\"],[1,\"\\n \"]],[]]]]],[1,\" \\n\\n\\n\"]],[],false,[\"general-container\",\"product/image\",\"product/details\"]]",
    "moduleName": "emberjs-tutorial/templates/item.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("emberjs-tutorial/templates/not-found", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    404 not found
  */
  {
    "id": "na3xeJZz",
    "block": "[[[1,\"404 not found\"]],[],false,[]]",
    "moduleName": "emberjs-tutorial/templates/not-found.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("emberjs-tutorial/transforms/boolean", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.BooleanTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/serializer/-private"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/transforms/date", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.DateTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/serializer/-private"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/transforms/number", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.NumberTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/serializer/-private"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/transforms/string", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.StringTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/serializer/-private"eaimeta@70e063a35619d71f
});
;define("emberjs-tutorial/utils/calculate-position", ["exports", "ember-basic-dropdown/utils/calculate-position"], function (_exports, _calculatePosition) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _calculatePosition.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-basic-dropdown/utils/calculate-position"eaimeta@70e063a35619d71f
});
;

;define('emberjs-tutorial/config/environment', [], function() {
  var prefix = 'emberjs-tutorial';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("emberjs-tutorial/app")["default"].create({"name":"emberjs-tutorial","version":"0.0.0+9ddfd510"});
          }
        
//# sourceMappingURL=emberjs-tutorial.map
