var photos = 26;

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
    //console.info(photoPost);

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

//-----------------------------------------------------------------------------------------------------
// событие: нажатие на кнопку загрузки фото
var downloadButton = document.getElementById('upload-file');
var photoEditor = document.querySelector('.img-upload__overlay');
var closePhotoEditor = document.getElementById('upload-cancel');

var openPopupPhotoEditor = function() {
    photoEditor.classList.remove('hidden');
    return photoEditor;
};

var closePopupPhotoEditor = function() {
    photoEditor.classList.add('hidden');
    return photoEditor;
};
downloadButton.addEventListener('change', openPopupPhotoEditor);

closePhotoEditor.addEventListener('click', closePopupPhotoEditor);
photoEditor.addEventListener('keydown', function(evt) {
    if (evt.KeyCode === 27) {
        closePopupPhotoEditor();
    }
});
