# API Documentation #

## /api/retailers ##
---  Post Request  ---
> Expect username(required, unique, lowercase), password(required), name, description, phoneNumber, address, floorPlan, shelves
> floorPlan expects array of {x:Number, y:Number}
> shelves expects array of {x:Number, y:Number, width: Number, height: Number}

--- Get Request ---
> Return array of all retailers

--- Put Request ---
> Expect retailer's username as a URL params (/api/retailers/:username)
> Update existing data for a specific retailer

--- Delete Request ---
> Expect retailer's username as a URL params (/api/retailers/:username)
> Remove a specific retailer form database (non-reversible)


## /api/items/:retailer ##
> all requests expect retailer's username as a URL params

---  Post Request  ---
> Expect name, category, coordinates
> coordinates expect an array of {x:Number, y:Number}

--- Get Request ---
> Return array of all items from a specific retailer

--- Put Request ---
> Expect item's name as a URL params (/api/retailers/:username/:itemName)
> Update existing data for a specific item

--- Delete Request ---
> Expect item's name as a URL params (/api/retailers/:username/:itemName)
> Remove a specific item


## /api/users ##

--- Post Request (/api/users/signup) ---
> Expect username, password, firstName, lastName, email

--- Post Request (/api/users/signin) ---
> Expect username, password
> return token

--- Put Request ---
> Expect item's name as a URL params (/api/retailers/:username/:itemName)
> Update existing data for a specific item

--- Delete Request ---
> Expect item's name as a URL params (/api/retailers/:username/:itemName)
> Remove a specific item