import styles from './index.module.scss'
import Icon from '../../../../component/Icon'
import classNames from 'classname'
import { useSelector } from 'react-redux'
import { differenceBy } from 'lodash'
function Channels({ onClose }) {
  const userChannels = useSelector((state) => state.home.userChannels)
  const recommendChannels = useSelector((state) => {
    const { userChannels, allChannels } = state.home
    return differenceBy(allChannels, userChannels, 'id')
    // return allChannels.filter((item) => {
    //   return userChannels.findIndex((v) => v.id === item.id)
    // })
  })

  return (
    <div className={styles.root}>
      <div className={styles.root}>
        {/* 顶部栏：带关闭按钮 */}
        <div className="channel-header">
          <Icon type="iconbtn_channel_close" onClick={onClose} />
        </div>

        {/* 频道列表 */}
        <div className="channel-content">
          {/* 当前已选择的频道列表 */}
          <div
            className={classNames('channel-item', {
              edit: 'editing',
            })}
          >
            <div className="channel-item-header">
              <span className="channel-item-title">我的频道</span>
              <span className="channel-item-title-extra"></span>
              <span className="channel-item-edit" onClick={() => {}}></span>
            </div>

            <div className="channel-list">
              {userChannels.map((item) => (
                <span className="channel-list-item" key={item.id}>
                  {item.name}
                  <Icon type="iconbtn_tag_close"></Icon>
                </span>
              ))}
            </div>
          </div>

          {/* 推荐的频道列表 */}
          <div className="channel-item">
            <div className="channel-item-header">
              <span className="channel-item-title">频道推荐</span>
              <span className="channel-item-title-extra">点击添加频道</span>
            </div>
            <div className="channel-list">
              {recommendChannels.map((item) => (
                <span className="channel-list-item" key={item.id}>
                  +{item.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Channels
