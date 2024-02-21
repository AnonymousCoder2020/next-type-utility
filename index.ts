// Lang
export type OrArr<T> = T | T[]
export type OrPromise<T> = T | Promise<T>
export type SplitStr<T extends string, S extends string> = T extends `${infer A}${S}${infer B}` ? [A, ...SplitStr<B, S>] : [T]
export type SplitPeriod<T extends string> = SplitStr<T, '.'>
export type AccessByPath<T extends PlainAnyObj, P extends string[]> = P extends [infer A, ...infer B]
  ? A extends keyof T
    ? B extends string[]
      ? AccessByPath<T[A], B>
      : T[A]
    : never
  : T
export type AccessByPeriodPath<T extends PlainAnyObj, P extends string> = AccessByPath<T, SplitPeriod<P>>
export type ArrEl<A extends readonly any[]> = A[number]

// Is
export type IsAsyncFunc<F extends AnyFunc> = F extends (...args: unknown[]) => Promise<unknown> ? true : false

// Obj
export type EmptyObj = { [key: string]: never }
export type FillObj<K extends string, V> = { [P in K]: V }
export interface PlainObj<T> {
  [key: string]: T
}
export type PlainAnyObj = PlainObj<any>
export type ExtractVals<T extends PlainAnyObj, U> = {
  [P in keyof T]: Extract<T[P], U>
}
export type StrKeyOf<T extends PlainAnyObj> = Extract<keyof T, string>
export type PartialPart<T extends object, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>
export type PartialOthers<T extends object, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>

// Func
export type AnyFunc = (...args: any[]) => any
export type OrAsyncFunc<F extends AnyFunc> = (...args: Parameters<F>) => OrPromise<ReturnType<F>>
export type ReturnTypeOnPromise<T extends AnyFunc> = T extends (...args: unknown[]) => Promise<infer R>
  ? R
  : T extends (...args: unknown[]) => infer R
  ? R
  : never

// Class
export type ClassProps<C> = { [P in keyof C]: C[P] extends Function ? never : C[P] }
export type ClassPropsPartial<C> = Partial<ClassProps<C>>

// RegExp
export type MatchResult = RegExpMatchArray | null

// JSON
type PlainObjOrArr<T> = { [key: string | number]: T }
export type JSONPrimitive = string | number | undefined | null | boolean
export type JSONObj<T = any> = T extends PlainObjOrArr<any> ? { [P in keyof T]: JSONObj<T[P]> } : JSONPrimitive
