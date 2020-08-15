<template>
  <div class="col-7 d-flex flex-column justify-content-center">
    <h2 class="mb-5">Create your Account</h2>
    <a-form :form="form" layout="vertical" @submit="handleSubmit" id="form-register">
      <a-form-item class="mb-0">
        <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
          <a-input
            size="large"
            style="width: 100%"
            v-decorator="['FullName', { rules: [{ required: true, whitespace: true,  message: 'Please input your name!' }] }]"
            placeholder="Full name"
          >
            <a-icon slot="suffix" type="user" />
          </a-input>
        </a-form-item>
        <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }"></span>
        <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
          <a-date-picker
            size="large"
            style="width: 100%"
            v-decorator="['BirthDay']"
            placeholder="Date of birth"
          />
        </a-form-item>
      </a-form-item>

      <a-form-item class="mb-0">
        <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
          <a-input
            size="large"
            style="width: 100%"
            v-decorator="['Email', { rules: [{ required: true, message: 'Please input your Email!' }, { type: 'email', message: 'The input is not valid E-mail!' }] }]"
            placeholder="Email"
          >
            <a-icon slot="suffix" type="mail" />
          </a-input>
        </a-form-item>
        <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }"></span>
        <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
          <a-input
            size="large"
            style="width: 100%"
            v-decorator="['Username', { rules: [{ required: true, whitespace: true, message: 'Please input your Username!' }] }]"
            autocomplete="off"
            placeholder="Username"
          >
            <a-icon slot="suffix" type="book" />
          </a-input>
        </a-form-item>
      </a-form-item>

      <a-form-item>
        <a-input size="large" v-decorator="['Address']" placeholder="Address">
          <a-icon slot="suffix" type="home" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input size="large" v-decorator="['PhoneNumber']" placeholder="PhoneNumber">
          <a-icon slot="suffix" type="home" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          v-decorator="['Password', { rules: [{ required: true, message: 'Please input your Password!' }, { min: 6, max: 16, message: 'Password between 8 to 15 characters' }] }]"
          type="password"
          placeholder="Password"
        >
          <a-icon slot="suffix" type="lock" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button size="large" type="primary" html-type="submit" block>Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import moment from "moment";
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
            values = {
              FullName: values.FullName.trim(),
              Email: values.Email.trim(),
              Username: values.Username.trim(),
              Password: values.Password,
            };
            if(values.Address) values.Address = values.Address.trim()
            if(values.PhoneNumber) values.PhoneNumber = values.PhoneNumber.trim()
            if(values.BirthDay) values.BirthDay = moment(values.BirthDay).format("YYYY-MM-DD")
             console.log('hererer', values);
            const { data } = await this.$axios.post("/register", values);
            if (data.status != 201)
              this.form.setFields({
                Username: {
                  errors: [
                    {
                      message: "Username is  already exists"
                    }
                  ]
                }
              });
            else {
              this.$router.push("/auth/login");
            }
          } catch (e) {
            console.log('a',e);
          }
        }
      });
    }
  }
};
</script>
