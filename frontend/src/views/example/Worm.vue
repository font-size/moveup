<template>
  <div>
    <h3 :style="{ marginBottom: '16px' }">
      爬取页面
    </h3>
    <!-- dev调试时，action参数：请填写你本地完整的api地址，如：http://localhost:7068/api/v1/example/uploadFile -->
    
  </div>
</template>
<script>
//import { uploadFile } from '@/api/main'

export default {
  data() {
    return {
      action_url: process.env.VUE_APP_API_BASE_URL + '/api/v1/example/uploadFile',
      image_info: [],
      num: 0
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
        console.log('uploadRes:', uploadRes)
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
    }
  }
};
</script>
<style></style>
