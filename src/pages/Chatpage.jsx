import React from 'react'
import GradientBackground from '../components/background/GradientBackground'
import ChatDropDown from '../components/Chat/ChatDropDown'

function Chatpage() {
    return (
        <GradientBackground>
            <div>
                <ChatDropDown />
            </div>
        </GradientBackground>
    )
}

export default Chatpage
