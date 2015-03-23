jQuery(document).ready(function() {  

	
    Columns = function(){
        this.columnObject = {};

        this.makeColumn = function(tab_one, tab_two, tab_three, tab_four, title, pic, content){
            this.columnObject.tab_1 = tab_one;
            this.columnObject.tab_2 = tab_two;
            this.columnObject.tab_3 = tab_three;
            this.columnObject.tab_4 = tab_four;
            this.columnObject.title = title;
            this.columnObject.pic = pic;
            this.columnObject.content = content;
        };

        this.reorderColumns = function(active_tab, active_num){
            console.log("Inside order columns");
            var columns = this.setColumns();
            console.log(columns);
            for (i = 0; i < columns.length; i++) { 
                console.log("columns[active_num]");
                //console.log(columns[active_num]);
                // this will return the order the column has
                var current_column_order = columns[active_num];
                //console.log("current_column_order");
                //console.log(current_column_order);
                var column_num = '.column-' + String(active_num);
                jQuery(active_tab).jQuery(column_num).innerHTML(columns[active_num]);
                //columns[i]
            }

        };

        this.setColumns = function(){
            columns = [];
            columns[0] = this.makeColumn(0, 0, 0, 0, 'Column Title 1', 'path/to/pic', 'Column Body/Info Here');
            columns[1] = this.makeColumn(1, 1, 1, 1, 'Column Title 2', 'path/to/pic', 'Column Body/Info Here');
            columns[2] = this.makeColumn(2, 2, 2, 2, 'Column Title 3', 'path/to/pic', 'Column Body/Info Here');
            columns[3] = this.makeColumn(3, 3, 3, 3, 'Column Title 4', 'path/to/pic', 'Column Body/Info Here');
            columns[4] = this.makeColumn(4, 4, 4, 4, 'Column Title 5', 'path/to/pic', 'Column Body/Info Here');
            columns[5] = this.makeColumn(5, 5, 5, 5, 'Column Title 6', 'path/to/pic', 'Column Body/Info Here');
            columns[6] = this.makeColumn(6, 6, 6, 6, 'Column Title 7', 'path/to/pic', 'Column Body/Info Here');
            columns[7] = this.makeColumn(7, 7, 7, 7, 'Column Title 8', 'path/to/pic', 'Column Body/Info Here');
            return columns;
        }
    }

    
	//for (i = 0; i < 7; i++) { 
    //
    //}
    //window.setInterval(reorderColumns(), 5000);
    var counter = 1;

    jQuery('#rotate-active-tab').on('click', function(evt){ 
        var current_tab = jQuery('.nav-tabs .active');
        var current_tab_num = jQuery('.nav-tabs .active').data().tabNum;

        var next_tab_num = parseInt(current_tab_num) + 1;
        if (next_tab_num === 5)
        {
            next_tab_num = 1;
        }

        var next_tab_class = ".tab-" + String(next_tab_num);
        jQuery(next_tab_class).toggleClass("active");
        jQuery(current_tab).toggleClass("active");
        // passing currenly active class to reorder columns function
        polarColumns = new Columns();
        polarColumns.reorderColumns(next_tab_class, next_tab_num);

    });//reorderColumns());


});