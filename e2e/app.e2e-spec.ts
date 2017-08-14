import { RecepieBookPage } from './app.po';

describe('recepie-book App', () => {
  let page: RecepieBookPage;

  beforeEach(() => {
    page = new RecepieBookPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
