+(function (window, document, $) {
	'use script';
    
    function PageBar(opt) {
        if(!(this instanceof PageBar)) {
            return new PageBar(opt);
        }

        this.options = {
            container : '', //分页显示容器
            pageSize : 20, //单页显示记录条数
            curPage : 1, //当前页
            total : 0, //记录数
            onPageChange : function(){} //翻页回调
        };
        
        if ($.isPlainObject(opt)) {
			$.extend(this.options, opt);
		}
    }
    
    PageBar.prototype = {
       
        showPageBar : function(curPage, totalCount){

            var that = this;
            $(this.options.container).html('');

            var totalPage = (totalCount % this.options.pageSize > 0) ? (parseInt(totalCount / this.options.pageSize, 10) + 1) : parseInt(totalCount / this.options.pageSize, 10);
            
            this.options.curPage = curPage;
            var tempHTML = '<div class="pages-wrap">';
            //上一页
            if(curPage > 1){
                tempHTML += '<a href="#" class="page">上一页</a>';
            }
            //页码
            if(totalPage <= 7){ //7页全部显示
                for(var i = 1; i <= totalPage; i++){
                    tempHTML += '<a href="#" class="page ' + ((i == curPage) ? 'active' : '') + '">' + i + '</a>';
                }
            }else if(curPage - 2 <= 1){ //1，2，3，4，...，总页数
                for(var i = 1; i<= 4; i++){
                    tempHTML += '<a href="#" class="page ' + ((i == curPage) ? 'active' : '') + '">' + i + '</a>';
                }
                tempHTML += '<a href="#">...</a>';
                tempHTML += '<a href="#" class="page">' + totalPage + '</a>';
            }else if(curPage + 2 >= totalPage){ //1，...，总页数-3，总页数-2，总页数-1，总页数
                tempHTML += '<a href="#" class="page">1</a>';
                tempHTML += '<a href="#">...</a>';
                for(var i = totalPage - 3; i <= totalPage; i++){
                    tempHTML += '<a href="#" class="page ' + ((i == curPage) ? 'active' : '') + '">' + i + '</a>';
                }
            }else{ //1，...，当前页-1，当前页，当前页+1，...，总页数
                tempHTML += '<a href="#" class="page">1</a>';
                tempHTML += '<a href="#">...</a>';
                for(var i = curPage - 1; i <= curPage + 1; i++){
                    tempHTML += '<a href="#" class="page ' + ((i == curPage) ? 'active' : '') + '">' + i + '</a>';
                }
                tempHTML += '<a href="#">...</a>';
                tempHTML += '<a href="#" class="page">' + totalPage + '</a>';
            }
            //下一页
            if(curPage < totalPage){
                tempHTML += '<a href="#" class="page">下一页</a>';
            }
            tempHTML += '</div>';
            $(this.options.container).html(tempHTML);

            $(this.options.container).find('.page').on('click', {context: this}, this.pageChanged);
        },
        pageChanged : function(ev){
            ev.preventDefault();
            
            var that = ev.data.context;
            var $node = $(ev.currentTarget);
            var val = $node.html();
            var curPage = that.options.curPage;
            var page = 0;
            if(val == '上一页'){
                page = curPage - 1;
            }else if(val == '下一页'){
                page = curPage + 1;
            }else if(/^\d+$/.test(val) && val != curPage){
                page = val;
            }
            if(page != "0"){
                that.options.onPageChange.apply(this, [parseInt(page, 10)]);
            }
        }
    };

	$.PageBar = PageBar;
})(window, document, jQuery);