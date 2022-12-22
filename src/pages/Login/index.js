import Navbar from '../../component/Navbar'
import styles from './index.module.scss'
import Input from '../../component/Input/index'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import classNames from 'classname'
function Login() {
  const onExtraClick = () => {}
  const formik = useFormik({
    initialValues: {
      mobile: '',
      code: '',
    },
    onSubmit(values) {
      console.log(values)
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
              extra="获取验证码"
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
