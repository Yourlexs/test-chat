import moment from 'moment'

let messages = []

export default function formatMessage (username, text) {
  messages.push({
    username,
    text,
    time: moment().format('h:mm a')
  })
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}
