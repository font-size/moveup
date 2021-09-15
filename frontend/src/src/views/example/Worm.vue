<template>
  <div class="container">
    <a-form :label-col="{span: 4}" :wrapper-col="{span: 20}" class="form">
      <a-form-item :wrapper-col="{span: 12}">
        <a-button type="primary" @click="handleSubmit">
          启动爬虫0
        </a-button>
      </a-form-item>
       <!-- <a-form-item label="本次任务名称">
        <a-input v-model="form.name" placeholder="默认为当前时间戳"/>
      </a-form-item> -->
      <a-form-item label="模式">
        <a-select v-model="form.behavior">
          <a-select-option :value="item.value" v-for="(item, index) in behaviors" :key="index">
            {{ item.key }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="目标url">
        <!-- v-decorator="['target', {rules: [{required: true, message: '输入目标地址'}]}]" -->
        <div v-for="(item, index) in form.targetUrl" :key="index" class="url-input">
          <a-input v-model="item.value" style="width:80%"/>
          <a-icon type="delete" class="del-icon" @click="delUrlInput(index)" v-if="form.targetUrl.length > 1"/>
        </div>
        <a-button type="link" @click="addNewUrlInput">
          新增一行
        </a-button>
      </a-form-item>
       <a-form-item label="目标dom">
        <!-- v-decorator="['target', {rules: [{required: true, message: '输入目标地址'}]}]" -->
        <a-input v-model="form.targetDom" placeholder="默认为body（支持.class,#id 选择模式）" />
      </a-form-item>
       <a-form-item label="下载">
        <a-radio-group v-model="form.downType" button-style="solid">
          <a-radio-button value="a">
            抓取文本和图片
          </a-radio-button>
          <a-radio-button value="b">
            只抓取文本
          </a-radio-button>
          <a-radio-button value="c">
            只抓取图片
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
       <a-form-item label="设备">
        <a-radio-group v-model="form.device" button-style="solid">
          <a-radio-button value="">
            PC
          </a-radio-button>
          <a-radio-button value="Nexus 7">
            移动端
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="并发爬取限制">
        <!-- v-decorator="['target', {rules: [{required: true, message: '输入目标地址'}]}]" -->
        <a-input placeholder="并发爬取限制" v-model="form.minConcurrency" />
      </a-form-item>
      <a-form-item label="单个任务重试次数">
        <!-- v-decorator="['target', {rules: [{required: true, message: '输入目标地址'}]}]" -->
        <a-input placeholder="单个任务重试次数" v-model="form.maxRequestRetries" />
      </a-form-item>
      <a-form-item label="最长等待时间(S)">
        <!-- v-decorator="['target', {rules: [{required: true, message: '输入目标地址'}]}]" -->
        <a-input placeholder="最长等待时间(S)" v-model="form.handlePageTimeoutSecs" />
      </a-form-item>
      <a-form-item label="配置">
        <a-select v-model="form.mode">
          <a-select-option :value="item.value" v-for="(item, index) in modes" :key="index">
            {{ item.key }}
          </a-select-option>
        </a-select>
      </a-form-item>
     
      
    </a-form>
  </div>
</template>
<script>
//import { uploadFile } from '@/api/main'
// import { executeJS } from '@/api/main'
export default {
  data() {
    return {
      action_url: process.env.VUE_APP_API_BASE_URL + '/api/v1/example/uploadFile',
      form: {
        name: '',
        targetUrl: [
          {value: 'https://36kr.com/'}
        ],
        targetDom: '',
        downType: 'a',
        device: '',
        minConcurrency: '1', // 并发爬取限制
        maxRequestRetries: '0', // 单个任务重试次数
        handlePageTimeoutSecs: 30, // 单个任务重试次数
        mode: 'mode1',
        behavior: '36ke',
      },
      
      behaviors: [
        {value: 'taobao', key: '淘宝'},
        {value: '36ke', key: '36氪'},
        {value: 'specialWord', key: '百度搜索'},
        {value: 'screenshot', key: '腾讯新闻'},
      ],
      modes: [
        {value: 'mode1', key: '配置一'},
        {value: 'mode2', key: '配置二'},
        {value: 'mode3', key: '配置三'},
        {value: 'mode4', key: '配置四'},
      ],
    };
  },
  methods: {
    helloHandle(value) {
      const self = this;
      this.$callMain('example.console', value).then(r => {
        const msg = r.status + '' + r.time;
        self.$message.info(msg);
      })
    },
    handleChange(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file);
      }
      if (status === 'done') {
        // 去除list列表
        //info.fileList = [];
        const uploadRes = info.file.response;
        console.log('uploadRes:', uploadRes);
        if (uploadRes.code !== 'success') {
          this.$message.error(`file upload failed ${uploadRes.code} .`);
          return false;
        }
        this.num++;
        const picInfo = uploadRes.data;
        picInfo.id = this.num;
        picInfo.imageUrlText = 'image url';
        this.image_info.push(picInfo);
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    changeBehavior(e) {
      console.log('e: ', e);
    },
    changeMode(e) {
      console.log('e: ', e);
    },
    handleSubmit() {
      // this.$message.success(JSON.stringify(this.form));
      // return;
      const value = this.form;
      const self = this;
      this.$message.info('开始运行')
      if (value.behavior === '36ke') {
        const time = new Date().getTime();
        this.$callMain('example.getPage', value).then(r => {
          console.log('r: ', r);
          self.$message.success(`抓取结束 本次任务共耗时${new Date().getTime() - time}`);
        })
      }
    },
    addNewUrlInput() {
      const input = {
        value: ''
      }
      this.form.targetUrl.push(input)
    },
    delUrlInput(index) {
      this.form.targetUrl.splice(index, 1)
    }
  },
};
</script>
<style lang="less" scoped>

.container {
  .form {
    .url-input {
      .del-icon {
        padding-left: 20px;
      }
    }
  }
}
</style>
