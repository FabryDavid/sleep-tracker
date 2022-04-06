export class IncorrectPasswordException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "IncorrectPasswordError";
  }
}
