import InvalidValueError from '../error/InvalidValueError'

export default class Validate {

  public static percent (percent: number) : void {
    if (percent < 0 || percent > 100) {
      throw new InvalidValueError()
    }
  }

  public static notNegative (number: number) : void {
    if (number < 0) {
      throw new InvalidValueError()
    }
  }
}
