import React from 'react'
import { ElementWrapper } from '../Page/Page';

function Embed({ url, provided, item }) {
    return (
        <ElementWrapper provided={provided} item={item}>
            <iframe width="100%" height={"250px"} src={url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </ElementWrapper>
    )
}

export default Embed;