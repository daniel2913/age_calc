const form = document.querySelector('#input-form')
const oyear = document.querySelector('#output-year')
const omonth = document.querySelector('#output-month')
const oday = document.querySelector('#output-day')

const iyear = document.querySelector('#input-year')
const imonth = document.querySelector('#input-month')
const iday = document.querySelector('#input-day')

let today = new Date()
today = new Date(today.getFullYear(),today.getMonth(),today.getDate())
let newDate

const DAYS = [31,28,31,30,31,30,31,31,30,31,30,31]

form.addEventListener('submit',(e) => {
	e.preventDefault()
	iyear.className = ""
	imonth.className = ""
	iday.className = ""
	let flag = true
	if (!iyear.value){
		iyear.focus()
		iyear.className = "error"
		flag=false
	}

	if (!imonth.value){
		imonth.focus()
		imonth.className = "error"
		flag=false
	}

	if (!iday.value){
		iday.focus()
		iday.className = "error"
		flag=false
	}
	
	if (!flag) return

	newDate = new Date(
		+iyear.value.padStart(4,'0'),
		+imonth.value.padStart(2,'0')-1,
		+iday.value.padStart(2,'0'),
	)
	let time = today - newDate
	if (time < 0) return false
	time = new Date(time)

	animate(time.getFullYear()-1970,time.getMonth(),time.getDate()-1)
})

const animate = async function(year,month,day){
	const res = 10
	const time = 500
	let dy = year / res
	let dm = month / res
	let dd = day / res
	for (let i=0;i<=res;i++){
		await new Promise((resolve)=>{setTimeout(()=>resolve(true),time/res)})
		oyear.innerHTML = (0 + dy*i)^0
		omonth.innerHTML = (0 + dm*i)^0
		oday.innerHTML = (0 + dd*i)^0
	}
}

const getDays = function(){
	let days = DAYS[Math.max(Math.min(+imonth.value-1,11),0)]
	if (days==28){
		if(+iyear.value%4==0 && (+iyear.value%100!=0 || +iyear.value%400==0)){
			days++
		}
	}
	return days
}

const getDaysAdv = function(year,month){
	let days = DAYS[Math.max(Math.min(month-1,11),0)]
	if (days==28){
		if(year%4==0 && (year%100!=0 || year%400==0)){
			days++
		}
	}
	return days
}

const validateYear = function(e){
	if (iyear.value=="") return
	if (+iyear.value > +today.getFullYear()){
		iyear.value=today.getFullYear()
	}
	if (+iyear.value<1){
		iyear.value=today.getFullYear()
	}
}

const validateMonth = function(e){
	if (imonth.value == "") return
	if (+iyear.value >= +today.getFullYear()){
		if (+imonth.value > +today.getMonth()+1){
			imonth.value=today.getMonth()+1
		}
	}
	if (+imonth.value<1){
		if (+iyear.value>1){
			imonth.value=12
			iyear.value = +iyear.value - 1
		}
		else{
			imonth.value=1
		}
	}
	if (+imonth.value>12){
		if (+iyear.value<+today.getFullYear()){
			imonth.value=1
			iyear.value = +iyear.value + 1
		}
		else{
			imonth.value=12
		}
	}
}

const validateDay = function(e){
	if (iday.value=="") return
	if (+imonth.value >= +today.getMonth()+1 && +iyear.value >= +today.getFullYear()){
		if (+iday.value > +today.getDate()){
			iday.value=today.getDate()
			return
		}
	}
	if (+iday.value < 1){
		if (+imonth.value > 1){
			imonth.value = +imonth.value - 1
			iday.value = getDays()
		}
		else{
			if (+iyear.value > 1){
				iyear.value = +iyear.value - 1
				imonth.value = 12
				iday.value = getDays()
			}
			else{
				iday.value = 1
			}
		}
		return
	}

	if (+iday.value>getDays()){
		if (+imonth.value<12){
			imonth.value = +imonth.value + 1
			iday.value = 1
		}
		else{
			if (+iyear.value>1){
				iyear.value = +iyear.value + 1
				imonth.value = 1
				iday.value = getDays()
			}
			else{
				iday.value = getDays()
			}
		}
	}
}

iyear.setAttribute("oninput","validateYear(event)")
imonth.setAttribute("oninput","validateMonth(event)")
iday.setAttribute("oninput","validateDay(event)")

