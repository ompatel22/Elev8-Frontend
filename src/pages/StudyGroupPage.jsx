import React from 'react'
import StudyGroup from '../components/studygroup/StudyGroup'
import GradientBackground from '../components/background/GradientBackground'
import Navigation from '../components/navigation/Navigation'

function StudyGroupPage() {
    return (
        <GradientBackground className="min-h-screen">
            <StudyGroup />
        </GradientBackground>
    )
}

export default StudyGroupPage
