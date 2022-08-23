import { createStore } from 'vuex'

export default createStore({
  state: {
    url: 'http://localhost',
    posts: [],
    errors: {
      400: {
        text: 'An error occurred while registering'
      },
      401: {
        text: 'Incorrect credentials'
      },
      402: {
        text: 'Post has not been deleted' 
      },
      403: {
        text: `Post has not been created` 
      },
      406: {
        text: `An error occurred while editing your post`
      }
    },
    request: {
      method: 'POST' as const,
      headers: {
        'Content-Type': 'application/json' as const
      } as const
    } as  const,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
