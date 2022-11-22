window.jank = {
  checkDeviceInfo: () => {
    DotNet.invokeMethodAsync('TodoWrapper', 'GetDeviceInfo').then((something) => {
      alert(something);
    });
  }
}