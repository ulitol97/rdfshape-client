import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import API from "../API"
import axios from 'axios'
import Form from "react-bootstrap/Form"
import ResultShapeMapInfo from "../results/ResultShapeMapInfo"
import qs from 'query-string'
import {mkPermalink, params2Form, mkPermalinkLong} from "../Permalink"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import {
    InitialShapeMap,
    mkShapeMapTabs,
    paramsFromStateShapeMap,
    shapeMapParamsFromQueryParams,
    updateStateShapeMap
} from "./ShapeMap"
import ProgressBar from "react-bootstrap/ProgressBar"

function ShapeMapInfo(props) {

    const [shapeMap, setShapeMap] = useState(InitialShapeMap)
    const [result,setResult] = useState(null)
    const [params, setParams] = useState(null)
    const [lastParams, setLastParams] = useState(null)
    const [error,setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [permalink, setPermalink] = useState(null)
    const [progressPercent,setProgressPercent] = useState(0)

    const url = API.shapeMapInfo

    useEffect(() => {
            if (props.location.search) {
                const queryParams = qs.parse(props.location.search)
                if (queryParams.shapeMap){
                    let shapeMapParams = shapeMapParamsFromQueryParams(queryParams)
                    console.warn("EH!", shapeMapParams)
                    setShapeMap(updateStateShapeMap(shapeMapParams,shapeMap) || shapeMap)
                    const params = {...paramsFromStateShapeMap(shapeMap), shapeMap: queryParams.shapeMap}

                    // Update codemirror
                    const codeMirrorElement = document.querySelector('.react-codemirror2').firstChild
                    if (codeMirrorElement && codeMirrorElement.CodeMirror)
                        codeMirrorElement.CodeMirror.setValue(queryParams.shapeMap)


                    setParams(params)
                    setLastParams(params)
                }

                else setError("Could not parse URL data")
            }},
        [props.location.search]
    )

    // Call API on params change
    useEffect( () => {
        if (params){
            if (params.shapeMap) {
                resetState()
                setUpHistory()
                postShapeMapInfo()
            }
            else {
                setError("No ShapeMap provided")
            }
            window.scrollTo(0, 0)
        }
    }, [params])

    async function handleSubmit(event) {
        event.preventDefault()
        setParams(paramsFromStateShapeMap(shapeMap))
        console.info("PARAMS MANUAL: ",paramsFromStateShapeMap(shapeMap))
    }

    function postShapeMapInfo(cb) {
        setLoading(true)
        setProgressPercent(20)
        const formData = params2Form(params)

        axios.post(url,formData).then (response => response.data)
            .then( async data => {
                setError(null)
                setResult(data)
                setProgressPercent(70)
                setPermalink(await mkPermalink(API.shapeMapInfoRoute, params))
                setProgressPercent(80)
                if (cb) cb()
                setProgressPercent(100)
            })
            .catch(function (error) {
                setError(`Error calling server at ${url}: ${error}.\n Try again later`)
            })
            .finally( () => {
                setLoading(false)
                window.scrollTo(0, 0) // Scroll top to results
            })
    }

    function setUpHistory() {
        // Store the last search URL in the browser history to allow going back
        if (params && lastParams && JSON.stringify(params) !== JSON.stringify(lastParams)){
            // eslint-disable-next-line no-restricted-globals
            history.pushState(null, document.title, mkPermalinkLong(API.shapeMapInfoRoute, lastParams))
        }
        // Change current url for shareable links
        // eslint-disable-next-line no-restricted-globals
        history.replaceState(null, document.title ,mkPermalinkLong(API.shapeMapInfoRoute, params))

        setLastParams(params)
    }

    function resetState() {
        setResult(null)
        setParams(null)
        setPermalink(null)
        setError(null)
        setProgressPercent(0)
    }

    return (
        <Container fluid={true}>
            <Row>
                <h1>ShapeMap Information</h1>
            </Row>
            <Row>
                <Col className={"half-col border-right"}>
                    <Form onSubmit={handleSubmit}>
                        { mkShapeMapTabs(shapeMap, setShapeMap, "Input ShapeMap") }
                        <hr/>
                        <Button variant="primary" type="submit"
                                className={"btn-with-icon " + (loading ? "disabled" : "")} disabled={loading}>
                            Info about shape map</Button>
                    </Form>
                </Col>
                { loading || result || error || permalink ?
                    <Col className={"half-col"}>
                        {loading ? <ProgressBar striped animated variant="info" now={progressPercent}/> :
                            error? <Alert variant='danger'>{error}</Alert> :
                                result ?
                                    <ResultShapeMapInfo result={result}
                                                        fromParams={shapeMap.fromParamsShapeMap}
                                                        resetFromParams={
                                                            () =>
                                                                setShapeMap({ ...shapeMap, fromParamsShapeMap: false})
                                                        }
                                                        permalink={permalink}
                                /> : null
                        }
                        {/*{ permalink && !error ? <Permalink url={permalink} />: null }*/}
                    </Col>
                    : <Col className={"half-col"}>
                        <Alert variant='info'>Validation results will appear here</Alert>
                    </Col>
                }
            </Row>
        </Container>
    )
}

export default ShapeMapInfo
