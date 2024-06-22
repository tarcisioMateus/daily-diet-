import { Meal } from '../repositories/MealsRepository'

// any value set to -1 means the property is empty
interface Sequence {
  start: number
  end: number
  length: number
}

export function getMealsBestSequence(meals: Meal[]): Meal[] {
  const sequences: Sequence[] = []
  const currentSequence: Sequence = {
    start: -1,
    end: -1,
    length: -1,
  }

  for (const key in meals) {
    const index = Number(key)
    const newSequenceStarted: boolean = currentSequence.start > -1

    if (meals[index].onDiet) {
      const isLastMeal: boolean = index === meals.length - 1

      if (isLastMeal) {
        if (newSequenceStarted) {
          currentSequence.end = index
          currentSequence.length =
            currentSequence.end - currentSequence.start + 1
          sequences.push({ ...currentSequence })
        } else {
          sequences.push({ start: index, end: index, length: 1 })
        }
      }
      if (newSequenceStarted) continue
      currentSequence.start = index
    } else {
      if (!newSequenceStarted) continue
      currentSequence.end = index - 1
      currentSequence.length = currentSequence.end - currentSequence.start + 1
      sequences.push({ ...currentSequence })

      currentSequence.start = -1
      currentSequence.end = -1
      currentSequence.length = -1
    }
  }

  if (!sequences.length) return []
  const bestSequence: Sequence = sequences.reduce((prev, current) =>
    prev.length > current.length ? prev : current,
  )

  const bestSequenceArray: Meal[] = meals.slice(
    bestSequence.start,
    bestSequence.end + 1,
  )
  return bestSequenceArray
}
