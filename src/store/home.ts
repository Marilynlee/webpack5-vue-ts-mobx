import { action, computed, observable } from 'mobx'
class Home {
  @observable age = 10
  @observable users = [{ name: '哈哈哈哈' }, { name: 'kakakakka' }]

  @computed get computedAge() {
    return this.age + 1
  }

  @action.bound setAge() {
    this.age++
  }
}
export const store = new Home()
