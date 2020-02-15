[
  inputs: [
    "{mix,.formatter}.exs",
    "{lib,test}/**/*.{ex,exs}"
  ],
  locals_without_parens: [
    # router
    plug: :*,
    get: :*,
    post: :*,
    pipe_through: :*,
    resources: :*,
    options: :*,
    put: :*,
    delete: :*,

    ## config
    socket: :*,
    transport: :*,

    ## controllers
    action_fallback: :*,

    # Formatter tests
    assert_format: 2,
    assert_format: 3,
    assert_same: 1,
    assert_same: 2,

    # Errors tests
    assert_eval_raise: 3
  ]
]
