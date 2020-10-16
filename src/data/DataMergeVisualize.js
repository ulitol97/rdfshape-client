import React, {useState, useEffect, Fragment} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import API from "../API";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import qs from 'query-string';
import {mkPermalink, mkPermalinkLong, params2Form, Permalink} from "../Permalink";
import {dataParamsFromQueryParams} from "../utils/Utils";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {InitialData, paramsFromStateData, updateStateData, mkDataTabs} from "./Data";
import {convertDot} from "./dotUtils";
import ShowSVG from "../svg/ShowSVG";
import ProgressBar from "react-bootstrap/ProgressBar";
import {ZoomInIcon, ZoomOutIcon} from "react-open-iconic-svg";

function DataMergeVisualize(props) {

    const [data1, setData1] = useState(InitialData);
    const [data2, setData2] = useState(InitialData);
    const [params, setParams] = useState(null);
    const [lastParams, setLastParams] = useState(null);
    const [targetDataFormat] = useState("dot");
    const [error,setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [permalink, setPermalink] = useState(null);
    const [svg, setSVG] = useState(null);
    const [svgZoom,setSvgZoom] = useState(1);
    const [progressPercent,setProgressPercent] = useState(0);

    const url = API.dataConvert

    const minSvgZoom = 0.2
    const maxSvgZoom = 1.9
    const svgZoomStep = 0.1


    useEffect(() => {
        if (props.location.search) {
            const queryParams = qs.parse(props.location.search);
            if (queryParams.compoundData){
                let dataParams = {...dataParamsFromQueryParams(queryParams),
                    targetDataFormat};


                const newData1 = updateStateData(dataParams,data1) || data1;
                const newData2 = updateStateData(dataParams,data2) || data2;
                setData1(newData1);
                setData2(newData2);

                // Update code mirrors
                try {
                    const texts = JSON.parse(queryParams.compoundData)
                    const codemirrors = document.querySelectorAll('.react-codemirror2')
                    for (let i = 0; i < codemirrors.length; i++) {
                        const cm = codemirrors[i].firstChild.CodeMirror
                        if (cm && texts[i]) cm.setValue(texts[i].data)
                    }

                    setParams(queryParams)
                    setLastParams(queryParams)
                }
                catch {
                    setError("Could not parse URL data")
                }
            }
            else {
                setError("Could not parse URL data")
            }
        }},
        [props.location.search]
    );

    useEffect( () => {
        if (params && params.compoundData){
            const parameters = JSON.parse(params.compoundData)
            if (parameters.some( p => p.data !== "")) { // Check if some data was uploaded
                resetState()
                setUpHistory()
                postVisualize()
            }
            else {
                setError("No RDF data provided")
            }
            window.scrollTo(0, 0)
        }
    }, [params])

    function mergeParams(params1,params2) {
        return {"compoundData": JSON.stringify([params1, params2]) };
    }

    function processData(d, targetFormat) {
        convertDot(d.result,'dot','SVG', setLoading, setError, setSVG)
    }


    async function handleSubmit(event) {
        event.preventDefault();
        let params1 = paramsFromStateData(data1);
        let params2 = paramsFromStateData(data2);
        setParams({...mergeParams(params1, params2), targetDataFormat}) // It converts to dot in the server
    }

    function postVisualize(cb) {
        setLoading(true)
        setProgressPercent(15)
        const formData = params2Form(params);
        setProgressPercent(35)
        axios.post(url,formData).then (response => response.data)
            .then(async data => {
                setProgressPercent(70)
                processData(data);
                setPermalink(await mkPermalink(API.dataMergeVisualize, params));
                setProgressPercent(80)
                if (cb) cb()
                setProgressPercent(100)
            })
            .catch(function (error) {
                setError(`Error doing request to ${url}: ${error.message}`)
            })
            .finally( () => {
                setLoading(false)
                window.scrollTo(0, 0)
            });
    }

    function zoomSvg(zoomIn) {
        if (zoomIn){
            const zoom = Math.min(maxSvgZoom, svgZoom + svgZoomStep)
            setSvgZoom(zoom)
        }
        else {
            const zoom = Math.max(minSvgZoom, svgZoom - svgZoomStep)
            setSvgZoom(zoom)
        }
    }

    function setUpHistory() {
        // Store the last search URL in the browser history to allow going back
        if (params && lastParams && JSON.stringify(params) !== JSON.stringify(lastParams)){
            // eslint-disable-next-line no-restricted-globals
            history.pushState(null, document.title, mkPermalinkLong(API.dataMergeVisualize, lastParams))
        }
        // Change current url for shareable links
        // eslint-disable-next-line no-restricted-globals
        history.replaceState(null, document.title ,mkPermalinkLong(API.dataMergeVisualize, params))

        setLastParams(params)
    }

    function resetState() {
        setSVG(null)
        setSvgZoom(1)
        setPermalink(null)
        setError(null)
        setProgressPercent(0)
    }

    return (
       <Container fluid={true}>
        <Row>
            <h1>Merge & visualize RDF data</h1>
        </Row>
        <Row>
            <Col className={"half-col border-right"}>
                <Form onSubmit={handleSubmit}>
                    { mkDataTabs(data1, setData1, "RDF Input 1") }
                    <hr/>
                    { mkDataTabs(data2, setData2, "RDF Input 2") }
                    <hr/>
                    <Button id="submit" variant="primary" type="submit"
                            className={"btn-with-icon " + (loading ? "disabled" : "")} disabled={loading}>
                        Merge & visualize</Button>
                </Form>
            </Col>
          { loading || error || svg ?
              <Col className="half-col visual-column">
                <Fragment>
                    { permalink && !error? <div className={"d-flex"}>
                        <Permalink url={permalink} />
                        <Button onClick={() => zoomSvg(false)} className="btn-zoom" variant="secondary"
                                disabled={svgZoom <= minSvgZoom}>
                            <ZoomOutIcon className="white-icon"/>
                        </Button>
                        <Button onClick={() => zoomSvg(true)} style={{marginLeft: "1px"}} className="btn-zoom" variant="secondary"
                                disabled={svgZoom >= maxSvgZoom}>
                            <ZoomInIcon className="white-icon"/>
                        </Button>
                    </div> : null }

                    {   loading ? <ProgressBar striped animated variant="info" now={progressPercent}/> :
                        error ? <Alert variant='danger'>{error}</Alert> :
                        svg && svg.svg ?
                            <div style={{overflow: "auto", zoom: svgZoom}} className={"width-100 height-100 border"}>
                                <ShowSVG svg={svg.svg}/>
                            </div> : null
                    }
                </Fragment>
              </Col>
              :
              <Col className={"half-col"}>
                  <Alert variant='info'>Merge results will appear here</Alert>
              </Col>
          }
       </Row>
       </Container>
     );
}

export default DataMergeVisualize;