import { IncorrectPasswordException } from './incorrect-password-exception.Class';

describe('IncorrectPasswordException', () => {
  it('should create an instance', () => {
    expect(new IncorrectPasswordException()).toBeTruthy();
  });
});
