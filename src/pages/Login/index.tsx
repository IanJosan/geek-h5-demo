import Navbar from '../../component/Navbar'
import styles from './index.module.scss'
import Input from '../../component/Input/index'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { sendCode, login } from '../../store/actions/login'
import { Toast } from 'antd-mobile'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
function Login() {
  const [time, setTime] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onExtraClick = async () => {
    if (time > 0) return
    if (!/^1[3-9]\d{9}$/.test(mobile)) {
      formik.setTouched({
        mobile: true,
      })
      return
    }

    await dispatch(sendCode(mobile))
    Toast.show({
      content: '获取成功',
      icon: 'success',
      duration: 1000,
    })
    setTime(60)
    let timeId = setInterval(() => {
      setTime((time) => {
        if (time === 1) {
          clearInterval(timeId)
        }
        return time - 1
      })
    }, 1000)
  }
  const location = useLocation()
  const formik = useFormik({
    initialValues: {
      mobile: '',
      code: '',
    },
    async onSubmit(values) {
      await dispatch(login(values))
      Toast.show({
        content: '登录成功',
        icon: 'success',
        duration: 1000,
      })

      const pathname = location.state ? location.state.from : '/home'
      navigate(pathname, { replace: true })
    },
    validationSchema: Yup.object({
      mobile: Yup.string()
        .required('手机号不能为空')
        .matches(/^1[3-9]\d{9}$/, '格式错误'),
      code: Yup.string()
        .required('验证码不为空')
        .matches(/^\d{6}$/, '验证码错误'),
    }),
  })
  const {
    values: { mobile, code },
    handleChange,
    handleSubmit,
    errors,
    handleBlur,
    touched,
    isValid,
  } = formik
  return (
    <div className={styles.root}>
      <Navbar>登录</Navbar>
      <div className="content">
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <Input
              placeholder="请输入手机号"
              value={mobile}
              onChange={handleChange}
              name="mobile"
              autoComplete="off"
              onBlur={handleBlur}
              maxLength={11}
            ></Input>
            {touched.mobile && errors.mobile ? (
              <div className="validate">{errors.mobile}</div>
            ) : null}
          </div>
          <div className="input-item">
            <Input
              placeholder="请输入验证码"
              extra={time === 0 ? '获取验证码' : time + 's后获取'}
              onExtraClick={onExtraClick}
              value={code}
              onChange={handleChange}
              name="code"
              autoComplete="off"
              onBlur={handleBlur}
              maxLength={6}
            ></Input>
            {touched.code && errors.code ? (
              <div className="validate">{errors.code}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className={classNames('login-btn', { disabled: !isValid })}
            disabled={!isValid}
          >
            登录
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
