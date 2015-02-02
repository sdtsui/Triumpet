[![Stories in Ready](https://badge.waffle.io/jollyphantom/triumpet.png?label=ready&title=Ready)](https://waffle.io/jollyphantom/triumpet)

# <img src='./client/assets/Triumpet-logo.png'></img>
<a href='http://triumpet.herokuapp.com/project'>Visit Project Page</a>
<span> | </spam>
<a href='http://triumpet.herokuapp.com'>Visit Demo Page</a>
<br>
> Triumpet helps shoppers find items. Search for objects that you are interested in finding nearby and Triumpet will show you where it is. You will no longer have to ask what aisle the mayonnaise is on!

## Usage

###Map Editor (for retailers)###
> Log in from the retailer [sign-in page](http://triumpet.herokuapp.com/#/retailer/signin)  
```username: abcstore1```  
```password: abcstore1```  
>Click to outline your map's verticies, place shelves, and place items.
>When done, click "update".  
>If you make a mistake, prevent saving by clicking on the next tab (eg, "Shelves"), and returning to "Floor Plan".  
![alt text](http://i.gyazo.com/bc22b16d8b61878b49e10727c9fda362.gif "Retailer Map Edit Example")
###Store Search (for users)###
>Load the [frontpage](http://triumpet.herokuapp.com/).  
>Search for a store.  
>Search for an item.  
![alt text](http://i.gyazo.com/24baf491e61dc381f281212a1effe279.gif "Map View Example")

## Development

### Installing Dependencies
>From within the root directory:

```sh
npm install
mongod
gulp serve
```
### Testing
```sh
npm install
gulp serve
mongod
webdriver-manager start
gulp test
```
### Roadmap

View the project roadmap [here](https://github.com/JollyPhantom/Triumpet/issues)

### Contributing

See [CONTRIBUTING.md](https://github.com/JollyPhantom/Triumpet/blob/master/CONTRIBUTING.md) for contribution guidelines.

### Supplemental Documentation

[Triumpet Server API](https://github.com/JollyPhantom/Triumpet/blob/master/server/API_README.md)  
[Triumpet Client API](https://github.com/JollyPhantom/Triumpet/blob/master/client/CLIENT_README.MD)

## Dev Team
- [Jacky Chan](https://github.com/chikeichan)
- [Devin Otway](https://github.com/TroutZen)
- [Daniel Tsui](https://github.com/sdtsui)
