import React, { useState } from 'react'
import { FcLikePlaceholder, FcLike } from 'react-icons/fc'

const Photo = (props) => {
    const {
        urls: { regular },
        alt_description,
        likes,
        user: { name, portfolio_url, profile_image: { medium } }
    } = props;

    return (
        <article className='photo'>
            <img src={regular} alt={alt_description} />
            <div className="photo-info">
                <div>
                    <h4>{name}</h4>
                    <p>{likes} likes</p>
                </div>
                <a href={portfolio_url}>
                    <img src={medium} alt={name} className="user-img" />
                </a>
            </div>
        </article>
    )
}

export default Photo
