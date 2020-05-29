import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';

import * as strings from 'WorldNewsWebPartStrings';
import WorldNews from './components/WorldNews';
import { IWorldNewsProps } from './components/IWorldNewsProps';

export interface IWorldNewsWebPartProps {
  description: string;
  apiURL: string;
  noOfNews: number;
}

export default class WorldNewsWebPart extends BaseClientSideWebPart<IWorldNewsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IWorldNewsProps > = React.createElement(
      WorldNews,
      {
        description: this.properties.description,
        noOfNews: this.properties.noOfNews,
        apiURL: this.properties.apiURL,
        myhttpclient: this.context.httpClient
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription            
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('apiURL',{
                  label: "News API URL"
                }),
                PropertyPaneSlider('noOfNews',{
                  label:"How many to show",
                  min: 2,
                  max: 10,
                  value: 2,
                  showValue: true,
                  step: 2
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
