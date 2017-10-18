/**
 * Created by 柴益新 on 2017/9/2.
 */
$(function () {
   
    //顶部菜单
    $('.cnav-slide-box,.csp-slide-box,.cmyorder-handle,.cmysuning-handle,.capp-down-box,.cservice-handle').mouseenter(function () {
        $(this).find('.cng-btn').addClass('cng-btn-hover');
        $(this).find('.ctop-same').stop(true).slideDown(50)
    }).mouseleave(function () {
        $(this).find('.cng-btn').removeClass('cng-btn-hover');
        $(this).find('.ctop-same').stop(true).slideUp(50)
    })
    $('.cng-close').click(function () {
        $('.cng-btn').removeClass('cng-btn-hover');
        $('.cng-box').stop(true, true).slideUp(100)
    });
    /*模拟ajax查询后台的时间间隔*/
    $('.ccart-handle').mouseenter(function () {
        $(this).find('.cng-btn').addClass('cng-btn-hover');
        $(this).find('.ctop-same').stop(true).slideDown(50, function () {
            var cttimer = setTimeout(function () {
                $('.cart-loading').stop(true).hide();
                $('.g-cart-tipbox').stop(true).show();
            }, 1000)
        })
    }).mouseleave(function () {
        $(this).find('.cng-btn').removeClass('cng-btn-hover');
        $(this).find('.ctop-same').stop(true).slideUp(50, function () {
            $('.cart-loading').stop(true).show();
            $('.g-cart-tipbox').stop(true).hide();
        })
    })



    /*logo*/
    var defaultSearchValue = $('#searchDefaultKeyword').val();
    $('.cst-content').val(defaultSearchValue);

    $('.cst-content').focus(function () {
        if ($(this).val() == defaultSearchValue) {
            $(this).val("");
        }
        $(this).css('color', '#333')
        $('.cst-tip-area').stop("true").show();
    }).blur(function () {
        if ($(this).val() == '') {
            $(this).val(defaultSearchValue);
            $(this).css('color', '#999');
        } else {
            $(this).css('color', '#333')
        }
        $('.cst-tip-area').stop("true").hide();
    })


    /*nav*/
    $('.nav-c-area .ng-nav li').mouseenter(function () {
        $(this).find('span').css('bottom', 0);
    }).mouseleave(function () {
        $(this).find('span').css('bottom', -8);
    })
   //下拉显示菜单
   var onmouse = false;
   $('.menu-list').hide();
    $('.menu-hook').on('mouseenter',function(){
        $('.menu-list').stop().slideDown(300);
        
    })
    $('.menu-hook').on('mouseleave',function(){
        setTimeout(function(){
            if(onmouse){
                $('.menu-list').stop().slideUp(300);
            }
        },500)
       
    })
    //二级菜单
    //   $mainM
    //    $subM
    var $menuP = $('.menu-list');
    var $mainM = $menuP.find('.index-list');
    var $mainChild = $mainM.children('li');

    var sub = $('#sub-menu');
    var $subChild = sub.children('div');
    var $activePar,
        $activeSub;
    var timer = null,
        submouse = false;
    var mousetrack = [];
    function handler(e) {
        mousetrack.push({
            x: e.pageX,
            y: e.pageY
        });
        if (mousetrack.length > 3) {
            mousetrack.shift();
        }
    }
    sub.on('mouseenter', function () {
        submouse = true;

    }).on('mouseleave', function () {
        submouse = false
    });
    $mainM.on('mouseleave', function (e) {
        clearTimeout(timer); 
        timer = null;
    })
    $menuP.on('mouseenter', function (e) {
        sub.animate({ width: 999, borderWidth: 1 }, 20);
        clearTimeout(timer);
        onmouse = false;
        timer = null;
        $(document).bind('mousemove', handler)
    })
    .on('mouseleave', function (e) {
            console.log(123);
            sub.animate({ width: 0, borderWidth: 0 }, 20);

            if ($activePar) {
                $activePar.removeClass('current');
                $activePar = null;
            }
            if ($activeSub) {
                $activeSub.show();
                $activeSub = null;
            }
            $(document).unbind('mousemove', handler);
            
            $('.menu-list').slideUp(300);
            onmouse = true;
        })
    $mainChild.on('mouseenter', function (e) {
        //第一次触发parent
        if (!$activePar) {
            $activePar = $(this);
            $activePar.addClass('current');
            $activeSub = $subChild.eq($activePar.index());
            $activeSub.show();
            return
        }
        if (timer) {
            clearTimeout(timer);
        }

        var currentPos = mousetrack[mousetrack.length - 1];
        var previousPos = mousetrack[mousetrack.length - 2];
        var dely = needDelay(sub, previousPos, currentPos);
        var $this = $(this);
        if (dely) {
            timer = setTimeout(function () {
                if (submouse) {
                    return;
                }
                //第一次触发parent
                if (!$activePar) {
                    return
                }
                $activePar.removeClass('current');
                $activeSub.hide();

                //当前元素
                $activePar = $this;
                $activePar.addClass('current');
                $activeSub = $subChild.eq($activePar.index());
                $activeSub.show();
                timer = null;
            }, 300);
        } else {
            var preactivePar = $activePar,
                preactiveSub = $activeSub;
            preactivePar.removeClass('current');
            preactiveSub.hide();

            //当前元素
            $activePar = $this;
            $activePar.addClass('current');
            $activeSub = $subChild.eq($activePar.index());
            $activeSub.show();
        }

    });


   
    
})