const { answerRenderer } = require('./index')
const log = require('../log/index')
const moment = require('moment');
const screenshot = require('../puppeteer/screenshot')


answerRenderer('example.hello', async (msg) => {
  let newMsg = msg + " +1"
  let reply = ''
  reply = '收到：' + msg + '，返回：' + newMsg
  return reply
})

// 获得截图api
answerRenderer('example.getImg', async (msg) => {
  const timeString = moment().format("YYYYMMDDHHmmss")
  let reply = {};
  try {
     const result =  await screenshot(msg)
     reply = {
      url: msg,
      path: result,
      time: timeString,
      status: 'success'
    }
    log(timeString, JSON.stringify(reply))
  } catch (err) {
    log(timeString, err)
    reply.status = 'fail'
  }
 
  return reply
})