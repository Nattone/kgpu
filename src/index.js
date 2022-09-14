import Glide from '@glidejs/glide'
import Masonry from 'masonry-layout'

export const initGlide = (selector) => {
  document.querySelectorAll(selector)?.forEach((element) => {
    const glide = new Glide(element, {
      perView: element.dataset.count || 1,
      type: 'carousel',
      // autoplay: 5000,
      // breakpoints: {
      //   1024: {
      //     perView: 2
      //   },
      //   600: {
      //     perView: 1
      //   }
      // }
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

export const initToggle = () => {
  const toggleClass = (element) => () => {
    element.classList.toggle('_toggle_active')
  }
  document.querySelectorAll('._toggle')?.forEach((element) => {
    element.querySelector(`._toggle__button`).addEventListener('click', toggleClass(element))
  })
}

export const initLanguages = () => {
  const container = document.querySelector('.language')
  const itemsContainer = container?.querySelector('.language__items')

  itemsContainer?.querySelectorAll('.language__item')?.forEach((element) =>
    element.addEventListener('click', (event) => {
      if (element.classList.contains('_current')) {
        event.preventDefault()
        container.classList.toggle('_open')
      } else {
        container.classList.remove('_open')
        itemsContainer?.querySelector('._current')?.classList?.remove('_current')
        element?.classList?.add('_current')
      }
    })
  )
}

document.addEventListener('DOMContentLoaded', () => {
  initToggle()
  initLanguages()

  initMasonry('.grid', {
    percentPosition: true,
    gutter: 30,
  })

  initGlide('.glide')
})
