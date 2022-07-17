// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { async } = require('rxjs/internal/scheduler/async');
const { remote } = require('webdriverio');
const sites = {
  tradingView: 'TRADING_VIEW',
  screener: 'SCREENER'
}

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

  document.getElementById('launchTradingView').addEventListener('click',async ()=>{
    const stocks = document.getElementById('stocksSelected').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    await executeAutomation(stocks, username, password, sites.tradingView);
  });

  document.getElementById('launchScreener').addEventListener('click',async ()=>{
    const stocks = document.getElementById('stocksSelected').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    await executeAutomation(stocks, username, password, sites.screener);
  });
})

executeAutomation = async(stocks, username, password, website) =>{
  if(!stocks){
    return;
  }
  const stockList = stocks.split(',');
  const browser = await remote({
    capabilities: {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['start-maximized']
      }
    }
  });
  let websiteUrl;
  if(website === sites.tradingView){
    await browser.url('https://in.tradingview.com/');
    if(username && password){
      await loginIntoTradeView(browser, username, password);
    }
    websiteUrl = 'https://in.tradingview.com/chart/?symbol=NSE%3A'
  } else if(website === sites.screener){
    await browser.url('https://www.screener.in/');
    if(username && password){
      // await loginIntoScreener(browser, username, password);
    }
    websiteUrl = 'https://www.screener.in/company/'
  }

  stockList.forEach(async (stock) => {
    await browser.pause(1000);
    await browser.newWindow( websiteUrl + stock );        
  });    
}

loginIntoTradeView = async (browser, username, password) => {
  const userButton = await browser.$("//*[@aria-label='Open user menu']");
  await userButton.click();
  await browser.pause(1000);

  const darkModeButton = await browser.$("//*[@data-name='header-user-menu-switch-theme']");
  await darkModeButton.click();
  await browser.pause(1000);
  
  
  const signInButton = await browser.$("//*[@data-name='header-user-menu-sign-in']");
  await signInButton.click();
  await browser.pause(1000);
  // launch Fire fox and direct it to the Base URL
  const emailButton = await browser.$("//div[@class='i-clearfix']");
  await emailButton.click();
  await browser.pause(1000);

  const email = await browser.$("//input[@name='username']");
  await email.setValue(username);
  await browser.pause(1000);

  const passwordField = await browser.$("//input[@name='password']");
  await passwordField.setValue(password);
  await browser.pause(1000);

  const signin = await browser.$("//button[@type='submit']");
  await signin.click();
  await browser.pause(1000);

}

loginIntoScreener = async(browser, username, password) =>{
  const userButton = await browser.$("button account");
  await userButton.click();
  await browser.pause(1000);
  
  const email = await browser.$("//input[@name='username']");
  await email.setValue(username);
  await browser.pause(1000);

  const passwordField = await browser.$("//input[@name='password']");
  await passwordField.setValue(password);
  await browser.pause(1000);

  const signin = await browser.$("//button[@type='submit']");
  await signin.click();
  await browser.pause(1000);  
}
