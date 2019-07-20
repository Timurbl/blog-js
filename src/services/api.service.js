class ApiService {
  constructor(baseUrl) {
    this.url = baseUrl
  }

  async createPost(post) {
    try {
      const  request = new Request(`${this.url}/posts.json`, {
        method: 'post',
        body: JSON.stringify(post)
      });
      const response = await fetch(request);
      return await response.json()
    } catch (e) {
      console.error(e)
    }
  }

  async fetchPosts() {
    try {
      const  request = new Request(`${this.url}/posts.json`, {
        method: 'get'
      });
      const response = await fetch(request);
      return await response.json()
    } catch (e) {
      console.error(e)
    }
  }
}

export const apiService = new ApiService('https://js-blog-7151b.firebaseio.com/');