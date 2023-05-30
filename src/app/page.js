import Feed from '@/components/Feed'
import React from 'react'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='text-center head_text'>Discover & Share
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'>AI Powered Prompts</span>
      </h1>
      <p className='desc text-center'>Promptopia is an open-source AI prompting tool for modern world to discover, share and create creative prompts</p>

      {/* Feed */}
      <Feed />
    </section>
  )
}

export default Home 