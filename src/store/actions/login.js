import request from '../../utils/request'
export const sendCode = (mobile) => {
  return async (dispatch) => {
    const res = await request({
      url: '/sms/codes/' + mobile,
      method: 'get',
    })
    console.log(res)
  }
}
