#Triumpet Server API Documentation #

## /api/retailers ##

POST to */api/retailers/signup*
> Retailer schema inputs: username(required, unique, lowercase), password(required), name, description, phoneNumber, address, floorPlan, and shelves  
> floorPlan schema input:  an array of objects: {x:Number, y:Number}  
> shelves schema input: an array of objects: {x:Number, y:Number, width: Number, height: Number}  
> On success: returns a token

POST to */api/retailers/signin*
> Inputs: username, password  
> On success: returns a token

GET to */api/retailers/*
> Inputs: none  
> On success: returns an array containing all retailers (password excluded)

GET to single retailer, at */api/retailers/:username*
> Inputs: username as a URL parameter  
> On success: Returns a single retailer, with specified username (password excluded)

PUT/DELETE
> Inputs: retailer's username as a URL parameter. ie, */api/retailers/:username*
> On success: Modifies or removes specified retailer

## /api/items/:retailer ##
>Items must be associated with a retailer.
> These requests require a specific retailer in a URL parameter.

POST
> Item schema inputs: name, category, coordinates  
> coordinates are an array of objects: {x:Number, y:Number}

GET
> On success: Returns array of all items from a specific retailer

PUT/DELETE
> Inputs: item's name as a URL parameter */api/retailers/:username/:itemName*  
> On success: Modifies or removes specified item

## /api/users ##

POST to signup */api/users/signup*
> User schema inputs: (all required): username, password, firstName, lastName, email  
> On success: returns a token

POST to signin */api/users/signin*
> Inputs (all required): username, password  
> On success: returns a token

PUT
> Not used

DELETE
> Inputs: username as a URL parameter */api/retailers/:username*  
> On success: Removes a user
