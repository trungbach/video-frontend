import Image from 'next/image'
import styles from './styles.module.scss'
import imageBackGround from '../../public/assets/image/img_not_found.png';

export default function NotFound() {
    return <div className={styles.centerScreen} >
        <Image
            src={imageBackGround.src}
            alt="404"
            height={500}
            width={800}
        />
    </div>
}