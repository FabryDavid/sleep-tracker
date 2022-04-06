import {Pipe, PipeTransform} from "@angular/core";
import {IPasswordStrength} from "../interface/ipassword-strength.interface";
import {PasswordStrength as PS} from "../classes/password-strength.Class";

@Pipe({name: 'passwordStrength'})
export class PasswordStrength implements PipeTransform {
  transform(value: string): IPasswordStrength {
    const length = new RegExp('(?=.{8,})').test(value) ? 'length' : false
    const uppercase = new RegExp('(?=.*[A-Z])').test(value) ? 'uppercase' : false
    const lowercase = new RegExp('(?=.*[a-z])').test(value) ? 'lowercase' : false
    const digit = new RegExp('(?=.*[0-9])').test(value) ? 'digit' : false
    const specialCharacter = new RegExp('([^A-Za-z0-9])').test(value) ? 'specialCharacter' : false

    return new PS([length, uppercase, lowercase, digit, specialCharacter].filter((x) => x) as string[])
  }
}
