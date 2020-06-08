export function computedUnusedOptionsByInitialOptionsList<
  T extends { id: number }
>(list: T[], initial: T[]) {
  if (initial.length) {
    return list.reduce<T[]>((acc, item) => {
      const selected = initial.find((initialItem) => initialItem.id === item.id)
      if (selected) {
        return acc
      }

      return [...acc, item]
    }, [])
  }
  return list
}
