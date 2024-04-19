import './home-styles.scss';

const page = () => {
  return (
    <section className='home'>
        <p>Share your <span>AI-Generated</span> image and the prompt with the world!</p>
        <input type="text"  placeholder='Search for a prompt...'/>
    </section>
  )
}

export default page