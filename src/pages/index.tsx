import { Button } from '@/components/ui/button'
import React from 'react'

const Home = () => {
  return (
    <div>
        <h1>Welcome to the HatchBoard</h1>
        <div>
            <Button onClick={() => window.location.href = '/feed'}>
                Get Started
            </Button>
        </div>
    </div>
  )
}

export default Home