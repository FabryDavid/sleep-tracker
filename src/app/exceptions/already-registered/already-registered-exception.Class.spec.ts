import { AlreadyRegisteredException } from './already-registered-exception.Class';

describe('AlreadyRegisteredException', () => {
  it('should create an instance', () => {
    expect(new AlreadyRegisteredException()).toBeTruthy();
  });
});
