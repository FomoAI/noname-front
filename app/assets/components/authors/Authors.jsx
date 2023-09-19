import Image from 'next/image'
import SubTitle from '../subTitle/SubTitle'
import authorPng from '../../img/autor.png'
import socialMedia from '../../icons/socialmedia'
import styles from './authors.module.scss'
import loader from '../../../utils/loader'

const socialMediaIcons = {
  'twitter':socialMedia.twitter,
  'instagram':socialMedia.instagram,
  'facebook':socialMedia.facebook,
}

const initialData = {
    title:'Автори навчання',
    description:`Learn from others, share your work, and extend your tool set with a diverse group`,
    authors:[
      {
        img:authorPng,
        name:'Dr. Laurent El Ghaul',
        profession:'Business manager',
        description:`Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.`,
        socialMedia:[
          {
            icon:socialMedia.twitter,
            name:'Twitter',
            href:'#'
          },
          {
            icon:socialMedia.instagram,
            name:'Instagram',
            href:'#'
          },
          {
            icon:socialMedia.facebook,
            name:'Facebook',
            href:'#'
          },
        ]
      },
      {
        img:authorPng,
        name:'Dr. Laurent El Ghaul',
        profession:'Business manager',
        description:`Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.`,
        socialMedia:[
          {
            icon:socialMedia.twitter,
            name:'Twitter',
            href:'#'
          },
          {
            icon:socialMedia.instagram,
            name:'Instagram',
            href:'#'
          },
          {
            icon:socialMedia.facebook,
            name:'Facebook',
            href:'#'
          },
        ]
      },
      {
        img:authorPng,
        name:'Dr. Laurent El Ghaul',
        profession:'Business manager',
        description:`Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.`,
        socialMedia:[
          {
            icon:socialMedia.twitter,
            name:'Twitter',
            href:'#'
          },
          {
            icon:socialMedia.instagram,
            name:'Instagram',
            href:'#'
          },
          {
            icon:socialMedia.facebook,
            name:'Facebook',
            href:'#'
          },
        ]
      },
      {
        img:authorPng,
        name:'Dr. Laurent El Ghaul',
        profession:'Business manager',
        description:`Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.`,
        socialMedia:[
          {
            icon:socialMedia.twitter,
            name:'Twitter',
            href:'#'
          },
          {
            icon:socialMedia.instagram,
            name:'Instagram',
            href:'#'
          },
          {
            icon:socialMedia.facebook,
            name:'Facebook',
            href:'#'
          },
        ]
      },
      {
        img:authorPng,
        name:'Dr. Laurent El Ghaul',
        profession:'Business manager',
        description:`Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.`,
        socialMedia:[
          {
            icon:socialMedia.twitter,
            name:'Twitter',
            href:'#'
          },
          {
            icon:socialMedia.instagram,
            name:'Instagram',
            href:'#'
          },
          {
            icon:socialMedia.facebook,
            name:'Facebook',
            href:'#'
          },
        ]
      },
    ]
}

export default function Authors({data}) {
  
  return (
    <div className={styles.body}>   
        <div className={styles.head}>
          <SubTitle>
            {data.title}
          </SubTitle>
          <div className={styles.description}>
            {data.description}
          </div>
        </div>
        <div className={styles.authors}>
            {
              data.items.map((author,index) => {
                return (
                    <div className={styles.author} key={index}>
                      <div className={styles.authorImg}>
                        <img src={loader(author.img)} alt={author.name}/>
                      </div>
                      <div className={styles.authorInfo}>
                        <div className={styles.authorName}>
                          {author.name}
                        </div>  
                        <div className={styles.authorProfession}>
                          {author.profession}
                        </div>
                        <div className={styles.authorDescription}>
                          {author.description}
                        </div>
                        <div className={styles.socialMedia}>
                          {
                            author.socialMedia.map((socialItem,index) => {
                              return (
                                <a href={socialItem.href} key={index}>
                                  <Image src={socialMediaIcons[socialItem.icon]} alt={socialItem.name}/>
                                </a>
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                )
              })
            }
        </div>
    </div>
  )
}
