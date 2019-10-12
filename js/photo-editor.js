(function () {
    //--------------------------------ОТКРЫТИЕ/ЗАКРЫТИЕ РЕДАКТОРА ФОТО------------------------------------

    var downloadButton = document.getElementById('upload-file');
    var photoEditor = document.querySelector('.img-upload__overlay');
    var closePhotoEditor = document.getElementById('upload-cancel');

    // открытие фоторедактора
    function openPopupPhotoEditor() {
        photoEditor.classList.remove('hidden');
        return photoEditor;
    };
    downloadButton.addEventListener('change', openPopupPhotoEditor);

    // закрытие фоторедактора
    function closePopupPhotoEditor() {
        photoEditor.classList.add('hidden');
        return photoEditor;
    };
    closePhotoEditor.addEventListener('click', closePopupPhotoEditor);
    photoEditor.addEventListener('keydown', function(evt) {
        if (evt.KeyCode === 27) {
            closePopupPhotoEditor();
        }
    });


    //---------------------------------------------ФИЛЬТРЫ---------------------------------------

    var EffectsFotoArray = photoEditor.querySelectorAll('.effects__radio');

    function createClassFilter(name) {
        var classFilter = 'effects__preview--' + name;
        return classFilter;
    };

    function handleEffectClick(event) {
        var choiceFotoImg = photoEditor.querySelector('.img-upload__preview img');
        //console.info(event);
        var namesEffects = event.target.value;
        var classFilterFoto = createClassFilter(namesEffects);
        //console.info(classFilterFoto);
        choiceFotoImg.removeAttribute("class");
        choiceFotoImg.classList.add(classFilterFoto);
    };

    for(var i = 0; i < EffectsFotoArray.length; i++){
        EffectsFotoArray[i].addEventListener('click', handleEffectClick)
    };



    //---------------------------------------------------CЛАЙДЕР-----------------------------------------

    var levelFilterElement = photoEditor.querySelector('.effect-level__pin');
    var levelFilter = photoEditor.querySelector('.effect-level__line');
    var levelFilterDepth = photoEditor.querySelector('.effect-level__depth');
     //определение начала кординат слайдера
    //console.log(originСordinatsSlider.top);
    //console.log(originСordinatsSlider.left);
    

    (function sliderFilter (){
        levelFilter.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        var originСordinatsSlider = getCoords(levelFilter);
        console.log(originСordinatsSlider);

        var startCoords = {
        x: evt.clientX,
        y: evt.clientY
        };

        var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        
        var shift = {
            x: startCoords.x - moveEvt.clientX
        };

        startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
        };

        if(levelFilterElement.offsetLeft - shift.x <= 450 && levelFilterElement.offsetLeft - shift.x >= 0){
            levelFilterElement.style.left = (levelFilterElement.offsetLeft - shift.x) + 'px';
            levelFilterDepth.style.width = (levelFilterElement.offsetLeft - shift.x) + 'px';
        };
        };

        var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        });
        
    })();

    function getCoords(elem) { 
        var box = elem.getBoundingClientRect();
    
        return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
        };
    };
    
})();