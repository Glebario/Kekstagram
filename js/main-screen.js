(function () {

/*
//--------------------------------------ЗАГРУЗКА ФОТО СО СТОТИЧЕСКИМИ ДАННЫМИ--------------------------------
var photos = 25;

// находим шаблон
var teamplateUser = document.querySelector('#picture').content.querySelector('.picture');

// масив с коментариями
var commentsArray = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// масив с именами
var namesArray = [
    'ВИКТОР',
    'ОЛЬГА',
    'ОЛЕКСАНДР',
    'АНАСТАСИЯ',
    'СВЕТЛАНА',
    'ДАНИИЛ'
];

// масив с svg
var svgArray = [
    'avatar-1.svg',
    'avatar-2.svg',
    'avatar-3.svg',
    'avatar-4.svg',
    'avatar-5.svg',
    'avatar-6.svg'
];

// функция генерации рандомного числа
function getRandomInRangeNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Генерация рандомных коментарий(message)
function generateCommentMessage() {
    messageArray = [];

    for(var i = 0; i < 2; i++){
       var randomNumberComments = getRandomInRangeNumber(1, commentsArray.length);
       var randomComments = commentsArray[randomNumberComments];
       messageArray[i] = randomComments;
    };
   return messageArray;
}

// Масив коментарий
function getPhotoPostComments(count) {
    var comments = [];

    for(var i = 0; i < count; i++) {
        
        // рандомное svg(аватарка)
        var randomNumberUserSvg = getRandomInRangeNumber(1, svgArray.length);
        var userAvatarImageName = svgArray[randomNumberUserSvg];

        // рандомное имя пользователя
        var randomNumberUserName = getRandomInRangeNumber(1, namesArray.length);
        var userName = namesArray[randomNumberUserName];

        comments.push({
             avatar: "img/" + userAvatarImageName,
             message: generateCommentMessage(),
             name: userName
        });
    };
    return comments;
}

// генерация обьектов(фото) с разными данными
function generatePhotoPostObject(numberUserUrlAdress, quantityLikes, comments) {
    var photoArray = {
        url: 'photos/' + numberUserUrlAdress + '.jpg',
        likes: quantityLikes,
        comments: comments
    };
    return photoArray;  
}

for(var i = 0; i < photos; i++) {
    // подстовляем значения url, likes, comments
    var photoPost = generatePhotoPostObject(i + 1 , photoPostLikes , getPhotoPostComments(getRandomInRangeNumber(1, 20)));
    console.info(photoPost);

    // рандомное кол-во лайков
    var photoPostLikes = getRandomInRangeNumber(15, 200);

    addDataToCopiedTemplates();
    addTemplatesToSite();
};

// подстовляем данные в скопированные шаблоны
function addDataToCopiedTemplates() {
    // копируем шаблон
    var photoElement = teamplateUser.cloneNode(true);

    photoElement.querySelector('.picture__img').setAttribute('src', photoPost.url);
    photoElement.querySelector('.picture__likes').textContent = photoPost.likes;
    photoElement.querySelector('.picture__comments').textContent = photoPost.comments.length;

    return photoElement;
}

// подстовляем заполненные шаблоны на сайт
function addTemplatesToSite() {

    var fragment = document.createDocumentFragment();
    fragment.appendChild(addDataToCopiedTemplates());

    var pictures = document.querySelector('.pictures');
    pictures.appendChild(fragment);

    return fragment
}
*/

//-------------------------------------------ЗАГРУЗКА ФОТО С СЕРВЕРА-----------------------------

var url = ' https://js.dump.academy/kekstagram/data';

var teamplateUser = document.querySelector('#picture').content.querySelector('.picture');

function addDataToCopiedTemplates(data) {
    // копируем шаблон
    var photoElement = teamplateUser.cloneNode(true);

    photoElement.querySelector('.picture__img').setAttribute('src', data.url);
    photoElement.querySelector('.picture__likes').textContent = data.likes;
    photoElement.querySelector('.picture__comments').textContent = data.comments.length;

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
    
    var filtered = data.sort(function(){
        return Math.random() - 0.5;
    }).slice(0, 10);
    //console.log(filtered);

    for (var i = 0; i < filtered.length; i++) {
    fragment.appendChild(addDataToCopiedTemplates(filtered[i]));
    };

    var pictures = document.querySelector('.pictures');
    pictures.appendChild(fragment);
};

//обсуждаемые посты
var successHandlerDiscussed = function (data) {
    var fragment = document.createDocumentFragment();
    var filtered = data.sort(function(a, b){
        var c = a.comments,
            d = b.comments;
    
        if( c < d ){
            return -1;
        }else if( c > d ){
            return 1;
        };
        return 0;
    }).reverse();
    
    for(var i in data){
        console.log(data[i]); 
    };
    
    for (var i = 0; i < filtered.length; i++) {
    fragment.appendChild(addDataToCopiedTemplates(filtered[i]));
    };

    var pictures = document.querySelector('.pictures');
    pictures.appendChild(fragment);
};

//обработчики событий фильтров

    filterPopular.addEventListener('click', function(event){
        removePostCard();
        window.load(url, successHandler, errorHandler);
    })
    filterNew.addEventListener('click', function(event){
        removePostCard();
        window.load(url, successHandlerNew, errorHandler);
    })
    filterDiscussed.addEventListener('click', function(event){
        removePostCard();
        window.load(url, successHandlerDiscussed, errorHandler);
    })

})();
 