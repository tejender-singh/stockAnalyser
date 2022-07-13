// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { remote } = require('webdriverio');

window.addEventListener('DOMContentLoaded', () => {
  console.log('hello world1');
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  console.log('hello world2');
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  document.getElementById('myButton').addEventListener('click',async ()=>{
    console.log('hello world');
    const browser = await remote({
      capabilities: {
          browserName: 'chrome'
      }
    })
    await browser.url('https://webdriver.io')
  });
})
