import './home-styles.scss';
import PostList from '@components/PostList/PostList';

const Home = () => {
  return (
    <section className='home'>
        <p className='header-text'>Share your <span>AI-Generated</span> image and the prompt with the world!</p>
        <PostList url={"/api/post"} homepage={true}/>
    </section>
  )
}

export default Home;