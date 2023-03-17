import { System } from '@lastolivegames/becsy'
import { CTest } from './CTest'

export class STest extends System {
    test = this.singleton.write(CTest)

    initialize() {
        console.log(`Initial value of ${this.test.value}`)
        this.test.value = 1
        console.log(`Writing value to ${this.test.value}`)
    }
}