<template>
  <div>
    <a-form :form="form" :label-col="{span: 5}" :wrapper-col="{span: 12}" @submit="handleSubmit">
      <a-form-item label="Behavior">
        <a-select default-value="news" @change="changeBehavior">
          <a-select-option :value="item.value" v-for="(item, index) in behaviors" :key="index">
            {{ item.key }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="minConcurrency">
        <!-- v-decorator="['target', {rules: [{required: true, message: '输入目标地址'}]}]" -->
        <a-input placeholder="并发爬取限制" />
      </a-form-item>
      <a-form-item label="maxRequestRetries">
        <!-- v-decorator="['target', {rules: [{required: true, message: '输入目标地址'}]}]" -->
        <a-input placeholder="单个任务重试次数" />
      </a-form-item>
      <a-form-item label="handlePageTimeoutSecs">
        <!-- v-decorator="['target', {rules: [{required: true, message: '输入目标地址'}]}]" -->
        <a-input placeholder="最长等待时间(S)" />
      </a-form-item>
      <a-form-item label="TargetUrl">
        <!-- v-decorator="['target', {rules: [{required: true, message: '输入目标地址'}]}]" -->
        <a-input />
      </a-form-item>
      <a-form-item label="Mode">
        <a-select default-value="mode1" @change="changeMode">
          <a-select-option :value="item.value" v-for="(item, index) in modes" :key="index">
            {{ item.key }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{span: 12, offset: 5}">
        <a-button type="primary" html-type="submit">
          启动爬虫
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
//import { uploadFile } from '@/api/main'

export default {
  data() {
    return {
      action_url: process.env.VUE_APP_API_BASE_URL + '/api/v1/example/uploadFile',
      behaviors: [
        {value: 'taobao', key: '淘宝模式'},
        {value: 'news', key: '新闻类网页抓取'},
        {value: 'specialWord', key: '根据关键词抓取互联网页面'},
        {value: 'screenshot', key: '网页截图'},
      ],
      modes: [
        {value: 'mode1', key: '配置一'},
        {value: 'mode2', key: '配置二'},
        {value: 'mode3', key: '配置三'},
        {value: 'mode4', key: '配置四'},
      ],
      num: 0,
      form: this.$form.createForm(this, {name: 'coordinated'}),
    };
  },
  methods: {
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
    handleSubmit(e) {
      console.log('e: ', e);
    },
  },
};
</script>
<style></style>
