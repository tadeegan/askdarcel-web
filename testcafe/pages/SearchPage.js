import ReactSelector from 'testcafe-react-selectors';

export default class SearchPage {
  constructor() {
    const baseSelector = ReactSelector('ResourcesTable');
    this.resultsCount = baseSelector.find('.results-count');
    this.firstServiceName = baseSelector.find('.entry-organization');
    this.firstServiceDesc = baseSelector.find('.entry-description');
    this.firstResultName = baseSelector.find('.entry-headline');
    this.firstResultAddress = baseSelector.find('.entry-distance');
    this.openHours = baseSelector.find('.entry-hours');
  }
}
