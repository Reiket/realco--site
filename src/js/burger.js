//щоб опреділити на якому устройстві відкрито сайт (чи тачскрін чи мишка)
export function burgerFuntion() {

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

   if (isMobile.any()) { //перевіряєм яке устройство
      document.body.classList.add('_touch'); //якщо с тачскріном, то добавляєм в body клас _touch

      let menuArrows = document.querySelectorAll('.menu__arrow');//добавляєм в переміну menuArrows всі блоки з класом menu__arrow
      if (menuArrows.length > 0) { // перевіряєм чи вони існують
         for (let index = 0; index < menuArrows.length; index++) { //перебираєм їх
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener('click', (e) => { //добавляєм подію клік
               menuArrow.parentElement.classList.toggle('_active'); //добавляєм родителю клас active
            });
         }
      }
   } else {
      document.body.classList.add('_pc'); //якщо це пк добавляэм в body клас _pc
   }


   //Меню бургер 

   const iconMenu = document.querySelector('.icon-menu');
   const menuBody = document.querySelector('.menu__body');
   if (iconMenu) {
      iconMenu.addEventListener('click', (e) => {
         document.body.classList.toggle('_lock'); //для того щоб при відкритому бургері не скролилась сторінка
         iconMenu.classList.toggle('_active');
         menuBody.classList.toggle('_active');
         document.documentElement.classList.toggle('catalog-menu');
         if(document.documentElement.classList.contains('catalog-open')) {
            document.documentElement.classList.remove('catalog-menu');
            document.documentElement.classList.remove('catalog-open');
         }
         if(document.documentElement.classList.contains('sub-menu-open')) {
            document.documentElement.classList.remove('catalog-menu');
            document.documentElement.classList.remove('sub-menu-open');
         }
      });
   }


   //прокрутка при клике

   const menuLinks = document.querySelectorAll('.menu__link[data-goto]'); //добавляєм в переміну menuLinks всі блоки з класом menu__link[data-goto]

   if (menuLinks.length > 0) { // перевіряєм чи вони існують
      menuLinks.forEach(menuLink => { //перебираєм їх
         menuLink.addEventListener('click', onMenuLinkClick); //добавляєм подію клік
      });

      function onMenuLinkClick(e) {
         const menuLink = e.target; //получаєм об'єкт на який ми клікнули
         if (menuLink.dataset.goto && document.querySelector(`.${menuLink.dataset.goto}`)) { //перевірєм чи цей атрибут заповнений і чи існує об'єкт на який ми клікаємо
            const gotoBlock = document.querySelector(`.${menuLink.dataset.goto}`); //получаєм цей об'єкт в перемінну
            //виміряєм на скілбки пікселів потрібно прокрутити
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            if (iconMenu.classList.contains('_active')) {
               document.body.classList.remove('_lock'); //для того щоб при відкритому бургері не скролилась сторінка
               iconMenu.classList.remove('_active');
               menuBody.classList.remove('_active');
            }


            window.scrollTo({ //добавляэм скролл
               top: gotoBlockValue,
               behavior: "smooth" //прокрутка плавна
            });
            e.preventDefault();
            console.log(gotoBlockValue);
         }
      }
   }
}
