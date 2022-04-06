import {IPasswordStrength} from "../../interfaces/ipassword-strength.interface";

export class PasswordStrength implements IPasswordStrength {
  constructor(public matchedValue: string[]) {
  }

  getStrengthString(): string {
    if (this.matchedValue.length >= 4) {
      return 'Strong'
    }
    if (this.matchedValue.length >= 3) {
      return 'Medium'
    }

    return "Weak"
  }
}
