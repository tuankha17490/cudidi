<template>
  <div class="mb-4">
    <h3 class="text-center pt-4 mb-5">Day {{ day }}</h3>
    <div class="px-5">
      <div class="mb-4">
        <label>Your favorite place of this day</label>
        <a-input class="w-50 d-block" v-model="Place"></a-input>
      </div>
      <div>
        <label>Describe it</label>
        <Editor
          api-key="9aovjw4djmix6xc3dwgoo9c7q820r6xvawrapazx7tdb2j33"
          :init="initTinymce"
          v-model="Description"
        />
      </div>
      <a-button size="large" type="primary" @click="submitEditor" class="mt-4">Next</a-button>
      <a-button size="large" @click="backFormBefore" class="mt-4 mr-2">Previous</a-button>
    </div>
    <a-modal
      title="Location of image"
      :visible="visibleModal"
      okText="Submit"
      width="400px"
      :closable="false"
      :centered="true"
      :zIndex="1301"
      :destroyOnClose="true"
    >
      <div slot="footer">
        <a-button key="submit" type="primary" @click="submitLocationImg">Submit</a-button>
      </div>
      <a-input v-model="LocationImgUpload"></a-input>
    </a-modal>
  </div>
</template>
<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    Editor
  },
  props: ["day"],
  data() {
    return {
      Description: "",
      Place: "",
      listImage: [],
      LocationImgUpload: "",
      ImgUpload: "",
      visibleModal: false,
      initTinymce: {
        height: 500,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount"
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | image | code | help",
        images_upload_handler: async (blobInfo, success, failure) => {
          let formData = new FormData();
          formData.append("image", blobInfo.blob());
          try {
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
              this.ImgUpload = data.data;
              this.visibleModal = true;
              success(data.data);
            } else {
              failure(data.message);
            }
          } catch (e) {
            failure("HTTP " + e.message);
          }
        }
      }
    };
  },

  created() {
    if (this.$store.state.article.articleDescription[this.day - 1]) {
      this.Place = this.$store.state.article.articleDescription[this.day - 1].Place;
      this.Description = this.$store.state.article.articleDescription[this.day - 1].Description;
    }
  },

  methods: {
    submitEditor() {
      const values = {
        Description: this.Description,
        Day: this.day,
        Place: this.Place,
        imageArticles: this.listImage
      };
      this.$store.dispatch("updateContentArticle", values);
      this.$emit("updateLocation", this.day + 1);
    },

    backFormBefore() {
      const values = {
        Description: this.Description,
        Day: this.day,
        Place: this.Place,
        imageArticles: this.listImage
      };
      this.$store.dispatch("updateContentArticle", values);
      this.$emit("updateLocation", this.day - 1);
    },

    submitLocationImg() {
      this.listImage.push({
        Url: this.ImgUpload,
        Location: this.LocationImgUpload
      });
      this.visibleModal = false;
    }
  }
};
</script>
