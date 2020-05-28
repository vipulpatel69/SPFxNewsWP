import * as React from 'react';
import styles from './WorldNews.module.scss';
import { IWorldNewsProps } from './IWorldNewsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle  
} from 'office-ui-fabric-react/lib/DocumentCard';

export interface ITrendingDocument{
  title: string;
  description: string;
  url: string;
  previewImageUrl: string;
}

export interface IConnectapiState{
  trendingDocumentss: ITrendingDocument[];
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

export default class WorldNews extends React.Component<IWorldNewsProps, IConnectapiState> {

  constructor(props: IWorldNewsProps, state: IConnectapiState){
    super(props);
    this.state ={
      trendingDocumentss: [] as ITrendingDocument[],
      title: null,
      description: null,
      url: null,
      urlToImage: null
    };
  }

  private getTrendingNews(_URL: string): void{
    fetch(
      _URL,
      {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
              'accept': 'application/json'
          }
      }
      ).then(response => {
          return response.json();
      }).then(json => {          
          var trendingDocumentss: ITrendingDocument[] = [];
          if(json.articles.length>0)
          {           
            for(var i=0;i<this.props.noOfNews;i++){
              trendingDocumentss.push({
                title: json.articles[i].title,
                description: json.articles[i].description,
                url: json.articles[i].url,
                previewImageUrl: json.articles[i].urlToImage
              });
            };         
            this.setState({trendingDocumentss});
          }
      }).catch(e => {
          console.log(e);
      });
  }

  public componentDidMount(): void{
    this.getTrendingNews(this.props.apiURL);
  }

  public componentDidUpdate(prevProps: IWorldNewsProps, prevState: IConnectapiState, prevContext: any): void{
    if (this.props.noOfNews !== prevProps.noOfNews){
      this.getTrendingNews(this.props.apiURL);
    }
  }

  public render(): React.ReactElement<IWorldNewsProps> {         
    const newslist: JSX.Element[]= this.state.trendingDocumentss.map((doc:ITrendingDocument)=>{
    return <DocumentCard onClickHref={doc.url}>
    <DocumentCardPreview previewImages={[
          {
            previewImageSrc: doc.previewImageUrl,
            width: 318,
            height: 196,
            accentColor: '#ce4b1f'
          }
        ]} />
    <DocumentCardTitle title={doc.title} />
    <DocumentCardTitle title={doc.description} shouldTruncate showAsSecondaryTitle/>    
  </DocumentCard>
  })
  return ( 
    <div className={ styles.worldNews }>
      { newslist}
<div style={{clear: 'both'}}/>
    </div>
  );    
}

  
}
