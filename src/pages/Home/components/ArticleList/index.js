import styles from './index.module.scss'
import ArticleItem from '../ArticleItem'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAticleList } from '../../../../store/actions/home'
function ArticleList({ channelId, activeId }) {
  const dispatch = useDispatch()
  const current = useSelector((state) => state.home.articles[channelId])
  useEffect(() => {
    if (current) return
    if (channelId === activeId) {
      dispatch(getAticleList(channelId, Date.now()))
    }
  }, [channelId, activeId, dispatch, current])

  if (!current) return null
  return (
    <div className={styles.root}>
      <div className="articles">
        {current.list.map((item) => (
          <div className="article-item" key={item.art_id}>
            <ArticleItem article={item}></ArticleItem>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ArticleList
