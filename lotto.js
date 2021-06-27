//1. 1~45까지의 숫자 div > p 태그로 만들기. for 문 사용.
function numBox(){
    for(let i = 1; i <= 45; i++){
        const div = $("<div>")
        div.html(`<p class = "No_">${i}</p>`)
        div.attr('id',`No${i}`)
        $('.js-num').append(div);
    }
}

//2. 로또번호 생성하기. 클릭시 lottoNum 실행할수 있도록..
const lottoArray = []
function lottoNum(){
  while(lottoArray.length > 0){
    lottoArray.pop();
}
  while(lottoArray.length < 6){
    let randomNum = Math.floor(Math.random()*45)+1
    if(lottoArray.indexOf(randomNum)===-1){
        lottoArray.push(randomNum)
      }
    }
  console.log(lottoArray)
  
  if(creating) return;
  creating = true;
  clearNum()
  
   //번호가 생긴 직후 : 생성중태그 visible.
  $(".ing").addClass("visible")
   //번호가 생긴 직후 : showNum 하나하나 색칠하기.
  intervalId = setInterval(coloringNum,500);
}

//3. 만들어진 번호 하나하나 웹에서 색칠하여 보여주기.
let creating = false;
let step = 0;
let intervalId = 0;
const ingComment = 
['Creating Number..','Creating Number...','Creating Number.','Creating Number..','Creating Number...','Creating Number.',]

function coloringNum(){
$(`#No${lottoArray[step]}`).addClass("selected") //lottoArray의 0번에 해당하는것에 클래스추가.
$(".ing").text(ingComment[step])
step++;
if(step == 6){
    clearInterval(intervalId) 
    step = 0;
    creating = false; 
    $(".ing").removeClass("visible")
    resultNum();
  }
}

//4. 로또번호 뽑기 버튼 누를때마다 새로운 로또번호 재생성.
function clearNum(){
    $(".selected").removeClass("selected");
}

//5. .result 에 로또결과 나타내기. 
function resultNum(){
  const numbox = document.createElement("div")
  for(let i = 0; i <6; i++){
      const oneNum = document.createElement("div")
      $(oneNum).text(`${lottoArray[i]}`) // lottoArray 배열에 있는 i번숫자 입력.
      
      if(lottoArray[i] < 10){
        $(oneNum).css('backgroundColor','#ff5757')
      }else if(lottoArray[i] < 20){
        $(oneNum).css('backgroundColor','#37948b')
      }else if(lottoArray[i] < 30){
        $(oneNum).css('backgroundColor','#33803b')
      }else if(lottoArray[i] < 40){
        $(oneNum).css('backgroundColor','#ffc94d')
      }else {
        $(oneNum).css('backgroundColor','#ed479a')
      }  
      numbox.appendChild(oneNum)
    }
  $(".result").html(numbox)
  //숫자가 보이는 순간 리셋버튼도 보인다.
  $(".reset").fadeIn();
}

//6. 초기화 버튼 눌렀을때 초기화시키기.
function resetNum(){
  clearNum();
  $(".result").empty();
  $(".reset").hide();
}

function start(){
    numBox();
    $(".ing").removeClass("visible")
}

$(function(){
  start();
  $(".js-btn").click(lottoNum)
  $(".reset").click(resetNum)
})