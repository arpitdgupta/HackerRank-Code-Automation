const puppeteer=require("puppeteer");
const mail="yicin76139@svcache.com";
const pass="yicin1";
const code=require("./code");

let browserkapromise=puppeteer.launch({headless:false,defaultViewport:null,args:['--start-fullscreen']});
let page;


browserkapromise.then(function(browser){
    console.log("Browser  is opened");
    let pagepromise=browser.newPage();
    return pagepromise;
}).then(function(pageinstance){
    console.log("page is opened");
    page=pageinstance;
    let urlkapromise=pageinstance.goto("https://www.hackerrank.com/");
    return urlkapromise;
}).then(function(){
    return waitandclick("#menu-item-2887 a");
})


// .then(function(){
//     console.log("hackerrank is opened");
//     let waitpromise=page.waitForSelector("#menu-item-2887 a");
//     return waitpromise;
// }).then(function(){
//     console.log("page click");
//       let pageclickpromise=page.click("#menu-item-2887 a");
//       return pageclickpromise;
// })
.then(function(){
    console.log("waiting for login");
    let waitpromise=page.waitForSelector(".fl-button");
    return waitpromise;
}).then(function(){
    console.log("clicked");
    let domclickPromise=page.evaluate(function(){
        let btns=document.querySelectorAll(".fl-button");
        btns[1].click();
        return;
    })
           return domclickPromise;
}).then(function(){
    let waitpromiseformail=page.waitForSelector("#input-1");
    return waitpromiseformail;
}).then(function(){
    let mailtypepromise=page.type("#input-1",mail,{delay:100});
    return mailtypepromise;
}).then(function(){
    let passtype=page.type("#input-2",pass,{delay:100});
    return passtype;
}).then(function(){
    let clickpromise=page.click('button[data-analytics="LoginPassword"]',{delay:100});
    return clickpromise;
}).then(function(){
    console.log("login hogya");
    let waitpromise= page.waitForSelector('.topic-item.bold [data-automation="algorithms"]');
    console.log("chalgya");
    return waitpromise;
}).then(function(){
    // console.log("algo clicked");
     let algoclick= page.click('.topic-item.bold [data-automation="algorithms"]');
     return algoclick;
}) .then(function(){
       return page.waitForSelector(".filter-group");
}).then(function(){

   let dompromise=page.evaluate(function(){
          
    let alldivs=document.querySelectorAll(".filter-group");
    let div=alldivs[3];
    let clickselector=div.querySelector(".ui-checklist-list-item input");
           clickselector.click();
           return;
   })
      return dompromise;

}).then(function(){
    console.log("warmup selected");
    return page.waitForSelector(".challenges-list>.js-track-click.challenge-list-item");
}).then(function(){
       let arrpromise=page.evaluate(function(){
           let arr=[];
             
           let atags=document.querySelectorAll(".challenges-list>.js-track-click.challenge-list-item");

           for(let i=0;i<atags.length;++i){
               let link=atags[i].href;
               arr.push(link);
           }

           return arr;
       })
       return arrpromise;
}).then(function(questionarr){
     let questionpromise=questionsolver(questionarr[0],code.answers[0]);  
       
        for(let i=1;i<questionarr.length;++i){
            questionpromise=questionpromise.then(function(){
                let nextquestionpromise=questionsolver(questionarr[i],code.answers[i]);
                return nextquestionpromise;
            })
        }


      return questionpromise;
})










function waitandclick(selector){

    return new Promise(function(resolve,reject){

    
    let waitpromise=page.waitForSelector(selector);

    waitpromise.then(function(){
        let clickpromise=page.click(selector);
        return clickpromise;
    }).then(function(){
        resolve();
    })

})
}


function questionsolver(question,answer){
    return new Promise(function(resolve,reject){
        let linkPromise=page.goto(question);
        linkPromise.then(function(){
            return waitandclick(".checkbox-wrap");
        }).then(function(){
        return waitandclick(".ui-tooltip-wrapper textarea");
        }).then(function(){
            let typepromise=page.type(".ui-tooltip-wrapper textarea",answer);
            return typepromise;
        }).then(function(){
            let holdcontrol=page.keyboard.down("Control");
            return holdcontrol;
        }).then(function(){
            return page.keyboard.press('A');
        }).then(function(){
            return page.keyboard.press('x');
        }).then(function(){
             return page.keyboard.up("Control"); 
        }) .then(function(){
            return waitandclick(".monaco-editor.no-user-select.vs");
        }).then(function(){
               return page.keyboard.down("Control");
        }).then(function(){
            return page.keyboard.press("A");
        }).then(function(){
            return page.keyboard.press("V");
        }).then(function(){
            return page.keyboard.up("Control");
        }).then(function(){
            return waitandclick(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
        }).then(function(){
            console.log("Submission done");
            resolve();
        })
    })
}