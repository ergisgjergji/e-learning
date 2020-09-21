import React from 'react';
import translate from './../../../i18n/translate';

const Score = ({ total, score, percentage, passed }) => {
    return (
        <>
            <div className="col-12 col-md-8 col-lg-5 mt-4 mr-4 shadow p-0 ml-auto">

            <div className="col-12 border rounded">
                <div className="row">
                    <div className="col-6 text-center border-right font-weight-bold"> {translate('total')}:</div>
                    <div className="col-6 text-center">{total}</div>
                </div>
            </div>

            <div className="col-12 border rounded">
                <div className="row">
                    <div className="col-6 text-center border-right font-weight-bold"> {translate('score')}:</div>
                    <div className="col-6 text-center">
                        {`${score} (${percentage}%)`}
                    </div>
                </div>
            </div>
                                
            <div className="col-12 border rounded">
                <div className="row">
                    <div className="col-6 text-center border-right font-weight-bold"> {translate('result')}:</div>
                    {
                        passed ? 
                            <div className="col-6 text-center text-white bg-success"> {translate('pass')} </div> 
                            : 
                            <div className="col-6 text-center text-white bg-danger"> {translate('fail')} </div>
                    }
                </div>
            </div>

            </div>
                            
            <div className="col-12 col-md-11 mx-auto my-1 p-0 text-right">
                <small >
                    * <i>{translate('minimal-score')}</i>
                </small>
            </div>
        </>
    )
}

export default Score;
