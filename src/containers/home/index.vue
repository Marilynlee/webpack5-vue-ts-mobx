<template>
  <div class="home-page">
    <h1>hello word!</h1>
    <p v-text="state.age" />
    <p v-text="state.computedAge" />
    <button @click="state.setAge">
      click me
    </button>
    <ul>
      <li
        v-for="user in state.users"
        :key="user.name"
      >
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Observer } from 'mobx-vue'
import { store } from '@/store/home'

@Observer
@Component({
  components: {},
})
export default class App extends Vue {
  public count = 0
  public inputValue = ''
  public obj: Record<string, any> = {
    name: 'duanzhaoyang',
    age: 22,
  }

  public state = store
}
</script>

<style scoped lang="scss">
.home-page {
  width: 100vw;
  height: 100vh;
  background: #fff;
  user-select: none;
}
</style>
