import React, { ReactNode } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { ReadiumNGNavControl } from './ng-nav-control';
import { ReadiumNGView } from './ng-view';
import { ReadiumNGViewSetting } from './ng-view-setting';

import { Navigator, Rendition } from 'readium-ng';

export interface IReadiumNGViewerStates {
  rendition: Rendition | null;
  navigator: Navigator | null;
}

export class ReadiumNGViewer extends React.Component<{}, IReadiumNGViewerStates> {

  constructor(props: {}) {
    super(props);
    this.state = { rendition: null, navigator: null };
    this.renditionUpdated = this.renditionUpdated.bind(this);
  }

  public renditionUpdated(rend: Rendition): void {
    this.setState({ rendition: rend, navigator: new Navigator(rend) });
  }

  public render(): ReactNode {
    return (
      <MuiThemeProvider>
        <div>
          <ReadiumNGView
            viewportWidth={ 600 } viewportHeight={ 800 } pageWidth={ 400 } pageHeight={ 800 }
            enableScroll={ true } viewAsVertical={ false }
            onRenditionCreated={ this.renditionUpdated }/>
          <ReadiumNGNavControl navigator={ this.state.navigator }/>
          <ReadiumNGViewSetting
            rendition={ this.state.rendition }/>
        </div>
      </MuiThemeProvider>
    );
  }

}