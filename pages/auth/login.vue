<template>
  <div class="col-7 mt-4">
    <p class="text-secondary font-weight-bold d-inline">Don't have an account?</p>
    <nuxt-link class="text-danger font-weight-bold ml-3" to="/auth/register">Sign up</nuxt-link>
    <div class="d-flex flex-column justify-content-center" :style="{ height: 'calc(100% - 35px)' }">
      <h2 class="mb-5">Sign in with</h2>
      <div class="mb-4">
        <a class="text-secondary" @click="loginGoogle">
          <img src="@/static/icons/icon-google.svg" class="mr-2" />Login with Google
        </a>
        <a class="text-secondary float-right" @click="loginFacebook">
          <img src="@/static/icons/icon-facebook.svg" class="mr-2" />Login with Facebook
        </a>
      </div>
      <p class="text-OR text-secondary mb-5">
        <span>OR</span>
      </p>
      <a-form :form="form" layout="vertical" @submit="handleSubmit">
        <a-form-item>
          <a-input
            size="large"
            v-decorator="['Username', { rules: [{ required: true, message: 'Please input your username!' }] }]"
            placeholder="Username"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            type="password"
            v-decorator="['Password', { rules: [{ required: true, message: 'Please input your password!' }] }]"
            placeholder="Password"
          />
        </a-form-item>
        <a-form-item>
          <a-button size="large" type="primary" html-type="submit" block>Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<style scoped>
.text-OR {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #868e96;
  line-height: 0.1em;
  margin: 10px 0 20px;
}
.text-OR span {
  background: #fff;
  padding: 0 10px;
}
</style>
<script>
import firebase from "firebase";
import moment from "moment"
export default {
  layout: "authentication",
  middleware: "notAuthenticated",
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            const { data } = await this.$axios.post("/login", values);
            if (data.status == 200) {
              this.$cookies.set("token", data.token);
              this.$store.dispatch("update");
              this.$router.push("/about");
            } else {
              this.form.setFields({
                Password: {
                  errors: [
                    {
                      message: "Username or password is incorrect!"
                    }
                  ]
                }
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
    async loginGoogle() {
      this.provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(this.provider)
        .then(async result => {
          const user = result.additionalUserInfo.profile;
          let values = {};
          values.Email = user.email;
          values.FullName = user.name;
          values.Avatar = user.picture;
          const { data } = await this.$axios.post("/social/login", values);
          console.log("data ------>", data);
          if (data.status == 200) {
            this.$cookies.set("token", data.token);
            this.$store.dispatch("update");
            this.$router.push("/about");
          } else {
            this.$message.error(data.message, 8);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    async loginFacebook() {
      var provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope("user_birthday,user_link");
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(async result => {
          // The signed-in user info.
          const user = result.additionalUserInfo.profile;
          let values = {};
          values.Email = user.email;
          values.FullName = user.name;
          values.Avatar = user.picture.data.url;
          values.BirthDay = moment(user.birthday).format("YYYY-MM-DD")
          values.linkFacebook = user.link;
          const { data } = await this.$axios.post("/social/login", values);
          if (data.status == 200) {
            this.$cookies.set("token", data.token);
            this.$store.dispatch("update");
            this.$router.push("/about");
          } else {
            this.$message.error(data.message, 8);
          }
        })
        .catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
          if (errorCode) {
            console.log(errorCode);
          }
          if (errorMessage) {
            console.log(errorMessage);
          }
          if (email) {
            console.log(email);
          }
          if (credential) {
            console.log(credential);
          }
        });
    }
  }
};
</script>
