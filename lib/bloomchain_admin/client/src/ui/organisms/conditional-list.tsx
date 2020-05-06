import React, { Fragment, ReactElement } from "react"

type ConditionaListProps<T> = {
  list: T[] | undefined
  renderExists: (list: T[]) => ReactElement<T> | ReactElement<T>[]
  renderEmpty?: () => ReactElement
}

export function ConditionalList<T>({
  list,
  renderExists,
  renderEmpty,
}: ConditionaListProps<T>) {
  return (
    <Fragment>
      {list && list.length && list.filter(Boolean).length > 0
        ? renderExists(list)
        : renderEmpty && renderEmpty()}
    </Fragment>
  )
}
