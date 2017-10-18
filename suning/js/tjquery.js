/**
 * Created by ÌÕÈý´º on 2017/9/3.
 */

$(function(){
    $(".content-n li").mouseover(function(){
        var idx = $(this).index();
        $(".baokuan ul").eq(idx).show().siblings().hide();
    })
})