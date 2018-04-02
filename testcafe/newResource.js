import NewResourcePage from './pages/NewResourcePage';

const newResourcePage = new NewResourcePage();

fixture `Add New Resource`
  .page(NewResourcePage.url());

test('Add new resource, basic', async (t) => {
  const newName = 'New Resource Name';
  // TODO: These are all currently required, but should they be?
  const newAddress = {
    address1: '123 Fake St.',
    city: 'San Francisco',
    stateOrProvince: 'CA',
    country: 'United States',
    postalCode: '94110',
  };
  await t.typeText(newResourcePage.name, newName, { replace: true });
  await Promise.all(
    Object.keys(newAddress)
    .map(prop => t.typeText(newResourcePage.address[prop], newAddress[prop], { replace: true })),
  );

  let sawDialog = false;
  function dialogHandler(type, text) {
    sawDialog = true;
    if (!text.includes('Resource successfully created')) {
      throw new Error(`Got unexpected dialog: ${text}`);
    }
  }
  await t.setNativeDialogHandler(dialogHandler)
    .click(newResourcePage.saveButton)
    .setNativeDialogHandler(null)
  ;

  if (!sawDialog) {
    throw new Error('Did not see success dialog');
  }

  throw new Error('Test is unfinished; still need to assert that the View Resource page has the correct info');
});
