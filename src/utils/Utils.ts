// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class Utils {
  /**
   *
   * @param list {Aarry} 源数组
   * @param key {string} by field
   * @param val
   */
  public static findBy(list: [any], key: string, val: any) {
    return list.find((item) => item[key] === val)
  }
}
