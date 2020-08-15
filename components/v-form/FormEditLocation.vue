<template>
  <div class="mb-5">
    <h3 class="text-center pt-4 mb-5">Set up your schedule</h3>
    <div class="d-flex-center flex-column">
      <div class="my-4">
        <a-button size="large" type="primary" @click="addLocation" class="mr-2">Add new location</a-button>
      </div>
      <draggable v-model="listLocations" group="people" @start="drag=true" @end="drag=false">
        <div
          v-for="(item, index) in listLocations"
          :key="index"
          style="width: 600px; height: 75px; cursor: grab;"
          class="bg-main-color d-flex-center border-radius--10 mb-2 font--18 text-white"
        >
          <a-icon type="menu" class="mr-3" />
          <span class="mr-3">Where did you go on this day?</span>
          <a-input
            size="large"
            v-model="item.Place"
            style="width: 250px;"
            class="border-radius--4 mr-3"
            placeholder="New location"
          />
          <a-icon
            type="close"
            class="cursor-pointer font--20"
            @click="removeLocationAt(index, item.ID)"
          />
        </div>
      </draggable>
    </div>
    <div class="d-flex-center">
      <a-button size="large" type="primary" @click="submitListLocations" class="mt-4 mr-2">Next</a-button>
      <a-button size="large" class="mt-4" @click="backFormBefore">Previous</a-button>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  data() {
    return {
      listLocations: [],
      hasError: false
    };
  },
  methods: {
    removeLocationAt(index, IdDescription) {
      this.$confirm({
        title: "Are you sure delete this item?",
        content: "If you continue the data will not be restored",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: () => {
          if (IdDescription) {
            this.$store.dispatch("deleteContentArticle", IdDescription);
          }
          this.listLocations.splice(index, 1);
        },
        onCancel() {}
      });
    },
    addLocation() {
      this.listLocations.push({});
    },
    replaceListLocations() {
      this.listLocations = this.$store.state.article.articleDescription;
    },
    submitListLocations() {
      if (this.listLocations.length <= 0) {
        this.$message.error("location ​​cannot null", 5);
        return;
      }
      for (let i = 0; i < this.listLocations.length - 1; i++) {
        for (let j = i + 1; j < this.listLocations.length; j++) {
          if (!this.listLocations[j].Place.trim()) {
            this.$message.error("Fill in all fields", 5);
            return;
          }
          if (this.listLocations[i].Place == this.listLocations[j].Place) {
            this.$message.error("Values ​​cannot be duplicated", 5);
            return;
          }
        }
      }
      this.$store.dispatch("updateIntroArticle", this.listLocations.length);
      this.$store.dispatch("setContentArticle", this.listLocations);
      this.$emit("updateCurrent", 2);
    },

    backFormBefore() {
      this.$emit("updateCurrent", 0);
    }
  },

  created() {
    this.listLocations = this.$store.state.article.articleDescription;
  }
};
</script>

