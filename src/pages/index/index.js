import Glide from '@glidejs/glide'

const toggleClass = (element) => () => {
  element.classList.toggle('_toggle_active')
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('._toggle')?.forEach((element) => element.addEventListener('click', toggleClass(element)))

  new Glide('.glide').mount()
})
