Columns = function(){
    this.init = function(){
        
    };

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
    	console.log(active_tab);
        console.log(active_num);
        //console.log("Inside order columns");
        //console.log(this.columnArray);
        for (i = 0; i < this.columnArray.length; i++) { 
            //console.log("columns[active_num]");
            //console.log(columns[active_num]);
            // this will return the order the column has
        	console.log(this.columnArray[i]['title']);
            var current_column_order = this.columnArray[i][active_num];
            //console.log("current_column_order");
            //console.log(current_column_order);
            var column_num = '.column-' + String(active_num);
            jQuery(column_num).text(this.columnArray[active_num].text);
            //this.columnArray[i]
        }

    };

    this.columnArray = [
            { 
                position: {
                    tab_1: 0, 
                    tab_2: 0,
                    tab_3: 0,
                    tab_4: 0,
                },
                title: 'Column Title 1',
                image:'path/to/pic',
                text: 'Column Body/Info Here'
            },
            { 
                position: {
                    tab_1: 1, 
                    tab_2: 1,
                    tab_3: 1,
                    tab_4: 1,
                },
                title: 'Column Title 2',
                image:'path/to/pic',
                text: 'Column Body/Info Here'
            },
            { 
                position: {
                    tab_1: 2, 
                    tab_2: 2,
                    tab_3: 2,
                    tab_4: 2,
                },
                title: 'Column Title 3',
                image:'path/to/pic',
                text: 'Column Body/Info Here'
            },
            { 
                position: {
                    tab_1: 3, 
                    tab_2: 3,
                    tab_3: 3,
                    tab_4: 3,
                },
                title: 'Column Title 4',
                image:'path/to/pic',
                text: 'Column Body/Info Here'
            },
            { 
                position: {
                    tab_1: 4, 
                    tab_2: 4,
                    tab_3: 4,
                    tab_4: 4,
                },
                title: 'Column Title 5',
                image:'path/to/pic',
                text: 'Column Body/Info Here'
            },
            { 
                position: {
                    tab_1: 5, 
                    tab_2: 5,
                    tab_3: 5,
                    tab_4: 5,
                },
                title: 'Column Title 6',
                image:'path/to/pic',
                text: 'Column Body/Info Here'
            },
            { 
                position: {
                    tab_1: 6, 
                    tab_2: 6,
                    tab_3: 6,
                    tab_4: 6,
                },
                title: 'Column Title 7',
                image:'path/to/pic',
                text: 'Column Body/Info Here'
            },
            { 
                position: {
                    tab_1: 7, 
                    tab_2: 7,
                    tab_3: 7,
                    tab_4: 7,
                },
                title: 'Column Title 8',
                image:'path/to/pic',
                text: 'Column Body/Info Here'
            }
    ];
    
}//end Columns

jQuery(document).ready(function() {  
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
        var polarColumns = new Columns();
        polarColumns.reorderColumns(next_tab_class, next_tab_num);

    });//reorderColumns());
});