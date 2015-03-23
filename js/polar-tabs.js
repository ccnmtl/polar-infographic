jQuery(document).ready(function() {  

	var Column = function (tab_one, tab_two, tab_three, tab_four, title, pic, content){
	    this.tab_1 = tab_one;
	    this.tab_2 = tab_two;
	    this.tab_3 = tab_three;
	    this.tab_4 = tab_four;
	    this.title = title;
	    this.pic = pic;
	    this.content = content;
	};
	
    var columns = []

    col_1 = new Column(0, 0, 0, 0, 'Column Title 1', 'path/to/pic', 'Column Body/Info Here');
    col_2 = new Column(1, 1, 1, 1, 'Column Title 2', 'path/to/pic', 'Column Body/Info Here');
    col_3 = new Column(2, 2, 2, 2, 'Column Title 3', 'path/to/pic', 'Column Body/Info Here');
    col_4 = new Column(3, 3, 3, 3, 'Column Title 4', 'path/to/pic', 'Column Body/Info Here');
    col_5 = new Column(4, 4, 4, 4, 'Column Title 5', 'path/to/pic', 'Column Body/Info Here');
    col_6 = new Column(5, 5, 5, 5, 'Column Title 6', 'path/to/pic', 'Column Body/Info Here');
    col_7 = new Column(6, 6, 6, 6, 'Column Title 7', 'path/to/pic', 'Column Body/Info Here');
    col_8 = new Column(7, 7, 7, 7, 'Column Title 8', 'path/to/pic', 'Column Body/Info Here');
    columns.push(col_1);  //columns[{}] + "<br>";
    columns.push(col_2);
    columns.push(col_3);
    columns.push(col_4);
    columns.push(col_5);
    columns.push(col_6);
    columns.push(col_7);
    columns.push(col_8);

    //console.log(columns);

    function reorderColumns(active_tab, active_num){
    	console.log("Inside order columns");
        for (i = 0; i < columns.length; i++) { 
        	console.log("columns[active_num]");
        	console.log(columns[active_num]);
        	// this will return the order the column has
        	var current_column_order = columns[active_num];
        	console.log("current_column_order");
        	console.log(current_column_order);
        	//var column_num = '.column-' + String(active_num);
        	//jQuery(active_tab).jQuery(column_num).innerHTML(columns[active_num]);
            //columns[i]
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
        reorderColumns(next_tab_class, next_tab_num);

    });//reorderColumns());


});