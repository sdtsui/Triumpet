(function(){

var url = 'http://localhost:8080';

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

var Item = function(name, category, coordinates, retailerId){
	this.name = name;
	this.category = category;
	this.coordinates = [coordinates];
	this.retailer_id = retailerId;
};

var retailerId = '54cc3185d4603eb9315cbff5';

var item1 = new Item('apple', 'fruit', {x:10,y:10}, retailerId);
var item2 = new Item('apple sauce', 'canned fruit', {x:20, y:20}, retailerId);
var item3 = new Item('apple pie', 'baked goods', {x:30, y:30}, retailerId);
var item4 = new Item('rotten apple bits', 'rotten goodies', {x:40, y:40}, retailerId);

var items = [item1, item2, item3, item4];

})()
