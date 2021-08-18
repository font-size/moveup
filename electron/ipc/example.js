const { answerRenderer } = require('./index')
const log = require('../log/index')
const moment = require('moment');
const crawler = require('../puppeteer')



answerRenderer('example.hello', async (msg) => {
  let newMsg = msg + " +1"
  let reply = ''
  reply = '收到：' + msg + '，返回：' + newMsg
  return reply
})

// 抓取api
answerRenderer('example.getPage', async (value) => {
  const timeString = moment().format("YYYYMMDDHHmmss")
  let reply = {};
  try {
     await crawler(value)
     reply = {
      path: 'result',
      time: timeString,
      status: 'success'
    }
    log(timeString, JSON.stringify(reply))
  } catch (err) {
    log(timeString, err)
    console.log(err)
    reply.status = 'fail'
  }
 
  return reply
})