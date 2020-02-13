# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Cms.Repo.insert!(%Cms.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Bloomchain.Repo

alias Bloomchain.Auth.User
alias Bloomchain.Content.{Article, Tag}

user =
  Repo.insert!(
    User.create_changeset(%User{}, %{
      name: "Admin",
      email: "admin@app.com",
      password: "admin123",
      role: "admin"
    })
  )

Repo.insert_all(Tag, [
  %{name: "криптовалюта", inserted_at: Timex.now(), updated_at: Timex.now()},
  %{name: "рынок", inserted_at: Timex.now(), updated_at: Timex.now()}
])

Article.create(
  %{
    title: "Биткоин снова преодолевает отметку в $18000",
    lead: "Биткоин снова преодолевает отметку в $18000",
    type: "newsfeed",
    body: ~S"""
      <div class="bc-news-open__h4 mt-lg-5 mt-4">Итоги:</div>
      <ul class="bc-article__ul">
        <li class="bc-article__li bc-article__paragraph">The aggregate cryptocurrency market cap rallies 4x, breaks $100bn in value.</li>
        <li class="bc-article__li bc-article__paragraph">The composition of the asset class changes dramatically, with bitcoin comprising less than half of the total market cap as assets including ether, xrp, and dash skyrocket in price.</li>
        <li class="bc-article__li bc-article__paragraph">Blockchain ICO funding outweighs venture capital by 3x in total deal size and quantity.</li>
        <li class="bc-article__li bc-article__paragraph">Usage grows on major blockchains, leading to over 500,000 transactions a day and fees north of $1.</li>
      </ul>
      <p class="bc-article__paragraph mt-3">Аналитики инвестиционного банка Goldman Sachs представили доклад о рисках инвестиций в криптовалюты. Документ предназначен для клиентов банка и в нем Bitcoin и альткоины названы активами, демонстрирующими признаки пузыря.</p>
      <p class="bc-article__paragraph">В исследовании его авторы сравнивают Bitcoin с «тюльпаноманией» и пузырем доткомов и подчеркивают, что Bitcoin не выполняет возложенную на нее роль.</p>
      <p class="bc-article__paragraph">В то же время, авторы документа указывают на рост акций компаний, так или иначе связанных с криптовалютами, также подчеркивая, что рекордные скачки, которые демонстрируют эти ценные бумаги – это тоже признаки пузыря.</p>
      <p class="bc-article__paragraph">При этом авторы отчета очень положительно отзываются о технологии блокчейн и валютах, построенных на блокчейне. В документе сказано, что концепция цифровых валют, построенных на блокчейне, весьма жизнеспособна, особенно если учитывать все преимущества, которые она может предоставить своим владельцам. Среди этих преимуществ можно выделить низкую комиссию при проведении платежей, отсутствие единого центра управления, сокращение коррупции. Однако Bitcoin пока еще не обеспечивает все эти преимущества, — считают в Goldman Sachs.</p><img class="bc-news-open__img-vk" src="assets/images/img-vk-widget.jpg">
      <p class="bc-article__paragraph">Одним из недостатков Bitcoin-транзакций авторы отчета называют большое время, необходимое для проведения транзакций. Не способствует доверию к Bitcoin и тот факт, что его цена на разных биржах может слишком сильно отличаться друг от друга. В некоторые дни разница в цене составляла до трети стоимости одной Bitcoin-монеты, а такая разница – это слишком много для любого актива.</p>
      <p class="bc-article__paragraph">Bitcoin также нельзя назвать достаточно надежным активом. Количество взломов Bitcoin-кошельков в последнее время особенно участились.</p>
      <p class="bc-article__paragraph">Авторы отчета осторожно высказываются относительно краха рынка Bitcoin, однако утверждают, что если он и произойдет, он не будет особенно сильно влиять на мировую экономику и финансовую систему.</p>
      <p class="bc-article__paragraph">Эксперты очень по-разному дают прогнозы о будущем криптовалют. Мнения аналитиков в начале этого года расходятся, наверное, как никогда ранее. Одни приписывают криптовалютам свойства пузыря, другие рекомендуют подождать и утверждают, что в далекой перспективе Bitcoin ждет устойчивый рост.</p><img class="bc-news-open__img mb-1" src="assets/images/img-coffee.jpg">
      <p class="bc-article__paragraph__comment">Источник: Mike Hutchings / Reuters / Scanpix / LETA</p>
      <p class="bc-article__paragraph">Одним из недостатков Bitcoin-транзакций авторы отчета называют большое время, необходимое для проведения транзакций. Не способствует доверию к Bitcoin и тот факт, что его цена на разных биржах может слишком сильно отличаться друг от друга. В некоторые дни разница в цене составляла до трети стоимости одной Bitcoin-монеты, а такая разница – это слишком много для любого актива.</p>
      <p class="bc-article__paragraph">Bitcoin также нельзя назвать достаточно надежным активом. Количество взломов Bitcoin-кошельков в последнее время особенно участились.</p>
      <p class="bc-article__paragraph">Авторы отчета осторожно высказываются относительно краха рынка Bitcoin, однако утверждают, что если он и произойдет, он не будет особенно сильно влиять на мировую экономику и финансовую систему.</p>
      <p class="bc-article__paragraph">Эксперты очень по-разному дают прогнозы о будущем криптовалют. Мнения аналитиков в начале этого года расходятся, наверное, как никогда ранее. Одни приписывают криптовалютам свойства пузыря, другие рекомендуют подождать и утверждают, что в далекой перспективе Bitcoin ждет устойчивый рост.</p><img class="bc-news-open__img-tw" src="assets/images/img-tw-widget.jpg">
      <p class="bc-article__paragraph__comment font-italic">«Я в замешательстве. Впервые за долгое время смотрю „Симпсонов“… Почему Мэгги до сих пор младенец с пустышкой? Она разве не должна быть в колледже?»</p>
      <p class="bc-article__paragraph">Одним из недостатков Bitcoin-транзакций авторы отчета называют большое время, необходимое для проведения транзакций. Не способствует доверию к Bitcoin и тот факт, что его цена на разных биржах может слишком сильно отличаться друг от друга. В некоторые дни разница в цене составляла до трети стоимости одной Bitcoin-монеты, а такая разница – это слишком много для любого актива.</p>
      <div class="bg-white py-4 bc-article__quote-wrapper">
        <div class="bc-article__quote">Объединения, которое занимается популяризацией технологии в России. В книге «Bitcoin. Больше чем деньги» автор описывает историю развития биткойна и его распространения в мире.</div>
      </div>
      <div class="d-flex align-items-center mt-4"><a class="btn btn-link font-weight-medium pl-0" href="index.html">← Назад</a><span class="small ml-auto mr-1">Поделиться:</span><a class="icon-vk-round-primary mx-1" href="#"></a><a class="icon-fb-round-primary mx-1" href="#"></a><a class="icon-tw-round-primary mx-1" href="#"></a><a class="icon-tg-round-primary mx-1" href="#"></a></div>
    """
  },
  user,
  []
)
