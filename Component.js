sap.ui.define([
    "sap/ui/core/UIComponent",
    "manishant/projectman/model/models",
    "sap/ui/model/json/JSONModel"
], (UIComponent, models, JSONModel) => {
    "use strict";

    return UIComponent.extend("manishant.projectman.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            if (sap.ui.Device.system.phone) {
                document.body.classList.remove("sapUiSizeCompact");
                document.body.classList.add("sapUiSizeCozy");
            } else {
                document.body.classList.add("sapUiSizeCompact");
            }

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();

            // Global model
            var oGlobalModel = new JSONModel({
                userChoice: null
            });

            this.setModel(oGlobalModel, "global");
        }
    });
});