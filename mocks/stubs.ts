import {last} from 'lodash'

const camelToSpine = (camelName: string): string =>
  camelName.replace(/([A-Z])/g, (_, l) => `-${l.toLowerCase()}`).replace(/^-/, '')
/**
 * Given a filename, will replace the default export of that file with a string
 * that is the last part of the filename. That is, if you pass "_/components/Foo",
 * this will change the default export to just the string "Foo".
 *
 * Assumes jest has already mocked the module.
 */
interface StubOptions {
  exportKey?: string
  isRealDom?: boolean
}
export const stubs = (
  filename: string,
  {exportKey = 'default', isRealDom = false}: StubOptions = {}
) => {
  let componentName = last(filename.split('/'))
  if (componentName && isRealDom) componentName = camelToSpine(componentName)
  const mod = jest.requireMock(filename)
  mod[`_${exportKey}`] = mod[exportKey]
  Object.defineProperty(mod, exportKey, {get: () => componentName})
}
