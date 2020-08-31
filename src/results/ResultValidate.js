import React, {Fragment} from 'react';
import Alert from "react-bootstrap/Alert";
import ShowShapeMap from "../shapeMap/ShowShapeMap";
import {Permalink} from "../Permalink";
import PrintJson from "../utils/PrintJson";

function ResultValidate(props) {

    const result = props.result
    let msg
    if (result === "") {
        msg = null
    } else
    if (result.error) {
        msg =
            <div><Alert variant="danger">Error: {result.error}</Alert></div>
    } else {
        msg = <div>
            {
                !Array.isArray(result.shapeMap) ? <Alert variant="danger">{result.message}</Alert>
                    :
                <Fragment>
                    { result.errors.length > 0 ?
                        <Alert variant="danger">Partially invalid data: check the details of each node to learn more</Alert> :
                        result.message && <Alert variant="success">{result.message} </Alert>
                    }
                    {result.shapeMap.length === 0 && <Alert variant="info">
                        Validation was successful but no results were obtained, check the if the input data is coherent</Alert>}
                    { props.permalink &&
                    <Fragment>
                        <Permalink url={props.permalink}/>
                        <hr/>
                    </Fragment>
                    }
                    { result.shapeMap && result.shapeMap.length > 0 && <ShowShapeMap
                        shapeMap={result.shapeMap}
                        nodesPrefixMap={result.nodesPrefixMap}
                        shapesPrefixMap={result.shapesPrefixMap}
                    />
                    }
                </Fragment>

            }
            <details><PrintJson json={result} /></details>
        </div>
    }

     return (
         <div>{msg}</div>
     );
}

export default ResultValidate
