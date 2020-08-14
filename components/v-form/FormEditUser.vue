<template>
  <div>
    <a-form :form="form" layout="vertical" class="px-5">
      <a-form-item class="mb-0">
        <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
          <a-input
            size="large"
            style="width: 100%"
            v-decorator="['FullName', { initialValue: infoUser.FullName, rules: [{ required: true, whitespace: true, message: 'Please input your name!' }] }]"
            autocomplete="off"
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
            v-decorator="['BirthDay', {initialValue: moment(infoUser.BirthDay)}]"
            placeholder="Date of birth"
          />
        </a-form-item>
      </a-form-item>

      <a-form-item class="mb-0">
        <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
          <a-input
            size="large"
            style="width: 100%"
            v-decorator="['Email', { initialValue: infoUser.Email, rules: [{ required: true, message: 'Please input your Email!' }, { type: 'email', message: 'The input is not valid E-mail!' }] }]"
            autocomplete="off"
            placeholder="Email"
          >
            <a-icon slot="suffix" type="mail" />
          </a-input>
        </a-form-item>
        <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }"></span>
        <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
          <a-input
            :disabled="infoUser.Username == undefined"
            size="large"
            style="width: 100%"
            v-decorator="['Username', { initialValue: infoUser.Username, rules: [{ required: true, whitespace: true, message: 'Please input your Username!' }] }]"
            autocomplete="off"
            placeholder="Username"
          >
            <a-icon slot="suffix" type="book" />
          </a-input>
        </a-form-item>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          v-decorator="['Address', { initialValue: infoUser.Address}]"
          autocomplete="off"
          placeholder="Address"
        >
          <a-icon slot="suffix" type="home" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          v-decorator="['PhoneNumber', { initialValue: infoUser.PhoneNumber}]"
          autocomplete="off"
          placeholder="PhoneNumber"
        >
          <a-icon slot="suffix" type="home" />
        </a-input>
      </a-form-item>

      <a-form-item v-if="(!infoUser.PageAdmin) && (infoUser.isSocial == 0)">
        <a-input
          size="large"
          v-decorator="['passwordConfirm', { rules: [{ required: true, message: 'Please input your Password!' }, { min: 6, max: 16, message: 'Password between 6 to 16 characters' }] }]"
          type="password"
          placeholder="Confirm Password"
        >
          <a-icon slot="suffix" type="lock" />
        </a-input>
      </a-form-item>

      <a-form-item v-if="infoUser.PageAdmin">
        <a-form-item>
          <a-input
            size="large"
            v-decorator="['Password']"
            type="password"
            placeholder="Password"
            :disabled="disabledInputPassword"
          >
            <a-icon slot="suffix" type="lock" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            @change="allowEditPassword"
            v-decorator="['checkboxEditPassword', {valuePropName: 'checked'}]"
          >Edit Password</a-checkbox>
        </a-form-item>
      </a-form-item>

      <a-form-item>
        <a-popconfirm
          placement="bottom"
          ok-text="Yes"
          cancel-text="No"
          @confirm="handleSubmit(form)"
        >
          <template slot="title">
            <p>Are you sure to edit profile</p>
          </template>
          <a-button size="large" type="primary" block>Submit</a-button>
        </a-popconfirm>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["infoUser", "handleSubmit"],
  data() {
    return {
      form: this.$form.createForm(this),
      moment: moment,
      disabledInputPassword: true
    };
  },
  methods: {
    allowEditPassword() {
      this.disabledInputPassword = !this.disabledInputPassword;
    }
  },
  watch: {
    infoUser() {
      this.form.resetFields();
    }
  }
};
</script>
