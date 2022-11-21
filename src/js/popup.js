export function popupFunction() {
   const body = document.querySelector('body');  //Получаєм елемент body
   const popupLinks = document.querySelectorAll('.popup__link'); // Получаэм ссилки, які при кліці будуть визивати Попап
   const lockPadding = document.querySelector('.lock-padding'); // Додається до фіксованих елементі наприклад header щоб він не сдвигався
   const closePopup = document.querySelectorAll('.close-popup'); // получаєм елементБ він задається щоб можна було любим елементом яким треба закрити попап

   let blockLock = true; // щоб забраити подвійні кліки на модальне вікно, (щоб воно закрилось і тоді можна було щераз його відкривати)

   const timeout = 800; // для блокування скрола і нормальної роботи його


   if (popupLinks.length > 0) {  //Перевірка чи існують такі силки (модальні вікна)
      for (let index = 0; index < popupLinks.length; index++) {  // перебираєм всі силки
         const popupLink = popupLinks[index]; //получаєм їх в переменную popupLink
         popupLink.addEventListener('click', (e) => { // вішаєм подію на силки 
            const popupName = popupLink.getAttribute('href').replace('#', ''); // получаєм атрибут href і забираєм з нього # (тобто #popup -> popup)
            const currentName = document.getElementById(popupName); //получаэм id popup
            popupOpen(currentName); // відправляєм елемент currentName в функцію popupOpen
            e.preventDefault(); //заборона перезагружати сторінку
         });
      }
   };

   if (closePopup.length > 0) { // Перевірка чи є елементи які закривають попап
      for (let index = 0; index < closePopup.length; index++) { // перебираєм всі силки
         const closePopupLink = closePopup[index];  //получаєм їх в переменную closePopupLink
         closePopupLink.addEventListener('click', (e) => { // вішаєм подію на силки
            popupClose(closePopupLink.closest('.popup__fade')); //Передаєм в фунцію popupClose,те що силка буде шукати елемент з класом popup і його закривати
            e.preventDefault(); //заборона перезагружати сторінку
         });
      }
   };

   const popupOpen = (currentPopup) => {
      if (currentPopup && blockLock) { // перевіряєм чи є такий об'єкт і чи відкирита в нас переменная unlock (обявлена як відкрита)
         const popupActive = document.querySelector('.popup__fade.open'); //це якщо в попапі є ще один попап
         if (popupActive) {
            popupClose(popupActive, false); // закриваєм перший попап і відкриваєм другий
         } else {
            bodyLock(); // якщо немає, блочим скролл
         }

         currentPopup.classList.add('open'); // попапу добавляєм класс open
         currentPopup.addEventListener('click', (e) => {
            if (!e.target.closest('.popup')) { // для того щоб закривати попап на затемнену область
               popupClose(e.target.closest('.popup__fade'))
            }
         });
      }
   };

   function popupClose(popupActive, doUnlock = true) { // фукнція для закривання попапа
      if (blockLock) {
         popupActive.classList.remove('open'); //забираєм класс open
         if (doUnlock) {  //для того щоб не появлявся скролл якщо в попапі ще один попап
            bodyUnLock();
         }
      }
   }




   function bodyLock() { //фунція щоб забрати скрил якщо попап великий
      const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'; //забирає скролл двойний і не сдвигає контент

      if (lockPadding.length > 0) { // перевіряєм чи є такі об'єкти
         for (let index = 0; index < lockPadding.length; index++) { //щоб фіксованні класи не сдвигались
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
         }
      }

      body.style.paddingRight = lockPaddingValue;
      body.classList.add('lock');

      blockLock = false; //щоб не попап не відкривався поки не закриється
      setTimeout(() => {
         blockLock = true;
      }, timeout);
   }


   const bodyUnLock = () => {
      setTimeout(() => { // для того щоб попап не зміщався коли появляється/скривається скрилл
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px'
         }
         body.style.paddingRight = '0px';
         body.classList.remove('lock');
      }, timeout);

      blockLock = false; //щоб не попап не відкривався поки не закриється
      setTimeout(() => {
         blockLock = true;
      }, timeout);
   }
}