<template>
  <div>
    <div>
      <h3 :style="{ marginBottom: '16px' }">
         渲染进程与主进程IPC通信
      </h3>
      <a-list bordered>
        <!-- <a-button @click="helloHandle">打招呼</a-button> -->
        <a-input-search v-model="content" @search="helloHandle">
          <a-button slot="enterButton">
            send
          </a-button>
        </a-input-search>
      </a-list>
    </div>
    <div style="margin-top: 20px;">
      <h3 :style="{ marginBottom: '16px' }">
        主进程API执行网页函数
      </h3>
      <a-list bordered>
        <a-input-search v-model="content2" @search="executeJSHandle">
          <a-button slot="enterButton">
            send
          </a-button>
        </a-input-search>
      </a-list>
    </div>
  </div>
</template>
<script>
import { executeJS } from '@/api/main'
export default {
  data() {
    return {
      content: 'hello',
      content2: 'hello world',
      reply: ''
    }
  },
  methods: {
    helloHandle(value) {
      const self = this;
      this.$callMain('example.getImg', value).then(r => {
        const msg = r.status + '' + r.time;
        self.$message.info(msg);
      })
    },
    executeJSHandle(value) {
        executeJS({str: value}).then(res => {
          if (res.code == 0) {
            console.log(res.data);
          }
        }).catch(err => {
          console.log('err:', err)
        })
    }
  }
}
</script>
<style></style>
