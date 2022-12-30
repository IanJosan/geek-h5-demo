import styles from './index.module.scss'
import ArticleItem from '../ArticleItem'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAticleList } from '../../../../store/actions/home'
import { PullToRefresh, InfiniteScroll } from 'antd-mobile'
function ArticleList({ channelId, activeId }) {
  const dispatch = useDispatch()
  const current = useSelector((state) => state.home.articles[channelId])
  useEffect(() => {
    if (current) return
    if (channelId === activeId) {
      dispatch(getAticleList(channelId, Date.now()))
    }
  }, [channelId, activeId, dispatch, current])
  const onRefresh = async () => {
    setHasMore(true)
    await dispatch(getAticleList(channelId, Date.now()))
  }
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const loadMore = async () => {
    if (loading) return
    if (channelId !== activeId) return
    if (!current.timestamp) {
      setHasMore(false)
      return
    }
    setLoading(true)
    try {
      await dispatch(getAticleList(channelId, current.timestamp, true))
    } finally {
      setLoading(false)
    }
  }

  if (!current) return null
  return (
    <div className={styles.root}>
      <div className="articles">
        <PullToRefresh onRefresh={onRefresh}>
          {current.list.map((item) => (
            <div className="article-item" key={item.art_id}>
              <ArticleItem article={item}></ArticleItem>
            </div>
          ))}
        </PullToRefresh>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
      </div>
    </div>
  )
}
export default ArticleList
