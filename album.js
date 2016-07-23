"use strict";
function Album(img_list){
    var self = this;
    var image_list = img_list;
    var currentImage = 0;
    var rendered = null;
    var state = 1;
    var timerStep = 50;
    var timers = [];
    var step = 0;
    function getCurrentImage(){return currentImage};
    function setCurrentImage(index){
        currentImage = (index+image_list.length*2)%image_list.length;
        if (rendered){
            rendered.getElementsByClassName('album__current_image')[0].src = image_list[currentImage%image_list.length];
            rendered.getElementsByClassName('album__right_image')[0].src = image_list[(currentImage+1)%image_list.length];
            rendered.getElementsByClassName('album__left_image')[0].src = image_list[(currentImage-1+image_list.length)%image_list.length];
        }
    }
    function render(){
        var d = document.createElement('div');
        d.className = "fade__container";
        d.innerHTML = '<div class = "album__img_container album__image"><img class = "album__current_image album__image"/><img class = "album__right_image album__image"/><img class = "album__left_image album__image"/></div><button class = album__left_button>Left</button><button class = album__right_button>Right</button>';
        rendered = d;
        setCurrentImage(0);
        d.getElementsByClassName('album__right_button')[0].onclick = function(){
            self.moveRight();
        }
        d.getElementsByClassName('album__left_button')[0].onclick = function(){
            self.moveLeft();
        }
        return d;
    }
    function moveImage(isRight){


        try{
        step = (isRight)?1:-1;

        rendered.getElementsByClassName('album__img_container')[0].style.backgroundImage = 'url('+image_list[(currentImage+step+image_list.length)%image_list.length]+')';
        changeImageStage();
        
        }
        catch(e){
            console.log(e);
        }
    }
    function changeImageStage(){

        rendered.getElementsByClassName('album__current_image')[0].style.opacity = state.toFixed(1);

        state-=0.05;
        if (state<=0){
            setCurrentImage(currentImage + step);
            rendered.getElementsByClassName('album__current_image')[0].style.opacity = '1'
            
            state = 1;
        }
        else {
            var timer = setTimeout( changeImageStage, timerStep
                        );
        };
    }
    this.render = render;
    this.moveRight = moveImage.bind(this, true);
    this.moveLeft = moveImage.bind(this, false);
    this.getCurrentImage = getCurrentImage;
}
