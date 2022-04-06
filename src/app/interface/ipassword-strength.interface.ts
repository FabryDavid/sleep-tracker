export interface IPasswordStrength {
  matchedValue: string[]

  getStrengthString(): string
}
