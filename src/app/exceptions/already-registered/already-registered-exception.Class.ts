export class AlreadyRegisteredException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AlreadyRegisteredError";
  }
}
