var APP = {
    init: function(){
        
        
        var cat_name = cat;
//        this.slider_menu();
//        this.ajax_get_list_posts(cat_name);
//        this.ajax_pagination_post();
//        this.load_data_from_menu();
//        this.get_details_posts();
//        this.search_posts();
//        this.getDateForm();
//        this.select_airport_customer();
//        this.clearInputCode();
     //   this.submitFormFlight();
      
    },
    check_internet: function(){
        if(window.navigator.onLine) { return 1; }
        else { return 0; }
   },
    
     clearInputCode: function(){
        $(document).ready(function(){
            
            // CLEAR TEXT INPUT
            $('#txt-input-diemdi-vi,#txt-input-diemden-vi,#txt-input-diemdi-en,#txt-input-diemden-en').click(function(){
                $(this).val('');
                $(this).focus();
            });
            
        });
        
    },
    select_airport_customer: function(){
        $(document).ready(function(){
            // AIRPORTS CUSOTMER DIEM DI VI
            $('#txt-input-diemdi-vi').autocomplete({
                source: function(request, response) {
                        $('.box-container-ajax.diemdi-vi').addClass('hidden');
                        var val_text = $('#txt-input-diemdi-vi').val();
                        var lang = 'vn';
                        $.ajax({
                            url: 'http://admin.vietnambooking.com/wp-admin/admin-ajax.php',
                            type:'post',
                            cache: false,
                            dataType :'json',
                            data: {action : 'ajax_get_code_airports_form',val_text:val_text,lang:lang},
                            success: function(data) {                
                             
                              response(data);
                              
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                //alert(xhr.status);
                                //alert(thrownError);
                          }
                        });    
                        
                },
                minLength: 2,
                 select: function( event, ui ) {
                      var code_airports  = ui.item.value;
                      
                      var str_code = code_airports.replace(/.*\(/g, "");
                      str_code = $.trim(str_code.replace(")", ""));
                      $('.departure.vn').val(str_code);
                    
                      
                      //alert('test: '+str_code);
                      // return false;
                }
            });  
            
            // AIRPORTS CUSOTMER DIEM DEN VI
            $('#txt-input-diemden-vi').autocomplete({
                source: function(request, response) {
                        $('.box-container-ajax.diemden-vi').addClass('hidden');
                        var val_text = $('#txt-input-diemden-vi').val();
                        var lang = 'vn';
                        $.ajax({
                            url: 'http://admin.vietnambooking.com/wp-admin/admin-ajax.php',
                            type:'post',
                            cache: false,
                            dataType :'json',
                            data: {action : 'ajax_get_code_airports_form',val_text:val_text,lang:lang},
                            success: function(data) {                
                             //console.log(request);
                              response(data);
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                //alert(xhr.status);
                                //alert(thrownError);
                          }
                        });    
                        
                },
                minLength: 2,
                 select: function( event, ui ) {
                      var code_airports  = ui.item.value;
                    
                      var str_code = code_airports.replace(/.*\(/g, "");
                      str_code = $.trim(str_code.replace(")", ""));
                      $('.destination.vn').val(str_code);
                      
                      //alert('test: '+str_code);
                      // return false;
                }
            });
         
         //******************************************************************
         
        });
    },
   
    getDateForm: function()
    {
      $(document).on('pageshow',function(){
          var now = new Date();
            // *******************
            var weekday = new Array(7);
            weekday[0]=  "Chủ nhật";
            weekday[1] = "Thứ hai";
            weekday[2] = "Thứ ba";
            weekday[3] = "Thứ tư";
            weekday[4] = "Thứ năm";
            weekday[5] = "Thứ sáu";
            weekday[6] = "Thứ bảy";

            var thu = weekday[now.getDay()];
             var ngay = now.getDate()+'';
             ngay = (ngay.length==1)?'0'+ngay:ngay;
             $('.slc-ngaydi option:contains('+ngay+')').attr('selected','selected');
             $('span.slc-ngaydi').text(ngay);
             
             var str_ngay = ngay;
             var str_thangnam = '';
             
              var str_ngay_ve = ngay;
             var str_thangnam_ve = '';
             
             // ***************************
             var month = new Array();
                month[0] = "01";
                month[1] = "02";
                month[2] = "03";
                month[3] = "04";
                month[4] = "05";
                month[5] = "06";
                month[6] = "07";
                month[7] = "08";
                month[8] = "09";
                month[9] = "10";
                month[10] = "11";
                month[11] = "12";
          
          
            for(var i = 0; i<=12; i++)
            {
                var thang_next = 0;
                var year_next = 0;
                if(i==0)
                {
                   thang_next = now.setMonth(now.getMonth());
                   thang_next = now.getMonth();
                   thang_next = month[thang_next];
                   year_next = now.getFullYear();  
                   $('span.slc-namthangdi').append(thang_next+'/'+year_next);
                   str_thangnam = thang_next+''+year_next;
                   str_thangnam_ve = thang_next+''+year_next;
                }
                else
                {
                    thang_next = now.setMonth(now.getMonth() + 1);
                    thang_next = now.getMonth();
                    thang_next = month[thang_next];
                    year_next = now.getFullYear();
                    
                   // str_thangnam = thang_next+''+year_next;
                    
                }
                $('select.slc-namthangdi').append('<option value="'+thang_next+year_next+'">'+thang_next+'/'+year_next+'</option>');
                $('select.slc-namthangve').append('<option value="'+thang_next+year_next+'">'+thang_next+'/'+year_next+'</option>');
                  
            }
            
            
            $('.slc-ngaydi').change(function(){
                var ngay = $(this).val();
                $('.slc-ngaydi option').removeAttr('selected');
                $('.slc-ngaydi option:contains('+ngay+')').attr('selected','selected');
                str_ngay = ngay;
                
                var str_date_depart = str_ngay+''+str_thangnam;
                $('#departuredate-internation').val(str_date_depart);
                
            });
            
            $('.slc-ngayve').change(function(){
                var ngay = $(this).val();
                $('.slc-ngayve option').removeAttr('selected');
                $('.slc-ngayve option:contains('+ngay+')').attr('selected','selected');
                if($.trim(ngay)!='')
                {
                    str_ngay_ve = ngay;
                    var str_date_return = str_ngay_ve+''+str_thangnam_ve;
                    $('#returndate-internation').val(str_date_return);
                }
                
                
            });
           
           
            $('select.slc-namthangdi').change(function(){
                var thangnam = $(this).val();
                str_thangnam = thangnam;
                var str_date_depart = str_ngay+''+str_thangnam;
                $('#departuredate-internation').val(str_date_depart);
                
            });
            
            $('select.slc-namthangve').change(function(){
                var thangnam_ve = $(this).val();
                str_thangnam_ve = thangnam_ve;
                var str_date_return = str_ngay_ve+''+str_thangnam_ve;
                $('#returndate-internation').val(str_date_return);
                
            });
            
            $('input[name="Itinerary"]').change(function(){
                var chk_val = $(this).val();
                if(chk_val =='Oneway')
                {
                    $('.tr-return').addClass('hidden');
                }
                else
                {
                    $('.tr-return').removeClass('hidden');
                }
                
            });
            
            
            var str_date_depart = str_ngay+''+str_thangnam;
            $('#departuredate-internation').val(str_date_depart);
            $('#returndate-internation').val(str_date_depart);
            
        //    var nam = now.getFullYear();
         //   var gio = now.getHours();
         //   var phut = now.getMinutes();
       //     var giay = now.getSeconds();
        //    var str_date = thu+', '+ngay+'/'+thang+'/'+nam+' | '+gio+':'+phut+' GMT+7';
        
        
        
        
          
            
      });  
    },
    search_posts: function()
    {
      $(document).on('pageshow',function(){
          
          $(document).on('click','.btn-search',function(){
              
              var currentUrl = $.mobile.activePage.data('url');
               
                var res = currentUrl.split("/");
                var dem  = res.length - 1;
               
                if(res[dem]=== 'chi-tiet.html')
                {
                       
                       var val_s = $('.txt-search.details-page').val();
                        $('#list-posts.details-page li').remove();
                        $('.title-h1').remove();
                        $('#list-posts.details-page').before("<h1 class='title-h1'>Tìm: "+val_s+"</h1>");
                       

                        $('#box-content-page.details-page').addClass('hidden');
                        $('#box-details-content.details-page').addClass('hidden');

                        $('#box-content-layout.details-page').addClass('loadding');
                        $('#box-content-layout.details-page').removeClass('hidden');

                         $.ajax({
                            url: 'https://www.vietnambooking.com/wp-admin/admin-ajax.php',
                            type:'post',
                            cache: true,
                            crossDomain: true,
                            data: {action : 'ajax_get_search_list_posts_query',val_s:val_s},
                            success: function(data) { 

                              $('#box-content-layout.details-page').removeClass('loadding');
                              $('.ajax-pagination-post-list.details-page').removeClass('hidden');
                               $('#list-posts.details-page').html(data);
                            },
                            error: function(data,response){ 
                            }
                         }); 
                }
                else
                {
                    
                    var val_s = $('.txt-search').val();
                    $('#list-posts li').remove();
                    $('.title-h1').remove();
                    $('#list-posts').before("<h1 class='title-h1'>Tìm: "+val_s+"</h1>");

                    $('#box-content-page').addClass('hidden');
                    $('#box-details-content').addClass('hidden');
                    
                    $('#box-content-layout').addClass('loadding');
                    $('#box-content-layout').removeClass('hidden');

                     $.ajax({
                        url: 'https://www.vietnambooking.com/wp-admin/admin-ajax.php',
                        type:'post',
                        cache: true,
                        crossDomain: true,
                        data: {action : 'ajax_get_search_list_posts_query',val_s:val_s},
                        success: function(data) { 
                            
                          $('#box-content-layout').removeClass('loadding');
                          $('.ajax-pagination-post-list').removeClass('hidden');
                           $('#list-posts').html(data);
                        },
                        error: function(data,response){ 
                        }
                     }); 
                }
              
              
              
            
            
          });
          
      });  
    },
    get_details_posts : function()
    {
        $(document).on('pagechange',function(e){
        
            var dem = 0;
            $(document).on('click','ul#list-posts li a',function(){
               
                   
                    var id = $(this).attr('data-id');
                    var title = $(this).attr('data-title');
                    
                    
                    $('#box-content-layout.details-page').addClass('hidden');
                    
                    
                    $('#box-details-content.details-page').addClass('loadding');
                    $('#box-details-content.details-page').html('');
                    $.ajax({
                            url: 'https://www.vietnambooking.com/wp-admin/admin-ajax.php',
                            type:'post',
                            cache: true,
                            crossDomain: true,
                           // contentType : "text/html",
                          //  dataType: 'jsonp',
                            data: {action : 'ajax_get_details_posts_query',id:id},
                            success: function(data) {  
                                
                                var str_h1 = '<h1 class="title-h1">'+title+'</h1>';
                               $('#box-details-content.details-page').removeClass('loadding');
                               $('#box-details-content.details-page').removeClass('hidden');
                               $('#box-details-content.details-page').html(str_h1+data);
                            },
                            error: function(data,response){

                            }

                         }); 
                
            });
        });
    },
    load_data_from_menu : function()
    {
        $(document).on('pageshow',function(e){
            
            $(document).on('click','h1.ui-title a',function(e){
                
                e.preventDefault();
                location.href = 'index.html';
                
            });
            
            $(document).on('click','.swiper-wrapper a,#nav-menu-right-header ul li a',function(){

                e.preventDefault();
                var currentUrl = $.mobile.activePage.data('url');
               
                var res = currentUrl.split("/");
                var dem  = res.length - 1;
               
                if(res[dem]=== 'chi-tiet.html')
                {
                    var val_a = $(this).attr('data-text');
                        if(val_a == 'gioi-thieu')
                        {
                            $('#box-content-page.details-page').removeClass('hidden');

                            $("#box-content-layout.details-page").addClass('hidden');
                            $("#box-details-content.details-page").addClass('hidden');
                            
                            $('#box-content-form.details-page .form-quocte').addClass('hidden');
                            $('#box-content-form.details-page .form-noidia').addClass('hidden');

                            $("#box-content-page.details-page").load("gioi-thieu.txt"); 

                        }
                        if(val_a == 'index')
                        {
                           location.href = 'index.html';
                        }
                        if(val_a == 'dat-ve-noi-dia')
                        {
                            $('#box-content-form.details-page .form-quocte').addClass('hidden');
                            $('#box-content-form.details-page .form-noidia').removeClass('hidden');

                            $("#box-content-layout.details-page").addClass('hidden');
                            $("#box-details-content.details-page").addClass('hidden');
                            $("#box-content-page.details-page").addClass('hidden');

                           // $("#box-content-page.details-page").load("dat-ve-noi-dia.txt");
                        }
                        if(val_a == 'dat-ve-quoc-te')
                        {
                           $('#box-content-form.details-page .form-quocte').removeClass('hidden');
                            $('#box-content-form.details-page .form-noidia').addClass('hidden');

                            $("#box-content-layout.details-page").addClass('hidden');
                            $("#box-details-content.details-page").addClass('hidden');
                            $("#box-content-page.details-page").addClass('hidden');

                           // $("#box-content-page.details-page").load("dat-ve-quoc-te.txt");
                        }
                        if(val_a == 'khuyen-mai')
                        {
                            var str_h1 = '<h1 class="title-h1">Khuyến mãi</h1>';
                            
                             $('#box-content-page.details-page').addClass('hidden');
                             
                            $('#box-content-form.details-page .form-quocte').addClass('hidden');
                            $('#box-content-form.details-page .form-noidia').addClass('hidden');

                            $("#box-content-layout.details-page").removeClass('hidden');
                            
                            $("#box-details-content.details-page").addClass('hidden');



                            var cat_name = "Khuyến mãi";
                           $('#box-content-layout.details-page ul li').remove();
                            $('#box-content-layout.details-page').addClass('loadding');
                            $.ajax({
                                    url: 'https://www.vietnambooking.com/wp-admin/admin-ajax.php',
                                    type:'post',
                                    cache: true,
                                    crossDomain: true,
                                   // contentType : "text/html",
                                  //  dataType: 'jsonp',
                                    data: {action : 'ajax_get_list_posts_query',cat:cat_name},
                                    success: function(data) {  
                                       $('.ajax-pagination-post-list.details-page').removeClass('hidden');
                                       $('#box-content-layout.details-page').removeClass('loadding');
                                       $('#list-posts.details-page').html(str_h1+data);
                                    },
                                    error: function(data,response){

                                    }

                                 }); 
                        }
                        if(val_a == 'tin-tuc')
                        {
                            
                             var str_h1 = '<h1 class="title-h1">Tin tức</h1>';
                             
                             
                             $('#box-content-page.details-page').addClass('hidden');
                             
                            $('#box-content-form.details-page .form-quocte').addClass('hidden');
                            $('#box-content-form.details-page .form-noidia').addClass('hidden');
                             
                            $("#box-content-layout.details-page").removeClass('hidden');

                            $('#box-details-content.details-page').addClass('hidden');

                            var cat_name = "Tin tức";
                           $('#box-content-layout.details-page ul li').remove();
                            $('#box-content-layout.details-page').addClass('loadding');
                            $.ajax({
                                    url: 'https://www.vietnambooking.com/wp-admin/admin-ajax.php',
                                    type:'post',
                                    cache: true,
                                    crossDomain: true,
                                   // contentType : "text/html",
                                  //  dataType: 'jsonp',
                                    data: {action : 'ajax_get_list_posts_query',cat:cat_name},
                                    success: function(data) {  
                                       $('.ajax-pagination-post-list.details-page').removeClass('hidden');
                                       $('#box-content-layout.details-page').removeClass('loadding');
                                       $('#list-posts.details-page').html(str_h1+data);
                                    },
                                    error: function(data,response){

                                    }

                                 }); 
                        }
                        if(val_a == 'faqs')
                        {
                            var str_h1 = '<h1 class="title-h1">Câu hỏi thường gặp</h1>';
                            
                            $('#box-content-page.details-page').addClass('hidden');
                            
                            $('#box-content-form.details-page .form-quocte').addClass('hidden');
                            $('#box-content-form.details-page .form-noidia').addClass('hidden');
                            
                            $("#box-content-layout.details-page").removeClass('hidden');
                            
                            $('#box-details-content.details-page').addClass('hidden');
                            var cat_name = "Faqs";
                           $('#box-content-layout.details-page ul li').remove();
                            $('#box-content-layout.details-page').addClass('loadding');
                            $.ajax({
                                    url: 'https://www.vietnambooking.com/wp-admin/admin-ajax.php',
                                    type:'post',
                                    cache: true,
                                    crossDomain: true,
                                   // contentType : "text/html",
                                  //  dataType: 'jsonp',
                                    data: {action : 'ajax_get_list_posts_query',cat:cat_name},
                                    success: function(data) {  
                                       $('.ajax-pagination-post-list.details-page').removeClass('hidden');
                                       $('#box-content-layout.details-page').removeClass('loadding');
                                       $('#list-posts.details-page').html(str_h1+data);
                                    },
                                    error: function(data,response){

                                    }

                                 }); 

                        }
                        if(val_a == 've-may-bay-tet')
                        {
                             var str_h1 = '<h1 class="title-h1">Vé máy bay tết</h1>';
                             
                            $('#box-content-page.details-page').addClass('hidden');
                            
                            $('#box-content-form.details-page .form-quocte').addClass('hidden');
                            $('#box-content-form.details-page .form-noidia').addClass('hidden');
                            
                            $("#box-content-layout.details-page").removeClass('hidden');
                            
                            $('#box-details-content.details-page').addClass('hidden');
                            var cat_name = "Vé máy bay tết";
                            $('#box-content-layout.details-page ul li').remove();
                            $('#box-content-layout.details-page').addClass('loadding');
                            $.ajax({
                                    url: 'https://www.vietnambooking.com/wp-admin/admin-ajax.php',
                                    type:'post',
                                    cache: true,
                                    crossDomain: true,
                                   // contentType : "text/html",
                                  //  dataType: 'jsonp',
                                    data: {action : 'ajax_get_list_posts_query',cat:cat_name},
                                    success: function(data) {  
                                       $('.ajax-pagination-post-list.details-page').removeClass('hidden');
                                       $('#box-content-layout.details-page').removeClass('loadding');
                                       $('#list-posts.details-page').html(str_h1+data);
                                    },
                                    error: function(data,response){

                                    }

                                 }); 


                        }
                        if(val_a == 'thong-tin-lien-he')
                        {
                            $('#box-content-page.details-page').removeClass('hidden');

                            $('#box-content-form.details-page .form-quocte').addClass('hidden');
                            $('#box-content-form.details-page .form-noidia').addClass('hidden');

                            $('#box-details-content.details-page').addClass('hidden');
                            $("#box-content-layout.details-page").addClass('hidden');

                            $("#box-content-page.details-page").load("thong-tin-lien-he.txt");
                        }
                        if(val_a == 'hinh-thuc-thanh-toan')
                        {
                            $('#box-content-page.details-page').removeClass('hidden');
                            
                            $('#box-content-form.details-page .form-quocte').addClass('hidden');
                            $('#box-content-form.details-page .form-noidia').addClass('hidden');

                            $('#box-details-content.details-page').addClass('hidden');
                            $("#box-content-layout.details-page").addClass('hidden');

                            $("#box-content-page.details-page").load("hinh-thuc-thanh-toan.txt");
                        }
                }
                else
                {
                        var val_a = $(this).attr('data-text');
                        if(val_a == 'gioi-thieu')
                        {
                            $('#box-content-page').removeClass('hidden');

                            $("#box-content-layout").addClass('hidden');
                            $("#box-details-content").addClass('hidden');
                            
                            $('#box-content-form .form-noidia').addClass('hidden');
                            $('#box-content-form .form-quocte').addClass('hidden');

                            $("#box-content-page").load("gioi-thieu.txt"); 

                        }
                        if(val_a == 'index')
                        {
                           location.href = 'index.html';
                        }
                        if(val_a == 'dat-ve-noi-dia')
                        {
                            $('#box-content-form .form-quocte').addClass('hidden');
                            $('#box-content-form .form-noidia').removeClass('hidden');

                            $("#box-content-layout").addClass('hidden');
                            $("#box-details-content").addClass('hidden');
                            $("#box-content-page").addClass('hidden');


                           // $("#box-content-page").load("dat-ve-noi-dia.txt");
                        }
                        if(val_a == 'dat-ve-quoc-te')
                        {
                           $('#box-content-form .form-quocte').removeClass('hidden');
                            $('#box-content-form .form-noidia').addClass('hidden');

                            $("#box-content-layout").addClass('hidden');
                            $("#box-details-content").addClass('hidden');
                            $("#box-content-page").addClass('hidden');

                           // $("#box-content-page").load("dat-ve-quoc-te.txt");
                        }
                        if(val_a == 'khuyen-mai')
                        {
                             $('#box-content-page').addClass('hidden');

                            $("#box-content-layout").removeClass('hidden')
                            $("#box-content-layout h1.title-h1").text("Khuyến mãi");;
                            $("#box-details-content").addClass('hidden');
                            
                            $('#box-content-form .form-noidia').addClass('hidden');
                            $('#box-content-form .form-quocte').addClass('hidden');


                            var cat_name = "Khuyến mãi";
                           $('#box-content-layout ul li').remove();
                            $('#box-content-layout').addClass('loadding');
                            $.ajax({
                                    url: 'https://www.vietnambooking.com/wp-admin/admin-ajax.php',
                                    type:'post',
                                    cache: true,
                                    crossDomain: true,
                                   // contentType : "text/html",
                                  //  dataType: 'jsonp',
                                    data: {action : 'ajax_get_list_posts_query',cat:cat_name},
                                    success: function(data) {  
                                       $('.ajax-pagination-post-list').removeClass('hidden');
                                       $('#box-content-layout').removeClass('loadding');
                                       $('#list-posts').html(data);
                                    },
                                    error: function(data,response){

                                    }

                                 }); 
                        }
                        if(val_a == 'tin-tuc')
                        {
                             $('#box-content-page').addClass('hidden');
                             
                            $("#box-content-layout").removeClass('hidden');
                            $("#box-content-layout h1.title-h1").text("Tin tức");;

                            $('#box-content-form .form-noidia').addClass('hidden');
                            $('#box-content-form .form-quocte').addClass('hidden');
                            
                            $('#box-details-content').addClass('hidden');

                            var cat_name = "Tin tức";
                           $('#box-content-layout ul li').remove();
                            $('#box-content-layout').addClass('loadding');
                            $.ajax({
                                    url: 'https://www.vietnambooking.com/wp-admin/admin-ajax.php',
                                    type:'post',
                                    cache: true,
                                    crossDomain: true,
                                   // contentType : "text/html",
                                  //  dataType: 'jsonp',
                                    data: {action : 'ajax_get_list_posts_query',cat:cat_name},
                                    success: function(data) {  
                                       $('.ajax-pagination-post-list').removeClass('hidden');
                                       $('#box-content-layout').removeClass('loadding');
                                       $('#list-posts').html(data);
                                    },
                                    error: function(data,response){

                                    }

                                 }); 
                        }
                        if(val_a == 'faqs')
                        {

                            $('#box-content-page').addClass('hidden');
                            
                            $("#box-content-layout").removeClass('hidden');
                            $("#box-content-layout h1.title-h1").text("Câu hỏi thường gặp");;
                            
                            $('#box-content-form .form-noidia').addClass('hidden');
                            $('#box-content-form .form-quocte').addClass('hidden');
                            
                            $('#box-details-content').addClass('hidden');
                            var cat_name = "Faqs";
                           $('#box-content-layout ul li').remove();
                            $('#box-content-layout').addClass('loadding');
                            $.ajax({
                                    url: 'https://www.vietnambooking.com/wp-admin/admin-ajax.php',
                                    type:'post',
                                    cache: true,
                                    crossDomain: true,
                                   // contentType : "text/html",
                                  //  dataType: 'jsonp',
                                    data: {action : 'ajax_get_list_posts_query',cat:cat_name},
                                    success: function(data) {  
                                       $('.ajax-pagination-post-list').removeClass('hidden');
                                       $('#box-content-layout').removeClass('loadding');
                                       $('#list-posts').html(data);
                                    },
                                    error: function(data,response){

                                    }

                                 }); 

                        }
                        if(val_a == 've-may-bay-tet')
                        {
                            $('#box-content-page').addClass('hidden');
                            
                            $("#box-content-layout").removeClass('hidden');
                            $("#box-content-layout h1.title-h1").text("Vé máy bay tết");;
                            
                            $('#box-content-form .form-noidia').addClass('hidden');
                            $('#box-content-form .form-quocte').addClass('hidden');
                            
                            $('#box-details-content').addClass('hidden');
                            var cat_name = "Vé máy bay tết";
                            $('#box-content-layout ul li').remove();
                            $('#box-content-layout').addClass('loadding');
                            $.ajax({
                                    url: 'https://www.vietnambooking.com/wp-admin/admin-ajax.php',
                                    type:'post',
                                    cache: true,
                                    crossDomain: true,
                                   // contentType : "text/html",
                                  //  dataType: 'jsonp',
                                    data: {action : 'ajax_get_list_posts_query',cat:cat_name},
                                    success: function(data) {  
                                       $('.ajax-pagination-post-list').removeClass('hidden');
                                       $('#box-content-layout').removeClass('loadding');
                                       $('#list-posts').html(data);
                                    },
                                    error: function(data,response){

                                    }

                                 }); 


                        }
                        if(val_a == 'thong-tin-lien-he')
                        {
                            $('#box-content-page').removeClass('hidden');

                            $('#box-details-content').addClass('hidden');
                            $("#box-content-layout").addClass('hidden');
                            
                            $('#box-content-form .form-noidia').addClass('hidden');
                            $('#box-content-form .form-quocte').addClass('hidden');

                            $("#box-content-page").load("thong-tin-lien-he.txt");
                        }
                        if(val_a == 'hinh-thuc-thanh-toan')
                        {
                            $('#box-content-page').removeClass('hidden');

                            $('#box-details-content').addClass('hidden');
                            $("#box-content-layout").addClass('hidden');

                            $('#box-content-form .form-noidia').addClass('hidden');
                            $('#box-content-form .form-quocte').addClass('hidden');
                            
                            $("#box-content-page").load("hinh-thuc-thanh-toan.txt");
                        }
                }

               
                
            });
                
                
            
        });
    },
    ajax_pagination_post : function()
    {
        $(document).on('pageshow',function(){
            
            $(document).on('click','.ajax-pagination-post-list',function(){
              
                if($(this).hasClass('turnon'))
                {
                      $(this).removeClass('turnon');
                        var cat_name_current = $('.box-content-data').attr('data-value-cat');

                        var cat_name = cat_name_current;
                        var val_s = '';
                        val_s = '';

                        var offset = $('#list-posts li').length;                        
                         $('#box-content-layout').addClass('opacity');

                        $.ajax({
                          url: 'https://www.vietnambooking.com/wp-admin/admin-ajax.php',
                          type:'post',
                          cache: true,
                          crossDomain: true,
                          data: {action : 'ajax_get_pagination_list_posts_query',offset:offset,cat_name:cat_name},
                          success: function(data) {            
                             $('#box-content-layout').removeClass('opacity');
                             $('#list-posts').append(data);
                              $('.ajax-pagination-post-list').addClass('turnon');
                          },
                          error: function(data,response){

                          }
                       }); 
                }
                
            });
            
        });
    },
    ajax_get_list_posts: function(cat)
    { 
        $(document).on("pagebeforeshow",function(){
            
                    var currentUrl = $.mobile.activePage.data('url');
                    var res = currentUrl.split("/");
                    var dem = res.length - 1;
                    if(res[dem] == 'khuyen-mai.html' || res[dem] == 'faqs.html' || res[dem] == 've-may-bay.html' || res[dem] == 'tin-tuc.html' || res[dem] == 've-may-bay-tet.html')
                    {
                            var cat_name_current = $('.box-content-data').attr('data-value-cat');
                            var cat_name = cat_name_current;
                            $('#box-content-layout').addClass('loadding');
                            $.ajax({
                                    url: 'https://www.vietnambooking.com/wp-admin/admin-ajax.php',
                                    type:'post',
                                    cache: true,
                                    crossDomain: true,
                                   // contentType : "text/html",
                                  //  dataType: 'jsonp',
                                    data: {action : 'ajax_get_list_posts_query',cat:cat_name},
                                    success: function(data) {  
                                       $('.ajax-pagination-post-list').removeClass('hidden');
                                       $('#box-content-layout').removeClass('loadding');
                                       $('#list-posts').html(data);
                                    },
                                    error: function(data,response){

                                    }

                                 }); 
                    }
                    
               
                  
          });  
         
    },
    slider_menu : function(){     
        $( document ).on( "pageshow", function() { 
            
        var swiper = new Swiper('.swiper-container', {

                slidesPerView: 4,
                paginationClickable: true,
                spaceBetween: 30,
                keyboardControl: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev'
            });

               // active lien he
               $(document).on('click','.list-menu-lien-he ul li',function(){
                   
                   $('.container-map-contact >div').addClass('invisible').css({'height':'0px'});
                    var get_id = $(this).attr('id');
                    if(get_id==='control-van-phong-quan-dong-da')
                    {
                        $('.box-van-phong-quan-dong-da').removeClass('invisible').css({'height':'auto'});
                    }
                    else if(get_id==='control-van-phong-quan-1')
                    {
                        $('.box-van-phong-quan-1').removeClass('invisible').css({'height':'auto'});
                    }
                    else
                    {
                        $('.box-van-phong-quan-11').removeClass('invisible').css({'height':'auto'});
                    }
                    $('.list-menu-lien-he ul li').removeClass('active-map');
                    $(this).addClass('active-map');
               });
             

        });
    },
   
}

APP.init();






