chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getWeeklyUser') {
    console.log('111');

    fetch(request.url, {
      method: 'get',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImVhMGFmMDI3LTFiNWItNGNjYi03ODBjLTAwZTlhZjVkNzJmNSIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib25lcy52MSJdLCJjbGllbnRfaW5mbyI6eyJjbGllbnRfaXAiOiIyNy4zOC4yMTcuMTc4In0sImV4cCI6MTc0MjE4MDc4NCwiaWF0IjoxNzQyMTc2ODg0LCJpc3MiOiJodHRwOi8vb3VyLm9uZXMucHJvLyIsImp0aSI6Ijg1MjU3ZjViLTk4MmYtNGE1MS00NDdkLWUyZDZhM2MxZTk2MCIsImxvZ2luX3RpbWUiOjE3MjgzNTQ4MjU4OTAsIm5iZiI6MTc0MjE3Njg4NCwib3JnX3VzZXJfdXVpZCI6IkNDdGF6MVZ2Iiwib3JnX3V1aWQiOiJNWE1LV2pQRSIsInJlZ2lvbl91dWlkIjoiZGVmYXVsdCIsInNjb3BlcyI6WyJvcGVuaWQiLCJvZmZsaW5lX2FjY2VzcyIsIm9uZXM6b3JnOmRlZmF1bHQ6TVhNS1dqUEU6Q0N0YXoxVnYiXSwic2lkIjoiOTA1NzMwYTktMzZhNS00YjRkLTZjMjktZmQxOWQxNzM2MGQ2Iiwic3ViIjoidEpLWGZOcUc6ZGVmYXVsdDpNWE1LV2pQRTpDQ3RhejFWdiJ9.JYstrBC3olpyYT_hPEmacj12huXa7m3U82CkeFLN7Frbg6KKycu3dO-R9GyytnY556wEBnSZ6o_NXK6IcmBPMiidkizgp9Tb_VHf1BZzqrksSBsFB_AX3ixDjB3jz53zxjYRJnCxOESvMKVxOSXbDfF_S9PXtHrpWySOCBAplbZAFuN-UhF5ntnD99qA-BmQHyrv_Ki3v2x35bcBpjQyOPZfk8WzfSIwTDfOmIehyEvw0cS9oYG5lj121HCGf6XSy45FdqJb8d854SlMISVwqXquHFIciSVxb5v0P6Secqo64jQTMG2P4ibswn2ZVlmrDVCvXowGc2F2d9AQd8_GQA',
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
