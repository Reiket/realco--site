export function scriptFunction() {
   const close = document.querySelector('.close');
   const closeIcon = document.querySelector('.close__icon');
   closeIcon.addEventListener('click', function (e) {
      close.classList.toggle('_close');
   })
   function removeClasses(array, className) {
      for (var i = 0; i < array.length; i++) {
         array[i].classList.remove(className);
      }
   }
   const isMobile = {
      Android: function () {
         return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
         return navigator.userAgent.match(/BlackBerry/i);
      },
      IOS: function () {
         return navigator.userAgent.match(/IPhone|IPad|IPod/i);
      },
      Opera: function () {
         return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
         return navigator.userAgent.match(/IEMobile/i);
      },
      any: function () {
         return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.IOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
         }
   };
   window.onload = function () {
      document.addEventListener("click", documentActions);
      function documentActions(e) {
         const targetElement = e.target;
         if(window.innerWidth > 991) {
            if(targetElement.classList.contains('menu__arrow')) {
               targetElement.closest('.menu__item').classList.toggle('_hover');            
            }
            if(!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
               removeClasses(document.querySelectorAll('.menu__item._hover'), "_hover");
            }
         } 
         if(window.innerWidth > 1) {
            if(targetElement.classList.contains('house__arrow')) {
               targetElement.closest('.house__contact').classList.toggle('_hover');            
            }
            if(!targetElement.closest('.house__contact') && document.querySelectorAll('.house__contact._hover').length > 0) {
               removeClasses(document.querySelectorAll('.house__contact._hover'), "_hover");
            }
         } 
      }
   }   
}