/**
 * 💒 Wedding Card Maker - Event Delegation
 *
 * Sharma ji ki beti ki shaadi ka digital card banana hai! Event delegation
 * use karke dynamic elements handle karo. Ek parent pe listener lagao,
 * aur child elements ke events handle karo. Jaise shaadi mein ek event
 * manager saare kaam coordinate karta hai, waise hi ek parent listener
 * saare child events manage karta hai.
 *
 * Functions:
 *
 *   1. setupGuestList(containerElement)
 *      - Sets up event delegation on containerElement for click events
 *      - Clicking any .remove-btn inside container removes its parent .guest-item
 *      - Returns object with:
 *        addGuest(name, side): creates div.guest-item with:
 *          - data-name attribute = name
 *          - data-side attribute = side ("bride" or "groom")
 *          - span with textContent = name
 *          - button.remove-btn with textContent "Remove"
 *          Appends to container. Returns the created element.
 *        removeGuest(name): finds .guest-item with data-name matching name,
 *          removes it. Returns true if found and removed, false otherwise.
 *        getGuests(): returns array of {name, side} objects from current
 *          .guest-item children in the container
 *      - Agar containerElement null/undefined, return null
 *
 *   2. setupThemeSelector(containerElement, previewElement)
 *      - Creates 3 button.theme-btn elements inside containerElement:
 *        "traditional", "modern", "royal" (textContent and data-theme)
 *      - Event delegation on containerElement: clicking any .theme-btn:
 *        - Sets previewElement.className to the clicked theme name
 *        - Sets previewElement's data-theme attribute to the theme name
 *      - Returns object with:
 *        getTheme(): returns previewElement's current data-theme value or null
 *      - Agar containerElement or previewElement null/undefined, return null
 *
 *   3. setupCardEditor(cardElement)
 *      - Event delegation on cardElement for click events
 *      - Clicking any element with [data-editable] attribute:
 *        - Removes "editing" class and contentEditable from any currently
 *          editing element inside cardElement
 *        - Sets clicked element's contentEditable = "true"
 *        - Adds class "editing" to clicked element
 *      - Clicking on cardElement itself (not on a [data-editable] child):
 *        - Removes "editing" class and contentEditable from any editing element
 *      - Returns object with:
 *        getContent(field): finds element with data-editable=field,
 *          returns its textContent. Returns null if not found.
 *      - Agar cardElement null/undefined, return null
 *
 * Hint: Event delegation means: ek parent pe listener lagao, then
 *   event.target se check karo ki actual click kahan hua. event.target.closest()
 *   use karo parent elements check karne ke liye.
 *
 * @example
 *   const container = document.createElement("div");
 *   const guestList = setupGuestList(container);
 *
 *   guestList.addGuest("Rahul", "groom");
 *   guestList.addGuest("Priya", "bride");
 *   guestList.getGuests();
 *   // => [{ name: "Rahul", side: "groom" }, { name: "Priya", side: "bride" }]
 *
 *   guestList.removeGuest("Rahul"); // => true
 *   guestList.getGuests();
 *   // => [{ name: "Priya", side: "bride" }]
 */
export function setupGuestList(containerElement) {
  if (containerElement == null) return null
  containerElement.addEventListener("click", event => {
    let element = event.target
    let parent = event.target.closest('.guest-item')
    if (element.classList.contains('remove-btn')) {
      parent.remove()
    }
  })
  const guestList = {
    addGuest(name, side) {
      let guest = document.createElement('div')
      guest.classList.add('guest-item')
      guest.setAttribute('data-name', name)
      guest.setAttribute('data-side', side)

      let text = document.createElement('span')
      text.textContent = name
      guest.appendChild(text)

      let btn = document.createElement('button')
      btn.classList.add('remove-btn')
      btn.textContent = "Remove"
      guest.appendChild(btn)

      containerElement.appendChild(guest)
      return guest
    },

    removeGuest(name) {
      let guestToRemove = [...containerElement.children].find(child => child.getAttribute('data-name') === name)
      if (!guestToRemove) return false
      containerElement.removeChild(guestToRemove)
      return true
    },

    getGuests() {
      let children = [...containerElement.children]
      let guests = children.map(child => {
        let name = child.getAttribute('data-name')
        let side = child.getAttribute('data-side')
        return {
          name,
          side
        }
      })

      return guests
    }
  }

  return guestList
}

export function setupThemeSelector(containerElement, previewElement) {
  if (containerElement == null || previewElement == null) return null

  const themes = ['traditional', 'modern', 'royal']
  themes.forEach(theme => {
    let btn = document.createElement('button')
    btn.classList.add('theme-btn')
    btn.textContent = theme
    btn.setAttribute('data-theme', theme)
    containerElement.appendChild(btn)
  })

  containerElement.addEventListener('click', (event) => {
    let themeName = event.target.textContent
    previewElement.className = themeName
    previewElement.setAttribute('data-theme', themeName)
  })


  let themeObject = {
    getTheme() {
      return previewElement.getAttribute('data-theme') || null
    }
  }

  return themeObject
}

export function setupCardEditor(cardElement) {
  if (cardElement == null) return null
  const clearEditing = () => {
    let current = cardElement.querySelector('.editing')
    if (current) {
      current.classList.remove('editing')
      current.contentEditable = 'inherit'
    }
  }

  cardElement.addEventListener("click", (event) => {
    let editable = event.target.closest('[data-editable]')
    if (editable) {
      clearEditing()

      editable.contentEditable = "true"
      editable.classList.add('editing')

    } else {
      clearEditing()
    }
  })

  const contentObject = {
    getContent(field) {
      let editableElement = [...cardElement.children].find(child => child.getAttribute('data-editable') === field)
      if (!editableElement) return null
      return editableElement.textContent
    }
  }

  return contentObject

}
