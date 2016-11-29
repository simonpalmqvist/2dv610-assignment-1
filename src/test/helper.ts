import { State } from '../view/State'

export function stubProperty (object: any, property: string, returns: any) : void {
  Object.defineProperty(object, property, {value: returns})
}

export function getFakeStateWithoutIngredients () : State {
  return {
    recipe: {
      volume: 2,
      efficiency: 0.8,
      expectedOG: 1.050,
      expectedFG: 1.010,
      expectedIBU: 36,
      expectedABV: 0.48,
      hops: [],
      fermentables: []
    }
  }
}
