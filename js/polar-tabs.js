Columns = function() {
    this.init = function() {
      //arguable how you realy want to set instatiated properties here...
      this.columnArray = [];
      this.slideTime = 5000;
      // There is only one. Make it accessible to the data coming in.
      window.polarColumns = this;

      url = 'https://spreadsheets.google.com/feeds/list/1rqeGy7IU7wHK5QPUzanPXr85VGwPVwa2-kmUh2is43o/od6/public/values?alt=json';
      jQuery.getJSON(url, function(data) {
        polarColumns.entries = data.feed.entry;
        for (i = 0; i < polarColumns.entries.length; i++) { 
          var projData = polarColumns.entries[i];
          var columnData = {
            'tabOne': projData.gsx$tab1order.$t,
            'tabTwo': projData.gsx$tab2order.$t,
            'tabThree': projData.gsx$tab3order.$t,
            'tabFour': projData.gsx$tab4order.$t,
            'newTitle': projData.gsx$projectname.$t,
            'pic': projData.gsx$imagelink.$t,
            'content': projData.gsx$projectdescription.$t,
            'link': projData.gsx$projectpagelink.$t
          };
          
          polarColumns.addColumn(columnData);
        
        };
      }).complete(function() {
        // need to actually load the template html with 
        // the data we returned from spreadsheet
        polarColumns.loadHtmlContent();
        polarColumns.showColumns();
        window.setInterval(function() {
            // let's do this first so we don't waste any time/memory
            if(jQuery('#infographic-container:hover').length){
                  return;
            };

            var currentTab = jQuery('.nav-tabs .active');
            var currentTabNum = jQuery('.nav-tabs .active').data().tabNum;
            var current_pane = ".tab-" + String(currentTabNum) + "-pane";
            var parseTabNum = parseInt(currentTabNum) + 1;
            var nextTabNum = (parseTabNum === 5) ? 1 : parseTabNum;
            var nextTab = ".tab-" + String(nextTabNum);
            var nextPane = ".tab-" + String(nextTabNum) + "-pane";
      
            polarColumns.reorderColumns(nextTab, nextTabNum);
            jQuery(currentTab).toggleClass("active");
            jQuery(current_pane).toggleClass("active");
            jQuery(nextTab).toggleClass("active");
            jQuery(nextPane).toggleClass("active");
        }, polarColumns.slideTime);
      }).error(function() {
        alert('We are sorry. Something happened with loading the Partner Matrix. Please reload this page to try loading again.');
      });
    };

     this.showColumns = function() {
      jQuery('#infographic-container').show();
    };

    this.loadHtmlContent = function() {
      this.setTitles();
      this.setSubTitles();
      this.reorderColumns(0, 1);
      this.reorderColumns(1, 2);
      this.reorderColumns(2, 3);
      this.reorderColumns(3, 4);
      this.reorderColumns(5, 0);
    };

    this.reorderColumns = function(active_tab, active_num) {
      //create columns
      for (i = 0; i < this.columnArray.length; i++) { 
        var tabNum = 'tab_' + String(active_num);
        var tabPane = 'div#tab-' + String(active_num) + '-container';
        var currentColumnOrder = this.columnArray[i]['position'][tabNum];
        var column_num = ' div.column-' + String(currentColumnOrder);
        var exp = String(tabPane + column_num);
        var ct = " div.column-title";
        var cp = " div.column-pic";
        var cc = " div.column-content";
        var link = " div.column-link";

        jQuery(exp + ct).text(this.columnArray[i]['title']);
        jQuery(exp + cp).children().remove();
        jQuery(exp + cp).append('<img src="' + this.columnArray[i]['image'] + '"/>');
        jQuery(exp + cc).text(this.columnArray[i]['text']);
        jQuery(exp + link).text(this.columnArray[i]['link']);
        jQuery(exp + link).attr('data-link',this.columnArray[i]['link']);
        
        // set click handler to open new window on clicked column  
        jQuery(tabPane).find('.partner-column').click(function(event){
          var link = jQuery(this).children('div.column-link').data().link;
          window.open(link, '_self');
        });
      };// end .click
    };

    this.setTitles = function(){
      //need to hardcode the retrival for these
      tabOneTitle = polarColumns.entries[0].gsx$tab1title.$t;
      tabTwoTitle = polarColumns.entries[0].gsx$tab2title.$t;
      tabThreeTitle = polarColumns.entries[0].gsx$tab3title.$t;
      tabFourTitle = polarColumns.entries[0].gsx$tab4title.$t;
      jQuery('#tab-1-title').text(tabOneTitle);
      jQuery('#tab-2-title').text(tabTwoTitle);
      jQuery('#tab-3-title').text(tabThreeTitle);
      jQuery('#tab-4-title').text(tabFourTitle);
      jQuery('#tab01').children('a').text(tabOneTitle);
      jQuery('#tab02').children('a').text(tabTwoTitle);
      jQuery('#tab03').children('a').text(tabThreeTitle);
      jQuery('#tab04').children('a').text(tabFourTitle);

    };

    this.setSubTitles = function(){
      //need to hardcode the retrival for these
      var subTitleOneLeft = polarColumns.entries[0].gsx$tab1subtitles.$t;
      var subTitleOneRight = polarColumns.entries[1].gsx$tab1subtitles.$t;
      var subTitleTwoLeft = polarColumns.entries[0].gsx$tab2subtitles.$t;
      var subTitleTwoRight = polarColumns.entries[1].gsx$tab2subtitles.$t;
      var subTitleThreeLeft = polarColumns.entries[0].gsx$tab3subtitles.$t;
      var subTitleThreeRight = polarColumns.entries[1].gsx$tab3subtitles.$t;
      var subTitleFourLeft = polarColumns.entries[0].gsx$tab4subtitles.$t;
      var subTitleFourRight = polarColumns.entries[1].gsx$tab4subtitles.$t;
      jQuery('#subtitle-1-left').text(subTitleOneLeft);
      jQuery('#subtitle-1-right').text(subTitleOneRight);
      jQuery('#subtitle-2-left').text(subTitleTwoLeft);
      jQuery('#subtitle-2-right').text(subTitleTwoRight);
      jQuery('#subtitle-3-left').text(subTitleThreeLeft);
      jQuery('#subtitle-3-right').text(subTitleThreeRight);
      jQuery('#subtitle-4-left').text(subTitleFourLeft);
      jQuery('#subtitle-4-right').text(subTitleFourRight);

    };

    this.addColumn = function(columnData) {
      // format the json so it is readable
      var jsonObj = {
        position: {
          tab_1: columnData.tabOne, 
          tab_2: columnData.tabTwo,
          tab_3: columnData.tabThree,
          tab_4: columnData.tabFour
        },
        title: columnData.newTitle,
        image: columnData.pic,
        text: columnData.content,
        link: columnData.link
      };
      
      this.columnArray.push(jsonObj);
      
    };
    
    // init thy self.
    this.init();

}//end Columns

jQuery(document).ready(function() {
   polarColumns = new Columns(); 
});