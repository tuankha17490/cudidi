<template>
  <div class="form-intro-article">
    <h3 class="text-center pt-4 mb-5">Tell me about your trip</h3>
    <a-form :form="form" layout="vertical" id="form-edit-user" class="px-5">
      <a-form-item label="Choose a featured image of the trip">
        <a-upload
          name="imgArticleGeneral"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :before-upload="beforeUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" :style="{width: '100%', height: '400px'}" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item class="mb-0 pb-0">
        <a-form-item
          :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
          label="How much does your trip costed?"
        >
          <a-input
            size="large"
            style="width: 100%"
            v-decorator="['Price', {initialValue: `${ $store.state.article.articleIntroduction ? $store.state.article.articleIntroduction.Price : ''}`, rules: [{ required: true, whitespace: true, message: 'Please fill in this field!' },  { validator: onlyNumber }] }]"
            autocomplete="off"
            placeholder="Cost"
            suffix="USD"
          ></a-input>
        </a-form-item>
      </a-form-item>
      <a-form-item class="mb-0 pb-0">
        <a-form-item
          label="How many people with you"
          :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
        >
          <a-input
            size="large"
            v-decorator="['NumberOfPeople', {initialValue: `${ $store.state.article.articleIntroduction ? $store.state.article.articleIntroduction.NumberOfPeople : ''}`, rules: [{ required: true, whitespace: true, message: 'Please fill in this field!' },  { validator: onlyNumber }] }]"
            autocomplete="off"
            placeholder="People"
          >
            <a-icon slot="suffix" type="user" />
          </a-input>
        </a-form-item>
        <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }"></span>
        <a-form-item
          label="Where did you go?"
          :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
        >
          <a-input
            size="large"
            v-decorator="['Location', {initialValue: `${ $store.state.article.articleIntroduction ? $store.state.article.articleIntroduction.Location : ''}`, rules: [{ required: true, whitespace: true, message: 'Please fill in this field!' }] }]"
            autocomplete="off"
            placeholder="Location"
          >
            <a-icon slot="suffix" type="environment" />
          </a-input>
        </a-form-item>
      </a-form-item>
      <a-form-item label="Title of article">
        <a-input
          size="large"
          v-decorator="['Title', {initialValue: `${ $store.state.article.articleIntroduction ? $store.state.article.articleIntroduction.Title : ''}`, rules: [{ required: true, whitespace: true, message: 'Please fill in this field!' }] }]"
          autocomplete="off"
          placeholder="Header"
        >
          <a-icon slot="suffix" type="form" />
        </a-input>
      </a-form-item>

      <a-form-item label="Description">
        <a-textarea placeholder="Description" v-decorator="['Introduce', {initialValue: `${ $store.state.article.articleIntroduction ? $store.state.article.articleIntroduction.Introduce : ''}`,}]" :rows="4" />
      </a-form-item>
      <a-form-item>
        <a-button size="large" type="primary" @click="submitFormIntroArticle">Next</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
.form-intro-article >>> .ant-upload {
  width: 100%;
  height: 400px;
}
</style>

<script>
export default {
  props: ["introductionArticle"],
  data() {
    return {
      loading: false,
      imageUrl: "",
      form: this.$form.createForm(this),
      file: Object
    };
  },

  created() {
    if(this.$store.state.article.articleIntroduction) {
      this.imageUrl = this.$store.state.article.articleIntroduction.Image
    }
  },

  methods: {
    onlyNumber(rule, value, callback) {
      if (
        !Number(value) ||
        Number(value) < 0 ||
        Number(value) - parseInt(value) > 0
      ) {
        callback("Only input integer");
      } else {
        callback();
      }
    },

    maxValueDay(rule, value, callback) {
      if (Number(value) > 10) {
        callback("Max value is 10 days");
      } else {
        callback();
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

    submitFormIntroArticle() {
      this.form.validateFields((err, values) => {
            if (!err) {
              values.Image = this.imageUrl;
              values.Price = Number(values.Price);
              values.NumberOfPeople = Number(values.NumberOfPeople);
              this.$store.dispatch("setIntroductionArticle", values);
              this.$emit("updateStepAndCurrent", 1);
            }
          });
    },

    showConfirm() {
      this.$confirm({
        title: "Do you want to continue?",
        content: h => (
          <div style="color:red;">
            If you continue, you will not be able to edit this form
          </div>
        ),
        onOk: () => {

        },
        onCancel() {},
        class: "test"
      });
    }
  },

  watch: {
    async file(val) {
      try {
        this.loading = true;
        let formData = new FormData();
        formData.append("image", val);
        const { data } = await this.$axios.post(
          "/article/upload-image",
          formData,
          {
            headers: {
              authorization: "Bearer " + this.$cookies.get("token")
            }
          }
        );
        if (data.status == 200) {
          this.imageUrl = data.data;
          this.loading = false;
        } else {
          this.$message.error(data.message, 8);
        }
      } catch (e) {
        this.$message.error(e, 8);
      }
    }
  }
};
</script>
