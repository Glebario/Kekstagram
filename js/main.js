var photos = 25;

//--------------------------------------находим шаблон-------------------------------
var teamplateUser = document.querySelector('#picture').content.querySelector('.picture');

//--------------------------------------масив с коментариями-------------------------------
var commentsArray = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто               непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография        лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный        момент?!'
];

//--------------------------------------масив с именами-------------------------------
var namesArray = [
    'ВИКТОР',
    'ОЛЬГА',
    'ОЛЕКСАНДР',
    'АНАСТАСИЯ',
    'СВЕТЛАНА',
    'ДАНИИЛ'
];

//--------------------------------------масив с svg-------------------------------
var svgArray = [
    'avatar-1.svg',
    'avatar-2.svg',
    'avatar-3.svg',
    'avatar-4.svg',
    'avatar-5.svg',
    'avatar-6.svg'
];

//--------------------------------------рандомное svg(аватарка)-------------------------------
var randomNamberSvg = function getRandomInRangeSvg(min, max){

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getRandomInRangeSvg = (1, svgArray.length)
  
//--------------------------------------рандомное имя пользователя-------------------------------
var randomNamberName = function getRandomInRangeName(min, max){

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getRandomInRangeName = (1, namesArray.length)

//--------------------------------------рандомный номер url-------------------------------
for(var z = 0; z < photos; z++){
    var randomNamberUrl = z;
}

//--------------------------------------рандомное кол-во лайков-------------------------------
var randomNamberLikes = function getRandomInRangeLikes(min, max){

    return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomInRangeLikes = (15, 200)

//--------------------------------------рандомный коментарий-------------------------------
var randomNamberComments = function getRandomInRangeComments(min, max){

    return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomInRangeComments = (1, commentsArray.length)

//----------------------рандомное кол-во коментариев под одной фото------------------------ 
var message = function(){
     for(var y = 0; y < randomNamberComments; y++){
        var getRandomInRangeQuantityComments = commentsArray[randomNamberComments];
    }
    message = getRandomInRangeQuantityComments;
    return 
}

//--------------------------------------генерация обьектов(фото) с разными данными---------- 
for(var i = 0; i < photos; i++){
    var generationObject = function(){
        var photoArray = {
            url: "photos/"+randomNamberUrl+".jpg",
            likes: randomNamberLikes,
            comments: {
                avatar: "img/"+randomNamberSvg,
                message: message,
                name: randomNamberName,
              }
        }
        return photoArray
    };

    //--------------------------------------копируем шаблон-------------------------------
    var photoElement = teamplateUser.cloneNode(true);

    //--------------------подстовляем данные в скопированные шаблоны-----------------------------
    var createObject = function(){
        photoElement.getElementsByTagName(img).setAttribute("src", photoArray.url);
        photoElement.querySelector('.picture__likes').textContent = photoArray.likes;
        photoElement.querySelector('.picture__comments').textContent = photoArray.comments;
        return photoElement
    };
    //------------------------подстовляем заполненные шаблоны на сайт-------------------------------
    var pictures = document.querySelector('.pictures');
    pictures.documentFragments(createObject);
}







