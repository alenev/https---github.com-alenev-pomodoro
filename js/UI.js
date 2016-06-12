var map_markers = [
        ['1','50.46395229323288','30.509706499999982','<div class=" contact_big_map--label_line">Адрес 1</div><div class=" contact_big_map--label_line">Телефон 1</div><div class=" contact_big_map--label_line">Время работы 1</div>'],
        ['2','50.43673679334193','30.500965999999913','<div class=" contact_big_map--label_line">Адрес 2</div><div class=" contact_big_map--label_line">Телефон 2</div><div class=" contact_big_map--label_line">Время работы 2</div>'],
        ['3','50.364603793487795','30.960714499999995','<div class=" contact_big_map--label_line">Адрес 3</div><div class=" contact_big_map--label_line">Телефон 3</div><div class=" contact_big_map--label_line">Время работы 3</div>'],
        ['4','50.361535793456035','30.96633849999997','<div class=" contact_big_map--label_line">Адрес 4</div><div class=" contact_big_map--label_line">Телефон 4</div><div class=" contact_big_map--label_line">Время работы 4</div>'],
];

!function(t){"use strict";var e=function(e,n,a){var r,o=this;e=t(e),n="function"==typeof n?n(e.val(),void 0,e,a):n,o.init=function(){a=a||{},o.byPassKeys=[9,16,17,18,36,37,38,39,40,91],o.translation={0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}},o.translation=t.extend({},o.translation,a.translation),o=t.extend(!0,{},o,a),e.each(function(){a.maxlength!==!1&&e.attr("maxlength",n.length),e.attr("autocomplete","off"),s.destroyEvents(),s.events(),s.val(s.getMasked())})};var s={getCaret:function(){var t,n=0,a=e.get(0),r=document.selection,o=a.selectionStart;return r&&!~navigator.appVersion.indexOf("MSIE 10")?(a.focus(),t=r.createRange(),t.moveStart("character",-a.value.length),n=t.text.length):(o||"0"===o)&&(n=o),n},setCaret:function(t){var n,a=e.get(0);a.setSelectionRange?(a.focus(),a.setSelectionRange(t,t)):a.createTextRange&&(n=a.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",t),n.select())},events:function(){e.bind("keydown.mask",function(){r=s.val()}),e.bind("keyup.mask",s.behaviour),e.bind("paste.mask",function(){setTimeout(function(){e.keydown().keyup()},100)})},destroyEvents:function(){e.unbind("keydown.mask keyup.mask paste.mask")},val:function(t){var n=e.is("input");return arguments.length>0?n?e.val(t):e.text(t):n?e.val():e.text()},behaviour:function(e){e=e||window.event;var n=e.keyCode||e.which;if(-1===t.inArray(n,o.byPassKeys)){var a,r=s.getCaret();r<s.val().length&&(a=!0);var i=s.getMasked();return i!==s.val()&&s.val(i),!a||65===n&&e.ctrlKey||s.setCaret(r),s.callbacks(e)}},getMasked:function(t){var e,r,i=[],c=s.val(),u=0,l=n.length,v=0,f=c.length,h=1,d="push",g=-1;for(a.reverse?(d="unshift",h=-1,e=0,u=l-1,v=f-1,r=function(){return u>-1&&v>-1}):(e=l-1,r=function(){return l>u&&f>v});r();){var m=n.charAt(u),k=c.charAt(v),p=o.translation[m];p?(k.match(p.pattern)?(i[d](k),p.recursive&&(-1===g?g=u:u===e&&(u=g-h),e===g&&(u-=h)),u+=h):p.optional&&(u+=h,v-=h),v+=h):(t||i[d](m),k===m&&(v+=h),u+=h)}var y=n.charAt(e);return l!==f+1||o.translation[y]||i.push(y),i.join("")},callbacks:function(t){var o=s.val(),i=s.val()!==r;i===!0&&"function"==typeof a.onChange&&a.onChange(o,t,e,a),i===!0&&"function"==typeof a.onKeyPress&&a.onKeyPress(o,t,e,a),"function"==typeof a.onComplete&&o.length===n.length&&a.onComplete(o,t,e,a)}};o.remove=function(){s.destroyEvents(),s.val(o.getCleanVal()).removeAttr("maxlength")},o.getCleanVal=function(){return s.getMasked(!0)},o.init()};t.fn.mask=function(n,a){return this.each(function(){t(this).data("mask",new e(this,n,a))})},t.fn.unmask=function(){return this.each(function(){try{t(this).data("mask").remove()}catch(e){}})},t.fn.cleanVal=function(){return t(this).data("mask").getCleanVal()},t("*[data-mask]").each(function(){var e=t(this),n={};"true"===e.attr("data-mask-reverse")&&(n.reverse=!0),"false"===e.attr("data-mask-maxlength")&&(n.maxlength=!1),e.mask(e.attr("data-mask"),n)})}(window.jQuery||window.Zepto);

/* Сброс значение полей по умолчанию расмещенных в value input и в тексте textarea вместо labels. Обязательно использовать для сброса дефолтных значений в value функцию form_inputs_clearing()

// вариант перебора полей для сброса заголовков ВЫЗЫВАТЬ В НАЧАЛЕ ФУНКЦИИ ВАЛИДАЦИИ
function form_inputs_each(form){
form.find("input[type='text']").each(function(){
reset_labels($(this));
});
form.find("textarea").each(function(){
reset_labels($(this));
});
}


function reset_labels(el){
var label = el.attr("title");
console.log(el.val());
var type = el.attr("type");
if (type == 'text') {
if (el.attr("value") == label) {
el.val("");
}
}
if (type == 'textarea') {
if (el.text() == label) {
el.text("");
}
}
}	
*/


/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/
/*  начальные значения input  */
$(document).ready(function() {
form_inputs_clearing();
});
function form_inputs_clearing(){

    $("input:text, textarea, input:password").each(function(){
        if(this.value == '')
            this.value = this.title;
    });
    $("input:text, textarea, input:password").focus(function(){
        if(this.value == this.title)
            this.value = '';
    });
    $("input:text, textarea, input:password").blur(function(){
        if(this.value == '')
            this.value = this.title;
    });
    $("input:image, input:button, input:submit").click(function(){
        $(this.form.elements).each(function(){
            if(this.type =='text' || this.type =='textarea' || this.type =='password' ){
                if(this.value == this.title && this.title != ''){
                    this.value='';
                }
            }
        });
    });
}
/*//////////////////////////////////////////////////////////////////////////////////////////*/


$(window).load(function() {
$(".form_line .required").on('keyup',function(){
if ($(this).hasClass("phone")){}else{
var el = $(this).closest(".form_line");
if (el.hasClass("error")) {
el.removeClass("error");
}
}
});
/*
if($('.phone.mask').length>0) {

var masks = ['+70000000000', '+70000000009'],
    maskBehavior = function(val, e, field, options) {
    return val.length > 12 ? masks[0] : masks[1];
};

$('.phone.mask').mask(maskBehavior, {onKeyPress: 
   function(val, e, field, options) {
       field.mask(maskBehavior(val, e, field, options), options);
   }
});

}
*/
if($('.phone.mask').length>0) {

var masks = ['+7(000)000-00-00', '+7(000)000-00-09'],
    maskBehavior = function(val, e, field, options) {
    return val.length > 12 ? masks[0] : masks[1];
};
$('.phone.mask').mask(maskBehavior, {placeholder: "+7(___)___-__-__", onKeyPress: 
   function(val, e, field, options) {
       field.mask(maskBehavior(val, e, field, options), options);
   }
});

//$('.phone.mask').mask('+7 (ZZZ) ZZZ-ZZ-ZZ', {translation: {'Z': {pattern: /[0-9]/, optional: true}}});

}
});




function validator(form) {
form.closest("form").submit(function(){ return false;});
var formid = form.attr("id"); 

/* Функция возврата всех дефолтных значений ошибочных полей если вместо label подписи полей размещаются в value. Вызывать после всех функций типов валидации перед if (fail.... 
function empty_error_field_return_values() {
form.find(".form_line.error").each(function(){
if ($(this).find("input").length > 0){ // обработка input
var value = $(this).find("input").val();
var title = $(this).find("input").attr("title");
if (value == "" && title) {
$(this).find("input").val(title);
}
}
});
}
/* END Функция возврата всех дефолтных значений */
 
  function scroll_2first_error () {
  if (formid != 'quick_order') {
  //$("body").scrollTo( ".form_line.error:first", 1 );
  }
  }

	  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
	  
//var filter_rus_phone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

/*
filter_rus_phone корректно воспринимает записи:
+79261234567
89261234567
79261234567
+7 926 123 45 67
8(926)123-45-67
123-45-67
9261234567
79261234567
(495)1234567
(495) 123 45 67
89261234567

Воспринимает как ошибочные
(495) 123 45
8(926)123-45-
+7 926 123 45

	  
var filter_rus_phone = /^( +)?((\+?7|8) ?)?((\(\d{3}\))|(\d{3}))?( )?(\d{3}[\- ]?\d{2}[\- ]?\d{2})( +)?$/;	
*/

/* Фильтр для +7 (123) 456-78-88 
      var re1='(\\+)';	// Any Single Character 1
      var re2='(\\d+)';	// Integer Number 1
      var re3='(\\s+)';	// White Space 1
      var re4='.*?';	// Non-greedy match on filler
      var re5='(\\d+)';	// Integer Number 2
      var re6='.*?';	// Non-greedy match on filler
      var re7='(\\s+)';	// White Space 2
      var re8='(\\d+)';	// Integer Number 3
      var re9='(.)';	// Any Single Character 2
      var re10='(\\d+)';	// Integer Number 4
      var re11='(.)';	// Any Single Character 3
      var re12='(\\d+)';	// Integer Number 5

var filter_rus_phone = new RegExp(re1+re2+re3+re4+re5+re6+re7+re8+re9+re10+re11+re12,["i"]); 
/* END Фильтр для +7 (123) 456-78-88 */ 


/* Фильтр для +70000000000 */
var txt='+70000000000';
var re1='(\\+)';
var re2='(\\d+)';
var filter_rus_phone = new RegExp(re1+re2,["i"]);
/* END Фильтр для +70000000000 */


function validate_region(){ 
if (formid == 'checkout_form_table') {
if ($("#checkout_form_table .order_region_button .info").hasClass("region_selected")) {
$("#checkout_form_table .order_region_select").removeClass("incorrect");
$("#checkout_form_table .order_region_select").addClass("complete");
			  
}else {
$("#checkout_form_table .order_region_select").addClass("incorrect");
scroll_2first_error ();
} 
}else {
}
}
	  

	function validate_all(){

/* input */
form.find(".required").each(function(i,el) {		
if(this.value == '') {
	if ($(this).hasClass("hide")) { }else{					 
             $(this).closest(".form_line").removeClass("complete");
		     $(this).closest(".form_line").addClass("incorrect");
		     scroll_2first_error ();		
	 }
}
else {	
    if ($(this).hasClass("hide")) { }else{			 
		     $(this).closest(".form_line").removeClass("incorrect");
		     $(this).closest(".form_line").addClass("complete");

	} 
}	
});
/* END input */
	

/* textarea */	
form.find(".required_textarea").each(function(i,el) {		
if($(this).val() == '') {
	if ($(this).hasClass("hide")) { }else{					 
             $(this).closest(".form_line").removeClass("complete");
		     $(this).closest(".form_line").addClass("incorrect");
		     scroll_2first_error ();		
	 }
}else {	
    if ($(this).hasClass("hide")) { }else{			 
		     $(this).closest(".form_line").removeClass("incorrect");
		     $(this).closest(".form_line").addClass("complete");

	} 
}	
});
/* END textarea */	

/* textarea */	

form.find(".form_line.checkbox_group").each(function(i,el) {
var one_check = 0;	
$(this).find(".required_checkbox").each(function(i,el) {
if($(this).prop("checked") == true) {
one_check = one_check + 1;
}
});
console.log("one_check - "+one_check+"");
if(one_check == 0) {
				 
             $(this).removeClass("complete");
		     $(this).addClass("incorrect");
		     scroll_2first_error ();		

}else {			 
		     $(this).removeClass("incorrect");
		     $(this).addClass("complete");

}	
});
/* END textarea */	
		

}	
	
				
		
    function validate_mail(){
	
		form.find(".required.email").each(function(i,el){
		var mail = $(this).val();
		if (!filter.test(mail)) {
         if ($(this).hasClass("hide")) { }else{
		$(this).closest(".form_line").removeClass("complete");
        $(this).closest(".form_line").addClass("incorrect");
         scroll_2first_error ();		 
		                                }
		}
		else {
		         if ($(this).hasClass("hide")) { }else{
		$(this).closest(".form_line").removeClass("incorrect");
		$(this).closest(".form_line").addClass("complete");
		                               }
		}
		});	
	}	
    
	
	
    function validate_password(){
	    form.find(".required.password").each(function(i,el){
		var password_length = $(this).val().length;	
		
		if (password_length < 6) {	
          if ($(this).hasClass("hide")) { }else{	 
		$(this).closest(".form_line").removeClass("complete");
        $(this).closest(".form_line").addClass("incorrect");
         scroll_2first_error ();
             	 
		   }
		}
		else {
		if ($(this).hasClass("hide")) { }else{
		$(this).closest(".form_line").removeClass("incorrect");
		$(this).closest(".form_line").addClass("complete");
		                               }
		}
		});		
    }


    function validate_repassword(){
	    form.find(".required.repassword").each(function(i,el){
		var repassword = $(this).val();
		var password =  $(this).closest("form").find("input.password").val();	
		if (password == repassword && password != '') {			
		if ($(this).hasClass("hide")) { }else{
		$(this).closest(".form_line").removeClass("incorrect");
		$(this).closest(".form_line").addClass("complete");
		                               }									  
		}
		else {

		if ($(this).hasClass("hide")) { }else{	 
		$(this).closest(".form_line").removeClass("complete");
        $(this).closest(".form_line").addClass("incorrect");
         scroll_2first_error ();            	 
		   }
		}
		});		
    }	
	
function validate_phone(){
	
		form.find(".required.phone").each(function(i,el){
		var phone = $(this).val();
		var phone_length = parseInt(phone.length);
$.fn.hasAttr = function(name) {
return this.attr(name) !== undefined;
};
		var mask = '';
		if ($(this).hasAttr("data-mask")) {
		mask = $(this).attr("data-mask");
        }
		if (!filter_rus_phone.test(phone) || phone_length < 16 || phone == mask) {
        if ($(this).hasClass("hide")) { }else{
		$(this).closest(".form_line").removeClass("complete");
        $(this).closest(".form_line").addClass("incorrect");
         scroll_2first_error ();		 		                                }
		}
		else {
		if ($(this).hasClass("hide")) { }else{
		$(this).closest(".form_line").removeClass("incorrect");
		$(this).closest(".form_line").addClass("complete");
		                               }
		}
		console.log("phone_length: "+phone_length+"");
		});	
}	

	//validate_region(); 
	validate_all();
	validate_mail();
	validate_password();
    validate_repassword();
	validate_phone();
	
		var fail = 1;		
       
		fail = 0;
		form.find(".form_line.incorrect").each(function(i,el) {
		fail++;
		});
		if (fail == 0 ) { return true; } 	

	        return false;	
           }			
		   



		  

function isInteger(num) {
  return (num ^ 0) === num;
}

$(document).ready(function(){

/* Отправка формы */
$(".form-recall .bt-base").on('click',function(){
var form = $(".form-recall .f-standart");
if (validator(form)) {
$(".form-recall").hide();
$(".form-recall-send").show();
/* Здесь отправляем данные формы*/
}
});
/* END Отправка формы */




if ($("#popup3").length > 0) {
popup_hide();
}

$(".form-tocart").each(function(){
$(this).find(".tocart-up").removeAttr("href");
$(this).find(".tocart-down").removeAttr("href");
});

$(".button-close").removeAttr("href");

$("body").on('keyup', '.form-tocart .tocart-qw', function(){
var cv = parseInt($(this).val());
var nv = 1;
if (isNaN(cv)){
cv = 1;
}
if (cv < 1) {
nv = 1;
console.log("<1");
}else {
nv = cv;
}
if (isInteger(cv) == true){
$(this).val(nv);
}
if ($(".item-basket").length > 0) {
var item = $(this).closest(".item-basket");
basket_update(item,nv);
}
});

$("body").on('click', '.form-tocart .tocart-up', function(){
var cv = parseInt($(this).closest('.form-tocart').find(".tocart-qw").val());
var nv = cv + 1;
$(this).closest('.form-tocart').find(".tocart-qw").val(nv);
if ($(".item-basket").length > 0) {
var item = $(this).closest(".item-basket");
basket_update(item,nv);
}
});

$("body").on('click', '.form-tocart .tocart-down', function(){
var cv = parseInt($(this).closest('.form-tocart').find(".tocart-qw").val());
var nv = cv - 1;
if (nv < 1) {
nv = 1;
}
$(this).closest('.form-tocart').find(".tocart-qw").val(nv);
if ($(".item-basket").length > 0) {
var item = $(this).closest(".item-basket");
basket_update(item,nv);
}
});


$(".footer-tel p:first").on('click', function(){
var popup_id = "popup1";
popup_show(popup_id);
});

$(".geo-change").on('click', function(){
var popup_id = "popup2";
popup_show(popup_id);
$("#popup2 .region-active").removeClass("region-active");
var city_id = $('.header-geo .geo-city').attr("data-id");
if (city_id > 0) {
$("#popup2 a").each(function(){ 
var id = $(this).attr("data-id");
if (city_id == id) {
$(this).addClass("region-active")
}
});
}
});

$(".asvpopup-body .button-close").on('click', function(){
popup_hide();
});


$(".item-basket .button-close").on('click', function(){
var item = $(this).closest(".item-basket");
var item_id = parseInt(item.attr("data-id")); // удаление из корзины товара по его id
item.remove();
$(".header-basket ul li").each(function(){
var id = parseInt($(this).attr("data-id"));
if (id == item_id) {
$(this).remove(); // удаление из миникорзины товара
minicart_update(); // апдейт миникорзины
}
});
var basket_summ =  basket_summa();
if (basket_summ > 0) {
basket_summ_text = NumFormat(basket_summ,"add_space");
$(".ss-sum .pv").text(basket_summ_text );
basket_discount_update();
}
alert("msg21: basket item id="+item_id+" is remove basket_summ - "+basket_summ+"");
if ($(".item-basket").length < 1) {
$("#cart_total_block").hide();
$("#cart_empty").show();
}
});
});

function basket_summa(){
var basket_summ = 0;
$(".item-basket").each(function(){
var is = $(this).find(".pv").text();
is = parseInt(NumFormat(is,"crop_space"));
basket_summ = basket_summ + is;
});
return basket_summ;
}

function basket_discount_update(){
var basket_discount_val = parseInt($(".basket_discount_val").text());
if (basket_discount_val > 0) {
var basket_summ =  basket_summa();
var basket_discount_value = basket_summ * basket_discount_val / 100;
var basket_discount_summ = basket_summ - basket_discount_value;
basket_discount_summ = NumFormat(basket_discount_summ,"add_space");
$("#cart_total_block .ds").text(basket_discount_summ);
}
console.log("bdu");
}


function popup_show(popup_id, tabs, map){

var dh = parseInt($(document).height());
var popup = $("#"+popup_id+"");
popup.css("height",""+dh+"px");
var message = popup.find(".popup_message");
popup.addClass("open");
var ph = parseInt(popup.find(message).outerHeight(true));
var wh = parseInt($(window).height());
var pwt = wh - ph;
if (pwt > 0) {
pwt = pwt/2;
}
var pt = window.st + pwt;
popup.find(message).css("top",""+pt+"px");
popup.addClass("show");

if (tabs == "tabs") {
popup.find("#tabs").tabs();
}
if (map == "map") {
var map_container = popup.find(".map_container");
var mapID = map_container.attr("id");
if (mapID == 'map1'){
ymaps.ready(map_init(mapID, 1));
}
}
}


function popup_hide(){
var popup = $(".asvpopup-body.open");
popup.removeClass("show");
popup.removeClass("open");
}

$(document).mouseup(function (e) {
    var container1 = $(".asvpopup-large");
	var container2 = $(".asvpopup-small");
    if (container2.has(e.target).length === 0){
	if (container1.has(e.target).length === 0) {
        popup_hide();
    } }
});


window.st = 0;
$(window).scroll(function(){
window.st = parseInt($(window).scrollTop());
});

$(document).ready(function(){
var current_city = $(".geo-city").attr("data-id");

if (!current_city){
var popup_id = "popup2";
popup_show(popup_id);
}


$(".pomodoro-region-list a").on('click',function(){
var city = $(this).text(); 
var region = $(this).attr("data-region");
var city_id = $(this).attr("data-id"); 

$(".geo-city").each(function(){
$(this).text(city);
$(this).attr("data-id", city); 
});
$(".geo-region").each(function(){
$(this).text(region);
$(this).attr("data-id", region); 
});


alert("msg01: pomodoro_city - "+city+" pomadoro_region - "+region+"");
popup_hide();

var change_city_mode = 1; // Перезагружаем страницу и выводим сообщение о том что цены перессчитаны.

$(".header-basket ul li").each(function(){ // перебираем товары в корзине чтобы выявить товар который недоступен в новом выбранном городе
var id = parseInt($(this).attr("data-id"));
if (id == 2){ // например в БД находим пометку что в этом городе недоступен товар с id=2
$(this).remove(); // удаляем из миникорзины товар
minicart_update();
change_city_mode = 2; // Перезагружаем страницу и выводим сообщение о том что цены перессчитаны и о том что некоторые товары удалены так как их нет в новом городе.
}
});

$.cookie('change_city_mode', ''+change_city_mode+'', { expires: 31 });
var href = document.location.href;
document.location.href = href;
});


var change_city_mode = parseInt($.cookie('change_city_mode'));
if (change_city_mode != 0) {
var popup_id = "popup6";
popup_show(popup_id);
if (change_city_mode == 2) {
$("#popup6 .txt1").show();
}else{
$("#popup6 .txt1").hide();
}
}
$.cookie('change_city_mode', '0', { expires: 31 });

if ($("#popup1").length > 0) {
$(".header-recall").on('click',function(e){
var popup_id = "popup1";
popup_show(popup_id);
e.stopPropagation;
return false;
});
}

$("body").on('click','.add2cart_ui .bt-tocart',function(e){
var el = $(this).closest(".add2cart_ui");
add2cart(el);
return false;
e.stopPropagation();
});


$("body").on('change','.add2cart_ui select',function(){
var el = $(this).closest(".add2cart_ui");
add2cart_ui(el);
});

$("body").on('click','.form-dopingr input',function(){
var el = $(".add2cart_ui");
add2cart_ui(el);
});


$("body").on('submit','.add2cart_ui form',function(){
return false;
});

$("body").on('click','#popup4 .bt-mid:eq(0)',function(e){
var id = $("#popup4 .bt-mid:first").attr("data-id");
$(".header-basket ul li").each(function(i,el){
var incart_id = parseInt($(this).attr("data-id"));
if (incart_id == id) {
$(this).remove(); // удаляем из корзины товар с id = incart_id в случае если у этого товара в категории товаров или в карточке товара меняются опции или ингридиенты
minicart_update();
popup_hide();
}
});
});

$("body").on('click','#popup4 .bt-mid:eq(1)',function(e){
popup_hide();
return false;
e.stopPropagation();
});

$("body").on('change','.action_constructor_item',function(e){
var val = parseInt($(this).find("option:selected").val());
if (val != 0) {
$(this).next().addClass("active");
var price = parseInt($(this).find("option:selected").attr("data-price"));
var total = parseInt($(".action_constructor_total span:first").html());
total = total + price;
$(".action_constructor_total span:first").html(total)
}
});

$("body").on('submit', '.action_constructor', function(){

if (parseInt($(".action_constructor .action_constructor_item.num1 option:selected").val()) != 0 && parseInt($(".action_constructor .action_constructor_item.num2 option:selected").val()) != 0) {
var msg_id = "popup4";
$(".action_constructor_item").each(function(){
var product_id = $(this).find("option:selected").attr("data-id");
var price = $(this).find("option:selected").attr("data-price");
var quantity = 1;
var sale = $(this).find("option:selected").attr("data-sale");
minicart_update(product_id, quantity, price, sale);
});
}else{
var msg_id = "popup5";
}
popup_show(msg_id);
return false;
});

});



function add2cart_ui(el){
var add2cart_ui_id = parseInt(el.attr("data-id"));
$(".header-basket ul li").each(function(i,el){
var incart_id = parseInt($(this).attr("data-id"));
if (incart_id == add2cart_ui_id) {
var popup_id = "popup4";
popup_show(popup_id);
$("#popup4 .bt-mid:first").attr("data-id",add2cart_ui_id);
}
});

var base_price = parseInt(el.find(".pv").attr("data-base"));
var quantity = parseInt(el.find(".tocart-qw").val());
var plus_cost = 0;
el.find("select").each(function(){
var plus = parseInt($(this).find("option:selected").attr("data-plus"));
plus_cost = plus_cost + plus;
});
var final_price = base_price + plus_cost;

if ($(".form-dopingr").length > 0) {

$(".form-dopingr input:checked").each(function(i,el){
var cost = parseInt($(this).attr("data-plus"));
final_price = final_price + cost;
});
}
final_price = NumFormat(final_price,"add_space");
el.find(".pv").text(final_price);
}



function add2cart(el){
var price = parseInt(el.find(".pv").text());
console.log("price - "+price+"");
if (price == 0){
var popup_id = "popup9";
popup_show(popup_id);
}else{

var product_id = el.attr("data-id"); // добавляем в корзину id товара
var quantity = parseInt(el.find(".tocart-qw").val()); // добавляем в корзине товару кол-во
var sale = parseInt(el.attr("data-sale"));

var base_price = parseInt(el.find(".pv").attr("data-base"));
plus_cost = 0;
var options = new Array(); // массив выбранных опций состоящий из id и добавочной цены опции
el.find("select").each(function(i,el){
var id = parseInt($(this).find("option:selected").val()); // добавляем в корзину id товара
var cost = parseInt($(this).find("option:selected").attr("data-plus")); 
options[i] = [];
options[i]['id'] = id; // добавляем в корзине товару id опции товара (диаметр или толщина теста)
options[i]['cost'] = cost; // стоимость опции 
plus_cost = plus_cost + cost;
});
var final_price = base_price + plus_cost;

if ($(".form-dopingr").length > 0) {

var dopingr = new Array(); // массив выбранных ингридиентов в карточке товара состоящий из id и добавочной стоимости ингридиента
$(".form-dopingr input:checked").each(function(i,el){
dopingr[i] = [];
dopingr[i]["id"] = $(this).attr("data-id"); // добавляем в корзину товару id выбранного ингридиента
console.log("dopingr - "+dopingr[i]["id"]+"");
dopingr[i]["cost"] =  parseInt($(this).attr("data-plus"));
final_price = final_price + dopingr[i]["cost"];
});
}
minicart_update(product_id, quantity, final_price, sale); // обновляем миникорзину
}
}

function minicart_update(product_id, quantity, price, sale){
if (product_id) {
if (sale == 1) {
// если это акционный товар то пишем ему в корзине признак акции. При выводе товаров в корзине у обертки товара должен быть такой же признак акции http://prntscr.com/b3k8rk в аттрибуте
}else{
sale = 0;
}
var minicart_product = "<li data-sale='"+sale+"' data-id='"+product_id+"' data-quantity='"+quantity+"' data-price='"+price+"' ></li>"; // добавляем товар в корзину 
if ($(".header-basket ul").length < 1) {
$(".header-basket").append("<ul></ul>"); // создаем в миникорзине список добавленных товаров
}
$(".header-basket ul").append(minicart_product);
if ($("#popup1").length > 0) {
var popup_id = "popup1";
popup_show(popup_id);
}else{
alert("товар добавлен в корзину");
}
}
var cart_quantity =  0;
var cart_total = 0;
$(".header-basket li").each(function(){
var quantity = parseInt($(this).attr("data-quantity"));
cart_quantity = cart_quantity + quantity;
var summ = parseInt($(this).attr("data-price"));
summ = summ * quantity
cart_total = cart_total + summ;
});
$(".header-basket .basket-kolvo").text(cart_quantity);
cart_total = NumFormat(cart_total,"add_space");
$(".header-basket .basket-sum").text(cart_total);
}


function basket_update(item,nv) {
var item_id = item.attr("data-id");
var price = parseInt(item.find(".pv").attr("data-base"));
var summ = price*nv;
summ = NumFormat(summ,"add_space");
item.find(".pv").text(summ);
var total = 0;
$(".item-basket").each(function(){
var summ = $(this).find(".pv").text();
summ = parseInt(NumFormat(summ,"crop_space"));
total = total + summ;
});
$(".header-basket ul li").each(function(){
var mci_id = parseInt($(this).attr("data-id"));
if (mci_id == item_id){
$(this).attr("data-quantity",nv);
}
});
minicart_update(); 
$(".ss-sum .pv").text(total);
basket_discount_update();
alert("msg20: new quantity of basket item id="+item_id+" is "+nv+""); // новое кол-во товара в корзине
}

function NumFormat(price,operation) { 
var new_price = 0;
if (operation == "add_space") {
price = price.toString();
new_price = price.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
} else if (operation == "crop_space") {
price = price.toString();
new_price = price.replace(' ','');
}
return new_price;
}

$(document).ready(function(){

/* Проверка возможности доставки 
if ($(".delivery_tabs").length > 0){
var city = $(".header-col1 .geo-city").attr("data-id");
var delivery = confirm("msg22: Текущий город "+city+". В нем есть доставка?"); 
if (delivery == false) { // если переменная delivery будет false то блокируем таб доставки
setTimeout(function(){
$(".ui-tabs-nav li:eq(1) a").click();
},500);
$("#not_delivery_info1").show();
$(".delivery_form").hide();
}


var delivery_min_total_test = confirm("msg23: Протестируем минимальный заказ?");
if (delivery_min_total_test == true) {
var min_city_order_total = prompt("Какая минимальная сумма для доставки заказа в этом городе?", 100);
var order_total = prompt("Какая сумма этого заказа?", 100);
if (min_city_order_total > order_total) { // если сумма заказа меньше минимальной суммы заказа для города то блокируем таб доставки
setTimeout(function(){
$(".ui-tabs-nav li:eq(1) a").click();
},500);
$("#not_delivery_info2").show();
$(".delivery_form").hide();
}

}


var delivery_sale_product = confirm("msg24: Протестируем наличие акционного товара в корзине?");
if (delivery_sale_product == true){
$(".header-basket ul li").each(function(){
var sale = parseInt($(this).attr("data-sale"));
if (sale == 1) {
setTimeout(function(){
$(".ui-tabs-nav li:eq(1) a").click();
},500);
$("#not_delivery_info3").show();
$(".delivery_form").hide();
}
});
}

}
/* END Проверка возможности доставки */


/* Удаление из корзины акционного товара для возможности доставки из сообщения о невозможности доставки из-за него */
$("body").on('click','#not_delivery_info3 .bt-mid:first', function(){
$(".header-basket ul li").each(function(){
var sale = parseInt($(this).attr("data-sale"));
if (sale == 1) {
var id = $(this).attr("data-id"); // удаляем акционный товар из корзины по его id 
alert("msg25: акционный товар удален из корзины");
$(this).remove();
minicart_update();
setTimeout(function(){
$(".ui-tabs-nav li:eq(0) a").click();
},500);
$("#not_delivery_info3").hide();
$(".delivery_form").show(); // эту форму нужно перезагрузить на ajax чтобы туда попали новые суммы после удаления акционного товара
}

});
});
/* END Удаление из корзины акционного товара для возможности доставки из сообщения о невозможности доставки из-за него */



/* Выбор пиццерии. Открытие модального окна */
$("body").on('click','.factory_select', function(){
var popup_id = "popup8";
popup_show(popup_id, "tabs", "map");
});
/* END Выбор пиццерии. Открытие модального окна */


});


/* Карта */

$(document).ready(function(){
//ymaps.ready(map1_init("map1")); формирование карты при загрузке страницы. map1 - id блока карты который должен быть видим на странице (без display: none). Если нужно вызывать в закрытом блоке то этот вызов нужно поместить в callback функции display: block
});


$(document).ready(function(){
if ($('#map2').length > 0){
ymaps.ready(map_init('map2', 0));
}
});

function map_init(mapID, factory_selector_button) {

return function () {

console.log("map_init");
var lat = $(".header-geo .geo-city").attr("data-lat");
var lng = $(".header-geo .geo-city").attr("data-lng");
var mzoom = $(".header-geo .geo-city").attr("data-zoom");

// https://tech.yandex.ru/maps/geocoder/
            // Создание экземпляра карты и его привязка к контейнеру с
            // заданным id ("map")
           var myMap = new ymaps.Map(mapID, {
                    // При инициализации карты, обязательно нужно указать
                    // ее центр и коэффициент масштабирования
                    center: [lat,lng],
                    zoom: mzoom
                }); 

var myBalloonContentLayout = ymaps.templateLayoutFactory.createClass("<p>$[[options.contentBodyLayout]]</p>");
// Создание макета основного содержимого контента балуна.
myBalloonContentBodyLayout = ymaps.templateLayoutFactory.createClass(
    '<b>$[properties.name]</b><br /><button id="counter-button">Counter</button> <i id="count"></i>', {
        build: function () {
            myBalloonContentBodyLayout.superclass.build.call(this);
        },
        clear: function () {
            myBalloonContentBodyLayout.superclass.clear.call(this);
        },
        onCounterClick: function () {
        }


    });
	
 
var factory_selector = '';
if (factory_selector_button == 1) {
factory_selector = '<div class="factory_selector"><span>Выбрать пиццерию</span></div>';
}

map_markers.forEach(function(item, i, map_markers) {

var lat = '';
var lng = '';
var address = '';

item.forEach(function(item2, i2, item) {
var w = parseInt(i2);

if (w == 1) {
lat = item2;
}
if (w == 2) {
lng = item2;
}
if (w == 3) {
address = item2;
}

});

window["baloon_" + i] = ymaps.templateLayoutFactory.createClass(
            '<div class="baloon_map_tmpl btmpl'+i+'"><h3>$[properties.name]</h3><div>$[properties.balloonContentBody]</div></div>', {
                build: function () {
                    // необходим вызов родительского метода, чтобы добавить содержимое макета в DOM
                    this.constructor.superclass.build.call(this);
          		$(".contact_big_map--label.active").closest(".ymaps-point-overlay").addClass("active");
				
                },
                clear: function () {
                    $('#layout-element').unbind('mouseover', this.onNameHover);
                    this.constructor.superclass.clear.call(this);
                },
                onNameHover: function () {
				
                },
                ready: function (el) {

                }

});

window["baloon_" + i + "_map_marker"] = new ymaps.GeoObject({
                 geometry: {
                     type: "Point",
                     coordinates: [lat,lng]
                 },
                properties: {
                LabelName: 'ym_my_baloon_'+i+'', // класс метки в шаблоне метки. data-factory: id пиццерии 
                balloonContentBody: '<div data-factory="2" class="ym_my_baloon ym_my_baloon_'+i+'"><div class="placemark"></div><div class="contact_big_map--label"><div class="label_info">'+address+' '+factory_selector+'<span class="pmc" "></span></div></div></div>'
                 }
             }, { 
                 balloonContentBodyLayout: myBalloonContentBodyLayout,
                 balloonContentLayout: myBalloonContentLayout,
                 iconContentLayout: window["baloon_" + i],
                 preset: 'twirl#nightStretchyIcon'
             });
			 
//наносим отдельно маркер на карту
myMap.geoObjects.add(window["baloon_" + i + "_map_marker"]);	

// вешаем на каждую метку показ вместо hint нашей label с контактами
window["baloon_" + i + "_map_marker"].events.add('click', function (e) {
var label_name = e.get('target').properties.get('LabelName');
map_labels_toggler(label_name);
});
//console.log( i2 + ": " + item2 + "" );


});



// Создание экземпляра элемента управления Zoom
myMap.controls.add(
   new ymaps.control.ZoomControl()
);


// отключаем стандартные hint маркеров
myMap.geoObjects.options.set({
    showHintOnHover: false,
    openBalloonOnClick: false
});


var placesPane = myMap.panes.get('places').getElement();
$(placesPane).addClass('places_wrap');

}

}

// открытие балуна
function map_labels_toggler(label_name){
var label = $("."+label_name+"");
if (label.hasClass("active")) {
label.removeClass("active");
label.closest(".places_wrap").removeClass("open");
}else{
label.closest(".places_wrap").addClass("open");
label.addClass("active");
}
}

$(document).ready(function(){
$("body").on('click', '.ym_my_baloon .pmc', function(){
$(this).closest(".ym_my_baloon").removeClass("active");
$(this).closest(".places_wrap").removeClass("open");
});

$("body").on('click', '.factory_selector', function(){
if ($(this).hasClass("list")){
var factory_id = $(this).attr("data-factory");
}else{
var factory_id = $(this).closest(".ym_my_baloon").attr("data-factory");
$(this).closest(".ym_my_baloon").removeClass("active");
$(this).closest(".places_wrap").removeClass("open");
}
popup_hide();
$(".pizza_factory_adress").text(factory_id);
$(".factory_choice_wrap").addClass("hide");
$(".pizza_factory_adress_wrap").addClass("show");
$(".factory_choice").attr("data-factory",factory_id);
$(".fm-no.factory").hide();
alert("msg:27 data-factory="+factory_id+"");
});



/* ins-feedback */
$("body").on('submit','.form-universal',function(){
return false;
});
$(".form-universal .bt-base").on('click',function(){
var form = $(this).closest(".form-body");
if (validator(form)) {
form.hide();
form.closest("form").find(".fm-no").hide();
form.closest("form").find(".fm-yes").show();
/* Здесь отправляем данные формы*/
}else{
form.closest("form").find(".fm-no").show();
}
});
/* END ins-feedback */

/* ins-quolity */
$("body").on('submit','.form-quolity',function(){
return false;
});
$(".form-quolity .bt-base").on('click',function(){
var form = $(this).closest(".form-body");
if (validator(form)) {
form.hide();
form.closest("form").find(".fm-no").hide();
form.closest("form").find(".fm-yes").show();
/* Здесь отправляем данные формы*/
}else{
form.closest("form").find(".fm-no").show();
}
});
/* END ins-quolity */

/* form-dostavka */
$("body").on('submit','.form-dostavka',function(){
return false;
});
$(".form-dostavka .bt-base").on('click',function(){
var form = $(this).closest(".form-body");
if (validator(form)) {
form.hide();
form.closest("form").find(".fm-no").hide();
form.closest("form").find(".fm-yes").show();
/* Здесь отправляем данные формы*/
}else{
form.closest("form").find(".fm-no").show();
}
});
/* END form-dostavka */

/* form-samovivoz */
$("body").on('submit','.form-samovivoz',function(){
return false;
});

$(".form-samovivoz .bt-base.bt-red").on('click',function(){
var form = $(this).closest(".form-body");
var factory = parseInt($(".factory_choice").attr("data-factory"));
if (validator(form)) {
if (factory > 0) {
form.hide();
form.closest("form").find(".fm-no").hide();
form.closest("form").find(".fm-yes").show();
/* Здесь отправляем данные формы*/
}else{
form.closest("form").find(".fm-no").show();
}
}else{
form.closest("form").find(".fm-no").show();
if (factory > 0) {
form.closest("form").find(".fm-no.factory").hide();
}
}
});
/* END form-samovivoz */

});
/*
$(document).ready(function(){
if ($('#map2').length > 0){
$(".header").append("<span class='map2_caller'></span>");
$("body").on('click','.map2_caller', function(){
$( "#tabs" ).tabs();
ymaps.ready(map_init('map2', 0));
});
$(".map2_caller").click();
}
});
*/
