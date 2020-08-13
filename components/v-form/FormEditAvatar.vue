<template>
  <div class="form-upload-avatar">
    <a-upload
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        alt="avatar"
        class="rounded-circle"
        :style="{width: '100%'}"
      />
      <div v-else-if="!$store.state.user.authUser.Avatar">
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">Upload</div>
      </div>
      <img
        v-else
        :src="$store.state.user.authUser.Avatar"
        alt="avatar"
        class="rounded-circle"
        :style="{width: '100%'}"
      />
    </a-upload>
    <div class="w-100 text-center mt-3">
      <a-button type="primary" @click="handleSubmit()">Submit</a-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      imageUrl: "",
      file: Object
    };
  },
  methods: {
    readAsDataUrlImage(img, callback) {
      const reader = new FileReader();
      reader.onload = e => {
        callback(e.target.result);
      };
      reader.readAsDataURL(img);
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        this.readAsDataUrlImage(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      this.file = file;
      return isJpgOrPng && isLt2M;
    },
    async handleSubmit() {
      const formData = new FormData();
      formData.append("avatar", this.file);
      try {
        const { data } = await this.$axios.put("/user/upload-avatar", formData, {
          headers: {
            authorization: "Bearer " + this.$cookies.get("token")
          }
        });
        if (data.status == 200) {
          this.$message.success("Avatar update successful!", 8);
          this.$store.dispatch("update");
        } else {
          this.$message.error(data.message, 8);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
<style scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.form-upload-avatar >>> .ant-upload.ant-upload-select-picture-card {
  border-radius: 99px;
  overflow: hidden;
  text-align: center;
}

.form-upload-avatar >>> .ant-upload {
  padding: 0;
  width: 128px;
  height: 128px;
}

.ant-upload-picture-card-wrapper {
  display: flex;
  justify-content: center;
}
</style>
