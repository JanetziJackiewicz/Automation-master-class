@Measurements
Feature: Measurements on Kratify
   As a registered user
   I want to log in
   For see and modify the Measurements 


@smoke
Scenario: User can see the measurement in the list
  Given I am on the login page
  And I accept the cookies
  And I log in as the default user
  And I go to the Body section
  When a measurement is added 
  Then I can see the measurement in the list

@Modified-Measurements
Scenario: The user can modify the measurement in the list
  Given I am on the login page
  And I accept the cookies
  And I log in as the default user
  And I go to the Body section
  When I modify a measurement
  Then I can see the measurement in the list change
