import { Arrow } from '@react-vant/icons'
import { Card, Image} from 'react-vant'
import styles from './recipeCard.module.css'
import useIntersectObs from '@/hooks/useIntersectObs';
import { useCallback ,useState } from 'react';

export default function RecipeCard({ recipe }) {

  const [image, setImage] = useState('https://s1.chu0.com/src/img/gif/0b/0ba928a5dd454cdd937807d2981725d2.gif?e=2051020800&token=1srnZGLKZ0Aqlz6dk7yF4SkiYf4eP-YrEOdM1sob:if9O14UxKtoZcAl-PQpvKosn_AM=')
  
  const lazyLoadImg = useCallback(() => {
    setImage(recipe.image)
  }, [recipe.image])

  const targetRef = useIntersectObs(lazyLoadImg)  

  return (
    <>
      <Card className={styles.recipeCard}>
        <Card.Cover className={styles.cover}>
          <img ref={targetRef} src={image} />
        </Card.Cover>
        <Card.Header extra={<Arrow />}>{recipe.title}</Card.Header>
        <Card.Body className={styles.body}>
          {recipe.author}
        </Card.Body>
      </Card>
    </> 
  );
}
