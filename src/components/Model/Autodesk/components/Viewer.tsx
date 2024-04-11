//@ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import {CustomProfile} from "../config";
import {TurnTableExtension} from "../extensions/Rotation/main";

const {Autodesk} = window;

const runtime = {
    /** @type {Autodesk.Viewing.InitializerOptions} */
    options: null,
    /** @type {Promise<void>} */
    ready: null
};

/**
 * Initializes global runtime for communicating with Autodesk Platform Services.
 * Calling this function repeatedly with different options is not allowed, and will result in an exception.
 * @async
 * @param {Autodesk.Viewing.InitializerOptions} options Runtime initialization options.
 * @returns {Promise<void>}
 */
function initializeViewerRuntime(options) {
    if (!runtime.ready) {
        runtime.options = {...options};
        runtime.ready = new Promise((resolve) => Autodesk.Viewing.Initializer(runtime.options, resolve));
    } else {
        if (['accessToken', 'getAccessToken', 'env', 'api', 'language'].some(prop => options[prop] !== runtime.options[prop])) {
            return Promise.reject('Cannot initialize another viewer runtime with different settings.')
        }
    }
    return runtime.ready;
}

/**
 * Wrapper for the Autodesk Platform Services viewer component.
 */
class Viewer extends React.Component {
    constructor(props) {
        super(props);
        this.container = null;
        this.viewer = null;
    }

    componentDidMount() {
        initializeViewerRuntime(this.props.runtime || {})
            .then(_ => {

                const profile = new Autodesk.Viewing.Profile(CustomProfile);
                const config3d = {
                    disabledExtensions: {boxSelection: true}
                };

                this.viewer = new Autodesk.Viewing.GuiViewer3D(this.container, config3d);
                this.viewer.start();
                this.viewer.setProfile(profile);
                this.viewer.impl.disableHighlight(true);

                this.viewer.addEventListener(window.Autodesk.Viewing.FULLSCREEN_MODE_EVENT, mode => {
                    let app = this.viewer.container.closest('.app');
                    if (mode.mode === 0) app.classList.remove('fullscreen');
                    else app.classList.add('fullscreen');
                });

                this.viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, () => {
                }, {once: true});

                if (!window.autodeskViewers) window.autodeskViewers = {};
                window.autodeskViewers[this.props.id] = this.viewer;

                this.updateViewerState({});
            }).then(r => {
            Autodesk.Viewing.theExtensionManager.registerExtension('CameraRotation', TurnTableExtension);
            // Autodesk.ADN.Viewing.Extension.TransformTool.prototype =
            //     Object.create(Autodesk.Viewing.Extension.prototype);

            // Autodesk.ADN.Viewing.Extension.TransformTool.prototype.constructor =
            //     Autodesk.ADN.Viewing.Extension.TransformTool;

            // Autodesk.Viewing.theExtensionManager.registerExtension(
            //     'TransformationExtension',
            //     Autodesk.ADN.Viewing.Extension.TransformTool);


            const loader = setInterval(() => {
                try {
                    // this.viewer.loadExtension("TransformationExtension")
                    this.viewer.loadExtension("CameraRotation");
                    if (this.props.rotation) {
                        document.querySelector(".app." + this.props.urn).querySelector('#turnTableButton').click();
                    }
                    clearInterval(loader);
                } catch (e) {
                }
            }, 3000);
        }).catch(err => console.error(err));
    }

    componentWillUnmount() {
        if (this.viewer) {
            this.viewer.finish();
            this.viewer = null;
        }
    }

    componentDidUpdate(prevProps) {
        if (this.viewer) {
            this.updateViewerState(prevProps);
        }
    }

    updateViewerState(prevProps) {
        if (this.props.urn && this.props.urn !== prevProps.urn) {
            Autodesk.Viewing.Document.load(
                'urn:' + this.props.urn,
                (doc) => this.viewer && this.viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry()),
                (code, message, errors) => console.error(code, message, errors)
            );
        } else if (!this.props.urn && this.viewer.model) {
            this.viewer.unloadModel(this.viewer.model);
        }

        const selectedIds = this.viewer.getSelection();
        if (JSON.stringify(this.props.selectedIds || []) !== JSON.stringify(selectedIds)) {
            this.viewer.select(this.props.selectedIds);
        }
    }

    render() {
        return <div ref={ref => this.container = ref}></div>;
    }
}

Viewer.propTypes = {
    /** Autodesk runtime initialization options. */
    runtime: PropTypes.object,
    /** URN of model to be loaded. */
    urn: PropTypes.string,
    /** List of selected object IDs. */
    selectedIds: PropTypes.arrayOf(PropTypes.number),
    /** Callback for when the viewer camera changes. */
    onCameraChange: PropTypes.func,
    /** Callback for when the viewer selectio changes. */
    onSelectionChange: PropTypes.func
};

export default Viewer;
