import React from 'react'

const TalentPage = async ({ params }: {
    params: Promise<{ slug: string }>
}) => {
    const { slug } = await params
    console.log(slug)
    return (
        <div>
            Each talent page
        </div>
    )
}

export default TalentPage
