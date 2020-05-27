import * as React from 'react';
import styles from './WorldNews.module.scss';
import { IWorldNewsProps } from './IWorldNewsProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class WorldNews extends React.Component<IWorldNewsProps, {}> {
  public render(): React.ReactElement<IWorldNewsProps> {
    return (
      <div className={ styles.worldNews }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
