import classnames from 'classnames'
import Icon from '../../../../component/Icon'
import styles from './index.module.scss'
// 扩展dayjs，有显示相对时间的功能
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入中文包
import 'dayjs/locale/zh-cn'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
// import { setMoreAction } from '@/store/actions/home'

const ArticleItem = ({ article }) => {
  const {
    cover: { type, images },
    title,
    aut_name,
    comm_count,
    pubdate,
  } = article

  return (
    <div className={styles.root}>
      {/* t3: 三图结构 none-mt没有图片结构  */}
      <div
        className={classnames(
          'article-content',
          type === 3 ? 't3' : '',
          type === 0 ? 'none-mt' : ''
        )}
      >
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((item, i) => (
              <div className="article-img-wrapper" key={i}>
                <img src={item} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classnames('article-info')}>
        <span>{aut_name}</span>
        <span>{comm_count}评论</span>
        <span>{dayjs(pubdate).fromNow()}</span>
        {/* fromNow: 距离现在的时间 */}

        <span className="close">
          {<Icon type="iconbtn_essay_close" onClick={() => {}} />}
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
