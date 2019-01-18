import React from 'react';
import ReactDOM from 'react-dom';

type WindowPortalProps = {
  windowTitle: string;
  className?: string;
};

export default class WindowPortal extends React.PureComponent<WindowPortalProps> {
  private externalWindow: Window | null;
  private container: HTMLElement;

  private windowFeatures =
    'width=1024,height=600,titlebar=0,menubar=0,location=0,personalbar=0,toolbar=0,status=0';

  constructor(props: WindowPortalProps) {
    super(props);

    this.externalWindow = null;
    this.container = document.createElement('div');
    if (this.props.className) {
      this.container.className = this.props.className;
    }
  }

  public copyStyles(sourceDoc: Document, targetDoc: Document) {
    Array.from(sourceDoc.styleSheets).forEach((sheet) => {
      const styleSheet = sheet as CSSStyleSheet;

      if (styleSheet.cssRules) { // for <style> elements
        const newStyleEl = sourceDoc.createElement('style');

        Array.from(styleSheet.cssRules).forEach((cssRule) => {
          newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
        });

        targetDoc.head.appendChild(newStyleEl);
      } else if (styleSheet.href) { // for <link> elements
        const newLinkEl = sourceDoc.createElement('link');

        newLinkEl.rel = 'stylesheet';
        newLinkEl.href = styleSheet.href;
        targetDoc.head.appendChild(newLinkEl);
      }
    });
  }

  public componentDidMount() {
    this.externalWindow = window.open('', '', this.windowFeatures);
    if (this.externalWindow) {
      this.externalWindow.document.title = this.props.windowTitle;
      this.externalWindow.document.body.appendChild(this.container);
      this.copyStyles(document, this.externalWindow.document);
    }
  }

  public componentWillUnmount() {
    if (this.externalWindow) {
      this.externalWindow.close();
    }
  }

  public render() {
    return ReactDOM.createPortal(this.props.children, this.container);
  }
}