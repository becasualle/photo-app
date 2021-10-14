import React from 'react'
import { FcLikePlaceholder, FcLike } from 'react-icons/fc'
import { useGlobalContext } from './context'

const Photo = (props) => {
    const {
        id,
        urls: { regular },
        alt_description,
        likes,
        user: { name, portfolio_url, profile_image: { medium } }
    } = props;
    const { handleLike } = useGlobalContext();

    return (
        <article className='photo'>
            <img src={regular} alt={alt_description} />
            <div className="photo-info">
                <div>
                    <h4>{name}</h4>
                    {/* <p>{likes} likes</p> */}
                    <button onClick={() => handleLike(id)}>like</button>
                </div>
                <a href={portfolio_url}>
                    <img src={medium} alt={name} className="user-img" />
                </a>
            </div>
        </article>
    )
}

export default Photo
