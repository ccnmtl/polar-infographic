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

    this.columnArray = [
            { 
                position: {
                    tab_1: 0, 
                    tab_2: 7,
                    tab_3: 6,
                    tab_4: 5,
                },
                title: 'Column Title 1',
                image:'path1/to1/pic1',
                text: 'Column1 Body1/Info1 Here1'
            },
            { 
                position: {
                    tab_1: 1, 
                    tab_2: 6,
                    tab_3: 7,
                    tab_4: 6,
                },
                title: 'Column Title 2',
                image:'path2/to2/pic2',
                text: 'Column2 Body2/Info2 Here2'
            },
            { 
                position: {
                    tab_1: 2, 
                    tab_2: 5,
                    tab_3: 4,
                    tab_4: 7,
                },
                title: 'Column Title 3',
                image:'path3/to3/pic3',
                text: 'Column3 Body3/Info3 Here3'
            },
            { 
                position: {
                    tab_1: 3, 
                    tab_2: 4,
                    tab_3: 5,
                    tab_4: 0,
                },
                title: 'Column Title 4',
                image:'path4/to4/pic4',
                text: 'Column4 Body4/Info4 Here4'
            },
            { 
                position: {
                    tab_1: 4, 
                    tab_2: 3,
                    tab_3: 2,
                    tab_4: 1,
                },
                title: 'Column Title 5',
                image:'path5/to5/pic5',
                text: 'Column5 Body5/Info5 Here5'
            },
            { 
                position: {
                    tab_1: 5, 
                    tab_2: 2,
                    tab_3: 3,
                    tab_4: 2,
                },
                title: 'Column Title 6',
                image:'path6/to6/pic6',
                text: 'Column6 Body6/Info6 Here6'
            },
            { 
                position: {
                    tab_1: 6, 
                    tab_2: 1,
                    tab_3: 0,
                    tab_4: 3,
                },
                title: 'Column Title 7',
                image:'path7/to7/pic7',
                text: 'Column7 Body7/Info7 Here7'
            },
            { 
                position: {
                    tab_1: 7, 
                    tab_2: 0,
                    tab_3: 1,
                    tab_4: 4,
                },
                title: 'Column Title 8',
                image:'path8/to8/pic8',
                text: 'Column8 Body8/Info8 Here8'
            }
    ];
    
    
    this.addColumn = function(tab_one, tab_two, tab_three, tab_four, new_title, pic, content){
        this.columnArray.push({ position: {tab_1: tab_one, tab_2: tab_two, tab_3: tab_three, tab_4: tab_four}, title: new_title, image: pic, text: content});
    };
}//end Columns

jQuery(document).ready(function() {
    var initColumn = new Columns();
    initColumn.reorderColumns(0,1);
    //initColumn.columnArray = [];
    //console.log("initColumn.columnArray");
    //console.log(initColumn.columnArray);
    
    url = 'https://spreadsheets.google.com/feeds/list/1rqeGy7IU7wHK5QPUzanPXr85VGwPVwa2-kmUh2is43o/od6/public/values?alt=json';
    jQuery.getJSON(url, function(data) {
      //we will end up hardcoding the colum names into the code
      //console.log(data.feed.entry);
      //console.log(data.feed.entry[0]);//descriptions of projects
      //console.log(data.feed.entry[1]);//path to image for projects
      //console.log(data.feed.entry[2]); //1 (Tab-1?)
      //console.log(data.feed.entry[3]); //1 (Tab-2?)
      //console.log(data.feed.entry[4]); //1 (Tab-3?)
      //console.log(data.feed.entry[5]); //1 (Tab-4?)
      //console.log(data.feed.entry[0]['gsx$projectname2']);
      //console.log(data.feed.entry[0]['gsx$projectname3']);
      //console.log("data.feed.entry[0]['gsx$projectname1']");
      //console.log(data.feed.entry[0]['gsx$projectname1']);
      for (i = 0; i < 7; i++) { 
    	  var proj_name = 'gsx$projectname' + String( i + 1 );
    	  //console.log("proj_name");
    	  //console.log(proj_name);
    	  initColumn.addColumn(data.feed.entry[2][proj_name], data.feed.entry[3][proj_name], data.feed.entry[4][proj_name], data.feed.entry[5][proj_name], data.feed.entry[0][proj_name], data.feed.entry[1][proj_name], data.feed.entry[0][proj_name]);
    	  //initColumn.columnArray.push(data.feed.entry[0][proj_name]);
    	  //console.log("data.feed.entry[0][proj_name]");
    	  //console.log(data.feed.entry[0][proj_name]);
      }
    });
    console.log("initColumn.columnArray");
    console.log(initColumn.columnArray);

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
        
        initColumn.reorderColumns(next_tab, next_tab_num);
        jQuery(current_tab).toggleClass("active");
        jQuery(current_pane).toggleClass("active");
        jQuery(next_tab).toggleClass("active");
        jQuery(next_pane).toggleClass("active");
      	
      }, 2000);
});