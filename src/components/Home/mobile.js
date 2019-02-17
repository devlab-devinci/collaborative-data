import React, { Component } from "react";
import "./Mobile.scss";

class Mobile extends Component {
    render() {
        return (
            <div className="offer">
                <div className="offer__thumbnail">
                    <img src={require("../../images/card.svg")} alt="" className="offer__thumbnail__img" />
                </div>
                <div className="offer__content">
                <div className="offer__content__title">{this.props.offer.title}</div>
                {this.props.offer.description &&
                    <div className="offer__content__excerpt">{this.props.offer.description}</div>
                }
                {this.props.offer.price &&
                    <div className="offer__content__excerpt">Prix : {this.props.offer.price} €</div>
                }
                {this.props.offer.promo &&
                    <div className="offer__content__excerpt">Code promotionnel :{this.props.offer.promo}</div>
                }
                {this.props.offer.date_start &&
                    <div className="offer__content__excerpt">Début : {this.props.offer.date_start}</div>
                }
                {this.props.offer.date_end &&
                    <div className="offer__content__excerpt">Fin : {this.props.offer.date_end}</div>
                }
                {this.props.offer.operator &&
                    <div className="offer__content__excerpt">Opérateur : {this.props.offer.operator}</div>
                }
                {this.props.offer.data &&
                    <div className="offer__content__excerpt">Data : {this.props.offer.data} Go</div>
                }
                {this.props.offer.commitment && this.props.offer.commitment === "0" ?
                    <div className="offer__content__excerpt">Sans engagement</div>
                    :
                    <div className="offer__content__excerpt">Engagement : {this.props.offer.commitment} mois</div>
                }
                {this.props.offer.phone && this.props.offer.phone=== "true" ?
                    <div className="offer__content__excerpt">Avec téléphone</div>
                    :
                    <div className="offer__content__excerpt">Sans téléphone</div>
                }
                {this.props.offer.calls&& this.props.offer.calls === "0" ?
                    <div className="offer__content__excerpt">Appels illimités</div>
                    :
                    <div className="offer__content__excerpt">Appels : {this.props.offer.calls} mois</div>
                }
                {this.props.offer.foreign && this.props.offer.foreign === "true" ?
                    <div className="offer__content__excerpt">Appels à l'étranger</div>
                    :
                    <div className="offer__content__excerpt">Sans appels à l'étranger</div>
                }
                </div>
                {this.props.offer.link &&
                    <div className="offer__more">
                        <a href={this.props.offer.link} className="offer__more__link" target="_blank" rel="noopener noreferrer"><i className="fas fa-plus"></i></a>
                    </div>
                }
            </div>

            // <Card>
            //     <Card.Img variant="top" src={require("../../images/card.svg")} />
            //     <Card.Body>
            //         {this.props.offer.link && this.props.offer.title
            //             ?
            //             <Card.Title>
            //                 <a href={this.props.offer.link} target="_blank" rel="noopener noreferrer">
            //                     {this.props.offer.title}
            //                 </a>
            //             </Card.Title>
            //             :
            //             <Card.Title>
            //                 {this.props.offer.title}
            //             </Card.Title>
            //         }
            //
            //         {this.props.offer.description &&
            //             <Card.Text>
            //                 {this.props.offer.description}
            //             </Card.Text>
            //         }
            //         {this.props.offer.price &&
            //             <Card.Text className="mb-0">
            //                 Prix : {this.props.offer.price}
            //             </Card.Text>
            //         }
            //         {this.props.offer.promo &&
            //             <Card.Text className="mb-0">
            //                 Code promotionnel : {this.props.offer.promo}
            //             </Card.Text>
            //         }
            //         {this.props.offer.date_start &&
            //         <Card.Text className="mb-0">
            //             Date de début : {this.props.offer.date_start}
            //         </Card.Text>
            //         }
            //         {this.props.offer.date_end &&
            //         <Card.Text className="mb-0">
            //             Date de fin  : {this.props.offer.date_end}
            //         </Card.Text>
            //         }
            //
            //         {this.props.offer.operator &&
            //             <Card.Text className="mb-0">
            //                 Opérateur : {this.props.offer.operator}
            //             </Card.Text>
            //         }
            //         {this.props.offer.data &&
            //           <Card.Text className="mb-0">
            //                 Data : {this.props.offer.data} Go
            //           </Card.Text>
            //         }
            //         {this.props.offer.commitment && this.props.offer.commitment === "0"
            //             ?
            //             <Card.Text className="mb-0">
            //                  Sans engagement
            //             </Card.Text>
            //             :
            //             <Card.Text className="mb-0">
            //                 Engagement : {this.props.offer.commitment} mois
            //             </Card.Text>
            //         }
            //         {this.props.offer.phone && this.props.offer.phone === "true"
            //             ?
            //             <Card.Text className="mb-0">
            //                Avec téléphone
            //             </Card.Text>
            //             :
            //             <Card.Text className="mb-0">
            //                 Sans téléphone
            //             </Card.Text>
            //         }
            //         {this.props.offer.calls && this.props.offer.calls === "0"
            //             ?
            //             <Card.Text className="mb-0">
            //                 Appels : Illimités
            //             </Card.Text>
            //             :
            //             <Card.Text className="mb-0">
            //                 Appels : {this.props.offer.calls} heures
            //             </Card.Text>
            //         }
            //         {this.props.offer.foreign && this.props.offer.foreign === "true"
            //             ?
            //             <Card.Text className="mb-0">
            //                 Avec appels à l'étranger
            //             </Card.Text>
            //             :
            //             <Card.Text className="mb-0">
            //                 Sans appels à l'étranger
            //             </Card.Text>
            //         }
            //     </Card.Body>
            // </Card>
        )
    }
}

export default Mobile;
