(function () {


//-------------------------------------------ЗАГРУЗКА ФОТО С СЕРВЕРА-----------------------------

var url = ' https://js.dump.academy/kekstagram/data';

var teamplateUser = document.querySelector('#picture').content.querySelector('.picture');

function addDataToCopiedTemplates(data) {
    // копируем шаблон
    var photoElement = teamplateUser.cloneNode(true);

    photoElement.querySelector('.picture__img').setAttribute('src', data.url);
    photoElement.querySelector('.picture__likes').textContent = data.likes;
    photoElement.querySelector('.picture__comments').textContent = data.comments.length;

    //событие дляпросмотра фото вувеличенном масштабе
    photoElement.addEventListener('click', function(){
        window.viewFotopostBigScale.BigPicture(data);
    });
    window.btnCloseBigPicture.addEventListener('click', function(){
        window.viewFotopostBigScale.closeBigPicture();
    });
    window.fotoPostBigPicture.addEventListener('keydown', function(evt){
        if (evt.keyCode == 27) {
            window.viewFotopostBigScale.closeBigPicture();
        };
    });
    return photoElement;
};
  
var successHandler = function (data) {
    //console.log(data);
    var fragment = document.createDocumentFragment();
    
    for (var i = 0; i < data.length; i++) {
    fragment.appendChild(addDataToCopiedTemplates(data[i]));
    };

    var pictures = document.querySelector('.pictures');
    pictures.appendChild(fragment);
};

var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    
    node.textContent = errorMessage; 
    document.body.insertAdjacentElement('afterbegin', node);
};
  
//window.load(url, successHandler, errorHandler);



//--------------------------------------------ФИЛЬТРЫ-------------------------------------------
var filters = document.querySelector('.img-filters');
filters.classList.remove('img-filters--inactive')

var filterPopular = filters.querySelector('#filter-popular');
var filterNew = filters.querySelector('#filter-new');
var filterDiscussed = filters.querySelector('#filter-discussed');

filterPopular.classList.remove('img-filters__button--active');

//смена кнопки фильтра
let selectedBtn;

filters.onclick = function(event) {
  let target = event.target; // где был клик?
  if (target.tagName != 'BUTTON') return; // не на TD? тогда не интересует

  highlight(target); // подсветить TD
};
function highlight(btn) {
  if (selectedBtn) { // убрать существующую подсветку, если есть
    selectedBtn.classList.remove('img-filters__button--active');
  }
  selectedBtn = btn;
  selectedBtn.classList.add('img-filters__button--active'); // подсветить новый td
};

//удаление постов(фото) при смене фильтра
function removePostCard(){
    var postContainer = document.querySelector('.pictures');
    //console.info(postContainer);
    while(postContainer.children[2]){
        //console.info(postContainer.children[2]);
        //--------------------------------------проверить-------------------------
        postContainer.removeChild(postContainer.children[2]);
    };
    return postContainer
};

//новые посты
var successHandlerNew = function (data) {
    //console.log(data);
    var fragment = document.createDocumentFragment();
    
    var filteredNew = data.sort(function(){
        return Math.random() - 0.5;
    }).slice(0, 10);

    for (var i = 0; i < filteredNew.length; i++) {
    fragment.appendChild(addDataToCopiedTemplates(filteredNew[i]));
    };

    var pictures = document.querySelector('.pictures');
    pictures.appendChild(fragment);
};

//обсуждаемые посты
var successHandlerDiscussed = function (data) {
    var fragment = document.createDocumentFragment();

    //сортировка по возростанию
    var filteredDiscussed = data.sort(function(a, b){
        var c = a.comments,
            d = b.comments;
    
        if( c < d ){
            return -1;
        }else if( c > d ){
            return 1;
        };
        return 0;
    }).reverse();
    
    for (var i = 0; i < filteredDiscussed.length; i++) {
    fragment.appendChild(addDataToCopiedTemplates(filteredDiscussed[i]));
    };

    var pictures = document.querySelector('.pictures');
    pictures.appendChild(fragment);
};

//обработчики событий фильтров

filterPopular.addEventListener('click', function(event){
    removePostCard();
    window.load(url, successHandler, errorHandler);
});
filterNew.addEventListener('click', function(event){
    removePostCard();
    window.load(url, successHandlerNew, errorHandler);
});
filterDiscussed.addEventListener('click', function(event){
    removePostCard();
    window.load(url, successHandlerDiscussed, errorHandler);
});
})();
