"use strict";
function Album(img_list){
    var self = this;
    var image_list = img_list;
    var currentImage = 0;
    var rendered = null;
    var state = 1;
    var timerStep = 100;
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
        console.log(state);
        d.className = "fade__container";
        d.innerHTML = '<div class = "album__img_container album__image"><img class = "album__current_image album__image"/><img class = "album__right_image album__image"/><img class = "album__left_image album__image"/></div><button class = album__left_button>Left</button><button class = album__right_button>Right</button>';
        rendered = d;
        setCurrentImage(7);
        d.getElementsByClassName('album__right_button')[0].onclick = function(){
            self.moveRight();
        }
        d.getElementsByClassName('album__left_button')[0].onclick = function(){
            self.moveLeft();
        }
        return d;
    }
    function moveImage(isRight){
        console.log(this);

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
        console.log('changeImageStage state is '+ state);
        rendered.getElementsByClassName('album__current_image')[0].style.opacity = state.toFixed(1);
    /*    var img = rendered.getElementsByClassName('album__right_image')[0].style;
        var currimg = rendered.getElementsByClassName('album__current_image')[0];
        var curr = getComputedStyle(currimg);
        img.position = 'absolute';
        img.left = curr.left;
        img.top = curr.top;
       img.zIndex = '1';
        img.display = 'inline';
        currimg.style.position = 'absolute';
      currimg.style.zIndex = '2';
      */  
        state-=0.1;
        if (state<=0){
            setCurrentImage(currentImage + step);
            rendered.getElementsByClassName('album__current_image')[0].style.opacity = '1'
            
            state = 1;
        }
        else {
            console.log('timerstart');
            var timer = setTimeout( changeImageStage, timerStep
                        );
        };
    }
    this.render = render;
    this.moveRight = moveImage.bind(this, true);
    this.moveLeft = moveImage.bind(this, false);
    this.getCurrentImage = getCurrentImage;
}
