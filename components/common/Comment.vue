<template>
  <div class="container-comment">
    <a-comment>
      <a-avatar
        slot="avatar"
        :src="`${$store.state.user.authUser ? $store.state.user.authUser.Avatar ? $store.state.user.authUser.Avatar : '' : ''}`"
        :icon="`${$store.state.user.authUser ? $store.state.user.authUser.Avatar ? '' : 'user' : 'user'}`"
      />
      <div slot="content">
        <a-form-item class="m-0">
          <a-input
            class="rounded-pill"
            placeholder="Write your comment!"
            v-model="value"
            @pressEnter="submitComment"
          />
        </a-form-item>
      </div>
    </a-comment>

    <a-list v-if="comments.length" :data-source="comments" item-layout="horizontal">
      <a-list-item slot="renderItem" slot-scope="item, indexComment" class="text-left">
        <a-comment
          class="py-0"
          style="width: calc(100% - 64px);"
          :style="{color: colorText}"
          :author="item.author"
          :datetime="moment(item.datetime).fromNow()"
        >
          <a-avatar
            slot="avatar"
            :src="`${item.avatar ? item.avatar : ''}`"
            :icon="`${item.avatar ? '' : 'user'}`"
          />
          <div slot="content">
            <span v-if="!visibleEditComment.includes(item.idComment)">{{ item.content }}</span>
            <a-input
              class="rounded-pill"
              :value="item.content"
              @pressEnter="(e)=>editComment(e, indexComment, item.idComment)"
              v-else
            ></a-input>
          </div>
          <div
            class="mb-2 mt-0"
            :style="{color: colorText}"
            @click="showReply(item.idComment, indexComment)"
            style="cursor: pointer; font-size: 14px;"
          >Reply</div>

          <a-list
            v-if="item.replies && item.replies.length && visibleInputReply.includes(item.idComment)"
            :data-source="item.replies"
            item-layout="horizontal"
            class="container-reply"
          >
            <a-list-item slot="renderItem" slot-scope="item" class="text-left py-0 border-0 mt-3">
              <a-comment
                :style="{color: colorText}"
                :author="item.author"
                :content="item.content"
                :datetime="moment(item.datetime).fromNow()"
              >
                <a-avatar
                  slot="avatar"
                  :src="`${item.avatar ? item.avatar : ''}`"
                  :icon="`${item.avatar ? '' : 'user'}`"
                />
              </a-comment>
            </a-list-item>

            <!-- <div
            v-if="showLoadingMoreReplies"
            slot="loadMore"
            :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
          >
            <a-spin v-if="loadingMoreReplies" class="text-white">
              <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
            </a-spin>
            <a-button
              v-else

              type="link"
              class="text-white text-left"
            >loading more replies</a-button>
            </div>-->
          </a-list>

          <a-comment v-if="visibleInputReply.includes(item.idComment)" class="mt-3">
            <a-avatar
              slot="avatar"
              :src="`${$store.state.user.authUser ? $store.state.user.authUser.Avatar ? $store.state.user.authUser.Avatar : '' : ''}`"
              :icon="`${$store.state.user.authUser ? $store.state.user.authUser.Avatar ? '' : 'user' : 'user'}`"
            />
            <div slot="content">
              <a-form-item class="m-0">
                <a-input
                  class="rounded-pill"
                  placeholder="Write your comment!"
                  v-model="item.reply"
                  @pressEnter="submitReply(item.reply, indexComment, item.idComment)"
                />
              </a-form-item>
            </div>
          </a-comment>
        </a-comment>
        <a-popover placement="right">
          <template slot="content">
            <a-button
              ghost
              type="link"
              class="text-dark mb-2"
              @click="deleteComment(item.idComment)"
            >Delete</a-button>
            <br>
            <a-button
              ghost
              type="link"
              class="text-dark"
              @click="visibleEditComment.push(item.idComment)"
            >Edit</a-button>
          </template>
          <a-button
            ghost
            type="link"
            class="float-right"
            v-if="$store.state.user.authUser && item.idAuthor == $store.state.user.authUser.ID"
          >
            <a-icon type="ellipsis" style="font-size: 25px;" :style="{color: colorText}" />
          </a-button>
        </a-popover>
      </a-list-item>
      <div
        v-if="showLoadingMoreComments"
        slot="loadMore"
        :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
      >
        <a-spin v-if="loadingMoreComments" :style="{color: colorText}">
          <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
        </a-spin>
        <a-button
          v-else
          @click="onLoadMoreComments"
          type="link"
          :style="{color: colorText}"
        >loading more</a-button>
      </div>
    </a-list>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: ["IdArticle", "colorText"],
  data() {
    return {
      comments: [],
      visibleInputReply: [],
      moment,
      value: "",
      lastIdComment: "",
      loadingMoreComments: false,
      showLoadingMoreComments: true,
      loadingMoreReplies: true,
      showLoadingMoreReplies: true,
      visibleEditComment: []
    };
  },
  methods: {
    checkLogged() {
      if (!this.$store.state.user.authUser) {
        this.$confirm({
          title: "Login to review the article",
          onOk: () => {
            this.$router.push("/auth/login");
          },
          onCancel: () => {}
        });
        return false;
      }
      return true;
    },

    async submitComment() {
      if (!this.value) {
        return;
      }
      if (!this.checkLogged()) {
        this.value = "";
        return;
      }
      const values = {
        Article_Id: this.IdArticle,
        Content: this.value
      };
      const { data } = await this.$axios.post("/comment/create", values, {
        headers: {
          authorization: "Bearer " + this.$cookies.get("token")
        }
      });

      if (data.status == 201) {
        this.comments.unshift({
          author: this.$store.state.user.authUser.FullName,
          avatar: this.$store.state.user.authUser.Avatar,
          content: this.value,
          datetime: moment().format(),
          idAuthor: data.data.User_Id,
          idComment: data.data.ID
        });
      }
      this.value = "";
    },

    async showReply(idComment, indexComment) {
      if (!this.comments[indexComment].replies) {
        this.comments[indexComment].replies = [];
        try {
          const { data } = await this.$axios.get(
            `/comment/reply/${idComment}&0`
          );
          if (data.status == 200) {
            data.data.forEach(item => {
              this.comments[indexComment].replies.push({
                author: item.users.FullName,
                avatar: item.users.Avatar,
                content: item.Content,
                datetime: item.created_at,
                idAuthor: item.User_Id
              });
            });
            this.$forceUpdate();
          }
        } catch (e) {
          console.log(e);
        }
      }
      const itemAlready = this.visibleInputReply.includes(idComment);
      if (!itemAlready) {
        this.visibleInputReply.push(idComment);
      } else {
        this.visibleInputReply.splice(
          this.visibleInputReply.indexOf(idComment),
          1
        );
      }
    },

    async submitReply(content, indexComment, idComment) {
      if (!content) {
        return;
      }
      if (!this.checkLogged()) {
        this.comments[indexComment].reply = "";
        return;
      }

      const values = {
        Content: content,
        Article_Id: this.IdArticle,
        Reply_Id: idComment
      };
      try {
        const { data } = await this.$axios.post(
          "/comment/reply/create",
          values,
          {
            headers: {
              authorization: "Bearer " + this.$cookies.get("token")
            }
          }
        );
        if (data.status == 201) {
          this.comments[indexComment].replies.push({
            author: this.$store.state.user.authUser.FullName,
            avatar: this.$store.state.user.authUser.Avatar,
            content: content,
            datetime: moment().format()
          });
          this.$forceUpdate();
        }
      } catch (e) {
        console.log(e);
      }
      this.comments[indexComment].reply = "";
    },

    async onLoadMoreComments() {
      try {
        this.loadingMoreComments = true;
        const { data } = await this.$axios.get(
          `/comment/lazy-load-list/${this.lastIdComment}&3&${this.IdArticle}`
        );

        if (data.status == 200) {
          data.data.forEach(item => {
            this.comments.push({
              author: item.users.FullName,
              avatar: item.users.Avatar,
              content: item.Content,
              datetime: item.created_at,
              idAuthor: item.User_Id,
              idComment: item.ID
            });
          });
          this.lastIdComment = data.lastId;
        }
        if (this.lastIdComment == null) {
          this.showLoadingMoreComments = false;
        }
        this.loadingMoreComments = false;
      } catch (e) {
        console.log(e);
      }
    },

    async deleteComment(idComment) {
      const { data } = await this.$axios.delete(`/comment/${idComment}`, {
        headers: {
          authorization: "Bearer " + this.$cookies.get("token")
        }
      });
      if (data.status == 200) {
        this.comments = this.comments.filter(
          item => item.idComment !== idComment
        );
      }
    },
    async editComment(e, indexComment, idComment) {
      if (!e.target.value) {
        this.visibleEditComment.splice(this.visibleEditComment.indexOf(idComment), 1)
        return;
      }
      const { data } = await this.$axios.put(
        `/comment/${idComment}`,
        { Content: e.target.value },
        {
          headers: {
            authorization: "Bearer " + this.$cookies.get("token")
          }
        }
      );
      if(data.status == 201) {
        this.comments[indexComment].content = e.target.value
        this.visibleEditComment.splice(this.visibleEditComment.indexOf(idComment), 1)
      }
    }
  },

  async created() {
    try {
      this.loadingMoreComments = true;
      const { data } = await this.$axios.get(
        `/comment/lazy-load-list/0&1&${this.IdArticle}`
      );

      if (data.status == 200) {
        data.data.forEach(item => {
          this.comments.push({
            author: item.users.FullName,
            avatar: item.users.Avatar,
            content: item.Content,
            datetime: item.created_at,
            idAuthor: item.User_Id,
            idComment: item.ID
          });
        });
        this.lastIdComment = data.lastId;
      }
      if (this.lastIdComment == null) {
        this.showLoadingMoreComments = false;
      }
      this.loadingMoreComments = false;
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
<style scoped>
.container-comment >>> .anticon {
  vertical-align: 0.125em;
}

.container-comment >>> .ant-comment-content-author {
  margin-bottom: 0px;
}

.container-comment >>> .ant-comment-content-author-name,
.container-comment >>> .ant-comment-content-author-time,
.container-comment >>> .ant-comment-content-detail {
  color: currentColor;
  font-size: 15px;
}

.ant-list-split .ant-list-item {
  border: 0;
  align-items: flex-start;
}

.container-comment >>> .ant-comment-inner {
  padding: 0;
}
</style>
