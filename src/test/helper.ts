import { State } from '../view/State'

export function stubProperty (object: any, property: string, returns: any) : void {
  Object.defineProperty(object, property, {value: returns})
}

export function getFakeStateWithoutIngredients () : State.State {
  return _generateFakeState([], [])
}

export function getFakeStateWithHops () : State.State {
  return _generateFakeState([
    {
      alpha: 0.06,
      amount: 50,
      ibu: 10,
      name: 'Cascade',
      time: 15,

    },
    {
      alpha: 0.12,
      amount: 100,
      ibu: 0,
      name: 'Citra',
      time: 0,
    },
  ], [])
}

export function getFakeStateWithFermentables () : State.State {
  return _generateFakeState([], [
    {
      amount: 2.4,
      name: 'Pale Ale-malt',
      og: 1.020,
      yield: 0.74,
    },
    {
      amount: 0.5,
      name: 'Carapils',
      og: 1.003,
      yield: 0.65,
    },
  ])
}

function _generateFakeState (hops: State.Hop[],
                             fermentables: State.Fermentable[],
                             yeast?: State.Yeast) : State.State {
  return {
    recipe: {
      efficiency: 0.8,
      expectedABV: 0.048,
      expectedFG: 1.010,
      expectedIBU: 36,
      expectedOG: 1.050,
      fermentables,
      hops,
      volume: 20,
      yeast,
    },
  }
}

export function addStateToRecipeMock (recipeMock: RecipeMock, state: State.State) : void {
  recipeMock.volume = state.recipe.volume
  recipeMock.efficiency = state.recipe.efficiency
  stubProperty(recipeMock, 'expectedOG', state.recipe.expectedOG)
  stubProperty(recipeMock, 'expectedFG', state.recipe.expectedFG)
  stubProperty(recipeMock, 'expectedIBU', state.recipe.expectedIBU)
  stubProperty(recipeMock, 'expectedABV', state.recipe.expectedABV)
  stubProperty(recipeMock, 'hops', state.recipe.hops.map((hop) => ({
    alpha: hop.alpha,
    amount: hop.amount,
    name: hop.name,
    time: hop.time,
    calculateIBU() : number { return  hop.ibu },
  })))
  stubProperty(recipeMock, 'fermentables', state.recipe.fermentables.map((f) => ({
    amount: f.amount,
    name: f.name,
    yield: f.yield,
    calcExpectedOG() : number { return  f.og },
  })))
  stubProperty(recipeMock, 'yeast', undefined)
}
