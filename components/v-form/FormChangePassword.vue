<template>
  <div class="d-flex-center">
    <a-form :form="form" class="w-50" @submit="handleSubmit">
      <a-form-item>
        <a-input
          size="large"
          v-decorator="[
            'oldPassword',
            {
              rules: [{ required: true, message: 'Password is required!' }],
            },
          ]"
          placeholder="Password"
          type="password"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          v-decorator="[
            'newPassword',
            {
              rules: [{ required: true, message: 'New password is required!'}, { min: 6, max: 16, message: 'Password between 6 to 16 characters' }] }]"
          placeholder="New password"
          type="password"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          v-decorator="[
            'confirmPassword',
            {
              rules: [{ required: true, message: 'Confirm password is required!' },  { validator: compareToNewPassword }] }]"
          placeholder="Confirm new password"
          type="password"
        />
      </a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },
  methods: {
    compareToNewPassword(rule, value, callback) {
      if (value && value !== this.form.getFieldValue("newPassword")) {
        console.log(value);
        callback("Confirm passwords do not match");
      } else {
        callback();
      }
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            values = {
              oldPassword: values.oldPassword,
              newPassword: values.newPassword
            };
            const { data } = await this.$axios.put(
              "/user/update-password",
              values,
              {
                headers: {
                  authorization: "Bearer " + this.$cookies.get("token")
                }
              }
            );
            if (data.status == 200) {
              this.$message.success("Profile update successful!", 8);
            } else {
              this.$message.error(data.message, 8);
            }
          } catch (e) {
            console.log(e);
          }
        }
      });
    }
  }
};
</script>
