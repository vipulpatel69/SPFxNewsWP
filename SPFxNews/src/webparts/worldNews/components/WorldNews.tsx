import * as React from 'react';
import styles from './WorldNews.module.scss';
import { IWorldNewsProps } from './IWorldNewsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle  
} from 'office-ui-fabric-react/lib/DocumentCard';
import { HttpClient, HttpClientResponse, IHttpClientOptions } from '@microsoft/sp-http'; 

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

  private getTrendingNews(jsonResponse): void{
    var trendingDocumentss: ITrendingDocument[] = [];
    if(jsonResponse.articles.length>0)
    {           
      for(var i=0;i<this.props.noOfNews;i++){
        trendingDocumentss.push({
          title: jsonResponse.articles[i].title,
          description: jsonResponse.articles[i].description,
          url: jsonResponse.articles[i].url,
          previewImageUrl: jsonResponse.articles[i].urlToImage
        });
      }         
      this.setState({trendingDocumentss});
    }
  }

  public componentDidMount(): void{    
    this._getthirdpartyApi()  
    .then(response => {  
      this.getTrendingNews(response);
    }).catch(e => {
        console.log(e);
    });
  }

  private httpClientOptionsForNews: IHttpClientOptions = {
      headers: new Headers({

      }),
      method: "GET",
      mode: "cors"
  };

  private _getthirdpartyApi(): Promise<any> {  
    return this.props.myhttpclient  
    .get(  
      this.props.apiURL,  
      HttpClient.configurations.v1,
      this.httpClientOptionsForNews  
    )  
    .then((response: HttpClientResponse) => {  
      return response.json();  
    })  
    .then(jsonResponse => {  
      console.log(jsonResponse);  
      return jsonResponse;  
    }) as Promise<any>;  
  } 

  public componentDidUpdate(prevProps: IWorldNewsProps, prevState: IConnectapiState, prevContext: any): void{    
    if (this.props.noOfNews !== prevProps.noOfNews){    
     this._getthirdpartyApi()  
     .then(response => {  
      this.getTrendingNews(response);
     }).catch(e => {
        console.log(e);
    });
    }
  }

  public render(): React.ReactElement<IWorldNewsProps> {         
    const newslist: JSX.Element[]= this.state.trendingDocumentss.map((doc:ITrendingDocument)=>{
    return (        
            <DocumentCard onClickHref={doc.url}>
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
          );
  });
  return ( 
    <div className={ styles.worldNews }>      
      { newslist}
      <div style={{clear: 'both'}}/>
    </div>
  );    
}

  
}
