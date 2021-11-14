import { CamelCaseToTitleCasePipe } from './camel-case-to-title-case.pipe';

describe('CamelCaseToTitleCasePipe', () => {
  it('create an instance', () => {
    const pipe = new CamelCaseToTitleCasePipe();
    expect(pipe).toBeTruthy();
  });
});
