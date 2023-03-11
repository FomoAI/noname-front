import styles from "./search-project.module.scss";
import Link from "next/link";
import Image from "next/image";
import loader from "../../../utils/loader";

const SearchProject = ({ projects,handler,withLink = true}) => {
  return (
    withLink
    ?
    <div onClick={handler} className={styles.projects}>
      {projects.map((project) => {
        return (
          <Link
            key={project._id}
            className={styles.project}
            href={`/${project.path}/${project._id}`}
          >
            <div className={styles.img}>
              <Image 
              loader={() => loader(project.img)} 
              width={'32'} height={'32'} 
              src={project.img} alt={project.title} />
            </div>
            <div className={styles.info}>
              <span className={styles.title}>{project.title}</span>
              <span className={styles.description}>NFT & Collectibles</span>
            </div>
          </Link>
        );
      })}
    </div>
    :
    <div className={styles.projects}>
      {projects.map((project,index) => {
        return (
          <div
            tabIndex={index}
            onClick={() => handler(project)}
            key={project._id}
            className={styles.project}
            href={`/${project.path}/${project._id}`}
          >
            <div className={styles.img}>
              <Image 
              loader={() => loader(project.img)} 
              width={'32'} height={'32'} 
              src={project.img} alt={project.title} />
            </div>
            <div className={styles.info}>
              <span className={styles.title}>{project.title}</span>
              <span className={styles.description}>NFT & Collectibles</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchProject;
