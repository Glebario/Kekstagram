(function(){
//------------------------------------ПРОСМОТР ФОТОПОСТОВ В УВЕЛИЧЕННОМ МАСШТАБЕ---------------------
window.fotoPostBigPicture = document.querySelector('.big-picture');
window.btnCloseBigPicture = fotoPostBigPicture.querySelector('.big-picture__cancel');
var commentsContainer = fotoPostBigPicture.querySelector('.social__comments');
var structureCommentTeamplate = fotoPostBigPicture.querySelector('.social__comment');

//экспортируем нужные функции в глоб. область видимости
window.viewFotopostBigScale = {
    //закрытие формы подробного обзра фото поста
    closeBigPicture: function () {
        fotoPostBigPicture.classList.add('hidden');
    },
    //открытие и последующая подстановка данных в форму подробного просмотра фотопоста
    BigPicture: function (clickFotoPost) {
        fotoPostBigPicture.classList.remove('hidden');
        fotoPostBigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
        
        fotoPostBigPicture.querySelector('.big-picture__img').children[0].setAttribute('src', clickFotoPost.url);
        fotoPostBigPicture.querySelector('.likes-count').textContent = clickFotoPost.likes;
        fotoPostBigPicture.querySelector('.comments-count').textContent = clickFotoPost.comments.length;
        fotoPostBigPicture.querySelector('.social__caption').textContent = clickFotoPost.description;
        fotoPostBigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
        fotoPostBigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
        createCommentsForm(clickFotoPost.comments);
    
        return fotoPostBigPicture;
    }
};

//создаем список коментариев (по данным с сервера) под каждым фотопостом
function createCommentsForm(clickCommentPostArray){
    //удаляем все ненужные коментарии 
    while( commentsContainer.firstChild ){
        commentsContainer.removeChild( commentsContainer.firstChild );
    };

    var fragment = document.createDocumentFragment();

    //подстовляем данные с сервера в скпированную структуру
    for(var i = 0; i < clickCommentPostArray.length; i++){
        fragment.appendChild(substitutionAvatarMessage(clickCommentPostArray[i]));
        console.log(clickCommentPostArray[i].message);
    };

    //доп. функция по подстановке данныхдля коментов
    function substitutionAvatarMessage(data){
        //копируем шаблон структуры коментария
        var structureComment = structureCommentTeamplate.cloneNode(true);

        structureComment.querySelector('.social__text').textContent =  data.message;
        structureComment.querySelector('.social__picture').setAttribute('src', data.avatar);
        structureComment.querySelector('.social__picture').setAttribute('alt', data.name);

        return structureComment;
    };

    //подстовляем коментарии на сайт
    commentsContainer.appendChild(fragment);
    console.log(commentsContainer);

    
};

})();