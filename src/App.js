import './App.css';
import { Component } from 'react'

class App extends Component {
  state = {
    posts: []
  }

  async loadPosts() {
    const postsPromise = fetch( 'https://jsonplaceholder.typicode.com/posts' )
    const photosPromise = fetch( 'https://jsonplaceholder.typicode.com/photos' )
    const [ postsResponse, photosResponse ] = await Promise.all( [ postsPromise, photosPromise ] )

    const posts = await postsResponse.json()
    const photos = await photosResponse.json()

    const postsAndPhotos = posts.map((post, index) => ({
      ...post,
      cover: photos[index].url
    }))

    this.setState( { posts: postsAndPhotos } )
  }


  componentDidMount(){
    this.loadPosts()
  }


  render() {
    const { posts } = this.state

    return (
      <section className='container'>
        <div className="posts">
          {
            posts.map( post => (
              <div className='post'>
                <img src={post.cover} alt={post.title}/>
                <div key={post.id} className='post-content'>
                  <h1>{post.title}</h1>
                  <p>{post.body}</p>
                </div>
              </div>
            ) )
          }
        </div>
      </section>
    );
  }
}

export default App;
