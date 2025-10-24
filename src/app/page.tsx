'use client'

import Introduction from './components/Introduction'
import TransitionBridge from './components/TransitionBridge'
import StoryGallery from './components/PhotoGallery'
import LetterSection from './components/Letter'

export default function Home() {
  return (
    <>
      <Introduction />
      <div id ="gallery">
        <StoryGallery />
      </div> 
      <LetterSection />
    </>
  )
}