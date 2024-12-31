export class Result<T> {
  constructor(
    readonly success: boolean,
    readonly data: T | null,
    readonly error: string | null
  ) {
    this.success = success;
    this.data = data;
    this.error = error;
  }

  static success<T>(data?: T) {
    return new Result(true, data, null);
  }

  static fail(errorMessage: string) {
    return new Result(false, null, errorMessage);
  }
}
