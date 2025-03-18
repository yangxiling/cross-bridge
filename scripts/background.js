chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getWeeklyUser') {
    console.log('111');

    fetch(request.url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('user list', data);
        sendResponse({ success: true, data });
      })
      .catch((error) => {
        console.log('user fetch error', error);
        sendResponse({ success: false, error });
      });
    console.log('222');
    return true;
  }

  if (request.action === 'sendWechatMessage') {
    fetch(request.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request.data),
    })
      .then((response) => {
        console.log('000--response', response);
        return response.json();
      })
      .then((data) => {
        console.log('1111--data', data);
        sendResponse({ success: true, data });
      })
      .catch((error) => {
        console.log('2222--error', error);
        sendResponse({ success: false, error });
      });
    return true;
  }
});
