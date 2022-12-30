import styles from './index.module.scss'
import { Modal } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { setMoreAction, unLikeArticle } from '../../../../store/actions/home'
const FeedbackActionMenu = () => {
  const dispatch = useDispatch()
  const moreAction = useSelector((state) => state.home.moreAction)
  return (
    <div className={styles.root}>
      <Modal
        className="more-action-modal"
        visible={moreAction.visible}
        content="人在天边月上明"
        closeOnAction
        onClose={() => {
          dispatch(
            setMoreAction({
              visible: false,
              articleId: '',
            })
          )
        }}
        actions={[
          {
            key: 'confirm',
            text: '我知道了',
          },
          {
            key: 'unlike',
            text: '不感兴趣',
            onClick: () => {
              dispatch(unLikeArticle(moreAction.articleId))
            },
          },
        ]}
      />
    </div>
  )
}

export default FeedbackActionMenu
