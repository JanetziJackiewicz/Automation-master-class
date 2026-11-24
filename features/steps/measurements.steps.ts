import { createBdd } from "playwright-bdd";
import { expect, test } from '../../src/fixtures/index';import { DataTable } from "playwright-bdd";
import user from "../../src/test-data/user.json"
import { MeasurementsPage } from "../../src/pages/Measurements/measurements.page";

export const { Given,  When, Then, Before, After } = createBdd(test);
 
Given('I go to the Body section',async({footer}) => {
  await footer.clickToAcceptModalBodyFooter();
});

When('a measurement is added', async ({measurementsPage}) => {
  await measurementsPage.clickNewMeasurementButton();
  await measurementsPage.Body(user.defaultBody.weight, user.defaultBody.fatpercentage, user.defaultBody.muscule, user.defaultBody.waist);
});

Then('I can see the measurement in the list', async ({measurementsPage}) => {
  const measurementItem = await measurementsPage.getMeasurementRow(String(user.defaultBody.weight));
  await expect(measurementItem).toBeVisible();
});


When('I modify a measurement', async ({measurementsPage}) => {
  await measurementsPage.selectRowRandowsMeasurement();
  await measurementsPage.editWeight();
});

Then('I can see the measurement in the list change', async ({}) => {
  // Step: Then I can see the measurement in the list change
  // From: features\measurements.feature:24:3
});


