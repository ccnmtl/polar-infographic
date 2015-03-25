Columns = function(){
    this.init = function(){
        this.getData();
        this.startTabRotation();
    };

    this.getData = function(){
        // remember that initColumn is a global window var. We are doing this
        // so we can attach data to it within the scope of the .getJson call. 
        // it ends up being the instantiated version of "this" - which is 
        // the "class" scope of Columns.
        url = 'https://spreadsheets.google.com/feeds/list/1rqeGy7IU7wHK5QPUzanPXr85VGwPVwa2-kmUh2is43o/od6/public/values?alt=json';
        jQuery.getJSON(url, function(data) {

          for (i = 0; i < 7; i++) { 
              var proj_name = 'gsx$projectname' + String( i + 1 );
              activeColumns.addColumn(data.feed.entry[2][proj_name],
                                   data.feed.entry[3][proj_name],
                                   data.feed.entry[4][proj_name],
                                   data.feed.entry[5][proj_name],
                                   data.feed.entry[0][proj_name],
                                   data.feed.entry[1][proj_name],
                                   data.feed.entry[0][proj_name]);
          }
        })
    };

    this.startTabRotation = function(){
        window.setInterval(function() {
            var current_tab = jQuery('.nav-tabs .active');
            var current_tab_num = jQuery('.nav-tabs .active').data().tabNum;
            var current_pane = ".tab-" + String(current_tab_num) + "-pane";
            var next_tab_num = parseInt(current_tab_num) + 1;

            if (next_tab_num === 5)
            {
                next_tab_num = 1;
            }
        
            var next_tab = ".tab-" + String(next_tab_num);
            var next_pane = ".tab-" + String(next_tab_num) + "-pane";
        
            activeColumns.reorderColumns(next_tab, next_tab_num);
            jQuery(current_tab).toggleClass("active");
            jQuery(current_pane).toggleClass("active");
            jQuery(next_tab).toggleClass("active");
            jQuery(next_pane).toggleClass("active");
            //console.log("initColumn.columnArray");
            //console.log(JSON.stringify(initColumn.columnArray));
          }, 2000);
    }

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

        for (i = 0; i < this.columnArray.length; i++) { 
        	var tab_num = 'tab_' + String(active_num);
        	var current_column_order = this.columnArray[i]['position'][tab_num];
            current_column_order = current_column_order + 1;
            var tab_pane = 'div#tab-' + String(active_num) + '-container';
            var column_num = ' div.column-' + String(current_column_order);
            var exp = String(tab_pane + column_num);
            var ct = " div.column-title";
            var cp = " div.column-pic";
            var cc = " div.column-content";
            jQuery(exp + ct).text(this.columnArray[i]['title']);
            jQuery(exp + cp).text(this.columnArray[i]['image']);
            jQuery(exp + cc).text(this.columnArray[i]['text']);

        }

    };

    this.columnArray = [];
    
    this.addColumn = function(tab_one, tab_two, tab_three, tab_four, new_title, pic, content){

    	//var json_string = String({ position: {tab_1: tab_one, tab_2: tab_two, tab_3: tab_three, tab_4: tab_four}, title: new_title, image: pic, text: content});
    	//console.log("json_string");
        //console.log(json_string);
    	//var json_obj = JSON.parse(json_string);
    	var json_obj = { position: {tab_1: tab_one['$t'], tab_2: tab_two['$t'], tab_3: tab_three['$t'], tab_4: tab_four['$t']}, title: new_title['$t'], image: pic['$t'], text: content['$t']};
    	//console.log("json_obj");
        //console.log(json_obj);
        this.columnArray.push(json_obj);
        //console.log("this.columnArray");
        //console.log(this.columnArray);
    };
    
    this.init();
}//end Columns

jQuery(document).ready(function() {
   window.activeColumns = new Columns(); 
});