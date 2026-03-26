/**
 * 🙏 Aarti Form - Form Handling, preventDefault & Validation
 *
 * Mandir ki aarti booking form bana rahe hain! Bhakton ka naam, aarti type,
 * aur date validate karke submit karna hai. Form submit hone pe page reload
 * nahi hona chahiye (preventDefault), pehle sab fields validate karo,
 * phir success ya error callback call karo. Jaise mandir mein pujari
 * entry check karta hai ki sab theek hai, waise hi form ko validate karo.
 *
 * Functions:
 *
 *   1. validateName(name)
 *      - Name must be a string, 2-50 characters long
 *      - Only letters (a-z, A-Z) and spaces allowed
 *      - Returns { valid: true, error: null } if valid
 *      - Returns { valid: false, error: "error message" } if invalid
 *      - Error messages (Hinglish):
 *        - Not string: "Naam string hona chahiye"
 *        - Too short: "Naam mein kam se kam 2 characters hone chahiye"
 *        - Too long: "Naam 50 characters se zyada nahi ho sakta"
 *        - Invalid chars: "Naam mein sirf letters aur spaces allowed hain"
 *
 *   2. validateDate(dateString)
 *      - Must be a valid date string in YYYY-MM-DD format
 *      - Must be today or a future date (past dates not allowed)
 *      - Returns { valid: true, error: null } if valid
 *      - Returns { valid: false, error: "error message" } if invalid
 *      - Error messages:
 *        - Not string: "Date string honi chahiye"
 *        - Invalid format: "Date YYYY-MM-DD format mein honi chahiye"
 *        - Past date: "Date aaj ya future ki honi chahiye"
 *
 *   3. validateAartiType(type)
 *      - Must be one of: "morning", "evening", "special"
 *      - Returns { valid: true, error: null } if valid
 *      - Returns { valid: false, error: "error message" } if invalid
 *      - Error messages:
 *        - Not string: "Aarti type string hona chahiye"
 *        - Invalid type: "Aarti type morning, evening, ya special mein se hona chahiye"
 *
 *   4. setupAartiForm(formElement, onSuccess, onError)
 *      - Adds "submit" event listener on formElement with preventDefault()
 *      - On submit: reads form fields:
 *        - name: from input/element with name="name" (formElement.elements.name.value)
 *        - date: from input with name="date"
 *        - aartiType: from select/input with name="aartiType"
 *      - Validates all three fields using above functions
 *      - If ALL valid: calls onSuccess({ name, date, aartiType })
 *      - If ANY invalid: calls onError(errorsArray) where errorsArray contains
 *        error strings from each failed validation
 *      - Returns cleanup function that removes the submit listener
 *      - Agar formElement null/undefined, return null
 *      - Agar onSuccess or onError not functions, return null
 *
 *   5. createBookingSummary(booking)
 *      - Takes { name, date, aartiType } object
 *      - Creates a div.booking-summary containing:
 *        - h3 with text "Booking Confirmation"
 *        - p.booking-name with text "Bhakt: {name}"
 *        - p.booking-date with text "Date: {date}"
 *        - p.booking-type with text "Aarti: {aartiType}"
 *      - Returns the div element
 *      - Agar booking null/undefined or missing fields, return null
 *
 * Hint: event.preventDefault() form ka default submit behavior rokta hai.
 *   formElement.elements se form ke inputs access karo by name attribute.
 *
 * @example
 *   validateName("Rahul Sharma");
 *   // => { valid: true, error: null }
 *
 *   validateName("R");
 *   // => { valid: false, error: "Naam mein kam se kam 2 characters hone chahiye" }
 *
 *   validateDate("2025-12-25");
 *   // => { valid: true, error: null } (if date is in future)
 *
 *   validateAartiType("morning");
 *   // => { valid: true, error: null }
 *
 *   const summary = createBookingSummary({
 *     name: "Rahul", date: "2025-12-25", aartiType: "morning"
 *   });
 *   // => <div class="booking-summary">...</div>
 */
export function validateName(name) {
  let error = null
  let regexPattern = /^[a-zA-Z ]+$/
  if (typeof name !== "string") {
    error = "Naam string hona chahiye"
  } else if (name.length < 2) {
    error = "Naam mein kam se kam 2 characters hone chahiye"
  } else if (name.length > 50) {
    error = "Naam 50 characters se zyada nahi ho sakta"
  } else if (!regexPattern.test(name)) {
    error = "Naam mein sirf letters aur spaces allowed hain"
  }

  if (error) {
    return {
      valid: false,
      error
    }
  } else {
    return {
      valid: true,
      error: null
    }
  }
}

export function validateDate(dateString) {
  let error = null
  let dateRegex = /^(\d{4}-\d{2}-\d{2})$/
  let date = new Date(dateString)
  let current = new Date().setHours(0,0,0,0)
  if (typeof dateString !== "string") {
    error = "Date string honi chahiye"
  } else if (!dateRegex.test(dateString)) {
    error = "Date YYYY-MM-DD format mein honi chahiye"
  } else if (date < current) {
    error = "Date aaj ya future ki honi chahiye"
  }

  if (error) {
    return {
      valid: false,
      error
    }
  } else {
    return {
      valid: true,
      error: null
    }
  }
}

export function validateAartiType(type) {
  let error = null
  const validTypes = ['morning', 'evening', 'special']


  if (typeof type !== 'string') {
    error = "Aarti type string hona chahiye"
  } else if (!validTypes.includes(type)) {
    error = "Aarti type morning, evening, ya special mein se hona chahiye"
  }

  if (error) {
    return {
      valid: false,
      error
    }
  } else {
    return {
      valid: true,
      error: null
    }
  }
}

export function setupAartiForm(formElement, onSuccess, onError) {
  if (formElement == null) return null
  if (typeof onSuccess != "function" || typeof onError != "function") return null

  function handler(event) {
    event.preventDefault()
    let name = formElement.elements.name.value
    let date = formElement.elements.date.value
    let aartiType = formElement.elements.aartiType.value

    let nameValidated = validateName(name)
    let dateValidated = validateDate(date)
    let aartiValidated = validateAartiType(aartiType)

    if (nameValidated.valid && dateValidated.valid && aartiValidated.valid) {
      return onSuccess({
        name,
        date,
        aartiType
      })
    } else {
      let errorsArray = []
      errorsArray.push(nameValidated.error)
      errorsArray.push(dateValidated.error)
      errorsArray.push(aartiValidated.error)
      return onError(errorsArray)
    }

  }

  formElement.addEventListener('submit', handler)


  function cleanup() {
    formElement.removeEventListener('submit', handler)
  }

  return cleanup
}

export function createBookingSummary(booking) {
  if (booking == null) return null
  if(booking.name == null || booking.date == null || booking.aartiType == null) return null
  let summary = document.createElement('div')
  summary.classList.add('booking-summary')

  let bookingText = document.createElement('h3')
  let bhaktName = document.createElement('p')
  let bookingDate = document.createElement('p')
  let aartiType = document.createElement('p')

  bookingText.textContent = "Booking Confirmation"
  bhaktName.classList.add('booking-name')
  bhaktName.textContent = `Bhakt: ${booking.name}`

  bookingDate.classList.add('booking-date')
  bookingDate.textContent = `Date: ${booking.date}`

  aartiType.classList.add('booking-type')
  aartiType.textContent = `Aarti: ${booking.aartiType}`

  summary.appendChild(bookingText)
  summary.appendChild(bhaktName)
  summary.appendChild(bookingDate)
  summary.appendChild(aartiType)

  return summary

}
