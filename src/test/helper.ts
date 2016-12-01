import { State } from '../view/State'

export function stubProperty (object: any, property: string, returns: any) : void {
  Object.defineProperty(object, property, {value: returns})
}

export function assertPromise (promise: Promise<string>,
                               resolve: (result: string) => void,
                               done: (error?: any) => void) : void {
  promise
    .then(resolve)
    .then(() => done())
    .catch((error) => done(`promise was rejected: ${error}`))
}

export function getFakeStateWithoutIngredients () : State {
  return {
    recipe: {
      efficiency: 0.8,
      expectedABV: 0.48,
      expectedFG: 1.010,
      expectedIBU: 36,
      expectedOG: 1.050,
      fermentables: [],
      hops: [],
      volume: 2,
    },
  }
}
