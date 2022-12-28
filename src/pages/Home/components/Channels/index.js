import styles from './index.module.scss'
import Icon from '../../../../component/Icon'
import classNames from 'classname'
import { useDispatch, useSelector } from 'react-redux'
import { differenceBy } from 'lodash'
import { useState } from 'react'
import { delChannel, addChannel } from '../../../../store/actions/home'
function Channels({ onClose, index, onChange }) {
  const userChannels = useSelector((state) => state.home.userChannels)
  const recommendChannels = useSelector((state) => {
    const { userChannels, allChannels } = state.home
    return differenceBy(allChannels, userChannels, 'id')
    // return allChannels.filter((item) => {
    //   return userChannels.findIndex((v) => v.id === item.id)
    // })
  })
  const changeChannel = (i) => {
    if (editing) return
    onChange(i)
    onClose()
  }
  const [editing, setEditing] = useState(false)
  const dispatch = useDispatch()
  const del = (channel, i) => {
    if (userChannels.length < 4) return
    dispatch(delChannel(channel))
    if (i === index) {
      onChange(0)
    } else if (i < index) {
      onChange(index - 1)
    }
  }
  const add = (channel) => {
    dispatch(addChannel(channel))
  }
  return (
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
            edit: editing,
          })}
        >
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              {editing ? '点击删除' : '点击进入'}
            </span>
            <span
              className="channel-item-edit"
              onClick={() => {
                setEditing(!editing)
              }}
            >
              {editing ? '保存' : '编辑'}
            </span>
          </div>

          <div className="channel-list">
            {userChannels.map((item, i) => (
              <span
                className={classNames('channel-list-item', {
                  selected: index === i,
                })}
                key={item.id}
                onClick={() => changeChannel(i)}
              >
                {item.name}
                {item.id !== 0 && (
                  <Icon
                    type="iconbtn_tag_close"
                    onClick={() => del(item, i)}
                  ></Icon>
                )}
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
              <span
                className="channel-list-item"
                key={item.id}
                onClick={() => add(item)}
              >
                +{item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Channels
