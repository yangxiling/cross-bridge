// "https://our.ones.pro/wiki/api/wiki/team/RDjYMhKq/space/EVMp34UT/pages"

document.addEventListener('DOMContentLoaded', () => {
  const diffBtn = document.querySelector('.diff');
  diffBtn.addEventListener('click', getNoneWeeklyUser);
});

const USERS = [
  { name: '李伟', pinyin: 'liwei' },
  { name: '谢梓恒', pinyin: 'xieziheng' },
  { name: '李晓飞', pinyin: 'lixiaofei' },
  { name: '王璇', pinyin: 'wangxuan' },
  { name: '李昕亮', pinyin: 'lixinliang' },
  { name: '夏思勇', pinyin: 'xiasiyong' },
  { name: '马秀青', pinyin: 'maxiuqing' },
  { name: '李燕锋', pinyin: 'liyanfeng' },
  { name: '曾华生', pinyin: 'zenghuasheng' },
  { name: '魏拾俊', pinyin: 'weishijun' },
  { name: '杨喜玲', pinyin: 'yangxiling' },
  { name: '王铭峰', pinyin: 'wangmingfeng' },
  { name: '兰锦', pinyin: 'lanjin' },
  { name: '李守宇', pinyin: 'lishouyu' },
  { name: '马红杨', pinyin: 'mahongyang' },
  { name: '陈嘉辉', pinyin: 'chenjiahui' },
  { name: '胡铁军', pinyin: 'hutiejun' },
  { name: '王超', pinyin: 'wangchao' },
  { name: '康家庆', pinyin: 'kangjiaqing' },
  { name: '林胜浩', pinyin: 'linshenghao' },
  { name: '梁德金', pinyin: 'liangdejin' },
  { name: '刘鑫', pinyin: 'liuxin' },
  { name: '张其纲', pinyin: 'zhangqigang' },
  { name: '钟庆豪', pinyin: 'zhongqinghao' },
  { name: '董正选', pinyin: 'dongzhengxuan' },
  { name: '李春生', pinyin: 'lichunsheng' },
  { name: '张思浩', pinyin: 'zhangsihao' },
  { name: '刘业兴', pinyin: 'liuyexing' },
  { name: '丁楠', pinyin: 'dingnan' },
  { name: '莫立亮', pinyin: 'moliliang' },
  { name: '余明豪', pinyin: 'yuminghao' },
  { name: '李泽宇', pinyin: 'lizeyu' },
];

function getNoneWeeklyUser() {
  const week = document.querySelector('.week').value;
  const webhookUrl = 'https://our.ones.pro/wiki/api/wiki/team/RDjYMhKq/space/EVMp34UT/pages';
  console.log('获取第几周成员列表:', week);
  chrome.runtime.sendMessage(
    {
      action: 'getWeeklyUser',
      url: webhookUrl,
      week,
    },
    (response) => {
      if (response?.success) {
        console.log('获取成员 成功:', response);
        const mentioned_list = [];
        USERS.forEach(({ name, pinyin }) => {
          const isWrite = response.data.includes(name);
          if (!isWrite) {
            mentioned_list.push(pinyin);
          }
        });
        if (mentioned_list.length === 0) {
          console.log('所有人都写了');
          return;
        }
        console.log('没写的人:', mentioned_list);
        const noneList = document.querySelector('.none-week-list');
        noneList.innerHTML = `没写周报的人：${mentioned_list.join('、')}`;

        const noticeBtn = document.querySelector('.notice');
        noticeBtn.addEventListener('click', () => noticeBtnClick(mentioned_list));
      } else {
        console.log('获取成员 fail:', response?.error);
      }
    }
  );
}

function noticeBtnClick(mentioned_list) {
  const noneList = document.querySelector('.none-week-list');
  noneList.innerHTML = '';
  if (mentioned_list.length === 0) {
    console.log('不用发企微通知！！！  所有人都写了');
    return;
  }

  chrome.runtime.sendMessage(
    {
      action: 'sendWechatMessage',
      url: webhookUrl,
      data: {
        msgtype: 'text',
        text: {
          content: '兄弟集美们～写周报啦～快写周报啦～～',
          mentioned_list,
        },
      },
    },
    (response) => {
      if (response?.success) {
        console.log('请求机器人 成功:', response.data);
      } else {
        console.log('请求机器人 失败:', response?.error);
      }
    }
  );
}
