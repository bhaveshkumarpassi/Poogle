import React from 'react';
import { Spinner } from 'reactstrap';

export const Loading = () => {
    return(
        <div className="col-12">
            <Spinner style={{ width: '5rem', height: '5rem', marginLeft: '50%', marginRight: '50%'}} color="secondary" />
            <p style={{fontSize: 30, textAlign: 'center'}}>Loading . . .</p>
        </div>
    );
};