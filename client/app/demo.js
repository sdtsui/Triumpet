var demoRetailer = {
	"username"    : "abcstore1",
	"password"    : "abcstore1", 
	"description" : "Small Grocery Shop",
	"name"        : "ABC Store", 
	"phoneNumber" : "415-765-4321", 
	"address"     : "123 4th St, Oakland, CA 94321",
  "floorPlan"   : [
									  {"x" : 0  , "y" : 0 },
									  {"x" : 30 , "y" : 0 }, 	
									  {"x" : 30 , "y" : 20}, 	
									  {"x" : 0  , "y" : 20} 
									],
	"shelves"     : [
										{ 	"x" : 0 , 	"y" : 0 , 	"width" : 2 , 	"height" : 15}, 	
										{ 	"x" : 2 , 	"y" : 0 , 	"width" : 26, 	"height" : 2 }, 	
										{ 	"x" : 28,   "y" : 0 , 	"width" : 2 , 	"height" : 15}, 	
										{ 	"x" : 8 ,   "y" : 5 , 	"width" : 2 , 	"height" : 8 }, 	
										{ 	"x" : 10,   "y" : 5 , 	"width" : 2 , 	"height" : 8 }, 	
										{ 	"x" : 4 , 	"y" : 18, 	"width" : 22, 	"height" : 2 }, 
										{ 	"x" : 19, 	"y" : 5 , 	"width" : 2 , 	"height" : 8 },
										{ 	"x" : 21, 	"y" : 5 , 	"width" : 2 , 	"height" : 8 } 
									]
};

$.ajax({
	url:'http://localhost:8080/api/retailers/abcstore1',
	type:'DELETE'
})

$.ajax({
	url:'http://localhost:8080/api/retailers/signup',
	type:'POST',
	data:demoRetailer
})