'use strict';
// 两处轮播图
let slide01 = new Swiper('.content-img04 .swiper-container', {
    loop: true,
    watchSlidesProgress: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination'
    },
    on: {
        setTransition(transition) {
            for (var i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i);
                slide.transition(transition);
            }
        }
    }
});

let slide02 = new Swiper('.fixed-container .swiper-container', {
    loop: true,
    direction: 'vertical',
    autoplay: {
        delay: 2000
    }
});

let btn = document.querySelector('.btn');
let rules_Android = document.querySelector('.rules-Android');
let rules_IOS = document.querySelector('.rules-IOS');
let tip_Android = document.querySelector('.tip-Android');
let tip_IOS = document.querySelector('.tip-IOS');
let close_btn = document.querySelectorAll('.close');
let mask = document.querySelector('.mask');
let activity_rules = document.querySelector('.activity-rules');
let transition_animate_container = document.querySelector('.transition-animate-container');
let popup_activity = document.querySelector('.popup-activity');
let jump_btn = document.querySelector('.jump-btn');
let activity_rules_slogan = document.querySelector('.activity-rules-slogan');
let ele_loading = document.querySelector('.loading');
let timer1 = null;
let timer2 = null;

//声明用户代理
let u = navigator.userAgent;
//安卓终端
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
// 安卓用户与ios用户显示内容不同
if (isAndroid) {
    rules_Android.classList.remove('hide');
    tip_Android.classList.remove('hide');
} else {
    rules_IOS.classList.remove('hide');
    tip_IOS.classList.remove('hide');
}

// 点击 banner 图的“活动规则”，弹出活动说明
activity_rules_slogan.addEventListener('click', () => {
    mask.classList.remove('hide');
    activity_rules.classList.remove('hide');
}, false);

// 点击关闭按钮，关闭当前弹窗和遮罩层
close_btn.forEach(item => {
    item.addEventListener('click', function() {
        let ele_transition_animate_num = document.querySelector('.transition-animate-container em');
        mask.classList.add('hide');
        this.parentNode.classList.add('hide');
        ele_loading.innerHTML = '正在排队.';
        ele_transition_animate_num.innerHTML = 20;
    }, false); 
});

// 点击“免费领取”按钮，跳出过渡动画 3s 后显示活动弹窗
// 3s 内过渡动画中的数字递减至 1
// 2s 内“正在加载...”中的“.”从 1 到 6 两次
btn.addEventListener('click', () => {
    mask.classList.remove('hide');
    transition_animate_container.classList.remove('hide');

    timer1 = setInterval(() => {
        let ele_transition_animate_num = document.querySelector('.transition-animate-container em');
        let transition_animate_num = Number(ele_transition_animate_num.innerHTML);
        transition_animate_num -= 7;
        ele_transition_animate_num.innerHTML = transition_animate_num;
        if (transition_animate_num <= 1) {
            clearInterval(timer1);
            transition_animate_num = 1;
        }
    }, 3000 / 3);

    timer2 = setInterval(() => {
        ele_loading.innerHTML += '.';
        if (ele_loading.innerHTML === '正在排队......') {
            clearInterval(timer2);
            ele_loading.innerHTML = '正在排队......';
        }
        
    }, 2000 / 5);

    setTimeout(() => {
        transition_animate_container.classList.add('hide');
        popup_activity.classList.remove('hide');
    }, 3000);
}, false);

// 添加神策统计代码
jump_btn.addEventListener('click', () => {
    sensors.track('jump_shjt02');
}, false);