const puppeteer=require("puppeteer");
const mail="yicin76139@svcache.com";
const pass="yicin1";
const code=require("./code");

(async function(){
    
    let browser =await puppeteer.launch({headless:false,defaultViewport:null,args:['--start-fullscreen']});
    let page=await browser.newPage();

    await  page.goto("https://www.hackerrank.com/");
    await waitandclick("#menu-item-2887 a",page);
    await page.waitForSelector(".fl-button");
    await page.evaluate(function(){
        let btns=document.querySelectorAll(".fl-button");
        btns[1].click();
        return;
    })
    await page.waitForSelector("#input-1");
    await page.type("#input-1",mail,{delay:100});
    await page.type("#input-2",pass,{delay:100});
    await waitandclick('button[data-analytics="LoginPassword"]',page);
    await waitandclick('.topic-item.bold [data-automation="algorithms"]',page);
    await page.waitForSelector(".filter-group");

    await page.evaluate(function(){
          
        let alldivs=document.querySelectorAll(".filter-group");
        let div=alldivs[3];
        let clickselector=div.querySelector(".ui-checklist-list-item input");
               clickselector.click();
               return;
       })
      
       await page.waitForSelector(".challenges-list>.js-track-click.challenge-list-item");
          let questionarr=await page.evaluate(function(){
            let arr=[];
              
            let atags=document.querySelectorAll(".challenges-list>.js-track-click.challenge-list-item");
 
            for(let i=0;i<atags.length;++i){
                let link=atags[i].href;
                arr.push(link);
            }
 
            return arr;
        })
           
      for(let i=0;i<questionarr.length;++i){
        await questionsolver(questionarr[i],code.answers[i],page);
      }

    // await questionsolver(questionarr[0],code.answers[0],page);

})();

async function waitandclick(selector,page){
          await page.waitForSelector(selector);
          await page.click(selector);
}


async function questionsolver(question,answer,page){
       await  page.goto(question);
       await waitandclick(".checkbox-wrap",page);
       await waitandclick(".ui-tooltip-wrapper textarea",page);
       await page.type(".ui-tooltip-wrapper textarea",answer);
       await page.keyboard.down("Control");
       await page.keyboard.press('A');
       await page.keyboard.press('X');
       await page.keyboard.up("Control");
       await waitandclick(".monaco-editor.no-user-select.vs",page);   
       await page.keyboard.down("Control");
       await page.keyboard.press("A");
       await page.keyboard.press("V");
       await page.keyboard.up("Control");
       await waitandclick(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled",page);
         console.log("Submission done");

    }