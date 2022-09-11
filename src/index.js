import Glide from '@glidejs/glide'
import Masonry from 'masonry-layout'

export const toggleClass = (element) => () => {
  element.classList.toggle('_toggle_active')
}

export const initGlide = (selector) => {
  document.querySelectorAll(selector)?.forEach((element) => {
    const glide = new Glide(element, {
      perView: element.dataset.count || 1,
    })
    glide?.mount()
  })
}

export const initMasonry = (selector, options = {}) => {
  document.querySelectorAll(selector)?.forEach((element) => {
    // eslint-disable-next-line no-unused-vars
    const masonry = new Masonry(element, options)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('._toggle')?.forEach((element) => {
    element.querySelector('._toggle__button').addEventListener('click', toggleClass(element))
  })

  initMasonry('.grid', {
    percentPosition: true,
    gutter: 30,
  })
  initGlide('.glide')
})
