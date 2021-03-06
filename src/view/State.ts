export namespace State {
  export interface State {
    recipe: State.Recipe
  }

  export interface Recipe {
    readonly volume: number
    readonly efficiency: number
    readonly yeast?: State.Yeast
    readonly hops: ReadonlyArray<State.Hop>
    readonly fermentables: ReadonlyArray<State.Fermentable>
    readonly expectedOG: number
    readonly expectedFG: number
    readonly expectedIBU: number
    readonly expectedABV: number
  }

  export interface Yeast {
    readonly name: string
    readonly attenuation: number
  }

  export interface Hop {
    readonly alpha: number
    readonly amount: number
    readonly name: string
    readonly time: number
    readonly ibu: number
  }

  export interface Fermentable {
    readonly yield: number
    readonly amount: number
    readonly name: string
    readonly og: number
  }
}
