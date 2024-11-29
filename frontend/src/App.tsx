import React from 'react'
import { Button } from './components/ui/button'
const App = () => {
  return (
    <>
    <div className='bg-blue-600 text-white text-2xl'>
      hello how are you
      
    </div>
    <Button>Click me</Button>
    <Button variant='secondary'>Click me</Button>
    <Button  variant={"outline"}>Click me</Button>
    </>
  )
}

export default App
