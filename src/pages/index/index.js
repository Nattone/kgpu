console.log('main page scripts loaded')

// $(document).ready(function () {

//     $(document).on("click", ".fast-links__title", function () {
//         $(this).toggleClass("open");
//     });

// });

const toggleClass = (element) => () => {
  element.classList.toggle('_toggle_active')
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('._toggle')?.forEach((element) => element.addEventListener('click', toggleClass(element)))
})
