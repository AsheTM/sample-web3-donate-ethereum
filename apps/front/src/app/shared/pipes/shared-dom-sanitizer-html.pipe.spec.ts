import { SharedDomSanitizerHtmlPipe } from './shared-dom-sanitizer-html.pipe';

describe('SharedDomSanitizerHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new SharedDomSanitizerHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
