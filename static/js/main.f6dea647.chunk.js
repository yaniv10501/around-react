(this["webpackJsonparound-react"]=this["webpackJsonparound-react"]||[]).push([[0],{11:function(e,t,a){},12:function(e,t,a){},14:function(e,t,a){"use strict";a.r(t);var n=a(1),i=a.n(n),c=a(4),r=a.n(c),o=(a(11),a(2)),s=(a(12),a.p+"static/media/header-logo.4e8e0a1d.svg"),u=a(0);function p(){return Object(u.jsx)("header",{className:"header",children:Object(u.jsx)("img",{className:"header__logo",src:s,alt:"Header logo"})})}function l(e){var t=e.card,a=t.name,n=t.link,i=t.likes,c=e.onCardClick;return Object(u.jsxs)("li",{className:"photo",children:[Object(u.jsx)("img",{className:"photo__image",alt:a,src:n,onClick:function(){c(a,n)}}),Object(u.jsx)("button",{className:"photo__delete",type:"button","aria-label":"Delete"}),Object(u.jsxs)("div",{className:"photo__info",children:[Object(u.jsx)("h2",{className:"photo__title",children:a}),Object(u.jsxs)("div",{className:"photo__like-container",children:[Object(u.jsx)("button",{className:"photo__like",type:"button","aria-label":"Like"}),Object(u.jsx)("p",{className:"photo__like-count",children:i.length})]})]})]})}function d(e){var t=e.isLoading,a=e.user,n=a.userName,i=a.userAvatar,c=a.userDescription,r=e.cards,o=e.onEditProfileClick,s=e.onAddPlaceClick,p=e.onEditAvatarClick,d=e.onCardClick;return Object(u.jsxs)("main",{className:"container",children:[Object(u.jsx)("div",{className:t?"spinner":"spinner spinner_hidden",children:Object(u.jsx)("i",{})}),Object(u.jsxs)("div",{className:t?"content content_hidden":"content",children:[Object(u.jsxs)("section",{className:"profile",children:[Object(u.jsx)("div",{className:"profile__edit-pic",onClick:p,children:Object(u.jsx)("div",{className:"profile__pic",style:{backgroundImage:"url(".concat(i,")")}})}),Object(u.jsxs)("div",{className:"profile__info",children:[Object(u.jsx)("h1",{className:"profile__name",id:"name",children:n}),Object(u.jsx)("p",{className:"profile__description",id:"job",children:c}),Object(u.jsx)("button",{className:"profile__edit-button",type:"button","aria-label":"Edit profile",onClick:o})]}),Object(u.jsx)("button",{className:"profile__add-button",type:"button","aria-label":"Add a picture",onClick:s})]}),Object(u.jsx)("section",{className:"photos",children:Object(u.jsx)("ul",{className:"photos__grid",children:r.map((function(e){return Object(u.jsx)(l,{card:e,onCardClick:d},e._id)}))})})]})]})}function h(){return Object(u.jsx)("footer",{className:"footer",children:Object(u.jsx)("p",{className:"footer__copyright",children:"\xa9 2021 Around the U.S. Yaniv Schweitzer"})})}function j(e){var t=e.name,a=e.formName,n=e.formTitle,i=e.submitTitle,c=e.isOpen,r=e.onClose,o=e.children;return Object(u.jsx)("div",{className:c?"popup popup_type_".concat(t," popup_opened"):"popup popup_type_".concat(t),children:Object(u.jsxs)("div",{className:"popup__container",children:[Object(u.jsxs)("form",{className:"popup__form",name:a,noValidate:!0,_id:"",children:[Object(u.jsx)("h2",{className:"popup__title",children:n}),o,Object(u.jsx)("button",{className:"popup__save-button",type:"submit",children:i})]}),Object(u.jsx)("button",{className:"popup__close-button",type:"button","aria-label":"Close",onClick:r})]})})}function b(e){var t=e.selectedCard,a=t.name,n=t.link,i=e.isOpen,c=e.onClose;return Object(u.jsx)("div",{className:i?"popup popup_type_image popup_opened":"popup popup_type_image",children:Object(u.jsxs)("div",{className:"popup__container popup__container_type_image",children:[Object(u.jsx)("img",{className:"popup__image",src:n,alt:a}),Object(u.jsx)("h2",{className:"popup__image-title",children:a}),Object(u.jsx)("button",{className:"popup__close-button",type:"button","aria-label":"Close",onClick:c})]})})}var _=a(5),m=a(6),f=new(function(){function e(t){var a=t.baseUrl,n=t.authorization;Object(_.a)(this,e),this._baseUrl=a,this._authorization=n}return Object(m.a)(e,[{key:"_checkRes",value:function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))}},{key:"getUserInfo",value:function(){var e=this;return fetch("".concat(this._baseUrl,"/users/me"),{headers:{authorization:this._authorization}}).then((function(t){return e._checkRes(t)}))}},{key:"getIntialCard",value:function(){var e=this;return fetch("".concat(this._baseUrl,"/cards"),{headers:{authorization:this._authorization}}).then((function(t){return e._checkRes(t)}))}},{key:"setUserinfo",value:function(e){var t=this,a=e.name,n=e.about;return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:{authorization:this._authorization,"Content-Type":"application/json"},body:JSON.stringify({name:a,about:n})}).then((function(e){return t._checkRes(e)}))}},{key:"setUserPicture",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:{authorization:this._authorization,"Content-Type":"application/json"},body:JSON.stringify({avatar:e})}).then((function(e){return t._checkRes(e)}))}},{key:"addCard",value:function(e){var t=this,a=e.name,n=e.link;return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:{authorization:this._authorization,"Content-Type":"application/json"},body:JSON.stringify({name:a,link:n})}).then((function(e){return t._checkRes(e)}))}},{key:"deleteCard",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:{authorization:this._authorization}}).then((function(e){return t._checkRes(e)}))}},{key:"addLike",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:{authorization:this._authorization}}).then((function(e){return t._checkRes(e)}))}},{key:"removeLike",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:{authorization:this._authorization}}).then((function(e){return t._checkRes(e)}))}}]),e}())({baseUrl:"https://around.nomoreparties.co/v1/group-12",authorization:"12be1991-4f28-449f-a9a9-71d4704b25a2"});var O=function(){var e=Object(n.useState)({name:"",link:""}),t=Object(o.a)(e,2),a=t[0],i=t[1],c=Object(n.useState)(!1),r=Object(o.a)(c,2),s=r[0],l=r[1],_=Object(n.useState)(!1),m=Object(o.a)(_,2),O=m[0],x=m[1],N=Object(n.useState)(!1),v=Object(o.a)(N,2),k=v[0],g=v[1],y=Object(n.useState)(!1),C=Object(o.a)(y,2),T=C[0],z=C[1],S=function(){g(!1),l(!1),x(!1),z(!1)},U=Object(n.useState)(!0),L=Object(o.a)(U,2),E=L[0],P=L[1],A=Object(n.useState)([]),R=Object(o.a)(A,2),I=R[0],D=R[1],q=Object(n.useState)({userName:"",userDescription:"",userAvatar:""}),w=Object(o.a)(q,2),J=w[0],F=w[1];return Object(n.useEffect)((function(){Promise.all([f.getUserInfo(),f.getIntialCard()]).then((function(e){F({userName:e[0].name,userDescription:e[0].about,userAvatar:e[0].avatar}),D(e[1])})).then((function(){return P(!1)})).catch((function(e){return console.log(e)}))}),[]),Object(u.jsxs)("div",{className:"page",children:[Object(u.jsx)(p,{}),Object(u.jsx)(d,{isLoading:E,user:J,cards:I,onEditProfileClick:function(){l(!0)},onAddPlaceClick:function(){x(!0)},onEditAvatarClick:function(){g(!0)},onCardClick:function(e,t){i({name:e,link:t}),z(!0)}}),Object(u.jsx)(h,{}),Object(u.jsxs)(j,{name:"edit-info",formName:"editInfo",formTitle:"Edit profile",submitTitle:"Save",isOpen:s,onClose:S,children:[Object(u.jsx)("input",{className:"popup__input popup__input_type_name",id:"name-input",type:"text",placeholder:"name",name:"name",minLength:"2",maxLength:"40",required:!0}),Object(u.jsx)("span",{className:"popup__error name-input-error"}),Object(u.jsx)("input",{className:"popup__input popup__input_type_about",id:"about-input",type:"text",placeholder:"about me",name:"job",minLength:"2",maxLength:"200",required:!0}),Object(u.jsx)("span",{className:"popup__error about-input-error"})]}),Object(u.jsxs)(j,{name:"edit-picture",formName:"editPicture",formTitle:"Change profile picture",submitTitle:"Save",isOpen:k,onClose:S,children:[Object(u.jsx)("input",{className:"popup__input popup__input_type_profile-picture",id:"profile-picture-input",placeholder:"profile picture url",name:"picture",type:"url",required:!0}),Object(u.jsx)("span",{className:"popup__error profile-picture-input-error"})]}),Object(u.jsxs)(j,{name:"add",formName:"add",formTitle:"New Place",submitTitle:"Create",isOpen:O,onClose:S,children:[Object(u.jsx)("input",{className:"popup__input popup__input_type_title",id:"title-input",type:"text",placeholder:"Title",name:"title",minLength:"2",maxLength:"30",required:!0}),Object(u.jsx)("span",{className:"popup__error  title-input-error"}),Object(u.jsx)("input",{className:"popup__input popup__input_type_url",id:"url-input",type:"url",placeholder:"Image URL",name:"url",required:!0}),Object(u.jsx)("span",{className:"popup__error url-input-error"})]}),Object(u.jsx)(j,{name:"delete",formName:"delete",formTitle:"Are you sure?",submitTitle:"Yes"}),Object(u.jsx)(b,{isOpen:T,selectedCard:a,onClose:S})]})},x=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,15)).then((function(t){var a=t.getCLS,n=t.getFID,i=t.getFCP,c=t.getLCP,r=t.getTTFB;a(e),n(e),i(e),c(e),r(e)}))};r.a.render(Object(u.jsx)(i.a.StrictMode,{children:Object(u.jsx)(O,{})}),document.getElementById("root")),x()}},[[14,1,2]]]);
//# sourceMappingURL=main.f6dea647.chunk.js.map