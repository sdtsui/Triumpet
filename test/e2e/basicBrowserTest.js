// var protractor = require('protractor');
// var ptor = protractor.getInstance();
// 
// browser.get('http://www.angularjs.org');
// // element(by.model('todoText'))#.sendKeys('write a protractor test');
// // element(by.css('[value="add"]')).click();

// // var todoList = element.all(by.repeater('todo in todos'));
// expect(todoList.count()).toEqual(3);
// expect(todoList.get(2).getText()).toEqual('write a protractor test');

describe('testing /signup', function() {
  var signUpButton = element(by.id('auth-submit'));
  var usersRedirect = element(by.css('a[href$=\'\/signin\'] > div')); 
  var retailersRedirect = element(by.css('a[href$=\'\/retailer\/signin\'] > div'));
  
  describe('page & form elements: ', function(){
    it('should resolve the signup page', function() {
      browser.get('http://localhost:8080/#/signup')
      expect(browser.getTitle())
        .toBe('Triumpet');
      expect(browser.getLocationAbsUrl()) //is actually relative
        .toBe('/signup');  
    });

    it('should have 5 input boxes', function(){
      var inputs = element.all(by.css('form > input'))
      expect(inputs.count()).toBe(5);
    })

    it('should have a redirect button to /signup for users and retailers', function(){
      var allRedirects = element.all(by.css('a[href$=\'\/signin\'] > div'));
      // expect(usersRedirect.count()).toBe(1);
      // expect(retailersRedirect.count()).toBe(1);
      expect(allRedirects.count()).toBe(2);
    })

    xit('should respond to a sign-up request, even if form is incomplete', function(){

    })
  });

  xdescribe('testing redirects : ', function(){

  });


});

//default, click on login as : users, click->retailers

//want to count input elements with type: text 
