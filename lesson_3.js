//Задание 1

var num = 0
while (num != 101) {
    console.log(num)
    num++
}

//Задание 2,3

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

//Задание 4

for (var count = 0; count <= 9; count++) 
	console.log(count);


//Задание 5

const letter = "x";
var pyram = ""
for (var i = 0; i <= 20; i++){
    pyram = pyram + letter
    console.log(pyram);
}
