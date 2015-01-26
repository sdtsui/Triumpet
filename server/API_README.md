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