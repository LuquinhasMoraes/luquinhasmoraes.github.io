let i = 1;


let targetDate = new Date()
targetDate.setDate(25);
targetDate.setHours(0);
targetDate.setMinutes(0);
targetDate.setSeconds(0);
targetDate.setMilliseconds(0);




let animation = document.getElementById('animation')
let paloma = document.getElementById('paloma')
let happy = document.getElementById('happy')

let question = document.getElementById('question')
let btn = document.getElementById('btn')

function ansiosa() {
    question.textContent = 'Eu também! \n volta aqui quando faltar 5 min, ta?'
    btn.style.display = 'none'
}

function tocar() {
    
    let music = document.querySelector('.music');
    music.play();
}


animation.style.display = 'none'
paloma.style.display = 'none'
happy.style.display = 'none'



document.querySelector('.sound').click();

let html = `<svg class="svg-container" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200">
<line class="line line--left" x1="10" y1="17" x2="10" y2="183"> </line>
<line class="line line--rght" x1="490" y1="17" x2="490" y2="183"> </line>
<g>
  <path class="lttr lttr--I" d="M42.2,73.9h11.4v52.1H42.2V73.9z"></path>
  <path class="lttr lttr--L" d="M85.1,73.9h11.4v42.1h22.8v10H85.1V73.9z"></path>
  <path class="lttr lttr--O"
    d="M123.9,100c0-15.2,11.7-26.9,27.2-26.9s27.2,11.7,27.2,26.9s-11.7,26.9-27.2,26.9S123.9,115.2,123.9,100zM166.9,100c0-9.2-6.8-16.5-15.8-16.5c-9,0-15.8,7.3-15.8,16.5s6.8,16.5,15.8,16.5C160.1,116.5,166.9,109.2,166.9,100z">
  </path>
  <path class="lttr lttr--V"
    d="M180.7,73.9H193l8.4,22.9c1.7,4.7,3.5,9.5,5,14.2h0.1c1.7-4.8,3.4-9.4,5.2-14.3l8.6-22.8h11.7l-19.9,52.1h-11.5L180.7,73.9z">
  </path>
  <path class="lttr lttr--E" d="M239.1,73.9h32.2v10h-20.7v10.2h17.9v9.5h-17.9v12.4H272v10h-33V73.9z"></path>
  <path class="lttr lttr--Y"
    d="M315.8,102.5l-20.1-28.6H309l6.3,9.4c2,3,4.2,6.4,6.3,9.6h0.1c2-3.2,4.1-6.4,6.3-9.6l6.3-9.4h12.9l-19.9,28.5v23.6h-11.4V102.5z">
  </path>
  <path class="lttr lttr--O2"
    d="M348.8,100c0-15.2,11.7-26.9,27.2-26.9c15.5,0,27.2,11.7,27.2,26.9s-11.7,26.9-27.2,26.9C360.5,126.9,348.8,115.2,348.8,100z M391.8,100c0-9.2-6.8-16.5-15.8-16.5c-9,0-15.8,7.3-15.8,16.5s6.8,16.5,15.8,16.5C385,116.5,391.8,109.2,391.8,100z">
  </path>
  <path class="lttr lttr--U"
    d="M412.4,101.1V73.9h11.4v26.7c0,10.9,2.4,15.9,11.5,15.9c8.4,0,11.4-4.6,11.4-15.8V73.9h11v26.9c0,7.8-1.1,13.5-4,17.7c-3.7,5.3-10.4,8.4-18.7,8.4c-8.4,0-15.1-3.1-18.8-8.5C413.4,114.2,412.4,108.5,412.4,101.1z">
  </path>
</g>
</svg>
<div class="mo-container"> </div>`;


const id = setInterval(() => {
    let time = document.getElementById("time")

    let currentDate = new Date()
    
    
    let timespan = targetDate - currentDate;
    let timeISO = new Date(timespan).toISOString();
    let diffDate = timeISO.substring(11, 19);

    time.textContent = diffDate;

    let hh = diffDate.slice(0,2);
    let mm = diffDate.slice(3,5);
    let ss = diffDate.slice(6,8);

    let fulltime = hh + mm + ss;

    console.log(Number(fulltime));

    
    if(fulltime <= 20000) {
        console.log('caiu');
        let bt = `<button id="btn" onClick="tocar()" style="width: 200px; padding: 10px; margin-top: 10px; align-self: center;"><b>Clique aqui, mozin!</b></button>`;
        document.getElementById('sup').innerHTML = bt;
    }

    if(fulltime <= 0 || hh > 3) {
        

        clearInterval(id);
        console.log('acabou');
        
        
        document.querySelector('.text-love').remove();
        setTimeout(() => {
            document.querySelector('.sound').click();
            document.querySelector('.sound').click();
            document.querySelector('.sound').click();
            document.querySelector('.sound').click();
            document.querySelector('.sound').click();
        }, 10)
        
        
        animation.style.display = 'flex'
        paloma.style.display = 'flex'
        happy.style.display = 'flex'
        
    }
    i++;
}, 1000)




