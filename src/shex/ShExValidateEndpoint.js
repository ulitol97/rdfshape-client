import React from 'react';
import Container from 'react-bootstrap/Container';
import DataTabs from "../data/DataTabs"
import ShExTabs from "./ShExTabs"
import ShapeMapTabs from "./ShapeMapTabs"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import API from "../API";
import axios from "axios";
import ResultValidate from "../results/ResultValidate";
import {
    endpointParamsFromQueryParams,
    shExParamsFromQueryParams,
    shapeMapParamsFromQueryParams,
    paramsFromStateEndpoint,
    paramsFromStateShapeMap,
    paramsFromStateShEx} from "../Utils";
import {mkPermalink, params2Form, Permalink} from "../Permalink";
import Pace from "react-pace-progress";
import qs from "query-string";
import EndpointInput from "../endpoint/EndpointInput";

const url = API.schemaValidate ;

class ShExValidateEndpoint extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            result: '',
            permalink: null,
            loading: false,

            endpoint: '',

            shExTextArea: "",
            shExFormat: API.defaultShExFormat,
            shExUrl: "",
            shExFile: null,
            shExActiveTab: API.defaultTab,

            shapeMapTextArea: '',
            shapeMapFormat: API.defaultShapeMapFormat,
            shapeMapUrl: "",
            shapeMapFile: null,
            shapeMapActiveTab: API.defaultTab
        } ;

      this.handleEndpointChange = this.handleEndpointChange.bind(this);

      this.handleShExTabChange = this.handleShExTabChange.bind(this);
      this.handleShExFormatChange = this.handleShExFormatChange.bind(this);
      this.handleShExByTextChange = this.handleShExByTextChange.bind(this);
      this.handleShExUrlChange = this.handleShExUrlChange.bind(this);
      this.handleShExFileUpload = this.handleShExFileUpload.bind(this);

      this.handleShapeMapTabChange = this.handleShapeMapTabChange.bind(this);
      this.handleShapeMapFormatChange = this.handleShapeMapFormatChange.bind(this);
      this.handleShapeMapByTextChange = this.handleShapeMapByTextChange.bind(this);
      this.handleShapeMapUrlChange = this.handleShapeMapUrlChange.bind(this);
      this.handleShapeMapFileUpload = this.handleShapeMapFileUpload.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);
      this.postValidate = this.postValidate.bind(this);
      this.processResult = this.processResult.bind(this);
      this.updateStateValidate = this.updateStateValidate.bind(this);
      this.updateStateEndpoint = this.updateStateEndpoint.bind(this);
      this.updateStateShEx = this.updateStateShEx.bind(this);
      this.updateStateShapeMap = this.updateStateShapeMap.bind(this);
    }

    handleEndpointChange(value) { this.setState({endpoint: value}); }

    handleShExTabChange(value) { this.setState({shExActiveTab: value}); }
    handleShExFormatChange(value) {  this.setState({shExFormat: value}); }
    handleShExByTextChange(value) { this.setState({shExTextArea: value}); }
    handleShExUrlChange(value) { this.setState({shExUrl: value}); }
    handleShExFileUpload(value) { this.setState({shExFile: value}); }

    handleShapeMapTabChange(value) { this.setState({shapeMapActiveTab: value}); }
    handleShapeMapFormatChange(value) {  this.setState({shapeMapFormat: value}); }
    handleShapeMapByTextChange(value) { this.setState({shapeMapTextArea: value}); }
    handleShapeMapUrlChange(value) { this.setState({shapeMapUrl: value}); }
    handleShapeMapFileUpload(value) { this.setState({shapeMapFile: value}); }

    componentDidMount() {
        console.log("Component Did mount - dataConvert");
        if (this.props.location.search) {
            const queryParams = qs.parse(this.props.location.search);
            console.log("Parameters: " + JSON.stringify(queryParams));
            let paramsEndpoint = endpointParamsFromQueryParams(queryParams);
            let paramsShEx = shExParamsFromQueryParams(queryParams);
            let paramsShapeMap = shapeMapParamsFromQueryParams(queryParams);
            let params = {...paramsEndpoint,...paramsShEx,...paramsShapeMap}
            const formData = params2Form(params);
            this.postValidate(url, formData, () => this.updateStateValidate(params))
        }
    }

    updateStateValidate(params) {
      this.updateStateEndpoint(params)
      this.updateStateShEx(params)
      this.updateStateShapeMap(params)
    }

    updateStateEndpoint(params) {
        if (params['endpoint']) { this.setState({endpoint: params['endpoint']}) }
    }

    updateStateShEx(params) {
        if (params['shEx']) {
            this.setState({shExActiveTab: API.byTextTab})
            this.setState({shExTextArea: params['shEx']})
        }
        if (params['shExFormat']) this.setState({shExFormat: params['shExFormat']})
        if (params['shExUrl']) {
            this.setState({shExActiveTab: API.byUrlTab})
            this.setState({shExUrl: params['shExUrl']})
        }
        if (params['shExFile']) {
            this.setState({shExActiveTab: API.byFileTab})
            this.setState({shExFile: params['shExFile']})
        }
    }

    updateStateShapeMap(params) {
        if (params['shapeMap']) {
            this.setState({shapeMapActiveTab: API.byTextTab})
            this.setState({shapeMapTextArea: params['shapeMap']})
        }
        if (params['shapeMapFormat']) this.setState({shapeMapFormat: params['shapeMapFormat']})
        if (params['shapeMapUrl']) {
            this.setState({shapeMapActiveTab: API.byUrlTab})
            this.setState({shapeMapUrl: params['shapeMapUrl']})
        }
        if (params['shapeMapFile']) {
            this.setState({shapeMapActiveTab: API.byFileTab})
            this.setState({shapeMapFile: params['shapeMapFile']})
        }
    }

    handleSubmit(event) {
        let paramsEndpoint = paramsFromStateEndpoint(this.state);
        let paramsShEx = paramsFromStateShEx(this.state);
        let paramsShapeMap = paramsFromStateShapeMap(this.state);
        let params = {...paramsEndpoint,...paramsShEx,...paramsShapeMap}
        params['schemaEngine']='ShEx'
        params['triggerMode']='shapeMap'
        let formData = params2Form(params);
        let permalink = mkPermalink(API.shExValidateRoute, params);
        this.setState({loading:true});
        this.setState({permalink: permalink});
        this.postValidate(url,formData)
        event.preventDefault();
    }

    processResult(data) {
        this.setState({ result: data, });
    }

    postValidate(url, formData, cb) {
        axios.post(url,formData).then (response => response.data)
            .then((data) => {
                this.setState({loading:false});
                this.processResult(data)
                if (cb) cb()
            })
            .catch(function (error) {
//                this.setState({loading:false});
//                this.setState({error:error});
                console.log('Error doing server request')
                console.log(error);
            });
    }


    render() {
        return (
            <Container fluid={true}>
                <h1>ShEx: Validate RDF data</h1>
                <Form onSubmit={this.handleSubmit}>
                    {this.state.isLoading ? <Pace color="#27ae60"/> :
                        this.state.result ?
                            <ResultValidate result={this.state.result} /> : null
                    }
                    { this.state.permalink &&  <Permalink url={this.state.permalink} /> }
                    <EndpointInput value={this.state.value}
                                   onChange={this.handleEndpointChange} />
                    <ShExTabs activeTab={this.state.shExActiveTab}
                              handleTabChange={this.handleShExTabChange}

                              textAreaValue={this.state.shExTextArea}
                              handleByTextChange={this.handleShExByTextChange}

                              dataUrl={this.state.shExUrl}
                              handleDataUrlChange={this.handleShExUrlChange}

                              handleFileUpload={this.handleShExFileUpload}

                              dataFormat={this.state.shExFormat}
                              handleDataFormatChange={this.handleShExFormatChange}
                    />
                    <ShapeMapTabs activeTab={this.state.shapeMapActiveTab}
                              handleTabChange={this.handleShapeMapTabChange}

                              textAreaValue={this.state.shapeMapTextArea}
                              handleByTextChange={this.handleShapeMapByTextChange}

                              dataUrl={this.state.shapeMapUrl}
                              handleDataUrlChange={this.handleShapeMapUrlChange}

                              handleFileUpload={this.handleShapeMapFileUpload}

                              dataFormat={this.state.shapeMapFormat}
                              handleDataFormatChange={this.handleShapeMapFormatChange}
                    />
                    <Button variant="primary" type="submit">Validate</Button>
                </Form>
            </Container>
        );
    }
}

export default ShExValidateEndpoint;