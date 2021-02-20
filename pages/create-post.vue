<template>
  <div>
    <v-text-field
      v-model="content"
      label="Content"
    />
    <v-btn @click="createPost">Create</v-btn>
  </div>
</template>
<script>
import { API } from 'aws-amplify'
import { createPost } from '~/src/graphql/mutations'
import { listPosts } from '~/src/graphql/queries'

export default {
  data() {
    return {
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
}
</script>
