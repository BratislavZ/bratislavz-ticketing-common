/**
 * Bolje je koristiti abstract klasu nego interface jer mozemo da zovemo instanceof
 *
 * @abstract
 * Ispred metode ili property-ja označava da ona mora biti implementirana u klasi koja extenduje ovu klasu
 */
export abstract class CustomError extends Error {
  abstract statusCode: number;

  /**
   * @param message
   * Zelimo da bacamo Error sa porukom koja se logovati (nece se slati korisniku)
   *
   */
  constructor(message: string) {
    super(message);

    /**
     * @required
     * Samo zato sto extendujemo built-in klasu
     */
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  /**
   *  Modifikujemo podatke koje saljemo kada se desi Error
   * (errorHandler middleware ne mora da zna logiku za svaki error)
   *
   *
   */
  abstract serializeErrors(): { message: string; field?: string }[];
}
