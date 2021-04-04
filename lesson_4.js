// Задание 1
var num_obj = parseInt(prompt('Введите число от 0 до 999!'))

var obj = {
    "units": 0, "tens": 0, "hundreds": 0
 }
 
 function taskOne (num) {
    if (obj > 999 ||  obj < 0){
        console.log('Число меньше "0" или больше "999"!')
    }
    else {
        obj.units = Math.floor(num % 10);
        obj.tens = Math.floor(num / 10 % 10);
        obj.hundreds = Math.floor(num / 100 % 10);
    }
    return obj;
 }
    
 console.log(taskOne(num_obj))


 // Задание 1, варинат 2 в теле "else" //

 var num = prompt('Введите число от 0 до 999!')

var obj = {
    "units": parseInt(num[2]), "tens": parseInt(num[1]), "hundreds": parseInt(num[0])
 }

console.log(obj)


//Задание 2
//Копировал решение из урока 3, поскольку там использовал объект
var trash = {"Apple": 20, "Pineapple": 30, "Cherry": 15, "Melon": 45}

function sum (x){
   var s = 0;
   for (i = 0; i < x.length; i++){
      s += x[i]
   }
   return s
}

function countBasketPrice(purchases) {
    var numsArray = []
    for (var elem in purchases){
      numsArray.push(purchases[elem]) 
    };
    console.log(sum(numsArray))
}

countBasketPrice(trash)