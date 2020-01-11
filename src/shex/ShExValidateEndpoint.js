import React, {Fragment, useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import DataTabs from "../data/DataTabs"
import ShExTabs from "./ShExTabs"
import ShapeMapTabs from "../shapeMap/ShapeMapTabs"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import API from "../API";
import axios from "axios";
import ResultValidate from "../results/ResultValidate";
import {
    dataParamsFromQueryParams,
    paramsFromStateEndpoint
} from "../utils/Utils";
import {mkPermalink, params2Form, Permalink} from "../Permalink";
import Pace from "react-pace-progress";
import qs from "query-string";
import EndpointInput from "../endpoint/EndpointInput";
import {InitialShEx, mkShExTabs, paramsFromStateShEx, shExParamsFromQueryParams, updateStateShEx} from "./ShEx";
import {
    InitialShapeMap, mkShapeMapTabs,
    paramsFromStateShapeMap,
    shapeMapParamsFromQueryParams,
    updateStateShapeMap
} from "../shapeMap/ShapeMap";
import {endpointParamsFromQueryParams} from "../endpoint/Endpoint";
import {paramsFromStateData, updateStateData} from "../data/Data";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

const url = API.schemaValidate ;

function ShExValidateEndpoint(props) {
    const [result, setResult] = useState('');
    const [permalink, setPermalink] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [endpoint, setEndpoint] = useState('');
    const [shex, setShEx] = useState(InitialShEx);
    const [shapeMap, setShapeMap] = useState(InitialShapeMap);

    function handleEndpointChange(value) {
        setEndpoint(value);
    }

    useEffect(() => {
            if (props.location.search) {
                const queryParams = qs.parse(props.location.search);
                console.log("Parameters: " + JSON.stringify(queryParams));
                let paramsShEx = shExParamsFromQueryParams(queryParams);
                let paramsShapeMap = shapeMapParamsFromQueryParams(queryParams);
                let paramsEndpoint = {};
                if (queryParams.endpoint) paramsEndpoint["endpoint"] = queryParams.endpoint;
                let params = {...paramsShEx, ...paramsShapeMap, ...paramsEndpoint};
                console.log(`Params: ${JSON.stringify(params)}`);
                const formData = params2Form(params);
                postValidate(url, formData, () => updateStateValidate(params))
            }
        },
        [
            props.location.search,
//            data.codeMirror,
//            shex.codeMirror,
//            shapeMap.codeMirror
        ]
    );

    function updateStateValidate(params) {

        const newShEx = updateStateShEx(params,shex) || shex;
        console.log(`updateStateValidate: newShEx: ${JSON.stringify(newShEx)}`);
        setShEx(newShEx);

        const newShapeMap = updateStateShapeMap(params,shapeMap) || shapeMap;
        console.log(`updateStateValidate: newShapeMap: ${JSON.stringify(newShapeMap)}`);
        setShapeMap(newShapeMap);

        if (params['endpoint']) {
            setEndpoint(params['endpoint'])
        }

    }

    function handleSubmit(event) {
        let paramsShEx = paramsFromStateShEx(shex);
        let paramsShapeMap = paramsFromStateShapeMap(shapeMap);

        let paramsEndpoint = {};
        if (endpoint !== '') {
            paramsEndpoint['endpoint'] = endpoint;
        }
        let params = {...paramsEndpoint, ...paramsShEx, ...paramsShapeMap};
        params['schemaEngine'] = 'ShEx';
        params['triggerMode'] = 'shapeMap';
        console.log(`ShExValidateEndpoint. Post params = ${JSON.stringify(params)}`);
        let permalink = mkPermalink(API.shExValidateEndpointRoute, params);
        setLoading(true);
        setPermalink(permalink);
        let formData = params2Form(params);
        postValidate(url, formData);
        event.preventDefault();
    }

    function processResult(data) {
        setResult(data);
    }

    function postValidate(url, formData, cb) {
        axios.post(url, formData).then(response => response.data)
            .then((data) => {
                setLoading(false);
                processResult(data);
                if (cb) cb()
            })
            .catch(function (error) {
                setLoading(false);
                setError(error.message);
                console.log('Error doing server request');
                console.log(error);
            });
    }

    return (
            <Container fluid={true}>
                <h1>ShEx: Validate RDF data from Endpoint</h1>
                {loading || result || permalink || error ?
                    <Fragment>
                        <Row>
                            <Col>
                                {loading ? <Pace color="#27ae60"/> :
                                    error ? <Alert variant="danger">{error}</Alert> :
                                        result ?
                                            <ResultValidate result={result}/> : null}
                                {permalink && <Permalink url={permalink}/>}
                            </Col>
                        </Row>
                    </Fragment>
                    : null
                }
                <Form onSubmit={handleSubmit}>
                    <Row>
                    <EndpointInput value={endpoint}
                                   handleOnChange={handleEndpointChange} />
                    </Row>
                    <Row>
                        <Col>
                        { mkShExTabs(shex,setShEx) }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            { mkShapeMapTabs(shapeMap,setShapeMap) }
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit">Validate from Endpoint</Button>
                </Form>
            </Container>
        );
}

export default ShExValidateEndpoint;
