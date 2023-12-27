/**
 *
 * Its better to use abstract class than interface because we can use instanceof
 *
 * @abstract
 * It means that the method or property must be implemented in the class that extends this class
 */
export abstract class CustomError extends Error {
  abstract statusCode: number;

  /**
   * @param message
   * We want to throw an Error with a message that will be logged (it won't be sent to the user)
   *
   */
  constructor(message: string) {
    super(message);

    /**
     * @required
     * Because we are extending a built-in class
     */
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  /**
   * We are modifying the data that we send when an Error occurs
   * (the errorHandler middleware doesn't have to know the logic for every error)
   *
   */
  abstract serializeErrors(): { message: string; field?: string }[];
}
