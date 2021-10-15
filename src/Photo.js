import React from 'react'
import { FcLikePlaceholder, FcLike } from 'react-icons/fc'
import { useGlobalContext } from './context'
import styles from './Photo.module.css'

const Photo = (props) => {
    const {
        id,
        urls: { regular },
        alt_description,
        liked_by_user,
        user: { name, portfolio_url, profile_image: { medium } }
    } = props;
    const { handleLike } = useGlobalContext();
    const iconStyle = { fontSize: "2rem" }

    return (
        <article className={styles.photo}>
            <img src={regular} alt={alt_description} />
            <div className={styles.photoInfo}>
                <div>
                    <h4>{name}</h4>
                    {/* <p>{likes} likes</p> */}
                    <a href={portfolio_url}>
                        <img src={medium} alt={name} className={styles.userImg} />
                    </a>
                </div>

                <button onClick={() => handleLike(id)} className={styles.btn_icon}>
                    {liked_by_user ? <FcLike style={iconStyle} /> : <FcLikePlaceholder style={iconStyle} />}
                </button>
            </div>
        </article>
    )
}

export default Photo
