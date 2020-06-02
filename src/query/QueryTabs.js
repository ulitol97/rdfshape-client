import React from 'react';
import InputTabs from "../components/InputTabs";
import PropTypes from "prop-types";
import QueryForm from "./QueryForm";

function QueryTabs(props) {

    const queryForm = <QueryForm // id="textAreaSpqarql"
                                 onChange={props.handleByTextChange}
                                 value={props.textAreaValue}
                                 setCodeMirror={props.setCodeMirror}
                                 fromParams={props.fromParams}
                                 resetFromParams={props.resetFromParams}
                                 value={props.textAreaValue}
    />;

    return (
            <div>
                <InputTabs name="SPARQL"
                           activeTab={props.activeTab}
                           handleTabChange={props.handleTabChange}

                           byTextName="Input Query"
                           textAreaValue={props.textAreaValue}
                           handleByTextChange={props.handleByTextChange}
                           byTextPlaceholder="SELECT..."
                           inputForm={queryForm}

                           byUrlName="URL query"
                           urlValue={props.urlValue}
                           handleUrlChange={props.handleUrlChange}
                           byUrlPlaceholder="http://..."

                           byFileName="Query file"
                           handleFileUpload={props.handleFileUpload}

                />
            </div>
        );
}

QueryTabs.propTypes = {
    activeTab: PropTypes.string,
    textAreaValue: PropTypes.string,
    handleByTextChange: PropTypes.func.isRequired,
    urlValue: PropTypes.string,
    handleDataUrlChange: PropTypes.func.isRequired,
    handleFileUpload: PropTypes.func.isRequired,

    setCodeMirror:PropTypes.func.isRequired,

    /** Flag to signal if values come from Params */
    fromParams: PropTypes.bool.isRequired,

    /** Function to reset value of fromParams */
    resetFromParams: PropTypes.func.isRequired
};

QueryTabs.defaultProps = {
    textAreaValue: '',
    urlValue: '',
    activeTab: 'ByText'
};

export default QueryTabs;
