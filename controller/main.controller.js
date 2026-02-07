sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("manishant.projectman.controller.main", {
        onInit() {
            this._iIndex = 0;
            this._aPages = this.byId("imageCarousel").getPages();

            this._carouselTimer = setInterval(function () {
                var oCarousel = this.byId("imageCarousel");

                this._iIndex = (this._iIndex + 1) % this._aPages.length;
                oCarousel.setActivePage(this._aPages[this._iIndex]);

            }.bind(this), 2000); // rotate every 3 seconds



        },

        onExit: function () {
            if (this._carouselTimer) {
                clearInterval(this._carouselTimer);
            }
        },

        _openDialog: function (sFragmentName) {
            var oView = this.getView();

            if (!this._mDialogs) {
                this._mDialogs = {};
            }

            if (!this._mDialogs[sFragmentName]) {
                this._mDialogs[sFragmentName] = sap.ui.core.Fragment.load({
                    id: oView.getId(),
                    name: "manishant.projectman.view." + sFragmentName,
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }

            this._mDialogs[sFragmentName].then(function (oDialog) {
                oDialog.open();
            });
        },

        onYes: function () {

            this._openDialog("yesPop1");

            /*var oView = this.getView();

            if (!this._oDialog) {
                this._oDialog = sap.ui.core.Fragment.load({
                    id: oView.getId(),
                    name: "manishant.projectman.view.yesPop",
                    controller: this   //  THIS IS THE KEY
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }

            this._oDialog.then(function (oDialog) {
                oDialog.open();
            });*/

        },

        onYes1 : function () {
            this.byId("noPop").close();
            this._openDialog("noPop2");
        },

        onNo: function () {

            this._openDialog("noPop");

            /*var oView = this.getView();

            if (!this._oDialog) {
                this._oDialog = sap.ui.core.Fragment.load({
                    id: oView.getId(),
                    name: "manishant.projectman.view.noPop",
                    controller: this   //  THIS IS THE KEY
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }

            this._oDialog.then(function (oDialog) {
                oDialog.open();
            });*/
        },

        onCloseYes : function () {
            this.byId("yesPop").close();
        },

        onCloseYes1 : function () {
            this.byId("yesPop1").close();
            this._openDialog("yesPop2");
        },

        onCloseYes2 : function () {
            this.byId("yesPop2").close();
            this._openDialog("yesPop3");
        },

        onCloseYes3 : function () {
            this.byId("yesPop3").close();
            this._openDialog("yesPop5");
        },

        onCloseYes4 : function () {
            this.byId("yesPop4").close();
            this._openDialog("yesPop5");
        },

        onCloseYes5 : function () {
            this.byId("yesPop5").close();
            this._openDialog("yesPop");
        },

        onCloseNo : function () {
            this.byId("noPop").close();
        },

        onCloseNo2 : function () {
            this.byId("noPop2").close();
        },

        onDialogAfterOpen: function () {
            // Bind once, keep reference
            this._fnOutsideClick = this._handleOutsideClick.bind(this);

            // Delay ensures DOM is ready
            setTimeout(() => {
                document.addEventListener("click", this._fnOutsideClick, true);
            }, 0);
        },

        onDialogAfterClose: function () {
            document.removeEventListener("click", this._fnOutsideClick, true);
        },

        _handleOutsideClick: function (oEvent) {
            const oDialogDom = this._oLoadingDialog.getDomRef();

            // If dialog DOM exists and click is outside
            if (oDialogDom && !oDialogDom.contains(oEvent.target)) {
                this._oLoadingDialog.close();
            }
        }
    });
});