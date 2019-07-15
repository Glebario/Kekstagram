var photos = 25;

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
function getRandomInRangeNamber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Генерация рандомных коментарий(message)
function message(){
    messageArray = [];
    for(var i = 0; i < 2; i++){
       var randomNamberComments = getRandomInRangeNamber(1, commentsArray.length);
       var randomComments = commentsArray[randomNamberComments];
       messageArray[i] = randomComments;
    };
   return messageArray;
}


// Масив коментарий
function getComments(count) {
    var comments = [];

    for(var i = 0; i < count; i++) {
        comments.push({
             avatar: "img/" + randomSvg,
             message: message(),
             name: randomName
        });
    };
    return comments;
}

// генерация обьектов(фото) с разными данными
function generationObject(index, randomNamberLikes, commentsArray) {
    var photoArray = {
        url: 'photos/' + index + '.jpg',
        likes: randomNamberLikes,
        comments: commentsArray
    };
    return photoArray;  
}

for(var i = 0; i < photos; i++) {
    // рандомное svg(аватарка
    var randomNamberSvg = getRandomInRangeNamber(1, svgArray.length);
    var randomSvg = svgArray[randomNamberSvg];

    // рандомное имя пользователя
    var randomNamberName = getRandomInRangeNamber(1, namesArray.length);
    var randomName = namesArray[randomNamberName];

    // рандомное кол-во лайков
    var randomNamberLikes = getRandomInRangeNamber(15, 200);

    // номер url, likes,comments
    var photoPost = generationObject(i + 1 , randomNamberLikes , getComments(getRandomInRangeNamber(1, 20)));

    // находим шаблон
    var teamplateUser = document.querySelector('#picture').content.querySelector('.picture');

    // копируем шаблон
    var photoElement = teamplateUser.cloneNode(true);

    // подстовляем данные в скопированные шаблоны
    photoElement.querySelector('.picture__img').setAttribute('src', photoPost.url);
    photoElement.querySelector('.picture__likes').textContent = photoPost.likes;
    photoElement.querySelector('.picture__comments').textContent = photoPost.comments.length;
    console.info(photoElement);

    var fragment = document.createDocumentFragment();
    fragment.appendChild(photoElement);

    // подстовляем заполненные шаблоны на сайт
    var pictures = document.querySelector('.pictures');
    pictures.appendChild(fragment);
};








