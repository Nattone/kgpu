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
    element.querySelector('._toggle__button')?.addEventListener('click', toggleClass(element))
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

  document.addEventListener('click', (e) => {
    if (!itemsContainer.contains(e.target)) {
      if (container.classList.contains('_open')) {
        e.preventDefault()
        e.stopPropagation()
        container.classList.remove('_open')
      }
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' || e.key === 'Escape') {
      container.classList.remove('_open')
    }
  })
}

export const initDropdown = (selector) => {
  document.querySelectorAll('.dropdown').forEach((dropDownWrapper) => {
    const dropDownBtn = dropDownWrapper.querySelector('.dropdown__btn')
    const dropDownList = dropDownWrapper.querySelector('.dropdown__list')
    const dropDownItems = dropDownList.querySelectorAll('.dropdown__item')
    const dropDownInputHidden = dropDownWrapper.querySelector('.dropdown__input_hidden')

    dropDownBtn.addEventListener('click', () => {
      dropDownList.classList.toggle('dropdown__list_visible')
    })

    dropDownItems.forEach((listItem) => {
      listItem.addEventListener('click', (e) => {
        e.stopPropagation()
        dropDownBtn.innerText = this.innerText
        // dropDownBtn.focus();
        dropDownInputHidden.value = this.dataset.value
        dropDownList.classList.remove('dropdown__list_visible')
      })
    })

    document.addEventListener('click', (e) => {
      if (e.target !== dropDownBtn) {
        dropDownList.classList.remove('dropdown__list_visible')
      }
    })

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' || e.key === 'Escape') {
        dropDownList.classList.remove('dropdown__list_visible')
      }
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initToggle()
  initLanguages()

  initMasonry('.grid', {
    percentPosition: true,
    gutter: 30,
  })

  initGlide('.glide')

  initDropdown()
})
