export function createLoader() {
  const loader = document.createElement('div')
  loader.classList.add('dy-page-loader')
  loader.innerHTML = /*html*/`
    <img src="/on/demandware.static/Sites-SFRA_SCS-Site/-/default/dw66f1dc5e/images/lazyloadingplaceholderlg.svg" alt="loading" />
  `

  const mainContent = document.querySelector('.main-content')

  if (mainContent) {
    mainContent.appendChild(loader)
  }

  window.addEventListener('hide-loader', () => {
    loader.classList.add('d-none')
  })
}

export function hideLoader() {
  window.dispatchEvent(new Event('hide-loader'))
}
