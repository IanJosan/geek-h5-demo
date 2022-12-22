import Navbar from '../../component/Navbar'
import styles from './index.module.scss'
import Input from '../../component/Input/index'
function Login() {
  const onExtraClick = () => {}
  return (
    <div className={styles.root}>
      <Navbar>登录</Navbar>
      <div className="content">
        <h3>短信登录</h3>
        <form>
          <div className="input-item">
            <Input placeholder="请输入手机号"></Input>
            <div className="validate">手机号验证错误</div>
          </div>
          <div className="input-item">
            <Input
              placeholder="请输入验证码"
              extra="获取验证码"
              onExtraClick={onExtraClick}
            ></Input>
            <div className="validate">验证码验证错误</div>
          </div>
          <button type="submit" className="login-btn">
            登录
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
