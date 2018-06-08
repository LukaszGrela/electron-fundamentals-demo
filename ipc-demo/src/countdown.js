const countDown = (cb) => {
  let count = 10;
  let timer = setInterval(_ => {
    count--;
    cb && cb(count);
    if (count === 0) {
      clearInterval(timer);
    }
  }, 1000);
};
module.exports = countDown;