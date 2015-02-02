describe('testing /signup', function() {
  var signUpButton = element(by.id('auth-submit'));
  var usersRedirect = element(by.css('a[href$=\'\/signin\'] > div')); 
  var retailersRedirect = element(by.css('a[href$=\'\/retailer\/signin\'] > div'));
  var inputs = element.all(by.css('form > input'))
  var messages = element(by.css('tp-sign-up > div'));

  describe('page & form elements: ', function(){
    it('should resolve the signup page', function() {
      browser.get('http://localhost:8080/#/signup')
      expect(browser.getTitle())
        .toBe('Triumpet');
      expect(browser.getLocationAbsUrl()) //is actually relative
        .toBe('/signup');  
    });

    it('should default to no messages from message model :', function(){
      expect(messages.getAttribute('value')).toBe(null);
    });

    it('should have 5 input boxes', function(){
      expect(inputs.count()).toBe(5);
    });

    it('should have a redirect button to /signup for users and retailers', function(){
      var allRedirects = element.all(by.css('a[href$=\'\/signin\'] > div'));
      expect(allRedirects.count()).toBe(2);
    });

    it('should allow the user to enter text into forms', function(){
      var firstEl = inputs.first();
      var firstText = 'omfgThisismyusernameomfgomfgomfg';
      var secondEl = inputs.get(2);
      var secondText = 'omfgThisisNAMEomfgomfgomfgSuchExcitement1!!1';
      firstEl.sendKeys(firstText);
      secondEl.sendKeys(secondText);

      expect(firstEl.getAttribute('value')).toBe(firstText);
      expect(secondEl.getAttribute('value')).toBe(secondText);
    });

    it('should respond to a sign-up request, even if form is incomplete', function(){
      signUpButton.click();

      expect(messages.getAttribute('value')).not.toBe('');
    });
  });

  describe('testing redirects : ', function(){
    it('should redirect to /signin when \'users\' button clicked', function(){
      usersRedirect.click();
      expect(browser.getLocationAbsUrl())
      .toBe('/signin');
    });

    it('should redirect to /retailers/signin when \'Retailers\' button clicked', function(){
      retailersRedirect.click();
      expect(browser.getLocationAbsUrl())
      .toBe('/retailer/signin');
    });

  });
});
