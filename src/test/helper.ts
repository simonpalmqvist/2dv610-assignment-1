export function stubProperty (object: any, property: string, returns: any) : void {
  Object.defineProperty(object, property, {value: returns})
}
