export class Subscription {
  constructor(options) {
    this.successMsg =
      "Вы успешно подписались на рассылку. Спасибо, что читаете Bloomchain!"
    this.errorMsg =
      "Ваш адрес был зарегистрирован ранее. Спасибо, что читаете Bloomchain!"
    this.formClass = ".js-form-subscription"
    this.formErrorContainerClass = ".js-subscription-error-msg"
    this.api = "/api/subscription"
  }

  init() {
    const form = document.querySelector(this.formClass)

    form.addEventListener("submit", (event) => {
      event.preventDefault()

      const emailField = event.target.elements["email"]

      fetch(this.api, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailField.value }),
      }).then((response) => {
        const errorMsgContainer = document.querySelector(
          this.formErrorContainerClass,
        )

        if (!response.ok) {
          errorMsgContainer.textContent = this.errorMsg
          errorMsgContainer.style.cssText =
            "opacity: 1; visibility: visible; color: #E02829;"
          return
        }

        errorMsgContainer.textContent = this.successMsg
        errorMsgContainer.style.cssText =
          "opacity: 1; visibility: visible; color: #28a745"
        emailField.value = ""
        return
      })
    })
  }
}
