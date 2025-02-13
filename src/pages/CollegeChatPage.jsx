import React from 'react'
import JoinCreateChat from '../components/Chat/JoinCreateRoom'
import GradientBackground from '../components/background/GradientBackground'

function CollegeChatPage() {
    return (
        <>
            <GradientBackground className='min-h-screen'>
                <JoinCreateChat />
            </GradientBackground>
        </>
    )
}

export default CollegeChatPage
