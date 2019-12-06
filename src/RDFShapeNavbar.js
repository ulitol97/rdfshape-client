import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import API from './API.js'


class RDFShapeNavbar extends React.Component {

    render() {
        return (
            <Navbar bg="primary" expand="md" filled="true" variant="dark">
                <Navbar.Brand href="/">RDFShape</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Data" id="basic-nav-dropdown">
                            <NavDropdown.Item href={API.dataInfoRoute}>Info</NavDropdown.Item>
                            <NavDropdown.Item href={API.dataConvertRoute}>Convert</NavDropdown.Item>
                            <NavDropdown.Item href={API.dataVisualizeRoute}>Visualize (Graphviz)</NavDropdown.Item>
                            <NavDropdown.Item href={API.cytoVisualizeRoute}>Visualize (Cytoscape)</NavDropdown.Item>
                            <NavDropdown.Item href={API.dataQueryRoute}>Query</NavDropdown.Item>
                            <NavDropdown.Item href={API.dataExtractRoute}>Extract ShEx</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Endpoint" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/endpointInfo">Endpoint Info</NavDropdown.Item>
                            <NavDropdown.Item href="/endpointQuery">Query</NavDropdown.Item>
                            <NavDropdown.Item href="/endpointExtract">Extract ShEx</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="ShEx" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/shexValidate">Validate data with ShEx</NavDropdown.Item>
                            <NavDropdown.Item href="/shexValidateEndpoint">Validate endpoint data with ShEx</NavDropdown.Item>
                            <NavDropdown.Item href="/shexInfo">Info about ShEx schema</NavDropdown.Item>
                            <NavDropdown.Item href="/shexVisualize">Visualize ShEx schema</NavDropdown.Item>
                            <NavDropdown.Item href="/shexVisualizeCytoscape">Visualize ShEx schema (Cytoscape)</NavDropdown.Item>
                            <NavDropdown.Item href="/shexConvert">Convert ShEx formats</NavDropdown.Item>
                            <NavDropdown.Item href="/shex2shacl">ShEx &#8594; SHACL</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="SHACL" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/shaclValidate">Validate data with SHACL</NavDropdown.Item>
                            <NavDropdown.Item href="/shaclConvert">Convert SHACL formats</NavDropdown.Item>
                            <NavDropdown.Item href="/shacl2shex">SHACL &#8594; ShEx</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="ShapeMap" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/shapeMapInfo">Info about ShapeMap</NavDropdown.Item>
                            <NavDropdown.Item href="/shapeMapFix">Fix shapeMap with RDFData</NavDropdown.Item>
                            <NavDropdown.Item href="/shapeMapConvert">Convert ShapeMap format</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="SPARQL" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/endpoint">SPARQL</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Wikidata" id="basic-nav-dropdown">
                            <NavDropdown.Item href="http://wikishape.weso.es">Wikishape</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Examples" id="basic-nav-dropdown" className="mr-sm-2">
                            <NavDropdown.Item href='/dataInfo?data=%40prefix%20%3A%20%20%20%20%20%20<http%3A%2F%2Fexample.org%2F>%20.%0A%40prefix%20schema%3A%20<http%3A%2F%2Fschema.org%2F>%20.%0A%40prefix%20item%3A%20%20<http%3A%2F%2Fdata.europeana.eu%2Fitem%2F04802%2F>%20.%0A%40prefix%20dbr%3A%20%20%20<http%3A%2F%2Fdbpedia.org%2Fresource%2F>%20.%0A%40prefix%20xsd%3A%20%20%20<http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23>%20.%0A%40prefix%20dcterms%3A%20<http%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F>%20.%0A%40prefix%20it%3A%20%20%20%20<http%3A%2F%2Fdata.example.org%2Fitem%2F>%20.%0A%40prefix%20wd%3A%20%20%20%20<http%3A%2F%2Fwww.wikidata.org%2Fentity%2F>%20.%0A%40prefix%20foaf%3A%20%20<http%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F>%20.%0A%0A%3Aalice%20%20a%20%20%20%20%20%20%20foaf%3APerson%20.%0A%0A%3Abob%20%20%20%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20foaf%3APerson%20%3B%0A%20%20%20%20%20%20%20%20schema%3AbirthDate%20%20%20%20%20"1990-07-04"%5E%5Exsd%3Adate%20%3B%0A%20%20%20%20%20%20%20%20foaf%3Aknows%20%20%20%20%20%20%20%20%20%20%20<http%3A%2F%2Fexample.org%2Falice%23me>%20%3B%0A%20%20%20%20%20%20%20%20foaf%3Atopic_interest%20%20wd%3AQ12418%20.%0A%0A%3Acarol%20%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20foaf%3APerson%20%3B%0A%20%20%20%20%20%20%20%20schema%3AbirthDate%20%20"unknown"%20.%0A%0Awd%3AQ12418%20%20dcterms%3Acreator%20%20dbr%3ALeonardo_da_Vinci%20%3B%0A%20%20%20%20%20%20%20%20dcterms%3Atitle%20%20%20%20"Mona%20Lisa"%20.%0A%0Ait%3A243FA%20%20dcterms%3Asubject%20%20wd%3AQ12418%20%3B%0A%20%20%20%20%20%20%20%20dcterms%3Atitle%20%20%20%20"La%20Joconde%20à%20Washington"%40fr%20.%0A&dataFormat=TURTLE&inference=NONE'
                            >Data info</NavDropdown.Item>
                            <NavDropdown.Item href='/dataConvert?data=%40prefix%20%3A%20%20%20%20%20%20%3Chttp%3A%2F%2Fexample.org%2F%3E%20.%0A%40prefix%20schema%3A%20%3Chttp%3A%2F%2Fschema.org%2F%3E%20.%0A%40prefix%20item%3A%20%20%3Chttp%3A%2F%2Fdata.europeana.eu%2Fitem%2F04802%2F%3E%20.%0A%40prefix%20dbr%3A%20%20%20%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2F%3E%20.%0A%40prefix%20xsd%3A%20%20%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%20.%0A%40prefix%20dcterms%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%20.%0A%40prefix%20it%3A%20%20%20%20%3Chttp%3A%2F%2Fdata.example.org%2Fitem%2F%3E%20.%0A%40prefix%20wd%3A%20%20%20%20%3Chttp%3A%2F%2Fwww.wikidata.org%2Fentity%2F%3E%20.%0A%40prefix%20foaf%3A%20%20%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%20.%0A%0A%3Aalice%20%20a%20%20%20%20%20%20%20foaf%3APerson%20.%0A%0A%3Abob%20%20%20%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20foaf%3APerson%20%3B%0A%20%20%20%20%20%20%20%20schema%3AbirthDate%20%20%20%20%20%221990-07-04%22%5E%5Exsd%3Adate%20%3B%0A%20%20%20%20%20%20%20%20foaf%3Aknows%20%20%20%20%20%20%20%20%20%20%20%3Chttp%3A%2F%2Fexample.org%2Falice%23me%3E%20%3B%0A%20%20%20%20%20%20%20%20foaf%3Atopic_interest%20%20wd%3AQ12418%20.%0A%0A%3Acarol%20%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20foaf%3APerson%20%3B%0A%20%20%20%20%20%20%20%20schema%3AbirthDate%20%20%22unknown%22%20.%0A%0Awd%3AQ12418%20%20dcterms%3Acreator%20%20dbr%3ALeonardo_da_Vinci%20%3B%0A%20%20%20%20%20%20%20%20dcterms%3Atitle%20%20%20%20%22Mona%20Lisa%22%20.%0A%0Ait%3A243FA%20%20dcterms%3Asubject%20%20wd%3AQ12418%20%3B%0A%20%20%20%20%20%20%20%20dcterms%3Atitle%20%20%20%20%22La%20Joconde%20%C3%A0%20Washington%22%40fr%20.&amp;dataFormat=TURTLE&amp;targetDataFormat=JSON-LD&amp;inference=NONE'
                            >Data conversion</NavDropdown.Item>
                            <NavDropdown.Item href='/dataVisualize?activeTab=%23dataTextArea&data=%40prefix%20%3A%20%20%20%20%20%20<http%3A%2F%2Fexample.org%2F>%20.%0A%40prefix%20schema%3A%20<http%3A%2F%2Fschema.org%2F>%20.%0A%40prefix%20item%3A%20%20<http%3A%2F%2Fdata.europeana.eu%2Fitem%2F04802%2F>%20.%0A%40prefix%20dbr%3A%20%20%20<http%3A%2F%2Fdbpedia.org%2Fresource%2F>%20.%0A%40prefix%20xsd%3A%20%20%20<http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23>%20.%0A%40prefix%20dcterms%3A%20<http%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F>%20.%0A%40prefix%20it%3A%20%20%20%20<http%3A%2F%2Fdata.example.org%2Fitem%2F>%20.%0A%40prefix%20wd%3A%20%20%20%20<http%3A%2F%2Fwww.wikidata.org%2Fentity%2F>%20.%0A%40prefix%20foaf%3A%20%20<http%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F>%20.%0A%0A%3Aalice%20%20a%20%20%20%20%20%20%20foaf%3APerson%20.%0A%0A%3Abob%20%20%20%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20foaf%3APerson%20%3B%0A%20%20%20%20%20%20%20%20schema%3AbirthDate%20%20%20%20%20"1990-07-04"%5E%5Exsd%3Adate%20%3B%0A%20%20%20%20%20%20%20%20foaf%3Aknows%20%20%20%20%20%20%20%20%20%20%20<http%3A%2F%2Fexample.org%2Falice%23me>%20%3B%0A%20%20%20%20%20%20%20%20foaf%3Atopic_interest%20%20wd%3AQ12418%20.%0A%0A%3Acarol%20%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20foaf%3APerson%20%3B%0A%20%20%20%20%20%20%20%20schema%3AbirthDate%20%20"unknown"%20.%0A%0Awd%3AQ12418%20%20dcterms%3Acreator%20%20dbr%3ALeonardo_da_Vinci%20%3B%0A%20%20%20%20%20%20%20%20dcterms%3Atitle%20%20%20%20"Mona%20Lisa"%20.%0A%0Ait%3A243FA%20%20dcterms%3Asubject%20%20wd%3AQ12418%20%3B%0A%20%20%20%20%20%20%20%20dcterms%3Atitle%20%20%20%20"La%20Joconde%20à%20Washington"%40fr%20.%0A&dataFormat=TURTLE&dataFormatTextArea=TURTLE&targetDataFormat=SVG&targetGraphFormat=SVG'
                            >Data visualization</NavDropdown.Item>
                            <NavDropdown.Item href='/shExConvert?activeSchemaTab=%23schemaTextArea&schema=prefix%20schema%3A%20<http%3A%2F%2Fschema.org%2F>%20%0Aprefix%20xsd%3A%20%20%20<http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23>%20%0Aprefix%20dcterms%3A%20<http%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F>%20%0Aprefix%20it%3A%20%20%20%20<http%3A%2F%2Fdata.europeana.eu%2Fitem%2F>%20%0Aprefix%20foaf%3A%20%20<http%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F>%20%0A%0A<User>%20IRI%20%7B%20%0A%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5B%20foaf%3APerson%20%5D%3B%20%0A%20schema%3AbirthDate%20%20%20%20%20xsd%3Adate%3F%20%20%3B%0A%20foaf%3Aknows%20%20%20%20%20%20%20%20%20%20%20%40<User>%2A%20%3B%0A%20foaf%3Atopic_interest%20%20%40<Topic>%7B0%2C10%7D%0A%7D%0A%0A<Topic>%20%7B%0A%20%20dcterms%3Atitle%20%20%20xsd%3Astring%20%3B%0A%20%20dcterms%3Acreator%20IRI%20%3B%0A%20%20%5Edcterms%3Asubject%20%40<Item>%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%7D%0A%0A<Item>%20%7B%0A%20%20dcterms%3Atitle%20%5B%40en%20%40fr%20%40es%5D%20%3B%0A%7D&schemaEmbedded=false&schemaEngine=ShEx&schemaFormat=ShExC&schemaFormatTextArea=ShExC&targetSchemaFormat=JSON-LD'
                            >ShEx conversion</NavDropdown.Item>
                            <NavDropdown.Item href='/validate?data=%40prefix%20%3A%20%20%20%20%20%20<http%3A%2F%2Fexample.org%2F>%20.%0A%40prefix%20schema%3A%20<http%3A%2F%2Fschema.org%2F>%20.%0A%40prefix%20item%3A%20%20<http%3A%2F%2Fdata.europeana.eu%2Fitem%2F04802%2F>%20.%0A%40prefix%20dbr%3A%20%20%20<http%3A%2F%2Fdbpedia.org%2Fresource%2F>%20.%0A%40prefix%20xsd%3A%20%20%20<http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23>%20.%0A%40prefix%20dcterms%3A%20<http%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F>%20.%0A%40prefix%20it%3A%20%20%20%20<http%3A%2F%2Fdata.example.org%2Fitem%2F>%20.%0A%40prefix%20wd%3A%20%20%20%20<http%3A%2F%2Fwww.wikidata.org%2Fentity%2F>%20.%0A%40prefix%20foaf%3A%20%20<http%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F>%20.%0A%0A%3Aalice%20%20a%20%20%20%20%20%20%20foaf%3APerson%20.%0A%0A%3Abob%20%20%20%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20foaf%3APerson%20%3B%0A%20%20%20%20%20%20%20%20schema%3AbirthDate%20%20%20%20%20"1990-07-04"%5E%5Exsd%3Adate%20%3B%0A%20%20%20%20%20%20%20%20foaf%3Aknows%20%20%20%20%20%20%20%20%20%20%20%3Aalice%20%3B%0A%20%20%20%20%20%20%20%20foaf%3Atopic_interest%20%20wd%3AQ12418%20.%0A%0A%3Acarol%20%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20foaf%3APerson%20%3B%0A%20%20%20%20%20%20%20%20schema%3AbirthDate%20%20"unknown"%20.%0A%0Awd%3AQ12418%20%20dcterms%3Acreator%20%20dbr%3ALeonardo_da_Vinci%20%3B%0A%20%20%20%20%20%20%20%20dcterms%3Atitle%20%20%20%20"Mona%20Lisa"%20.%0A%0Ait%3A243FA%20%20dcterms%3Asubject%20%20wd%3AQ12418%20%3B%0A%20%20%20%20%20%20%20%20dcterms%3Atitle%20%20%20%20"La%20Joconde%20à%20Washington"%40fr%20.&dataFormat=TURTLE&schema=prefix%20schema%3A%20<http%3A%2F%2Fschema.org%2F>%20%0Aprefix%20xsd%3A%20%20%20<http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23>%20%0Aprefix%20dcterms%3A%20<http%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F>%20%0Aprefix%20it%3A%20%20%20%20<http%3A%2F%2Fdata.europeana.eu%2Fitem%2F>%20%0Aprefix%20foaf%3A%20%20<http%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F>%20%0A%0A<User>%20IRI%20%7B%20%0A%20a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5B%20foaf%3APerson%20%5D%3B%20%0A%20schema%3AbirthDate%20%20%20%20%20xsd%3Adate%3F%20%20%3B%0A%20foaf%3Aknows%20%20%20%20%20%20%20%20%20%20%20%40<User>*%20%3B%0A%20foaf%3Atopic_interest%20%20%40<Topic>%7B0%2C10%7D%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%7D%0A%0A<Topic>%20%7B%0A%20%20dcterms%3Atitle%20%20%20xsd%3Astring%20%3B%0A%20%20dcterms%3Acreator%20IRI%20%3B%0A%20%20%5Edcterms%3Asubject%20%40<Item>%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%7D%0A%0A<Item>%20%7B%0A%20%20dcterms%3Atitle%20%5B%40en%20%40fr%20%40es%5D%20%3B%0A%7D&schemaFormat=ShExC&schemaEngine=ShEx&triggerMode=ShapeMap&schemaEmbedded=false&inference=NONE&activeDataTab=%23dataTextArea&activeSchemaTab=%23schemaTextArea&activeShapeMapTab=%23shapeMapTextArea&&shapeMap=%3Abob%40<User>%2C%3Acarol%40<User>'
                            >ShEx validation</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Help" id="basic-nav-dropdown" className="mr-sm-2">
                            <NavDropdown.Item href="https://app.swaggerhub.com/apis-docs/labra/rdfshape/1.0.1">API
                                Docs</NavDropdown.Item>
                            <NavDropdown.Item
                                href="https://github.com/labra/rdfshape/wiki/RDFShape---Help">Help</NavDropdown.Item>
                            <NavDropdown.Item href="/about">About</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default RDFShapeNavbar;
