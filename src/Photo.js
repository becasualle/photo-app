import React from 'react'
import { FcLikePlaceholder, FcLike } from 'react-icons/fc'
import { BsTrash } from 'react-icons/bs'
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
    const { isLikedFilterOn, handleLike, handleDelete } = useGlobalContext();
    const iconStyle = { fontSize: "2rem" }
    console.log(styles)

    return (
        <article className={styles.photo}>
            <img src={regular} alt={alt_description} />
            <button onClick={() => handleLike(id)} className={`${styles.btnIcon} +' ' + ${styles.like}`}>
                {liked_by_user ? <FcLike style={iconStyle} /> : <FcLikePlaceholder style={iconStyle} />}
            </button>
            <div className={styles.photoInfo}>
                <div>
                    <h4>{name}</h4>
                    <a href={portfolio_url}>
                        <img src={medium} alt={name} className={styles.userImg} />
                    </a>
                </div>


                {!isLikedFilterOn &&
                    <button onClick={() => handleDelete(id)} className={styles.btnIcon}>
                        <BsTrash style={{ fontSize: "2rem", color: 'white' }} />
                    </button>
                }

            </div>
        </article>
    )
}

export default Photo
