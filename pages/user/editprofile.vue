<template>
  <div>
    <div class="container">
      <a-tabs default-active-key="1" class="mx-5">
        <a-tab-pane key="1" tab="Profile">
          <h2 class="my-4 text-center">Edit profile</h2>
          <FormEditUser :infoUser.sync="infoUser" :handleSubmit="editByUser" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Password" force-render>
          <h2 class="my-4 text-center">Change Password</h2>
          <FormChangePassword />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Avatar">
          <h2 class="my-4 text-center">Edit avatar</h2>
          <FormEditAvatar />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import FormEditUser from "@/components/v-form/FormEditUser";
import FormEditAvatar from "@/components/v-form/FormEditAvatar";
import FormChangePassword from "@/components/v-form/FormChangePassword";
import moment from "moment";
export default {
  components: {
    FormEditUser,
    FormEditAvatar,
    FormChangePassword
  },
  middleware: "authenticated",
  data() {
    return {
      infoUser: Object
    }
  },

  methods: {
    editByUser(form) {
      form.validateFields(async (err, values) => {
        if (!err) {
          try {
            values = {
              FullName: values.FullName.trim(),
              Email: values.Email.trim(),
              Address: values.Address.trim(),
              Username: values.Username.trim(),
              PhoneNumber: values.PhoneNumber.trim(),
              passwordConfirm: values.passwordConfirm,
              BirthDay: moment(values.BirthDay).format("YYYY-MM-DD")
            };
            const { data } = await this.$axios.put(
              "user/update-information",
              values,
              {
                headers: {
                  authorization: "Bearer " + this.$cookies.get("token")
                }
              }
            );
            if (data.status == 200) {
              this.$message.success("Profile update successful!", 8);
              await this.$store.dispatch("update");
              this.infoUser = this.$store.state.user.authUser,
              this.infoUser.PageAdmin = false
            } else {
              this.$message.error(data.message, 8);
            }
          } catch (e) {
            console.log(e);
          }
        }
      });
    }
  },

  created() {
    this.infoUser = this.$store.state.user.authUser,
    this.infoUser.PageAdmin = false
  }
};
</script>
