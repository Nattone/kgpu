import Glide from '@glidejs/glide'
import Masonry from 'masonry-layout'

export const initGlide = (selector, options) => {
  document.querySelectorAll(selector)?.forEach((element) => {
    const glide = new Glide(element, {
      perView: element.dataset.count || 1,
      type: 'carousel',
      ...options,
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
  const toggleClass = (element) => (event) => {
    event.preventDefault()
    const container = element.querySelector('._toggle__container')

    if (!element.classList.contains('_toggle_active')) {
      const height = container?.scrollHeight
      container.style.setProperty('--element-height', `${height}px`)
      setTimeout(() => {
        container.style.setProperty('--element-height', null)
      }, 300)
      element.classList.add('_toggle_active')
    } else {
      const height = container?.clientHeight
      container.style.setProperty('--element-height', `${height}px`)
      setTimeout(() => {
        element.classList.remove('_toggle_active')
        container.style.setProperty('--element-height', null)
      }, 0)
    }
  }
  document.querySelectorAll('._toggle')?.forEach((element) => {
    element.querySelector('._toggle__button')?.addEventListener('click', toggleClass(element))
  })
}

export const initPopup = () => {
  const popupElement = document.querySelector('.popup')

  document.querySelectorAll('._open-popup')?.forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault()
      popupElement.classList.add('_open')
    })
  })

  document.querySelector('.popup .popup__close')?.addEventListener('click', (event) => {
    popupElement.classList.remove('_open')
  })
  document.querySelector('.popup .popup__close-area')?.addEventListener('click', (event) => {
    popupElement.classList.remove('_open')
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      popupElement.classList.remove('_open')
    }
  })
}

export const initLanguages = () => {
  document.querySelectorAll('.language')?.forEach((container) => {
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
  })
}

// document.querySelectorAll('.filter__subname').addEventListener('click', () => {
//   document.querySelector('.filter__subname').classList.toggle('active')
// })

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

export const initVideo = () => {
  document.querySelectorAll('.content__video-block')?.forEach((element) => {
    const overlay = element.querySelector('.content__video-overlay')
    const video = element.querySelector('.content__video')
    overlay?.addEventListener('click', (event) => {
      if (video.classList.contains('content__video_iframe')) {
        video.src += '?autoplay=1'
        overlay.classList.add('_hide')
      } else {
        video?.play()
      }
    })
    video?.addEventListener('play', (event) => {
      overlay.classList.add('_hide')
    })
    video?.addEventListener('pause', (event) => {
      overlay.classList.remove('_hide')
    })
  })
}

export const initNatigationScroll = () => {
  document.querySelectorAll('.navigation-wrapper')?.forEach((element) => {
    const nextButton = element.querySelector('.navigation__arrow-next')
    const prevButton = element.querySelector('.navigation__arrow-prev')
    const container = element.querySelector('.navigation-target')
    const smoothScroll = (pos) => {
      let start = null
      const time = 300
      const currentPos = container.scrollLeft

      window.requestAnimationFrame(function step(currentTime) {
        start = !start ? currentTime : start
        const progress = currentTime - start
        if (currentPos < pos) {
          container.scrollTo(((pos - currentPos) * progress) / time + currentPos, 0)
        } else {
          container.scrollTo(currentPos - ((currentPos - pos) * progress) / time, 0)
        }
        if (progress < time) {
          window.requestAnimationFrame(step)
        } else {
          container.scrollTo(pos, 0)
        }
      })
    }

    if (container) {
      nextButton?.addEventListener('click', (event) => {
        smoothScroll(container.scrollLeft + container.clientWidth)
      })
      prevButton?.addEventListener('click', (event) => {
        smoothScroll(container.scrollLeft - container.clientWidth)
      })
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initToggle()
  initLanguages()
  initPopup()
  initMasonry('.grid', {
    percentPosition: true,
    gutter: 30,
  })
  initGlide('.slider', {
    autoplay: 5000,
  })
  initGlide('.developments', {
    perView: 3,
    breakpoints: {
      1199: {
        perView: 2,
      },
      767: {
        perView: 1,
      },
    },
  })
  initGlide('.info', {
    perView: 4,
    breakpoints: {
      1199: {
        perView: 3,
      },
      767: {
        perView: 2,
      },
      600: {
        perView: 1,
      },
    },
  })
  initDropdown()
  initVideo()
  initNatigationScroll()
})
