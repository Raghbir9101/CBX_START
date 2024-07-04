import React from 'react'

function Embed({ url }) {
    return (
        <iframe width="100%" height={"250px"} src={url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    )
}

export default Embed;