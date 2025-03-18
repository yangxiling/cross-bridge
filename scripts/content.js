// "https://our.ones.pro/wiki/api/wiki/team/RDjYMhKq/space/EVMp34UT/pages"

document.addEventListener('DOMContentLoaded', () => {
  const diffBtn = document.querySelector('.diff');
  diffBtn.addEventListener('click', getNoneWeeklyUser);

  const noticeBtn = document.querySelector('.notice');
  noticeBtn.addEventListener('click', noticeBtnClick);
});

function getNoneWeeklyUser() {
  console.log('YL   click  diff');
  const webhookUrl = 'https://our.ones.pro/wiki/api/wiki/team/RDjYMhKq/space/EVMp34UT/pages';
  chrome.runtime.sendMessage(
    {
      action: 'getWeeklyUser',
      url: webhookUrl,
    },
    (response) => {
      console.log('333diff weekly response', response);
      if (response?.success) {
        console.log('获取成员 成功:', response);
      } else {
        console.log('获取成员 fail:', response?.error);
      }
    }
  );
}

function noticeBtnClick() {
  console.log('YL   click  notice');

  chrome.runtime.sendMessage(
    {
      action: 'sendWechatMessage',
      url: webhookUrl,
      data: {
        msgtype: 'text',
        text: {
          content: 'YL hello world',
          mentioned_list: ['yangxiling', '@all'],
        },
      },
    },
    (response) => {
      console.log('notice 没写的人', response);
      if (response?.success) {
        console.log('请求机器人 成功:', response.data);
      } else {
        console.log('请求机器人 失败:', response?.error);
      }
    }
  );
}
