<template>
  <div>
    <amplify-authenticator :auth-config="authConfig">
      <h1>success</h1>
      <amplify-sign-out></amplify-sign-out>
    </amplify-authenticator>
  </div>
</template>
<script>
import { API } from 'aws-amplify'
import { createPost } from '~/src/graphql/mutations'
import { listPosts } from '~/src/graphql/queries'

export default {
  data() {
    return {
      authConfig: {
        signUpConfig: {
          hiddenDefaults: ['phone_number'],
        },
      },
      content: undefined,
    }
  },
  methods: {
    async createPost() {
      const { content } = this
      if (!content) return false
      const inputPost = {
        type: 'post',
        content,
        timestamp: Math.floor(Date.now() / 1000),
      }
      await API.graphql({
        query: createPost,
        variables: { input: inputPost },
      })
      this.content = ''
      this.description = ''
      await this.getPosts()
    },
    async getPosts() {
      const posts = await API.graphql({
        query: listPosts,
      })
      // eslint-disable-next-line no-console
      console.log('posts', posts)
    },
  },
  async mounted() {

    // const currentUserInfo = await Auth.currentUserInfo()
    // this.isLoggedIn = Boolean(currentUserInfo)

  }
}
</script>
